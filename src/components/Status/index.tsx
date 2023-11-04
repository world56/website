import { ENUM_COMMON } from "@/enum/common";

export interface TypeStatusProps {
  /**
   * @param status 状态
   */
  status: ENUM_COMMON.STATUS;
}

export const CONSTANT_STATUS = {
  [ENUM_COMMON.STATUS.DISABLE]: { TXT: "禁用", COLOR: "#FE695A" },
  [ENUM_COMMON.STATUS.ENABLE]: { TXT: "启用", COLOR: "#34C7A6" },
};

/**
 * @name Status 状态显示
 */
const Status: React.FC<TypeStatusProps> = ({ status }) => {
  const { COLOR, TXT } = CONSTANT_STATUS[status];
  return <span style={{ color: COLOR, margin: "0 5px" }}>{TXT}</span>;
};

export default Status;
