"use client";

import { insertMessage } from "@/app/api";
import styles from "./contact.module.sass";
import { Button, Form, Input, message } from "antd";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

import type { Msg } from "@prisma/client";

const theme = {
  token: {
    colorPrimary: "#0f0f0f",
  },
};

/**
 * @name Contact 取得联系
 */
const Contact = () => {
  const [form] = Form.useForm<Msg>();

  async function onSubmit() {
    const values = await form.validateFields();
    await insertMessage(values);
    message.success("留言提交成功，感谢您的留言！");
    form.resetFields();
  }

  return (
    <StyledComponentsRegistry theme={theme}>
      <Form
        form={form}
        name="message"
        layout="vertical"
        className={styles.contact}
      >
        <Form.Item label="您的尊称" name="name">
          <Input placeholder="请输入您的您的尊称" allowClear />
        </Form.Item>
        <Form.Item label="您的电话" name="telephone">
          <Input placeholder="请输入您的联系电话" allowClear />
        </Form.Item>
        <Form.Item label="您的邮箱" name="email">
          <Input placeholder="请输入您的电子邮箱" allowClear />
        </Form.Item>
        <Form.Item label="想告诉我的话" name="content">
          <Input.TextArea rows={4} placeholder="请输入想告诉我的话" />
        </Form.Item>
        <Form.Item>
          <Button onClick={onSubmit} type="primary">
            提交留言
          </Button>
        </Form.Item>
      </Form>
    </StyledComponentsRegistry>
  );
};

export default Contact;
