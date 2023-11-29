"use client";

import { insertMessage } from "@/app/api";
import styles from "./contact.module.sass";
import { Button, Form, Input, message } from "antd";

import type { Msg } from "@prisma/client";

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
      <Form
        form={form}
        name="message"
        layout="vertical"
        className={styles.contact}
      >
        <Form.Item
          name="name"
          label="您的尊称"
          rules={[{ required: true, message: "您的尊称不得为空" }]}
        >
          <Input placeholder="请输入您的您的尊称" allowClear />
        </Form.Item>
        <Form.Item
          label="您的电话"
          name="telephone"
          rules={[
            {
              message: "电话号码是纯数字",
              pattern: /^\d+$/,
            },
          ]}
        >
          <Input placeholder="请输入您的联系电话" allowClear />
        </Form.Item>
        <Form.Item
          label="您的邮箱"
          name="email"
          rules={[
            {
              message: "请输入正确的邮箱格式",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
          ]}
        >
          <Input placeholder="请输入您的电子邮箱" allowClear />
        </Form.Item>
        <Form.Item
          name="content"
          label="留言消息"
          rules={[{ required: true, message: "留言消息不得为空" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入留言消息" />
        </Form.Item>
        <Form.Item>
          <Button onClick={onSubmit} type="primary">
            提交留言
          </Button>
        </Form.Item>
      </Form>
  );
};

export default Contact;
