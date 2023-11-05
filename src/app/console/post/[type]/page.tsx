"use client";

import { useState } from "react";
import { useRequest } from "ahooks";
import Edit from "./component/Edit";
import styles from "./post.module.sass";
import Status from "@/components/Status";
import { useParams } from "next/navigation";
import { dateToTime } from "@/utils/format";
import { SearchOutlined } from "@ant-design/icons";
import Switching from "@/components/Status/Switching";
import ConfirmButton from "@/components/ConfirmButton";
import { deletePost, getPosts, updatePostStatus } from "@/app/api";
import { Button, Card, Input, Table, Tooltip, message } from "antd";

import { ENUM_COMMON } from "@/enum/common";

import type { Post } from "@prisma/client";
import type { TableProps } from "antd/es/table";
import type { TypeCommon } from "@/interface/common";
import type { TypeEditProps } from "./component/Edit";

const POST_TYPE = {
  share: { TITLE: "分享列表", ENUM: ENUM_COMMON.POST_TYPE.SHARE },
  open: { TITLE: "开源项目列表", ENUM: ENUM_COMMON.POST_TYPE.OPEN },
};

type TypeTableProps = TableProps<Post>;

const TextEditor = () => {
  const { type } = useParams<Pick<TypeEditProps, "type">>();

  const [editId, setEditId] = useState<TypeCommon.PrimaryID["id"]>();
  const [query, setQuery] = useState<TypeCommon.QueryPosts>({
    current: 1,
    pageSize: 20,
    type: POST_TYPE[type].ENUM,
  });

  const { data, run, loading } = useRequest(
    (arg?: typeof query) => getPosts(arg || query),
    { debounceWait: 100 },
  );

  function onSearch() {
    const params = { ...query, current: 1 };
    setQuery(params);
    run(params);
  }

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery({ ...query, title: e.target.value });
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

  async function onStatus({ id }: Post, status: ENUM_COMMON.STATUS) {
    await updatePostStatus({ id, status });
    message.success("操作成功");
    run();
  }

  const onPageChange: TypeTableProps["onChange"] = (pagination) => {
    const { current = 1, pageSize = 15 } = pagination;
    const params = { ...query, current, pageSize };
    setQuery(params);
    run(params);
  };

  const columns: TypeTableProps["columns"] = [
    {
      dataIndex: "title",
      title: "标题",
      align: "center",
      ellipsis: { showTitle: false },
      render: (val: string) => <Tooltip title={val}>{val}</Tooltip>,
    },
    {
      dataIndex: "description",
      title: "摘要",
      align: "center",
      ellipsis: { showTitle: false },
      render: (val: string) => <Tooltip title={val}>{val}</Tooltip>,
    },
    {
      dataIndex: "status",
      title: "状态",
      align: "center",
      width: 100,
      render: (type: ENUM_COMMON.STATUS) => <Status status={type} />,
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
      align: "center",
      width: 180,
      render: dateToTime,
    },
    {
      key: "id",
      title: "操作",
      width: 130,
      align: "center",
      render: (row: Post) => (
        <>
          <Switching
            status={row.status}
            onClick={(status) => onStatus(row, status)}
          />
          <span onClick={() => onEdit(row)} className="btn">
            编辑
          </span>
          <ConfirmButton onClick={() => onDelete(row)}>删除</ConfirmButton>
        </>
      ),
    },
  ];

  return (
    <Card title={POST_TYPE[type].TITLE}>
      <div className={styles.search}>
        <span>标题：</span>
        <Input onChange={onTitleChange} placeholder="请输入标题" allowClear />
        <Button type="primary" onClick={onSearch} icon={<SearchOutlined />}>
          查询
        </Button>
        <Edit id={editId} type={type} onClose={onEdit} />
      </div>
      <Table
        rowKey="id"
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={data?.list}
        onChange={onPageChange}
        className={styles.table}
        pagination={{
          total: data?.total,
          showSizeChanger: true,
          showQuickJumper: true,
          current: query.current,
          pageSize: query.pageSize,
          pageSizeOptions: [20, 50, 80, 100],
        }}
      />
    </Card>
  );
};

export default TextEditor;
