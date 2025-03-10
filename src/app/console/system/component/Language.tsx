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
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { z } from "zod";
import { toast } from "sonner";
import { useRequest } from "ahooks";
import Card from "@/components/Card";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLanguage, updateLanguage } from "@/app/api";

const Language = () => {
  const t = useTranslations("language");

  const formSchema = z.object({
    language: z.string().min(1),
  });

  const { loading } = useRequest(async () => {
    const language = await getLanguage();
    form.reset({ language });
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: { language: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateLanguage(values);
      toast.success(t("success"));
      setTimeout(() => location.reload(), 1000);
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
        <Card
          spacing={4}
          loading={loading}
          title={t("title")}
          description={t("description")}
        >
          <FormField
            name="language"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("language")}</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="zh-Hans">简体中文</SelectItem>
                      <SelectItem value="zh-Hant">繁體中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      {/* <SelectItem value="ko">한국어</SelectItem> */}
                      {/* <SelectItem value="ja">日本語</SelectItem> */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                <FormDescription>{t("desc")}</FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className="my-5">
            {t("submit")}
          </Button>
        </Card>
      </form>
    </Form>
  );
};

export default Language;
