import { ENUM_COMMON } from "@/enum/common";
import type { TypeCommon } from "@/interface/common";
import { message, notification } from "antd";

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
function verifyFile(file: File, type: ENUM_COMMON.UPLOAD_FILE_TYPE) {
  const IS_IMG = type === ENUM_COMMON.UPLOAD_FILE_TYPE.IMAGE;
  const checkSuffix = IS_IMG
    ? ["image/jpeg", "image/png", "image/svg+xml"]
    : ["video/mp4"];
  const format = IS_IMG ? "jpeg、png、svg图片" : "mp4";
  const size = IS_IMG ? 2048000 : 51200000;
  const sizeMessage = IS_IMG ? "2MB" : "50MB";
  if (!checkSuffix.includes(file.type)) {
    notification.warning({
      message: "文件格式错误",
      description: `${file.name}文件格式错误，上传失败。仅支持${format}格式。`,
    });
    return false;
  } else if (file.size > size) {
    notification.warning({
      message: "文件大小超过最大限制",
      description: `${file.name} 文件，超过上传最大限制 ${sizeMessage}，上传失败`,
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
export function getUploadFiles(type: ENUM_COMMON.UPLOAD_FILE_TYPE) {
  return new Promise<FormData>((resolve, reject) => {
    const btn = document.createElement("input");
    btn.setAttribute("type", "file");
    btn.setAttribute("multiple", "true");
    btn.click();
    btn.onchange = async (e) => {
      try {
        const { files } = e.target as HTMLInputElement;
        const body = new FormData();
        Array.prototype.forEach.call(files, (file: File) => {
          verifyFile(file, type) && body.append("files", file);
        });
        if (body.getAll("files").length) {
          return resolve(body);
        } else {
          message.success("没有对应的文件");
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
