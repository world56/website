import { useState } from "react";
import { insertPost } from "@/app/api";
import TextEditor from "@/components/TextEditor";
import { FileAddOutlined } from "@ant-design/icons";
import UploadImage from "@/components/Upload/Image";
import { Button, Form, Input, Modal, message } from "antd";

import type { TypeCommon } from "@/interface/common";
import { ENUM_COMMON } from "@/enum/common";

export interface TypeEditProps extends TypeCommon.PrimaryID {
  /** @param type 编辑帖子类型 */
  type: "open" | "share";
  /** @name onClose 关闭弹窗 */
  onClose(): void;
}

const TYPE_TO_ENUM = {
  open: ENUM_COMMON.POST_TYPE.OPEN,
  share: ENUM_COMMON.POST_TYPE.SHARE,
};

const RULES = [{ required: true, message: "该字段不得为空" }];

/**
 * @name Edit 编辑文章
 */
const Edit: React.FC<TypeEditProps> = ({ id, type, onClose }) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm<Parameters<typeof insertPost>[0]>();

  async function onSubmit() {
    const values = await form.validateFields();
    values.type = TYPE_TO_ENUM[type];
    await insertPost(values);
    message.success("操作成功");
    onModalStatusChange();
  }

  function onModalStatusChange() {
    const bol = !open;
    setOpen(bol);
    if (bol) {
    } else {
      form.resetFields();
      onClose();
    }
  }

  return (
    <>
      <Button onClick={onModalStatusChange} icon={<FileAddOutlined />}>
        新建
      </Button>
      <Modal
        centered
        open={open}
        width={1200}
        onOk={onSubmit}
        maskClosable={false}
        onCancel={onModalStatusChange}
        title={`${id ? "编辑" : "新增"}文本`}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="封面" name="icon" rules={RULES}>
            <UploadImage />
          </Form.Item>

          <Form.Item label="标题" name="title" rules={RULES}>
            <Input placeholder="请输入标题" allowClear maxLength={80} />
          </Form.Item>

          <Form.Item label="摘要" name="description">
            <Input.TextArea
              placeholder="请输入摘要"
              allowClear
              maxLength={100}
            />
          </Form.Item>

          <Form.Item name="content" label="内容" rules={RULES}>
            <TextEditor />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
