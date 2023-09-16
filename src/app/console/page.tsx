"use client";

import styles from "./console.module.sass";
import { Button, Card, Form, Input } from "antd";
import CenterBtn from "@/components/Form/CenterBtn";
import EditLabel from "@/components/Form/EditLabel";
import UploadImage from "@/components/Upload/Image";

/**
 * @name Console 控制台
 */
const Console = () => {
  const [form] = Form.useForm();

  async function onSubmit() {
    const values = await form.validateFields();
    fetch("/api/basic", { body: JSON.stringify(values), method: "POST" });
    console.log("@-values", values);
  }

  /**
   * @name onInsertItem 新增"信息项"
   * @description 最多5个，也最为合适
   */
  function onInsertItem() {
    const items = form.getFieldValue("items");
    items.push({});
    form.setFieldValue("items", items);
  }

  return (
    <Form form={form} layout="vertical" className={styles.basic}>
      <Card title="网站信息">
        <div style={{ padding: "24px 24px 12px 24px" }}>
          <Form.Item name="title" label="站点标题">
            <Input
              allowClear
              placeholder="清输入站点标题（例：周杰伦的个人主页）"
            />
          </Form.Item>
          <Form.Item name="forTheRecord" label="站点备案号">
            <Input
              allowClear
              placeholder="清输入网站备案号（大陆站点必填，默认展示在页面底部并居中）"
            />
          </Form.Item>
        </div>
      </Card>

      <Card title="个人信息面板">
        <div style={{ padding: "24px 24px 0px 24px" }}>
          <Form.Item label="头像" name="icon">
            <UploadImage radius="50%" />
          </Form.Item>

          <Form.Item label="您的姓名" name="name">
            <Input allowClear placeholder="请输入您的姓名（例：周杰伦）" />
          </Form.Item>

          <Form.Item label="您的岗位" name="position">
            <Input
              allowClear
              placeholder="请输入您的岗位（例：前端开发工程师）"
            />
          </Form.Item>
        </div>

        <h4 style={{ padding: "0 24px" }}>
          <span>其他关键信息</span>
          <Form.Item shouldUpdate noStyle>
            {(form) => (
              <Button
                type="link"
                onClick={onInsertItem}
                disabled={form.getFieldValue("items")?.length === 5}
              >
                添加
              </Button>
            )}
          </Form.Item>
        </h4>

        <EditLabel name="items" initialValue={[{ icon: "" }]} />
      </Card>

      <CenterBtn onClick={onSubmit} type="primary">
        保存
      </CenterBtn>
    </Form>
  );
};

export default Console;
