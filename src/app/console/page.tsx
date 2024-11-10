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
import { zodResolver } from "@hookform/resolvers/zod";
import { getBasicDetails, updateBasicDetails } from "../api";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "站点标题至少2位字符，且不得为空",
  }),
  favicon: z.string(),
  description: z.string(),
  forTheRecord: z.string(),
});

/**
 * @name Console 控制台
 */
const Console = () => {
  const [submitLoad, setSubmitLoad] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      favicon: "",
      description: "",
      forTheRecord: "",
    },
  });

  const { loading } = useRequest(async () => {
    const res = await getBasicDetails();
    const { title, favicon, description, forTheRecord } = res;
    form.reset({ title, favicon, description, forTheRecord });
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
          description="设置站点基本信息，提升SEO效率"
          loading={loading}
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
                  根据中国大陆法规，域名备案号必须展示在页面底部（填写保存后生效）
                </FormDescription>
              </FormItem>
            )}
          />
        </Card>

        <div className="text-center">
          <LoadingButton
            type="submit"
            className="my-5"
            loading={loading || submitLoad}
          >
            保存网站设置
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default Console;
