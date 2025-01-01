"use client";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useRequest } from "ahooks";
import Card from "@/components/Card";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Upload from "@/components/Upload/Image";
import LoadingButton from "@/components/Button";
import TxtEditor from "@/components/TextEditor";
import TableEdit from "@/components/Table/TableEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBasicDetails, updateBasicDetails } from "../api";

import type { TypeCommon } from "@/interface/common";

const TAG__SCHEMA = z.array(
  z.object({
    id: z.string().optional(),
    type: z.number().optional(),
    index: z.number().optional(),
    icon: z.string().min(1, { message: "图标必传" }),
    name: z.string().min(1, { message: "名称不得为空" }),
    description: z.string().min(1, { message: "描述不得为空" }),
    url: z.string().refine((v) => !v || /^(https?:\/\/)/i.test(v), {
      message: "链接地址必须携带协议（http、https）",
    }),
  }),
);

const formSchema = z.object({
  title: z.string().min(2, {
    message: "站点标题至少2位字符，且不得为空",
  }),
  favicon: z.string(),
  description: z.string(),
  forTheRecord: z.string(),
  icon: z.string(),
  name: z.string().min(2, { message: "姓名至少2位字符，且不得为空" }),
  position: z
    .string()
    .min(2, { message: "岗位、专业名称至少2位字符，且不得为空" }),
  profile: z.string(),
  items: TAG__SCHEMA,
  skills: TAG__SCHEMA,
});

/**
 * @name Console 控制台
 */
const Console = () => {
  const [submitLoad, setSubmitLoad] = useState(false);

  const form = useForm<TypeCommon.BasisDTO>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      favicon: "",
      description: "",
      forTheRecord: "",
      icon: "",
      name: "",
      items: [],
      skills: [],
      profile: "",
      position: "",
    },
  });

  const { loading } = useRequest(async () => {
    const res = await getBasicDetails();
    form.reset(res);
  });

  async function onSubmit(values: TypeCommon.BasisDTO) {
    try {
      setSubmitLoad(true);
      await updateBasicDetails(values);
      toast.success("保存成功", { description: "用户刷新页面生效" });
      setSubmitLoad(false);
    } catch (error) {
      setSubmitLoad(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          title="站点信息"
          className="mb-3"
          loading={loading}
          description="设置站点基本信息，提升SEO效率"
        >
          <FormField
            name="favicon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>站点图标</FormLabel>
                <FormControl>
                  <Upload {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  浏览器标签显示的站点图标，支持ico、png、svg等常用格式
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>站点标题</FormLabel>
                <FormControl>
                  <Input placeholder="请输入站点标题" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>浏览器标签显示的站点名称</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>站点描述</FormLabel>
                <FormControl>
                  <Input placeholder="请输入站点描述" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  搜索引擎会读取该信息，并将其用作搜索结果中的摘要
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="forTheRecord"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>站点备案号</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入网站备案号" />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  根据中国大陆法规，域名备案号必须展示在页面底部（填写保存后显示）
                </FormDescription>
              </FormItem>
            )}
          />
        </Card>

        <Card
          title="个人信息"
          className="mb-3"
          loading={loading}
          description="主页左侧个人信息栏，可配置头像、姓名、岗位、自定义个人标签内容"
        >
          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>头像</FormLabel>
                <FormControl>
                  <Upload {...field} size="large" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="position"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>岗位</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的岗位、专业" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  例如，前端开发工程、数据开发工程师
                </FormDescription>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>个人标签</FormLabel>
            <FormControl>
              <TableEdit name="items" form={form} />
            </FormControl>
          </FormItem>
        </Card>
        <Card
          title="个人简介"
          className="mb-3"
          loading={loading}
          description="更详细地介绍自己的经历、爱好和想法，以便他人能更快了解你的性格"
        >
          <FormField
            name="profile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TxtEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <Card
          title="专业技能"
          loading={loading}
          description="罗列出自己专业范围内的具体技能、证书，帮助他人快速了解你的专业能力"
        >
          <FormItem>
            <FormControl>
              <TableEdit name="skills" form={form} />
            </FormControl>
          </FormItem>
        </Card>

        <div className="text-center">
          <LoadingButton
            type="submit"
            className="my-5"
            loading={loading || submitLoad}
          >
            保存设置
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default Console;
