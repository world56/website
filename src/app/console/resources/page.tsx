"use client";

import { toast } from "sonner";
import { useState } from "react";
import { filesize } from "filesize";
import { useRequest } from "ahooks";
import Card from "@/components/Card";
import Select from "@/components/Select";
import { dateToTime } from "@/lib/format";
import Tooltip from "@/components/Tooltip";
import DataTable from "@/components/Table";
import Confirm from "@/components/Confirm";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/Button";
import { Button } from "@/components/ui/button";
import { SyncOutlined } from "@ant-design/icons";
import PageTurning from "@/components/PageTurning";
import { getResources, deleteResource, API_RESOURCE } from "@/app/api";

import { ENUM_COMMON } from "@/enum/common";

import type { Resource } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

const RESOURCE_TYPE = [
  { value: ENUM_COMMON.RESOURCE.IMAGE, label: "图像" },
  { value: ENUM_COMMON.RESOURCE.AUDIO, label: "音频" },
  { value: ENUM_COMMON.RESOURCE.VIDEO, label: "视频" },
];

const SIZE_SORT = [
  { value: "asc", label: "从小到大" },
  { value: "desc", label: "从大到小" },
];

const RESOURCE_NAME = {
  [ENUM_COMMON.RESOURCE.AUDIO]: "音频",
  [ENUM_COMMON.RESOURCE.VIDEO]: "视频",
  [ENUM_COMMON.RESOURCE.IMAGE]: "图像",
  [ENUM_COMMON.RESOURCE.UNKNOWN]: "未知",
};

const Files = () => {
  const [deleteId, setDeleteId] = useState<Resource["id"]>();

  const [query, setQuery] = useState<Parameters<typeof getResources>[number]>({
    current: 1,
    pageSize: 15,
  });

  const { data, loading, run } = useRequest(() => getResources(query), {
    debounceWait: 200,
    refreshDeps: [query],
  });

  async function onDelete(id?: Resource["id"]) {
    if (id) {
      await deleteResource({ id });
      toast.success("删除成功");
      run();
    }
    setDeleteId(undefined);
  }

  function onPreview(row: Resource) {
    window.open(`${API_RESOURCE}${row.path}`);
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery((v) => ({ ...v, current: 1, name: e.target.value }));
  }

  function onConfirmDelete(row: Resource) {
    setDeleteId(row.id);
  }

  function onTypeChange(type: ENUM_COMMON.RESOURCE) {
    setQuery((v) => ({ ...v, type, current: 1 }));
  }

  function onChangeSize(size: "asc" | "desc") {
    setQuery((v) => ({ ...v, size, current: 1 }));
  }

  function onPageTurningChange(current: number) {
    setQuery((v) => ({ ...v, current }));
  }

  const columns: ColumnDef<Resource>[] = [
    {
      accessorKey: "name",
      header: "资源名称",
      cell: ({ row }) => (
        <Tooltip
          title={row.original.name}
          className="truncate py-2 px-1 w-full text-left"
        >
          {row.original.name}
        </Tooltip>
      ),
    },
    {
      size: 50,
      header: "类型",
      cell: ({ row }) => (
        <p className="text-center py-2">
          {RESOURCE_NAME[row.original.type as ENUM_COMMON.RESOURCE]}
        </p>
      ),
    },
    {
      accessorKey: "size",
      size: 50,
      header: "大小",
      cell: ({ row }) => (
        <p className="text-center py-2">{filesize(row.original.size)}</p>
      ),
    },
    {
      accessorKey: "createTime",
      header: "上传日期",
      size: 70,
      cell: ({ row }) => (
        <p className="text-center py-2">
          {dateToTime(row.original.createTime)}
        </p>
      ),
    },
    {
      accessorKey: "id",
      header: "操作",
      size: 45,
      cell: ({ row }) => (
        <>
          <Button
            variant="link"
            className="p-3"
            onClick={() => onPreview(row.original)}
          >
            预览
          </Button>
          <Button
            variant="link"
            className="text-red-500 p-3"
            onClick={() => onConfirmDelete(row.original)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card title="资源管理" spacing={4} description="对上传的静态资源进行管理">
      <div className="flex">
        <Select
          value={query.type}
          placeholder="资源类型"
          items={RESOURCE_TYPE}
          onChange={onTypeChange}
        />
        <Select
          className="mx-3"
          items={SIZE_SORT}
          value={query.size}
          placeholder="大小排序"
          onChange={onChangeSize}
        />
        <Input
          className="w-52 mr-3"
          onChange={onNameChange}
          placeholder="请输入资源名称"
        />
        <LoadingButton
          loading={loading}
          icon={SyncOutlined}
          onClick={() => run()}
        />
      </div>
      <DataTable loading={loading} columns={columns} data={data?.list || []} />
      <PageTurning
        total={data?.total}
        current={query.current}
        pageSize={query.pageSize}
        onChange={onPageTurningChange}
      />
      <Confirm
        id={deleteId}
        onOk={onDelete}
        onCancel={onDelete}
        description="资源删除后将永久消失，若正在被使用，可能无法正常获取，请谨慎操作！"
      />
    </Card>
  );
};

export default Files;
