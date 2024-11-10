import {
  TooltipContent,
  TooltipTrigger,
  Tooltip as Layout,
} from "@/components/ui/tooltip";

interface TypeTooltipProps {
  type?: "button";
  onClick?(): void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  title?: string | React.ReactNode;
}

const Tooltip: React.FC<TypeTooltipProps> = ({
  type,
  title,
  onClick,
  disabled,
  children,
  className = "",
}) => {
  function getButtonClass() {
    if (type === "button") {
      if (disabled) {
        return "font-medium text-black/45 underline-offset-4 cursor-default ";
      } else {
        return "font-medium hover:underline underline-offset-4 cursor-pointer ";
      }
    }
    return "cursor-default ";
  }

  return (
    <Layout>
      <TooltipTrigger
        onClick={disabled ? undefined : onClick}
        className={`${getButtonClass()} ${className}`}
      >
        {children}
        {title ? <TooltipContent>{title}</TooltipContent> : null}
      </TooltipTrigger>
    </Layout>
  );
};

export default Tooltip;
