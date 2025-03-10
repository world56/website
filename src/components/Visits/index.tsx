import {
  FundOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { getVisitCount } from "@/app/api";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

/**
 * @name Visits 访问量统计 Partial
 */
const Visits: React.FC<Partial<Awaited<ReturnType<typeof getVisitCount>>>> = ({
  today,
  month,
  count,
}) => {
  const t = useTranslations("log");
  return (
    <div className="flex mb-3 justify-between">
      <Card className="w-[32.5%] relative p-4">
        <p className="text-base mb-1">{t("today")}</p>
        <p className="text-3xl font-bold">{today || 0}</p>
        <UserOutlined className="absolute top-5 right-5 text-3xl" />
      </Card>
      <Card className="w-[32.5%] relative p-4">
        <p className="text-base mb-1">{t("month")}</p>
        <p className="text-3xl font-bold">{month || 0}</p>
        <CalendarOutlined className="absolute top-5 right-5 text-3xl" />
      </Card>
      <Card className="w-[32.5%] relative p-4">
        <p className="text-base mb-1">{t("total")}</p>
        <p className="text-3xl font-bold">{count || 0}</p>
        <FundOutlined className="absolute top-5 right-5 text-3xl" />
      </Card>
    </div>
  );
};

export default Visits;
