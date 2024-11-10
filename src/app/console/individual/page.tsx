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
import TxtEditor from "@/components/TextEditor";
import LoadingButton from "@/components/Button";
import TableEdit from "@/components/Table/TableEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBasicDetails, updateBasicDetails } from "@/app/api";

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
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "",
      name: "",
      items: [],
      skills: [],
      profile: "",
      position: "",
    },
  });

  const { loading } = useRequest(async () => {
    const data = await getBasicDetails();
    form.reset(data);
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
            保存个人设置
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default Console;
