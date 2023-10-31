"use client";

import { useState } from "react";
import { useRequest } from "ahooks";
import Edit from "./component/Edit";
import { deletePost, getPosts } from "@/app/api";
import styles from "./text.module.sass";
import { useParams } from "next/navigation";
import { dateToTime } from "@/utils/format";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Popconfirm, Table, message } from "antd";

import type { Post } from "@prisma/client";
import type { ColumnsType } from "antd/es/table";
import type { TypeCommon } from "@/interface/common";
import type { TypeEditProps } from "./component/Edit";

const TITLE = {
  share: "分享列表",
  open: "开源项目列表",
};

const TextEditor = () => {
  const { type } = useParams<Pick<TypeEditProps, "type">>();

  const [editId, setEditId] = useState<TypeCommon.PrimaryID["id"]>();
  const [query, setQuery] = useState<TypeCommon.PageTurning>({
    pageSize: 15,
    currentPage: 1,
  });

  const { data, run, loading } = useRequest(() => getPosts(query), {
    debounceWait: 10,
    refreshDeps: [query],
  });

  function onPageChange(a: any, b: any) {
    console.log("@-a", a, b);
  }

  function onEdit(row?: Post) {
    setEditId(row?.id);
    row?.id || run();
  }

  async function onDelete(row: Post) {
    await deletePost({ id: row.id });
    message.success("删除成功");
    run();
  }

  const columns: ColumnsType<Post> = [
    { dataIndex: "title", title: "标题", align: "center" },
    {
      dataIndex: "updateTime",
      title: "更新时间",
      align: "center",
      render: dateToTime,
    },
    {
      key: "id",
      title: "更新时间",
      align: "center",
      render: (row: Post) => (
        <>
          <span onClick={() => onEdit(row)} className="btn">
            编辑
          </span>
          <Popconfirm
            title="警告"
            description="删除后无法恢复！"
            onConfirm={() => onDelete(row)}
          >
            <span className="del">删除</span>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card title={TITLE[type as keyof typeof TITLE]}>
      <div className={styles.search}>
        <span>标题：</span>
        <Input placeholder="请输入标题" allowClear />
        <Button onClick={run} icon={<SearchOutlined />} type="primary">
          查询
        </Button>
        <Edit type={type} onClose={onEdit} />
      </div>
      <Table
        size="middle"
        loading={loading}
        columns={columns}
        pagination={query}
        dataSource={data?.list}
        onChange={onPageChange}
      />
    </Card>
  );
};

export default TextEditor;
