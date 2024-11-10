import { toast } from "sonner";
import { filesize } from "filesize";

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

/**
 * @name verifyFile 校验文件格式
 * @param file 文件对象
 * @param type 校验文件类型
 */
function verifyFile(file: File, size?: number) {
  if (size === undefined) return true;
  if (file.size > size) {
    const maxSize = filesize(size);
    toast.error("文件大小超过最大限制", {
      description: `${file.name} 文件，超过上传最大限制${maxSize}，上传失败`,
    });
    return false;
  } else {
    return true;
  }
}

/**
 * @name getUploadFiles 客户端创建一个上传任务
 * @description 用户拿到选择对应的文件列表，支持校验
 */
export function getUploadFiles(params: {
  size?: number;
  accept: string;
  multiple?: boolean;
}) {
  const { accept, multiple, size } = params;
  return new Promise<FormData>((resolve, reject) => {
    const btn = document.createElement("input");
    btn.setAttribute("type", "file");
    multiple && btn.setAttribute("multiple", "true");
    accept && btn.setAttribute("accept", accept);
    btn.click();
    btn.onchange = async (e) => {
      try {
        const { files } = e.target as HTMLInputElement;
        const body = new FormData();
        Array.prototype.forEach.call(files, (file: File) => {
          verifyFile(file, size) && body.append("files", file);
        });
        if (body.getAll("files").length) {
          return resolve(body);
        } else {
          return reject();
        }
      } catch (error) {
        reject(error);
      }
    };
  });
}

/**
 * @name toJSON 转换成JSON
 */
export function toJSON(str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return undefined;
  }
}
