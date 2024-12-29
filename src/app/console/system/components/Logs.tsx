"use client";

import { useState } from "react";
import { getLogs } from "@/app/api";
import { useRequest } from "ahooks";
import Card from "@/components/Card";
import { set, format } from "date-fns";
import Select from "@/components/Select";
import { dateToTime } from "@/lib/format";
import DataTable from "@/components/Table";
import Tooltip from "@/components/Tooltip";
import LoadingButton from "@/components/Button";
import PageTurning from "@/components/PageTurning";
import { DateRangePicker } from "@/components/DatePicker";
import { SyncOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import type { Log } from "@prisma/client";
import type { DateRange } from "react-day-picker";
import type { ColumnDef } from "@tanstack/react-table";

import { ENUM_COMMON } from "@/enum/common";

const LOG_ITEMS = [
  { value: ENUM_COMMON.LOG.LOGIN, label: "系统登陆" },
  { value: ENUM_COMMON.LOG.ACCESS, label: "访客访问" },
];

const LOG_NAME = {
  [ENUM_COMMON.LOG.LOGIN]: "系统登陆",
  [ENUM_COMMON.LOG.ACCESS]: "访客访问",
};

const Logs = () => {
  const [query, setQuery] = useState<Parameters<typeof getLogs>[number]>({
    current: 1,
    pageSize: 25,
  });

  const { data, loading, run } = useRequest(() => getLogs(query), {
    debounceWait: 100,
    refreshDeps: [query],
  });

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
      current: 1,
      startTime,
      endTime: endTime ? format(endTime, "yyyy-MM-dd HH:mm:ss") : undefined,
    }));
  }

  const columns: ColumnDef<Log>[] = [
    {
      accessorKey: "ipv6",
      header: () => (
        <Tooltip title="优先展示ipv4">
          IP <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      ),
      cell: ({ row }) => (
        <p className="text-center">{row.original.ipv4 || row.original.ipv6}</p>
      ),
    },
    {
      accessorKey: "description",
      size: 80,
      header: "描述",
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
  ];

  return (
    <Card
      spacing={4}
      title="访问日志"
      className="mb-3"
      description="记录系统登陆、访问日志"
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
      <DataTable loading={loading} columns={columns} data={data?.list || []} />
      <PageTurning
        total={data?.total}
        current={query.current}
        pageSize={query.pageSize}
        onChange={onPageTurningChange}
      />
    </Card>
  );
};

export default Logs;
