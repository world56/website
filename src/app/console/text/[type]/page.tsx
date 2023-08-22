"use client";

import { useState } from "react";
import Edit from "./component/Edit";
import styles from "./text.module.sass";
import { useParams } from "next/navigation";
import { Button, Card, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

const TITLE = {
  share: "分享列表",
  open: "开源项目列表",
};

const TextEditor = () => {
  const { type } = useParams();

  const [] = useState();

  function onClose() {}

  const columns: ColumnsType<{}> = [
    { dataIndex: "title", title: "标题", align: "center" },
    { dataIndex: "createTime", title: "创建时间", align: "center" },
    { dataIndex: "updateTime", title: "更新时间", align: "center" },
    {
      key: "id",
      title: "更新时间",
      align: "center",
      render: () => (
        <>
          <span className="btn">编辑</span>
          <span className="del">删除</span>
        </>
      ),
    },
  ];

  return (
    <Card title={TITLE[type as keyof typeof TITLE]}>
      <div className={styles.search}>
        <span>标题：</span>
        <Input placeholder="请输入标题" allowClear />
        <Button icon={<SearchOutlined />} type="primary">
          查询
        </Button>
        <Edit onClose={onClose} />
      </div>
      <Table columns={columns} size="middle" />
    </Card>
  );
};

export default TextEditor;
