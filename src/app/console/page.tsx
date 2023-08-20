"use client";

import { Card, Form, Input } from "antd";
import CenterBtn from "@/components/Form/CenterBtn";
import EditLabel from "@/components/Form/EditLabel";

import ICON_GRPC from "@/assets/gRPC.svg";
import ICON_NODE from "@/assets/node.svg";
import ICON_PHONE from "@/assets/phone.svg";
import ICON_TWITTER from "@/assets/twitter.svg";

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
      <Card title="网站信息">
        <div style={{ padding: "24px 24px 12px 24px" }}>
          <Form.Item label="站点标题">
            <Input
              allowClear
              placeholder="清输入站点标题（例：周杰伦的个人主页）"
            />
          </Form.Item>
          <Form.Item label="站点备案号">
            <Input
              allowClear
              placeholder="清输入网站备案号（大陆站点必填，默认展示在页面底部并居中）"
            />
          </Form.Item>
        </div>
      </Card>

      <Card title="个人信息面板">
        <div style={{ padding: "24px 24px 0px 24px" }}>
          <Form.Item label="您的姓名" name="name">
            <Input allowClear placeholder="请输入您的姓名（例：周杰伦）" />
          </Form.Item>

          <Form.Item label="您的岗位" name="post">
            <Input
              allowClear
              placeholder="请输入您的岗位（例：前端开发工程师）"
            />
          </Form.Item>

          <h4>其他关键信息</h4>
        </div>

        <EditLabel
          name="skills"
          initialValue={[
            { icon: ICON_GRPC },
            { icon: ICON_NODE },
            { icon: ICON_PHONE },
            { icon: ICON_TWITTER },
          ]}
        />
      </Card>

      <CenterBtn onClick={onSubmit} type="primary">
        保存
      </CenterBtn>
    </Form>
  );
};

export default Console;
