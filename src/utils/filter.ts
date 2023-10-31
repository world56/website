import type { TypeCommon } from "@/interface/common";

/**
 * @name filterCUD 过滤出增、改、删数据
 * @param dto 用户传递的
 * @param db 数据库存在的
 * @description 多条数据常用
 */
export function filterCUD<
  T extends TypeCommon.PrimaryID = TypeCommon.PrimaryID,
>(dto: T[], db: T[]) {
  const exist: Record<string, T> = {};
  const DTO_LENGTH = dto.length;
  const DB_LENGTH = db.length;
  const INSERT: T[] = [];
  const UPDATE: T[] = [];
  const DELETE: Array<T["id"]> = [];
  // 需要新增的
  for (let i = 0; i < DTO_LENGTH; i++) {
    const val = dto[i];
    if (!val.id) {
      INSERT.push(val);
    } else {
      exist[val.id] = val;
    }
  }
  // 需要删除、更新
  for (let i = 0; i < DB_LENGTH; i++) {
    const val = db[i];
    if (exist[val.id!]) {
      UPDATE.push(exist[val.id!]);
    } else {
      DELETE.push(val.id);
    }
  }
  return { INSERT, UPDATE, DELETE };
}
