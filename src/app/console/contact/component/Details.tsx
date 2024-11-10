import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { readMessage } from "@/app/api";
import { dateToTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { FieldTimeOutlined } from "@ant-design/icons";
import { CardDescription, CardTitle } from "@/components/ui/card";

import type { Msg } from "@prisma/client";

interface TypeContactDetailsProps {
  data?: Msg;
  onClose(): void;
}

/**
 * @name Details 留言详情
 */
const Details: React.FC<TypeContactDetailsProps> = ({ data, onClose }) => {
  useEffect(() => {
    if (!data?.id) return;
    const { id, read } = data;
    read || (id && readMessage({ id }));
  }, [data, data?.read]);

  return (
    <Dialog open={Boolean(data?.id)} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">留言消息</DialogTitle>
          <DialogDescription>
              <FieldTimeOutlined className="mr-1 mb-2 mt-1" />
              {dateToTime(data?.createTime)}
          </DialogDescription>
        </DialogHeader>

        <CardTitle className="select-none">访客名称</CardTitle>
        <CardDescription>{data?.name}</CardDescription>

        {data?.telephone ? (
          <>
            <CardTitle className="select-none">联系电话</CardTitle>
            <CardDescription>{data?.telephone}</CardDescription>
          </>
        ) : null}

        {data?.email ? (
          <>
            <CardTitle className="select-none">电子邮箱</CardTitle>
            <CardDescription>{data?.email}</CardDescription>
          </>
        ) : null}

        <CardTitle className="select-none">留言内容</CardTitle>
        <CardDescription>{data?.content}</CardDescription>

        <DialogFooter>
          <Button onClick={onClose}>关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Details;
