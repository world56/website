"use client";

import {
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import DataTable from ".";
import { useMemo } from "react";
import { Button } from "../ui/button";
import Tooltip from "@/components/Tooltip";
import { Input } from "@/components/ui/input";
import Upload from "@/components/Upload/Image";
import { useFieldArray } from "react-hook-form";
import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import type { Tag } from "@prisma/client";
import type { UseFormReturn } from "react-hook-form";
import type { TypeCommon } from "@/interface/common";
import type { ColumnDef } from "@tanstack/react-table";

type TypeData = TypeCommon.BasisDTO;

interface TypeTableEditProps<T extends TypeData = TypeData> {
  name: "items" | "skills";
  form: UseFormReturn<T>;
}

function onBlur(e: React.FocusEvent<HTMLInputElement>) {
  e.stopPropagation();
  e.preventDefault();
  e.nativeEvent.stopImmediatePropagation();
}

const TableEdit: React.FC<TypeTableEditProps> = ({ name, form }) => {
  const { fields, move, remove, append } = useFieldArray({
    name,
    control: form.control,
  });

  function onInsert() {
    append({ icon: "", name: "", url: "", description: "" });
  }

  function onClickEvent(e?: React.MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
  }

  const columns: ColumnDef<Omit<Tag, "id" | "type" | "index">>[] = useMemo(
    () => [
      {
        accessorKey: "icon",
        header: () => (
          <Tooltip
            onClick={onClickEvent}
            title={
              <>
                <p>建议使用黑色svg图标，暗黑模式下，会自动转换为白色</p>
                <p>svg图标资源下载：iconfont.cn</p>
              </>
            }
          >
            图标 <QuestionCircleOutlined className="ml-1" />
          </Tooltip>
        ),
        size: 30,
        cell: ({ row }) => (
          <FormField
            name={`${name}.${row.index}.icon`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Upload {...field} size="small" className="m-auto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "名称",
        size: 100,
        cell: ({ row }) => (
          <FormField
            name={`${name}.${row.index}.name`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={onBlur}
                    onFocus={onBlur}
                    className="h-8"
                    placeholder="请输入标签名称"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "description",
        header: "描述",
        size: 100,
        cell: ({ row }) => (
          <FormField
            name={`${name}.${row.index}.description`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-8"
                    placeholder="请输入标签详情"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "url",
        header: () => (
          <Tooltip
            onClick={onClickEvent}
            title={
              <>
                <p> 配置外部链接后，点击元素可预览链接地址</p>
                <p>（注：需填写协议类型，例：https://github.com）</p>
              </>
            }
          >
            跳转链接 <QuestionCircleOutlined className="ml-1" />
          </Tooltip>
        ),
        size: 100,
        cell: ({ row }) => (
          <FormField
            name={`${name}.${row.index}.url`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-8"
                    placeholder="请输入链接地址"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "email",
        header: "操作",
        size: 50,
        cell: ({ row: { index } }) => (
          <div className="text-right">
            {index ? (
              <Button
                type="button"
                variant="link"
                className="p-0 mr-3"
                onClick={() => {
                  move(index, index - 1);
                }}
              >
                上移
              </Button>
            ) : null}
            {index + 1 === fields.length ? null : (
              <Button
                type="button"
                variant="link"
                className="p-0 mr-3"
                onClick={() => move(index, index + 1)}
              >
                下移
              </Button>
            )}
            <Button
              type="button"
              variant="link"
              onClick={() => remove(index)}
              className="p-0 mr-1 text-red-500"
            >
              删除
            </Button>
          </div>
        ),
      },
    ],
    [name, form, fields, remove, move],
  );

  return (
    <>
      <DataTable columns={columns} data={fields} />
      <Button type="button" variant="link" className="p-0" onClick={onInsert}>
        <PlusCircleOutlined /> 新增
      </Button>
    </>
  );
};

export default TableEdit;
