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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { getPost, insertPost, updatePost } from "@/app/api";

import type { TypeCommon } from "@/interface/common";

const formSchema = z.object({
  id: z.number().optional(),
  icon: z.string().min(1, { message: "封面图不能为空" }),
  content: z.string().min(1, { message: "文本内容不能为空" }),
  title: z.string().min(2, { message: "姓名至少2位字符，且不得为空" }),
  description: z.string().max(100, { message: "摘要最多支持100个字符" }),
});

const Edit = () => {
  const [submitLoad, setSubmitLoad] = useState(false);

  const router = useRouter();

  const params = useParams<Record<"id" | "type", string>>();
  const id = Number(params?.id!);
  const type = params?.type!;

  const IS_ADD = id === -1;

  const form = useForm<TypeCommon.UpdatePost>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", icon: "", description: "" },
  });

  const { loading } = useRequest(
    async () => {
      if (IS_ADD) return;
      const data = await getPost({ id });
      form.reset({
        id: data.id,
        icon: data.icon,
        title: data.title,
        content: data.content,
        description: data.description!,
      });
    },
    { refreshDeps: [id] },
  );

  async function onSubmit(values: TypeCommon.UpdatePost) {
    try {
      setSubmitLoad(true);
      values.type = type;
      if (IS_ADD) await insertPost(values);
      else await updatePost(values);
      setSubmitLoad(false);
      toast.success("保存成功");
      onBack();
    } catch (error) {
      setSubmitLoad(false);
    }
  }

  function onBack() {
    router.back();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card title={`${IS_ADD ? "新增" : "编辑"}内容`} onBack={onBack}>
          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容封面</FormLabel>
                <FormControl>
                  <Upload radius={false} {...field} size="large" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容标题</FormLabel>
                <FormControl>
                  <Input placeholder="请输入内容标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>文本摘要</FormLabel>
                <FormControl>
                  <Textarea placeholder="请输入内容摘要" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  搜索引擎会读取该信息，并将其用作搜索结果中的摘要
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>文本内容</FormLabel>
                <FormControl>
                  <TxtEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <div className="text-center">
          <LoadingButton loading={loading || submitLoad} type="submit">
            保存内容
          </LoadingButton>
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="ml-5 my-5"
          >
            返回上页
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Edit;
