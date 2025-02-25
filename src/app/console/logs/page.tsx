"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRequest } from "ahooks";
import Card from "@/components/Card";
import { set, format } from "date-fns";
import Select from "@/components/Select";
import { dateToTime } from "@/lib/format";
import DataTable from "@/components/Table";
import Tooltip from "@/components/Tooltip";
import Visits from "@/components/Visits";
import LoadingButton from "@/components/Button";
import { Button } from "@/components/ui/button";
import PageTurning from "@/components/PageTurning";
import { DateRangePicker } from "@/components/DatePicker";
import { deleteLog, getLogs, getVisitCount } from "@/app/api";
import { SyncOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import type { Log } from "@prisma/client";
import type { DateRange } from "react-day-picker";
import type { ColumnDef } from "@tanstack/react-table";

import { ENUM_COMMON } from "@/enum/common";

const LOG_ITEMS = [
  { value: ENUM_COMMON.LOG.LOGIN, label: "系统登陆" },
  { value: ENUM_COMMON.LOG.ACCESS, label: "访客访问" },
  { value: ENUM_COMMON.LOG.PASSWORD, label: "修改密码" },
];

const LOG_NAME = {
  [ENUM_COMMON.LOG.LOGIN]: "系统登陆",
  [ENUM_COMMON.LOG.ACCESS]: "访客访问",
  [ENUM_COMMON.LOG.PASSWORD]: "修改密码",
};

const Logs = () => {
  const [query, setQuery] = useState<Parameters<typeof getLogs>[number]>({
    current: 1,
    pageSize: 15,
  });

  const visits = useRequest(getVisitCount, { debounceWait: 100 });

  const { data, loading, run } = useRequest(
    (params?: typeof query) => getLogs(params || query),
    { debounceWait: 100, refreshDeps: [query] },
  );

  async function onDelete(row: Log) {
    await deleteLog({ id: row.id });
    toast.success("删除成功");
    run();
    visits.run();
  }

  function onPageTurningChange(current: number) {
    setQuery((v) => ({ ...v, current }));
  }

  function onTypeChange(type: ENUM_COMMON.LOG) {
    setQuery((v) => ({ ...v, type, current: 1 }));
  }

  function onTimeChange(e?: DateRange) {
    const { from, to } = e || {};
    const endTime = to
      ? set(to, { hours: 23, minutes: 59, seconds: 59 })
      : undefined;
    const startTime = from ? format(from, "yyyy-MM-dd HH:mm:ss") : undefined;
    setQuery((s) => ({
      ...s,
      startTime,
      current: 1,
      endTime: endTime ? format(endTime, "yyyy-MM-dd HH:mm:ss") : undefined,
    }));
  }

  const columns: ColumnDef<Log>[] = [
    {
      accessorKey: "ip",
      header: () => (
        <Tooltip title="访客IP会因多种因素受到干扰，准确性难以保证，仅供参考">
          IP <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      ),
      cell: ({ row }) => <p className="text-center">{row.original.ip}</p>,
    },
    {
      accessorKey: "description",
      size: 80,
      header: "状态码",
      cell: ({ row }) => (
        <p className="text-center">{row.original.description}</p>
      ),
    },
    {
      accessorKey: "type",
      header: "类型",
      size: 80,
      cell: ({ row }) => (
        <p className="text-center">
          {LOG_NAME[row.original.type as ENUM_COMMON.LOG]}
        </p>
      ),
    },
    {
      accessorKey: "createTime",
      header: "时间",
      size: 100,
      cell: ({ row }) => (
        <p className="text-center py-2">
          {dateToTime(row.original.createTime)}
        </p>
      ),
    },
    {
      accessorKey: "id",
      header: () => (
        <Tooltip title="仅可删除访客日志">
          操作 <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      ),
      size: 45,
      cell: ({ row }) => {
        const disabled = row.original.type !== ENUM_COMMON.LOG.ACCESS;
        return (
          <Button
            variant="link"
            disabled={disabled}
            onClick={() => onDelete(row.original)}
            className={`block m-auto ${disabled ? "" : "text-red-500"}`}
          >
            删除
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Visits {...visits.data} />
      <Card
        spacing={4}
        title="访问日志"
        description="记录系统交互相关日志"
        className="mb-10"
      >
        <div className="flex">
          <Select
            items={LOG_ITEMS}
            value={query.type}
            placeholder="日志类型"
            onChange={onTypeChange}
          />
          <DateRangePicker onChange={onTimeChange} className="mx-3" />
          <LoadingButton
            loading={loading}
            icon={SyncOutlined}
            onClick={() => run()}
          />
        </div>
        <DataTable
          loading={loading}
          columns={columns}
          data={data?.list || []}
        />
        <PageTurning
          total={data?.total}
          current={query.current}
          pageSize={query.pageSize}
          onChange={onPageTurningChange}
        />
      </Card>
    </>
  );
};

export default Logs;
