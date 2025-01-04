"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRequest } from "ahooks";
import Card from "@/components/Card";
import { set, format } from "date-fns";
import { readMessage } from "@/app/api";
import Select from "@/components/Select";
import { dateToTime } from "@/lib/format";
import Details from "./component/Details";
import DataTable from "@/components/Table";
import Confirm from "@/components/Confirm";
import Tooltip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/Button";
import { SyncOutlined } from "@ant-design/icons";
import PageTurning from "@/components/PageTurning";
import { deleteMessage, getMessages } from "@/app/api";
import { DateRangePicker } from "@/components/DatePicker";

import type { Msg } from "@prisma/client";
import type { DateRange } from "react-day-picker";
import type { ColumnDef } from "@tanstack/react-table";

const SELECT_ITEMS = [
  { value: "true", label: "已读" },
  { value: "false", label: "未读" },
];

const Contact = () => {
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
      toast.success("删除成功");
      run(query);
    }
    setDeleteId(undefined);
  }

  async function onRead(row: Msg) {
    await readMessage({ id: row.id });
    toast.success("标记成功");
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
      header: "留言人",
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
      header: "留言信息",
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
      header: "状态",
      cell: ({ row }) => {
        const { read } = row.original;
        const color = read ? "" : "text-red-500";
        return (
          <Tooltip
            type="button"
            disabled={read}
            onClick={() => onRead(row.original)}
            className={`mx-auto block p-0 ${color}`}
            title={read ? undefined : "点击标记为已读"}
          >
            {read ? "已读" : "未读"}
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "createTime",
      header: "时间",
      size: 80,
      cell: ({ row }) => (
        <p className="text-center">{dateToTime(row.original.createTime)}</p>
      ),
    },
    {
      accessorKey: "id",
      header: "操作",
      size: 52,
      cell: ({ row }) => (
        <>
          <Button
            variant="link"
            className="p-2 ml-[4px]"
            onClick={() => setMsg(row.original)}
          >
            预览
          </Button>
          <Button
            variant="link"
            className="p-2 text-red-500"
            onClick={() => onConfirmDelete(row.original)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card
      spacing={4}
      title="留言列表"
      description="主页访问用户主动给您留下的消息"
    >
      <div className="flex">
        <Select
          value={query.read}
          items={SELECT_ITEMS}
          placeholder="阅读状态"
          onChange={onSelectRead}
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
