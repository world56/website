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
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  items,
  value,
  onChange,
  className,
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
    <div className={className ? `relative ${className}` : "relative"}>
      {IS_VOID ? null : (
        <CloseCircleOutlined
          onClick={onClear}
          className="absolute top-[10px] right-3 z-50 text-gray-500 bg-white hover:text-black dark:bg-card dark:hover:text-white"
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
