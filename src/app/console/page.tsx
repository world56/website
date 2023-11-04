"use client";

import { useRequest } from "ahooks";
import styles from "./console.module.sass";
import TxtEditor from "@/components/TextEditor";
import CenterBtn from "@/components/Form/CenterBtn";
import EditLabel from "@/components/Form/EditLabel";
import UploadImage from "@/components/Upload/Image";
import { getBasicDetails, updateBasicDetails } from "../api";
import { Button, Card, Form, Input, Spin, message } from "antd";

import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "@/interface/common";

/**
 * @name Console 控制台
 */
const Console = () => {
  const [form] = Form.useForm<TypeCommon.BasisDTO>();

  const { loading } = useRequest(async () => {
    const data = await getBasicDetails();
    form.setFieldsValue(data);
  });

  async function onSubmit() {
    const values = await form.validateFields();
    values.items.forEach((v, i) => {
      v.index = i;
      v.type = ENUM_COMMON.TAG.PERSONAL_PANEL;
    });
    values.skills.forEach((v, i) => {
      v.index = i;
      v.type = ENUM_COMMON.TAG.PERSONAL_SKILL;
    });
    await updateBasicDetails(values);
    message.success("保存成功");
  }

  /**
   * @name onInsertItem 新增 “技能”、“个人信息”
   */
  function onInsertItem(
    field: Extract<keyof TypeCommon.BasisDTO, "items" | "skills">,
  ) {
    const items = form.getFieldValue(field);
    items.push({});
    form.setFieldValue(field, items);
  }

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" className={styles.basic}>
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

          <h4 className={styles.personalItem}>
            <span>其他关键信息</span>
            <Form.Item shouldUpdate noStyle>
              {(form) => (
                <Button
                  type="link"
                  className={styles.addBtn}
                  onClick={() => onInsertItem("items")}
                  disabled={form.getFieldValue("items")?.length === 5}
                >
                  添加个人信息
                </Button>
              )}
            </Form.Item>
          </h4>

          <EditLabel name="items" initialValue={[]} />
        </Card>

        <Card title="个人简介">
          <Form.Item name="profile">
            <TxtEditor />
          </Form.Item>
        </Card>

        <Card
          title="技能简介"
          extra={
            <Button
              type="link"
              className={styles.addBtn}
              onClick={() => onInsertItem("skills")}
            >
              添加技能
            </Button>
          }
        >
          <EditLabel name="skills" initialValue={[]} />
        </Card>

        <CenterBtn onClick={onSubmit} type="primary">
          保存网站基本信息
        </CenterBtn>
      </Form>
    </Spin>
  );
};

export default Console;
