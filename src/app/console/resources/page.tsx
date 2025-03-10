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
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/Button";
import { Button } from "@/components/ui/button";
import { SyncOutlined } from "@ant-design/icons";
import PageTurning from "@/components/PageTurning";
import { getResources, deleteResource, API_RESOURCE } from "@/app/api";

import { ENUM_COMMON } from "@/enum/common";

import type { Resource } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

const Files = () => {
  const t = useTranslations("resource");
  const tCommon = useTranslations("common");

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
      toast.success(tCommon("deleteSuccess"));
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

  const RESOURCE_TYPE = [
    { value: ENUM_COMMON.RESOURCE.IMAGE, label: t("image") },
    { value: ENUM_COMMON.RESOURCE.AUDIO, label: t("audio") },
    { value: ENUM_COMMON.RESOURCE.VIDEO, label: t("video") },
  ];

  const SIZE_SORT = [
    { value: "asc", label: t("minToMax") },
    { value: "desc", label: t("maxToMin") },
  ];

  const RESOURCE_NAME = {
    [ENUM_COMMON.RESOURCE.AUDIO]: t("audio"),
    [ENUM_COMMON.RESOURCE.VIDEO]: t("video"),
    [ENUM_COMMON.RESOURCE.IMAGE]: t("image"),
    [ENUM_COMMON.RESOURCE.UNKNOWN]: t("other"),
  };

  const columns: ColumnDef<Resource>[] = [
    {
      accessorKey: "name",
      header: t("name"),
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
      header: t("type"),
      cell: ({ row }) => (
        <p className="text-center py-2">
          {RESOURCE_NAME[row.original.type as ENUM_COMMON.RESOURCE]}
        </p>
      ),
    },
    {
      accessorKey: "size",
      size: 50,
      header: t("occupied"),
      cell: ({ row }) => (
        <p className="text-center py-2">{filesize(row.original.size)}</p>
      ),
    },
    {
      accessorKey: "createTime",
      header: t("createTime"),
      size: 70,
      cell: ({ row }) => (
        <p className="text-center py-2">
          {dateToTime(row.original.createTime)}
        </p>
      ),
    },
    {
      accessorKey: "id",
      header: tCommon("operate"),
      size: 65,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="p-3"
            onClick={() => onPreview(row.original)}
          >
            {tCommon("preview")}
          </Button>
          <Button
            variant="link"
            className="text-red-500 p-3"
            onClick={() => onConfirmDelete(row.original)}
          >
            {tCommon("delete")}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card title={t("title")} spacing={4} description={t("description")}>
      <div className="flex">
        <Select
          value={query.type}
          items={RESOURCE_TYPE}
          placeholder={t("type")}
          onChange={onTypeChange}
        />
        <Select
          className="mx-3"
          items={SIZE_SORT}
          value={query.size}
          placeholder={t("size")}
          onChange={onChangeSize}
        />
        <Input
          className="w-60 mr-3"
          onChange={onNameChange}
          placeholder={t("nameDesc")}
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
        description={t("deleteHint")}
      />
    </Card>
  );
};

export default Files;
