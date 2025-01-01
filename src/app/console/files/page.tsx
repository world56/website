"use client";

import Card from "@/components/Card";
import DataTable from "@/components/Table";
// import PageTurning from "@/components/PageTurning";

import type { ColumnDef } from "@tanstack/react-table";

const Files = () => {
  const columns: ColumnDef<{}>[] = [
    {
      accessorKey: "description",
      size: 80,
      header: "状态码",
    },
    {
      accessorKey: "type",
      header: "类型",
      size: 80,
    },
    {
      accessorKey: "createTime",
      header: "时间",
      size: 100,
      // cell: ({ row }) => (
      //   <p className="text-center py-2">
      //     {dateToTime(row.original.createTime)}
      //   </p>
      // ),
    },
  ];

  return (
    <Card title="资源管理" description="对静态资源状态进行查看">
      <DataTable columns={columns} data={[]} />
    </Card>
  );
};

export default Files;
