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
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const Password = () => {
  const t = useTranslations("password");

  const CHECK_PWD = z
    .string()
    .regex(/^[a-zA-Z0-9_]{5,12}$/, { message: t("newPwdDesc") });

  const formSchema = z
    .object({
      password: CHECK_PWD,
      newPassword: CHECK_PWD,
      confirmPassword: CHECK_PWD,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("confirmPwdError"),
      path: ["confirmPassword"],
    });

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
    toast.success(t("success"));
  }

  const pwd = form.getValues("newPassword");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card spacing={4} title={t("title")} description={t("description")}>
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("pwd")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t("pwdPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>{t("pwdDesc")}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("newPwd")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t("newPwdPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>{t("newPwdDesc")}</FormDescription>
              </FormItem>
            )}
          />

          {pwd ? (
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPwd")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t("confirmPwdPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>{t("confirmPwdDesc")}</FormDescription>
                </FormItem>
              )}
            />
          ) : null}
          <Button type="submit" className="my-5">
            {t("submit")}
          </Button>
        </Card>
      </form>
    </Form>
  );
};

export default Password;
