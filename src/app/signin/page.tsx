"use client";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import md5 from "md5";
import { z } from "zod";
import { useState } from "react";
import { useRequest } from "ahooks";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { existAdmin, signIn, register } from "@/app/api";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const formSchema = z.object({
  account: z.string().regex(/^[a-zA-Z0-9_]{5,12}$/, {
    message:
      "Supports 5 to 12 characters, including numbers, letters, and underscores.",
  }),
  password: z.string().regex(/^[a-zA-Z0-9_]{5,12}$/, {
    message:
      "Supports 5 to 12 characters, including numbers, letters, and underscores.",
  }),
});

const SignIn = () => {
  const router = useRouter();
  const params = useSearchParams();
  const t = useTranslations("signin");

  const [loading, setLoading] = useState(false);

  const { data, loading: adminLoad } = useRequest(existAdmin);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { account: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const exist = await existAdmin();
      values.password = md5(values.password);
      !exist && (await register(values));
      await signIn(values);
      const IS_KEEP_ALIVE = params?.get("K") === "1";
      IS_KEEP_ALIVE ? window.close() : router.push("/console");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  function toMainPage(e: React.MouseEvent<HTMLButtonElement>) {
    router.push("/");
  }

  return (
    <Card className="w-[400px] mx-auto absolute left-[50%] top-[50%] ml-[-200px] mt-[-198px]">
      <CardHeader className="pt-[25px] pb-[5px] select-none">
        <h1 className="text-4xl mt-3 font-bold text-center">Welcome</h1>
        <p className="!my-5 text-sm text-gray-400 text-center">
          {data === false ? t("init") : t("login")}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="account"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("account")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t("password")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <LoadingButton
                type="submit"
                className="w-full"
                loading={loading || adminLoad}
              >
                {loading || adminLoad
                  ? t("loading")
                  : data
                  ? t("signin")
                  : t("register")}
              </LoadingButton>

              <Button
                type="button"
                variant="outline"
                onClick={toMainPage}
                className="w-full mt-5"
              >
                {t("back")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
