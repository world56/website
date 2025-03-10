"use client";

import { toast } from "sonner";
import { usePosts } from "@/hooks";
import Card from "@/components/Card";
import Select from "@/components/Select";
import { dateToTime } from "@/lib/format";
import { useMemo, useState } from "react";
import Confirm from "@/components/Confirm";
import Tooltip from "@/components/Tooltip";
import DataTable from "@/components/Table";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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

const Posts = () => {
  const router = useRouter();
  const t = useTranslations("postTable");
  const tCommon = useTranslations("common");

  const [deleteId, setDeleteId] = useState<Post["id"]>();

  const { title, query, type, data, loading, run, setQuery } = usePosts();

  function onEdit(row?: Post) {
    router.push(`/console/post/${type}/${row?.id || -1}`);
  }

  async function onStatus({ id }: Post, status: boolean) {
    await updatePostStatus({ id, status: Number(status) });
    toast.success(tCommon("saveSuccess"));
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
      toast.success(tCommon("deleteSuccess"));
      run();
    }
    setDeleteId(undefined);
  }

  function onPageTurningChange(current: number) {
    setQuery((v) => ({ ...v, current }));
  }

  const SELECT_ITEMS = useMemo(
    () => [
      { value: ENUM_COMMON.STATUS.ENABLE, label: t("statusTrue") },
      { value: ENUM_COMMON.STATUS.DISABLE, label: t("statusFalse") },
    ],
    [t],
  );

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "title",
      header: t("title"),
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
      header: t("status"),
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
      header: t("createTime"),
      size: 100,
      cell: ({ row }) => (
        <p className="text-center">{dateToTime(row.original.createTime)}</p>
      ),
    },
    {
      accessorKey: "id",
      header: tCommon("operate"),
      size: 100,
      cell: ({ row }) => {
        const { status } = row.original;
        return (
          <div className="flex justify-center">
            <Tooltip
              type="button"
              disabled={!status}
              onClick={() => onSkip(row.original)}
              title={status ? undefined : tCommon("deleteDesc")}
              className={`p-2 ${status ? "" : "dark:text-gray-500"}`}
            >
              {tCommon("preview")}
            </Tooltip>

            <Button
              variant="link"
              className="p-2"
              onClick={() => onEdit(row.original)}
            >
              {tCommon("update")}
            </Button>
            <Button
              variant="link"
              className="p-2 text-red-500"
              onClick={() => onConfirmDelete(row.original)}
            >
              {tCommon("delete")}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card spacing={4} title={title} description={`${t("description")}${title}`}>
      <div className="flex justify-between">
        <div className="flex">
          <Select
            value={query.status}
            items={SELECT_ITEMS}
            placeholder={t("status")}
            onChange={onSelectStatus}
          />
          <Input
            className="w-60 mx-3"
            onChange={onTitleChange}
            defaultValue={query.title}
            placeholder={t("titlePlaceholder")}
          />
          <LoadingButton onClick={run} loading={loading} icon={SyncOutlined} />
        </div>
        <Button onClick={() => onEdit()}>
          <PlusCircleOutlined />
          {t("insert")}
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
