"use client";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import md5 from "md5";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { useRequest } from "ahooks";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ICON_SIGN_IN from "@/assets/panda.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { existAdmin, signIn, register } from "@/app/api";
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
      router.push("/console");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  function toMainPage(e: React.MouseEvent<HTMLButtonElement>) {
    router.push("/");
  }

  return (
    <Card className="w-[400px] mx-auto absolute left-[50%] top-[50%] ml-[-200px] mt-[-176px]">
      <CardHeader className="pt-[25px] pb-[5px]">
        <Image
          alt="#"
          priority
          width={60}
          src={ICON_SIGN_IN}
          className="mx-auto"
        />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="account"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ACCOUNT</FormLabel>
                  <FormControl>
                    <Input placeholder="PLEASE ENTER" {...field} />
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
                  <FormLabel>PASSWORD</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="PLEASE ENTER"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button onClick={toMainPage} type="button" variant="outline">
                RETURN
              </Button>
              <LoadingButton loading={loading || adminLoad} type="submit">
                SIGN {data ? "IN" : "UP"}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
