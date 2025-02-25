import {
  FundOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { getVisitCount } from "@/app/api";
import { Card } from "@/components/ui/card";

/**
 * @name Visits 访问量统计 Partial
 */
const Visits: React.FC<Partial<Awaited<ReturnType<typeof getVisitCount>>>> = ({
  today,
  month,
  count,
}) => (
  <div className="flex mb-3 justify-between">
    <Card className="w-[32.5%] relative p-4">
      <p className="text-base mb-1">今日访问量</p>
      <p className="text-3xl font-bold">{today || 0}</p>
      <UserOutlined className="absolute top-5 right-5 text-3xl" />
    </Card>
    <Card className="w-[32.5%] relative p-4">
      <p className="text-base mb-1">月访问量</p>
      <p className="text-3xl font-bold">{month || 0}</p>
      <CalendarOutlined className="absolute top-5 right-5 text-3xl" />
    </Card>
    <Card className="w-[32.5%] relative p-4">
      <p className="text-base mb-1">访问总量</p>
      <p className="text-3xl font-bold">{count || 0}</p>
      <FundOutlined className="absolute top-5 right-5 text-3xl" />
    </Card>
  </div>
);

export default Visits;
