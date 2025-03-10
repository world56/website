import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";

interface TypePropsButton
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "onClick"
  > {
  loading?: boolean;
  onClick?(): void;
  icon?: typeof SearchOutlined;
}

const LoadingButton: React.FC<TypePropsButton> = ({
  icon: Icon,
  loading,
  onClick,
  children,
  type = "button",
  ...props
}) => {
  const t = useTranslations("common");
  return (
    <Button {...props} type={type} onClick={onClick} disabled={loading}>
      {loading ? (
        <SyncOutlined className="h-4 w-4 animate-spin" spin />
      ) : Icon ? (
        <Icon />
      ) : null}
      {children || t("refresh")}
    </Button>
  );
};

export default LoadingButton;
