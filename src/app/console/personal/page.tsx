'use client'

import { Form, Input } from "antd";
import Item from './components/Item';

const Personal = () => {

  const [form] = Form.useForm();

  return (
    <Form layout='vertical' form={form}>
      <Form.Item label="姓名" name='name'>
        <Input allowClear placeholder="请输入您的姓名（例：周杰伦）" />
      </Form.Item>

      <Form.Item label="岗位名称" name='post'>
        <Input allowClear placeholder="请输入您的岗位（例：前端开发工程师）" />
      </Form.Item>

      <h4>展示项</h4>

      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>

    </Form>
  );
};

export default Personal;
