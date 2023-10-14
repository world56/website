import styles from "./index.module.sass";
import UploadImage from "../Upload/Image";
import { Form, Input, Popconfirm, Table, message } from "antd";

import type {
  RuleObject,
  FormListProps,
  FormItemProps,
  FormListFieldData,
  FormListOperation,
} from "antd/es/form";
import type { ColumnsType } from "antd/es/table";
import type { FormInstance } from "rc-field-form/lib/interface";
import type { InternalFieldProps } from "rc-field-form/lib/Field";

/**
 * @name validator 列表不得为空
 */
export function validator(rule: RuleObject, value: []) {
  const length = !value?.length;
  length && message.warning("表不得为空");
  return length ? Promise.reject() : Promise.resolve();
}

interface TypeEditLabelProps
  extends Omit<FormListProps, "children" | "name">,
    Pick<FormItemProps, "label"> {
  /** @param link 是否显示跳转链接输入框 */
  link?: boolean;
  /** @param name lis字符的key */
  name: string;
}

/**
 * @name EditLabel 编辑标签
 */
const EditLabel: React.FC<TypeEditLabelProps> = ({
  link,
  name,
  label,
  ...resetProps
}) => {
  function createColumns(
    form: FormInstance<Record<string, []>>,
    { move, remove }: FormListOperation,
  ) {
    return [
      {
        width: 200,
        title: "图标",
        render: (field: FormListFieldData) => (
          <Form.Item name={[field.name, "icon"]}>
            <UploadImage textButton />
          </Form.Item>
        ),
      },
      {
        title: "名称",
        width: 250,
        render: (field: FormListFieldData) => (
          <Form.Item name={[field.name, "name"]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
        ),
      },
      {
        title: "详情",
        render: (field: FormListFieldData) => (
          <Form.Item name={[field.name, "description"]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
        ),
      },
      {
        title: "URL链接",
        render: (field: FormListFieldData) => (
          <Form.Item name={[field.name, "url"]}>
            <Input placeholder="请输入跳转链接" />
          </Form.Item>
        ),
      },
      {
        width: 120,
        title: "操作",
        render: (field: FormListFieldData) => {
          const length = form.getFieldValue(name).length;
          return (
            <div className={styles.operate}>
              {field.name ? (
                <span
                  className="btn"
                  onClick={() => move(field.name, field.name - 1)}
                >
                  上移
                </span>
              ) : null}
              {field.name + 1 === length ? null : (
                <span
                  className="btn"
                  onClick={() => move(field.name, field.name + 1)}
                >
                  下移
                </span>
              )}
              <Popconfirm
                title="确认删除？"
                onConfirm={() => remove(field.name)}
              >
                <span className="del">删除</span>
              </Popconfirm>
            </div>
          );
        },
      },
    ] as ColumnsType<FormListFieldData>;
  }

  const shouldUpdate: InternalFieldProps<Record<string, []>>["shouldUpdate"] = (
    prev,
    next,
  ) => prev[name] !== next[name];

  return (
    <Form.Item label={label} shouldUpdate={shouldUpdate}>
      {(form) => (
        <Form.List name={name} {...resetProps}>
          {(fields, funcs) => (
            <Table
              size="middle"
              pagination={false}
              dataSource={fields}
              className={styles.table}
              columns={createColumns(form, funcs)}
            />
          )}
        </Form.List>
      )}
    </Form.Item>
  );
};

export default EditLabel;
