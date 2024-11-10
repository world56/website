import {
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
  Select as Layout,
} from "@/components/ui/select";
import { CloseCircleOutlined } from "@ant-design/icons";

type TypeValues = string | number | boolean | null | undefined;

interface SelectProps<T = TypeValues> {
  placeholder?: T;
  value?: T | undefined;
  onChange?(value: T | undefined): void;
  items: Array<{ label: string; value: T }>;
}

const Select: React.FC<SelectProps> = ({
  items,
  value,
  onChange,
  placeholder,
}) => {
  function onClear(e: React.MouseEvent<HTMLOrSVGElement>) {
    e.stopPropagation();
    onChange?.(undefined);
  }

  function onValueChange(value: string) {
    if (["true", "false"].includes(value)) {
      onChange?.(value === "true" ? true : false);
    } else if (Number.isFinite(Number(value))) {
      onChange?.(Number(value));
    } else {
      onChange?.(value === "" ? undefined : value);
    }
  }

  const IS_VOID = value === null || value === undefined;

  const val = IS_VOID ? "" : String(value);

  return (
    <div className="relative">
      {IS_VOID ? null : (
        <CloseCircleOutlined
          onClick={onClear}
          className="absolute top-[10px] right-3 bg-white z-50 text-gray-500 hover:text-black"
        />
      )}
      <Layout value={val} onValueChange={onValueChange}>
        <SelectTrigger className="w-40">
          <SelectValue
            placeholder={<span className="text-gray-500">{placeholder}</span>}
          />
        </SelectTrigger>

        <SelectContent>
          {items.map((v) => (
            <SelectItem key={String(v.value)} value={String(v.value)}>
              {v.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Layout>
    </div>
  );
};

export default Select;
