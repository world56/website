"use client";

import { Card, Form } from "antd";
import TxtEditor from "@/components/TextEditor";
import EditLabel from "@/components/Form/EditLabel";
import CenterBtn from "@/components/Form/CenterBtn";

import ICON_NODE from "@/assets/node.svg";

/**
 * @name AboutMe 关于我
 */
const AboutMe = () => {
  const [form] = Form.useForm();

  async function onSubmit() {
    const values = await form.validateFields();
    console.log("@-values", values);
  }

  return (
    <>
      <Form form={form} layout="vertical">
        <Card title="个人简介">
          <Form.Item name="profile">
            <TxtEditor />
          </Form.Item>
        </Card>

        <Card title="技能简介">
          <EditLabel name="skills" initialValue={[]} />
        </Card>
      </Form>

      <CenterBtn type="primary" onClick={onSubmit}>
        保存
      </CenterBtn>
    </>
  );
};

export default AboutMe;
