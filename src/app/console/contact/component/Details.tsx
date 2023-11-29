import { useEffect } from "react";
import { Descriptions } from "antd";
import { readMessage } from "@/app/api";
import { dateToTime } from "@/utils/format";

import type { Msg } from "@prisma/client";
import type { DescriptionsItemType } from "antd/es/descriptions";

interface TypeContactDetailsProps {
  data: Msg;
}

const config: Pick<DescriptionsItemType, "span" | "labelStyle"> = {
  span: 3,
  labelStyle: {
    width: 130,
    fontWeight: "bold",
    textAlign: "center",
  },
};

/**
 * @name Details 留言详情
 */
const Details: React.FC<TypeContactDetailsProps> = ({ data }) => {
  useEffect(() => {
    const { id, read } = data;
    read || (id && readMessage({ id }));
  }, [data, data.read]);

  return (
    <Descriptions
      bordered
      items={[
        { label: "留言人", children: data.name, ...config },
        { label: "留言时间", children: dateToTime(data.createTime), ...config },
        { label: "联系电话", children: data.telephone || "-", ...config },
        { label: "电子邮箱", children: data.email || "-", ...config },
        { label: "留言", children: data.content, ...config },
      ]}
    />
  );
};

export default Details;
