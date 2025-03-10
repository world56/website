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
import TableEdit from "@/components/Table/TableEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBasicDetails, updateBasicDetails } from "../api";

import type { TypeCommon } from "@/interface/common";

/**
 * @name Console 控制台
 */
const Console = () => {
  const tSite = useTranslations("site");
  const tSkill = useTranslations("skill");
  const tCommon = useTranslations("common");
  const tPersonal = useTranslations("personal");
  const tForm = useTranslations("basicFormHint");
  const tIntroduction = useTranslations("introduction");

  const TAG__SCHEMA = z.array(
    z.object({
      id: z.string().optional(),
      type: z.number().optional(),
      index: z.number().optional(),
      icon: z.string().min(1, { message: tForm("icon") }),
      name: z.string().min(1, { message: tForm("name") }),
      description: z.string().min(1, { message: tForm("description") }),
      url: z.string().refine((v) => !v || /^(https?:\/\/)/i.test(v), {
        message: tForm("url"),
      }),
    }),
  );

  const [submitLoad, setSubmitLoad] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2, { message: tForm("siteTitle") }),
    favicon: z.string(),
    description: z.string(),
    forTheRecord: z.string(),
    icon: z.string(),
    name: z.string().min(2, { message: tForm("fullName") }),
    position: z.string().min(2, { message: tForm("position") }),
    profile: z.string(),
    items: TAG__SCHEMA,
    skills: TAG__SCHEMA,
  });

  const form = useForm<TypeCommon.BasisDTO>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      favicon: "",
      description: "",
      forTheRecord: "",
      icon: "",
      name: "",
      items: [],
      skills: [],
      profile: "",
      position: "",
    },
  });

  const { loading } = useRequest(async () => {
    const res = await getBasicDetails();
    form.reset(res);
  });

  async function onSubmit(values: TypeCommon.BasisDTO) {
    try {
      setSubmitLoad(true);
      await updateBasicDetails(values);
      toast.success(tCommon("saveSuccess"), {
        description: tCommon("saveSuccessContent"),
      });
      setSubmitLoad(false);
    } catch (error) {
      setSubmitLoad(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          className="mb-3"
          loading={loading}
          title={tSite("title")}
          description={tSite("description")}
        >
          <FormField
            name="favicon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tSite("icon")}</FormLabel>
                <FormControl>
                  <Upload {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>{tSite("iconDesc")}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tSite("siteTitle")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={tSite("siteTitlePlaceholder")}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>{tSite("siteTitleDesc")}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tSite("desc")}</FormLabel>
                <FormControl>
                  <Input placeholder={tSite("descPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>{tSite("descDesc")}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="forTheRecord"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tSite("recorded")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={tSite("recordedPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>{tSite("recordedDesc")}</FormDescription>
              </FormItem>
            )}
          />
        </Card>

        <Card
          className="mb-3"
          loading={loading}
          title={tPersonal("title")}
          description={tPersonal("description")}
        >
          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tPersonal("avatar")}</FormLabel>
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
                <FormLabel>{tPersonal("name")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={tPersonal("namePlaceholder")}
                  />
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
                <FormLabel>{tPersonal("position")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={tPersonal("positionPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>{tPersonal("positionDesc")}</FormDescription>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>{tPersonal("tag")}</FormLabel>
            <FormControl>
              <TableEdit name="items" form={form} />
            </FormControl>
          </FormItem>
        </Card>
        <Card
          className="mb-3"
          loading={loading}
          title={tIntroduction("title")}
          description={tIntroduction("description")}
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
          loading={loading}
          title={tSkill("title")}
          description={tSkill("description")}
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
            {tCommon("submit")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default Console;
