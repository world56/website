"use client";

import md5 from "md5";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.sass";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import ICON_SIGN_IN from "@/assets/panda.svg";
import { existAdmin, signIn, register } from "@/app/api";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import type { TypeCommon } from "@/interface/common";

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

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [form] = Form.useForm<TypeCommon.Sign>();

  async function onSubmit() {
    try {
      setLoading(true);
      const exist = await existAdmin();
      const values = await form.validateFields();
      values.password = md5(values.password);
      !exist && (await register(values));
      await signIn(values);
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
      name="website-sign"
      className={styles.signIn}
    >
      <Image src={ICON_SIGN_IN} alt="#" width={60} priority />

      <Form.Item label="ADMIN ACCOUNT" name="account" rules={RULES_DEFAULT}>
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
          visibilityToggle={false}
          prefix={<LockOutlined />}
          placeholder="ADMIN PASSWORD"
        />
      </Form.Item>
      <Button
        type="primary"
        loading={loading}
        onClick={onSubmit}
        disabled={loading}
      >
        SIGN IN
      </Button>
    </Form>
  );
};

export default SignIn;
