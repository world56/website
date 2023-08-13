"use client";

import { Button, Form, Input, Select } from "antd";

/**
 * @name Console 控制台
 */
const Console = () => {
  const [form] = Form.useForm();

  async function onSubmit() {
    const values = await form.validateFields();
    console.log("@-values", values);
  }

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="站点标题">
        <Input
          allowClear
          placeholder="清输入站点标题（例：周杰伦的个人主页）"
        />
      </Form.Item>
      <Form.Item label="站点备案号">
        <Input
          allowClear
          placeholder="清输入主页备案号（大陆站点必填，默认展示在页面底部并居中）"
        />
      </Form.Item>
      <Button onClick={onSubmit} type="primary">
        保存设置
      </Button>
    </Form>
  );
};

export default Console;
