import { useState } from "react";
import { useRequest } from "ahooks";
import styles from "./edit.module.sass";
import TextEditor from "@/components/TextEditor";
import { FileAddOutlined } from "@ant-design/icons";
import UploadImage from "@/components/Upload/Image";
import { getPost, insertPost, updatePost } from "@/app/api";
import { Button, Drawer, Form, Input, Spin, message } from "antd";

import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "@/interface/common";

export interface TypeEditProps extends TypeCommon.PrimaryID {
  /** @param type 编辑帖子类型 */
  type: ENUM_COMMON.POST_TYPE;
  /** @name onClose 关闭弹窗 */
  onClose(): void;
}

const HEIGHT = window.innerHeight - 560;

const RULES = [{ required: true, message: "该字段不得为空" }];

/**
 * @name Edit 编辑文章
 */
const Edit: React.FC<TypeEditProps> = ({ id, type, onClose }) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm<Parameters<typeof insertPost>[0]>();

  const { loading } = useRequest(
    async () => {
      if (!id) return;
      setOpen(true);
      const data = await getPost({ id });
      form.setFieldsValue(data);
    },
    { refreshDeps: [id] },
  );

  async function onSubmit() {
    const values = await form.validateFields();
    values.id = id!;
    values.type = type;
    if (id) await updatePost(values);
    else await insertPost(values);
    message.success("操作成功");
    onModalStatusChange();
  }

  async function onModalStatusChange() {
    setOpen((b) => !b);
    if (open) {
      form.resetFields();
      onClose();
    }
  }

  return (
    <>
      <Button onClick={onModalStatusChange} icon={<FileAddOutlined />}>
        新建
      </Button>
      <Drawer
        open={open}
        width={1200}
        maskClosable={false}
        className={styles.layout}
        onClose={onModalStatusChange}
        title={`${id ? "编辑" : "新增"}文本`}
        footer={
          <>
            <Button onClick={onModalStatusChange}>返回</Button>
            <Button onClick={onSubmit} type="primary">
              保存
            </Button>
          </>
        }
      >
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" name="post">
            <Form.Item label="封面" name="icon" rules={RULES}>
              <UploadImage />
            </Form.Item>
            <Form.Item label="标题" name="title" rules={RULES}>
              <Input placeholder="请输入标题" allowClear maxLength={80} />
            </Form.Item>
            <Form.Item label="摘要" name="description">
              <Input.TextArea
                allowClear
                maxLength={100}
                placeholder="请输入摘要"
              />
            </Form.Item>
            <Form.Item name="content" label="内容" rules={RULES}>
              <TextEditor height={HEIGHT} />
            </Form.Item>
          </Form>
        </Spin>
      </Drawer>
    </>
  );
};

export default Edit;
