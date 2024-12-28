"use client";

import { toast } from "sonner";
import { useState } from "react";
import { usePosts } from "@/hooks";
import Card from "@/components/Card";
import Select from "@/components/Select";
import { dateToTime } from "@/lib/format";
import Confirm from "@/components/Confirm";
import Tooltip from "@/components/Tooltip";
import DataTable from "@/components/Table";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/Button";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SyncOutlined } from "@ant-design/icons";
import PageTurning from "@/components/PageTurning";
import { PlusCircleOutlined } from "@ant-design/icons";
import { deletePost, updatePostStatus } from "@/app/api";

import { ENUM_COMMON } from "@/enum/common";

import type { Post } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

const SELECT_ITEMS = [
  { value: ENUM_COMMON.STATUS.ENABLE, label: "可预览" },
  { value: ENUM_COMMON.STATUS.DISABLE, label: "不可预览" },
];

const Posts = () => {
  const router = useRouter();

  const [deleteId, setDeleteId] = useState<Post["id"]>();

  const { title, query, type, data, loading, run, setQuery } = usePosts();

  function onEdit(row?: Post) {
    router.push(`/console/post/${type}/${row?.id || -1}`);
  }

  async function onStatus({ id }: Post, status: boolean) {
    await updatePostStatus({ id, status: Number(status) });
    toast.success("保存成功");
    run();
  }

  function onSelectStatus(status: Post["status"]) {
    setQuery((v) => ({ ...v, current: 1, status }));
  }

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery((v) => ({ ...v, current: 1, title: e.target.value }));
  }

  async function onConfirmDelete(row: Post) {
    setDeleteId(row.id);
  }

  function onSkip(row: Post) {
    window.open(`/${type}/${row.id}`);
  }

  async function onDelete(id?: Post["id"]) {
    if (id) {
      await deletePost({ id, type });
      toast.success("删除成功");
      run();
    }
    setDeleteId(undefined);
  }

  function onPageTurningChange(current: number) {
    setQuery((v) => ({ ...v, current }));
  }

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "title",
      header: "标题",
      size: 265,
      cell: ({ row }) => (
        <Tooltip
          title={row.original.title}
          className="truncate py-2 px-1 w-full text-left"
        >
          {row.original.title}
        </Tooltip>
      ),
    },
    {
      accessorKey: "status",
      header: "可预览",
      size: 60,
      cell: ({ row }) => (
        <Switch
          className="m-auto block"
          onCheckedChange={(bol) => onStatus(row.original, bol)}
          checked={row.original.status === ENUM_COMMON.STATUS.ENABLE}
        />
      ),
    },
    {
      accessorKey: "createTime",
      header: "创建时间",
      size: 100,
      cell: ({ row }) => (
        <p className="text-center">{dateToTime(row.original.createTime)}</p>
      ),
    },
    {
      accessorKey: "id",
      header: "操作",
      size: 80,
      cell: ({ row }) => {
        const { status } = row.original;
        return (
          <>
            <Tooltip
              type="button"
              disabled={!status}
              className="p-2 ml-[2px]"
              onClick={() => onSkip(row.original)}
              title={status ? undefined : "开启'可预览'后预览"}
            >
              预览
            </Tooltip>

            <Button
              variant="link"
              className="p-2 ml-[2px]"
              onClick={() => onEdit(row.original)}
            >
              编辑
            </Button>
            <Button
              variant="link"
              className="p-2 text-red-500"
              onClick={() => onConfirmDelete(row.original)}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Card spacing={4} title={title} description={`向访问者展示您的${title}`}>
      <div className="flex justify-between">
        <div className="flex">
          <Select
            value={query.status}
            items={SELECT_ITEMS}
            placeholder="预览状态"
            onChange={onSelectStatus}
          />
          <Input
            className="w-60 mx-3"
            onChange={onTitleChange}
            defaultValue={query.title}
            placeholder="输入标题进行查询"
          />
          <LoadingButton onClick={run} loading={loading} icon={SyncOutlined} />
        </div>
        <Button onClick={() => onEdit()}>
          <PlusCircleOutlined />
          新增内容
        </Button>
      </div>
      <DataTable loading={loading} columns={columns} data={data?.list || []} />
      <PageTurning
        total={data?.total}
        current={query.current}
        pageSize={query.pageSize}
        onChange={onPageTurningChange}
      />
      <Confirm id={deleteId} onOk={onDelete} onCancel={onDelete} />
    </Card>
  );
};

export default Posts;
