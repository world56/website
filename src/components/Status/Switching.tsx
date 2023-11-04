import { ENUM_COMMON } from "@/enum/common";

import type { TypeStatusProps } from ".";

interface TypeStatusSwitchingProps extends TypeStatusProps {
  /**
   * @name onClick 状态切换
   * @param {ENUM_COMMON.STATUS} type 直接返回切换的状态值
   */
  onClick(type: ENUM_COMMON.STATUS): void;
}

export const CONSTANT_STATUS = {
  [ENUM_COMMON.STATUS.DISABLE]: {
    TXT: "启用",
    COLOR: "#34C7A6",
    VALUE: ENUM_COMMON.STATUS.ENABLE,
  },
  [ENUM_COMMON.STATUS.ENABLE]: {
    TXT: "禁用",
    COLOR: "#FE695A",
    VALUE: ENUM_COMMON.STATUS.DISABLE,
  },
};

/**
 * @name Switching 状态切换
 */
const Switching: React.FC<TypeStatusSwitchingProps> = ({ status, onClick }) => {
  const { TXT, COLOR, VALUE } = CONSTANT_STATUS[status];
  return (
    <span
      onClick={() => onClick(VALUE)}
      style={{ color: COLOR, cursor: "pointer", margin: "0 5px" }}
    >
      {TXT}
    </span>
  );
};

export default Switching;
