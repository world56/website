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
import { useTranslations } from "next-intl";
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

const Edit = () => {
  const t = useTranslations("postEdit");
  const tCommon = useTranslations("common");

  const formSchema = z.object({
    id: z.number().optional(),
    icon: z.string().min(1, { message: t("formIcon") }),
    content: z.string().min(1, { message: t("formContent") }),
    title: z.string().min(2, { message: t("formTitle") }),
    footer: z.string().max(30, { message: t("formFooter") }),
    description: z.string().max(100, { message: t("formDescription") }),
  });

  const [submitLoad, setSubmitLoad] = useState(false);

  const router = useRouter();

  const params = useParams<Record<"id" | "type", string>>();
  const id = Number(params?.id!);
  const type = params?.type!;

  const IS_ADD = id === -1;

  const form = useForm<TypeCommon.UpdatePost>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "",
      title: "",
      description: "",
      footer: t("footerDefaultContent"),
    },
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
      toast.success(tCommon("saveSuccess"));
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
        <Card onBack={onBack} title={`${IS_ADD ? t("insert") : t("update")}`}>
          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cover")}</FormLabel>
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
                <FormLabel>{t("title")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("titlePlaceholder")} {...field} />
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
                <FormLabel>{t("abstract")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("abstractPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>{t("abstractDesc")}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("textContent")}</FormLabel>
                <FormControl>
                  <TxtEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="footer"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("footer")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("footerPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>{t("footerDesc")}</FormDescription>
              </FormItem>
            )}
          />
        </Card>
        <div className="text-center">
          <LoadingButton loading={loading || submitLoad} type="submit">
            {tCommon("submit")}
          </LoadingButton>
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="ml-5 my-5 dark:bg-black"
          >
            {tCommon("back")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Edit;
