"use client";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { insertMessage } from "@/app/api";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/Button";
import { SendOutlined } from "@ant-design/icons";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z
    .string({ message: "您的尊称不得为空" })
    .min(2, { message: "您的尊称不得少于2位字符" }),
  telephone: z
    .string()
    .refine(
      (v) =>
        !v ||
        /^((\+?\d{1,4}[-\s]?)?\(?\d{2,4}\)?[-\s]?\d{7,8}|\+?\d{1,4}[-\s]?\d{10,12})$/.test(
          v,
        ),
      { message: "请输入有效的电话号码（区号用-隔开）" },
    ),
  email: z
    .string()
    .email({ message: "请输入有效的邮箱地址" })
    .or(z.literal(""))
    .optional(),
  content: z
    .string({ message: "留言不得为空 " })
    .min(5, { message: "您的留言不得少于5位字符" }),
});

function Contact() {
  const [load, setLoad] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", telephone: "", content: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoad(true);
      await insertMessage(values as Parameters<typeof insertMessage>[number]);
      form.reset();
      toast.message("提交成功", {
        description: "我会查看到您的留言消息，感谢您的留言",
      });
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>您的尊称</FormLabel>
              <FormControl>
                <Input placeholder="请输入您的尊称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="telephone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>您的电话</FormLabel>
              <FormControl>
                <Input placeholder="请输入您的联系电话（选填）" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>您的邮箱</FormLabel>
              <FormControl>
                <Input placeholder="请输入您的电子邮箱（选填）" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>留言</FormLabel>
              <FormControl>
                <Textarea placeholder="请输入您想说的话" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={load} icon={SendOutlined} type="submit">
          提交留言
        </LoadingButton>
      </form>
    </Form>
  );
}

export default Contact;
