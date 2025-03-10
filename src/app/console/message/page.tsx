"use client";

import { toast } from "sonner";
import { useRequest } from "ahooks";
import Card from "@/components/Card";
import { set, format } from "date-fns";
import { readMessage } from "@/app/api";
import Select from "@/components/Select";
import { dateToTime } from "@/lib/format";
import Details from "./component/Details";
import { useMemo, useState } from "react";
import DataTable from "@/components/Table";
import Confirm from "@/components/Confirm";
import Tooltip from "@/components/Tooltip";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/Button";
import { SyncOutlined } from "@ant-design/icons";
import PageTurning from "@/components/PageTurning";
import { deleteMessage, getMessages } from "@/app/api";
import { DateRangePicker } from "@/components/DatePicker";

import type { Msg } from "@prisma/client";
import type { DateRange } from "react-day-picker";
import type { ColumnDef } from "@tanstack/react-table";

const Contact = () => {
  const t = useTranslations("messages");
  const tCommon = useTranslations("common");

  const [msg, setMsg] = useState<Msg>();
  const [deleteId, setDeleteId] = useState<Msg["id"]>();

  const [query, setQuery] = useState<Parameters<typeof getMessages>[number]>({
    current: 1,
    pageSize: 15,
  });

  const { data, loading, run } = useRequest(
    (params?: typeof query) => getMessages(params || query),
    { debounceWait: 100, refreshDeps: [query] },
  );

  async function onDelete(id?: Msg["id"]) {
    if (id) {
      await deleteMessage({ id });
      toast.success(tCommon("deleteSuccess"));
      run(query);
    }
    setDeleteId(undefined);
  }

  async function onRead(row: Msg) {
    await readMessage({ id: row.id });
    toast.success(t("tag"));
    run();
  }

  function onConfirmDelete(row: Msg) {
    setDeleteId(row.id);
  }

  function onSelectRead(read: boolean) {
    setQuery((s) => ({ ...s, current: 1, read }));
  }

  function onTimeChange(e?: DateRange) {
    const { from, to } = e || {};
    const endTime = to
      ? set(to, { hours: 23, minutes: 59, seconds: 59 })
      : undefined;
    const startTime = from ? format(from, "yyyy-MM-dd HH:mm:ss") : undefined;
    setQuery((s) => ({
      ...s,
      current: 1,
      endTime: endTime ? format(endTime, "yyyy-MM-dd HH:mm:ss") : undefined,
      startTime,
    }));
  }

  function onPageTurningChange(current: number) {
    setQuery((v) => ({ ...v, current }));
  }

  function onClose() {
    setMsg(undefined);
    run();
  }

  const columns: ColumnDef<Msg>[] = [
    {
      accessorKey: "name",
      header: t("leaverMessage"),
      cell: ({ row }) => (
        <Tooltip
          title={row.original.name}
          className="truncate w-full text-left inline py-2 px-1"
        >
          {row.original.name}
        </Tooltip>
      ),
    },
    {
      accessorKey: "content",
      header: t("information"),
      cell: ({ row }) => (
        <Tooltip
          title={row.original.content}
          className="truncate w-full text-left inline py-2 px-1"
        >
          {row.original.content}
        </Tooltip>
      ),
    },
    {
      accessorKey: "read",
      size: 50,
      header: t("status"),
      cell: ({ row }) => {
        const { read } = row.original;
        const color = read ? "dark:text-muted-foreground" : "text-red-500";
        return (
          <Tooltip
            type="button"
            disabled={read}
            onClick={() => onRead(row.original)}
            className={`mx-auto block p-0 ${color}`}
            title={read ? undefined : t("readClick")}
          >
            {read ? t("read") : t("unread")}
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "createTime",
      header: t("time"),
      size: 80,
      cell: ({ row }) => (
        <p className="text-center">{dateToTime(row.original.createTime)}</p>
      ),
    },
    {
      accessorKey: "id",
      header: tCommon("operate"),
      size: 80,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Button
            variant="link"
            className="p-"
            onClick={() => setMsg(row.original)}
          >
            {tCommon("preview")}
          </Button>
          <Button
            variant="link"
            className="p-2 text-red-500"
            onClick={() => onConfirmDelete(row.original)}
          >
            {tCommon("delete")}
          </Button>
        </div>
      ),
    },
  ];

  const SELECT_ITEMS = useMemo(
    () => [
      { value: "true", label: t("read") },
      { value: "false", label: t("unread") },
    ],
    [t],
  );

  return (
    <Card spacing={4} title={t("title")} description={t("description")}>
      <div className="flex">
        <Select
          value={query.read}
          items={SELECT_ITEMS}
          onChange={onSelectRead}
          placeholder={t("status")}
        />
        <DateRangePicker onChange={onTimeChange} className="mx-3" />
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
      <Details data={msg} onClose={onClose} />
      <Confirm id={deleteId} onOk={onDelete} onCancel={onDelete} />
    </Card>
  );
};

export default Contact;
