"use client";

import { Card, Table } from "antd";

import type { ColumnsType } from "antd/es/table";

/**
 * @name Contact 联系留言板
 */
const Contact = () => {
  const columns: ColumnsType<{}> = [
    { dataIndex: "content", title: "简讯", align: "center" },
    { dataIndex: "createTime", title: "时间", align: "center" },
    {
      key: "id",
      title: "操作",
      align: "center",
      render: () => <span className="del">删除</span>,
    },
  ];

  return (
    <Card title="联系面板">
      <Table columns={columns} size="middle" />
    </Card>
  );
};

export default Contact;
