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
import md5 from "md5";
import { z } from "zod";
import { toast } from "sonner";
import Card from "@/components/Card";
import { updatePwd } from "@/app/api";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const CHECK_PWD = z.string().regex(/^[a-zA-Z0-9_]{5,12}$/, {
  message: "支持5到12个字符，包括数字、字母和下划线",
});

const formSchema = z
  .object({
    password: CHECK_PWD,
    newPassword: CHECK_PWD,
    confirmPassword: CHECK_PWD,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "二次确认密码错误，请检查后重试",
    path: ["confirmPassword"],
  });

const Setting = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updatePwd({
      password: md5(values.password),
      newPassword: md5(values.newPassword),
    });
    toast.success("修改登陆密码成功");
  }

  const pwd = form.getValues("newPassword");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card spacing={4} title="管理员密码" description="修改您的登陆密码">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>旧密码</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="请输入旧密码"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>您正在使用的登陆密码</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>新密码</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="请输入新的登陆密码"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  支持5到12个字符，包括数字、字母和下划线
                </FormDescription>
              </FormItem>
            )}
          />

          {pwd ? (
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>确认新密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="请再次输入新的登陆密码"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>输入新密码进行二次确认</FormDescription>
                </FormItem>
              )}
            />
          ) : null}
          <Button type="submit" className="my-5">
            更新密码
          </Button>
        </Card>
      </form>
    </Form>
  );
};

export default Setting;
