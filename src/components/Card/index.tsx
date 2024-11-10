import {
  CardTitle,
  CardHeader,
  CardContent,
  Card as Layout,
  CardDescription,
} from "@/components/ui/card";
import Loading from "../Loading";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Record } from "@prisma/client/runtime/library";

interface TypeCardProps
  extends Partial<Record<"title" | "description", string>> {
  spacing?: number;
  className?: string;
  children?: React.ReactNode;
  onBack?(): void;
  loading?: boolean;
}

const Card: React.FC<TypeCardProps> = ({
  title,
  onBack,
  loading,
  children,
  className,
  spacing = 8,
  description,
}) => (
  <Layout className={`shadow-custom ${className}`}>
    {title ? (
      <CardHeader>
        <CardTitle className="flex">
          {onBack ? (
            <ArrowLeftOutlined
              onClick={onBack}
              className="mr-2 cursor-pointer"
            />
          ) : null}
          {title}
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
    ) : null}
    <CardContent>
      <Loading
        loading={loading}
        height="calc(100% - 10px)"
        className={`space-y-${spacing}`}
      >
        {children}
      </Loading>
    </CardContent>
  </Layout>
);

export default Card;
