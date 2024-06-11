"use client";

import { useState } from "react";
import { useRequest } from "ahooks";
import Details from "./component/Details";
import styles from "./contact.module.sass";
import { dateToTime } from "@/utils/format";
import { SyncOutlined } from "@ant-design/icons";
import { deleteMessage, getMessages } from "@/app/api";
import ConfirmButton from "@/components/ConfirmButton";
import { Button, Card, Select, Table, message, DatePicker } from "antd";

import type { Dayjs } from "dayjs";
import type { Msg } from "@prisma/client";
import type { TableProps } from "antd/es/table";
import type { BaseRangePickerProps } from "rc-picker/lib/PickerInput/RangePicker";

type TypeTableProps = TableProps<Msg>;

/**
 * @name Contact 联系留言板
 */
const Contact = () => {
  const [query, setQuery] = useState<Parameters<typeof getMessages>[0]>({
    current: 1,
    pageSize: 20,
  });

  const { data, loading, run } = useRequest(
    (params?: typeof query) => getMessages(params || query),
    { debounceWait: 100, refreshDeps: [query] },
  );

  async function onDelete(row: Msg) {
    await deleteMessage({ id: row.id });
    message.success("删除成功");
    run(query);
  }

  const onTimeChange: BaseRangePickerProps<Dayjs>["onChange"] = (time) => {
    setQuery((s) => ({
      ...s,
      current: 1,
      endTime: time?.[1]?.format("YYYY-MM-DD HH:mm:ss"),
      startTime: time?.[0]?.format("YYYY-MM-DD HH:mm:ss"),
    }));
  };

  function onStatusChange(read: boolean) {
    setQuery((s) => ({ ...s, current: 1, read }));
  }

  const onPageChange: TypeTableProps["onChange"] = (pagination) => {
    const { current = 1, pageSize = 15 } = pagination;
    const params = { ...query, current, pageSize };
    setQuery(params);
  };

  const columns: TypeTableProps["columns"] = [
    {
      dataIndex: "name",
      title: "留言人",
      align: "center",
      ellipsis: { showTitle: false },
    },
    {
      dataIndex: "content",
      title: "留言信息",
      align: "center",
      ellipsis: { showTitle: false },
    },
    {
      dataIndex: "read",
      title: "状态",
      width: 100,
      align: "center",
      render: (read: boolean) => (
        <span style={{ color: read ? "#34C7A6" : "#FE695A" }}>
          {read ? "已读" : "未读"}
        </span>
      ),
    },
    {
      dataIndex: "createTime",
      title: "时间",
      width: 180,
      align: "center",
      render: dateToTime,
    },
    {
      key: "id",
      title: "操作",
      width: 100,
      align: "center",
      render: (row: Msg) => (
        <ConfirmButton onClick={() => onDelete(row)}>删除</ConfirmButton>
      ),
    },
  ];

  return (
    <Card
      title="联系面板"
      className={styles.layout}
      extra={
        <>
          <DatePicker.RangePicker onChange={onTimeChange} showTime />
          <Select
            allowClear
            placeholder="消息状态"
            onChange={onStatusChange}
            options={[
              { value: true, label: "已读" },
              { value: false, label: "未读" },
            ]}
          />
          <Button
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={() => run()}
            icon={<SyncOutlined spin={loading} />}
          >
            刷新
          </Button>
        </>
      }
    >
      <Table
        rowKey="id"
        size="middle"
        loading={loading}
        columns={columns}
        onChange={onPageChange}
        dataSource={data?.list}
        pagination={{
          ...query,
          total: data?.total,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [20, 50, 80, 100],
        }}
        expandable={{ expandedRowRender: (row) => <Details data={row} /> }}
      />
    </Card>
  );
};

export default Contact;
