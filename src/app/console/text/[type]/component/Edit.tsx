import { useState } from "react";
import TextEditor from "@/components/TextEditor";
import { Button, Form, Input, Drawer } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import UploadImage from "@/components/Upload/Image";

export interface TypeEditProps {
  /** @param id 编辑模式ID */
  id?: string;
  /** @name onClose 关闭弹窗 */
  onClose(): void;
}

/**
 * @name Edit 编辑文章
 */
const Edit: React.FC<TypeEditProps> = ({ id }) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  function onOpen() {
    setOpen((b) => !b);
  }

  return (
    <>
      <Button onClick={onOpen} icon={<FileAddOutlined />}>
        新建
      </Button>
      <Drawer
        open={open}
        width={1000}
        onClose={onOpen}
        title={`${id ? "编辑" : "新增"}文本`}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="封面">
            <UploadImage />
          </Form.Item>

          <Form.Item label="标题">
            <Input placeholder="请输入标题" allowClear />
          </Form.Item>

          <Form.Item name='content' label="内容">
            <TextEditor />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Edit;
