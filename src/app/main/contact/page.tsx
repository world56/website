"use client";
import styles from "./contact.module.sass";
import { Button, Form, Input } from "antd";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

const theme = {
  token: {
    colorPrimary: "#0f0f0f",
  },
};

/**
 * @name Contact 取得联系
 */
const Contact = () => {
  const [form] = Form.useForm();

  async function onSubmit() {
    const values = await form.validateFields();
    console.log(values);
  }

  return (
    <StyledComponentsRegistry theme={theme}>
      <Form form={form} layout="vertical" className={styles.contact}>
        <Form.Item label="您的尊称">
          <Input placeholder="请输入您的您的尊称" allowClear />
        </Form.Item>
        <Form.Item label="您的电话">
          <Input placeholder="请输入您的联系电话" allowClear />
        </Form.Item>
        <Form.Item label="您的邮箱">
          <Input placeholder="请输入您的电子邮箱" allowClear />
        </Form.Item>
        <Form.Item label="想告诉我的话">
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
