"use client";

import md5 from "md5";
import Image from "next/image";
import { useState } from "react";
import { useRequest } from "ahooks";
import styles from "./index.module.sass";
import { Button, Form, Input } from "antd";
import ICON_LOGIN from "@/assets/panda.svg";
import { existAdmin, login, register } from "@/app/api";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import type { TypeCommon } from "@/interface/common";
import { useRouter } from "next/navigation";

const RULES_DEFAULT = [
  { required: true, message: "This field must not be empty" },
  {
    min: 5,
    max: 12,
    message: "Minimum 5 bits, maximum 12 bits",
  },
  {
    pattern: /^[a-zA-Z0-9_-]{5,12}$/,
    message: "The field supports letters, numbers, underscore, minus sign",
  },
];

/**
 * @name Login 登陆
 */
const Login = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [form] = Form.useForm<TypeCommon.Login>();

  const { loading: existLoading, data: exist } = useRequest(existAdmin);

  async function onSubmit() {
    try {
      setLoading(true);
      const values = await form.validateFields();
      values.password = md5(values.password);
      !exist && (await register(values));
      await login(values);
      router.push("/console");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      name="website-login"
      className={styles.login}
    >
      <Image src={ICON_LOGIN} alt="#" width={60} priority />

      <Form.Item label="ACCOUNT" name="account" rules={RULES_DEFAULT}>
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder="USER ACCOUNT"
        />
      </Form.Item>
      <Form.Item label="PASSWORD" name="password" rules={RULES_DEFAULT}>
        <Input.Password
          allowClear
          onPressEnter={onSubmit}
          prefix={<LockOutlined />}
          placeholder="USER PASSWORD"
        />
      </Form.Item>
      <Button
        type="primary"
        loading={loading}
        onClick={onSubmit}
        disabled={existLoading}
      >
        {existLoading ? "LOADING" : exist ? "LOGIN" : "REGISTER ADMIN"}
      </Button>
    </Form>
  );
};

export default Login;
