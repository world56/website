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
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/Button";
import { SendOutlined } from "@ant-design/icons";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

function Contact() {
  const t = useTranslations("message");

  const [load, setLoad] = useState(false);

  const formSchema = z.object({
    name: z
      .string({ message: t("formNameNotEmpty") })
      .min(2, { message: t("formNameTooShort") }),
    telephone: z
      .string()
      .refine(
        (v) =>
          !v ||
          /^((\+?\d{1,4}[-\s]?)?\(?\d{2,4}\)?[-\s]?\d{7,8}|\+?\d{1,4}[-\s]?\d{10,12})$/.test(
            v,
          ),
        { message: t("formPhone") },
      ),
    email: z
      .string()
      .email({ message: t("formEmail") })
      .or(z.literal(""))
      .optional(),
    content: z
      .string({ message: t("formMessage") })
      .min(5, { message: t("formMessageTooShort") }),
  });

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
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("namePlaceholder")} {...field} />
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
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phonePlaceholder")} {...field} />
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
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("emailPlaceholder")} {...field} />
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
              <FormLabel>{t("message")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("messagePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={load} icon={SendOutlined} type="submit">
          {t("submit")}
        </LoadingButton>
      </form>
    </Form>
  );
}

export default Contact;
