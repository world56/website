import { toast } from "sonner";
import { filesize } from "filesize";

import { ENUM_COMMON } from "@/enum/common";

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
 * @name getFileType 获取资源类型
 */
export function getFileType(fileName: string) {
  const suffix = fileName.split(".")?.pop()?.toLocaleUpperCase()!;
  if (["SVG", "JPG", "JPEG", "PNG", "WEBP"].includes(suffix)) {
    return ENUM_COMMON.UPLOAD_FILE_TYPE.IMAGE;
  } else if (["MP4"].includes(suffix)) {
    return ENUM_COMMON.UPLOAD_FILE_TYPE.VIDEO;
  } else if (["MP3", "ACC", "M4A"].includes(suffix)) {
    return ENUM_COMMON.UPLOAD_FILE_TYPE.AUDIO;
  } else {
    return;
  }
}

/**
 * @name verifyFile 校验文件格式
 * @param file 文件对象
 * @param type 校验文件类型
 */
function verifyFile(file: File, size?: number) {
  let MAX_SIZE = size || 0;
  if (size === undefined) {
    switch (getFileType(file.name)) {
      case ENUM_COMMON.UPLOAD_FILE_TYPE.IMAGE:
        MAX_SIZE = 10485760;
        break;
      case ENUM_COMMON.UPLOAD_FILE_TYPE.VIDEO:
        MAX_SIZE = 31457280;
        break;
      case ENUM_COMMON.UPLOAD_FILE_TYPE.AUDIO:
        MAX_SIZE = 15728640;
        break;
      default:
        break;
    }
  }
  if (file.size > MAX_SIZE) {
    toast.error("文件大小超过最大限制", {
      description: `${file.name}，超过上传最大限制${filesize(
        MAX_SIZE,
      )}，上传失败`,
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
  return new Promise<FormData[]>((resolve, reject) => {
    const btn = document.createElement("input");
    btn.setAttribute("type", "file");
    multiple && btn.setAttribute("multiple", "true");
    accept && btn.setAttribute("accept", accept);
    btn.click();
    btn.onchange = async (e) => {
      try {
        const { files } = e.target as HTMLInputElement;
        const chunks: FormData[] = [];
        Array.prototype.forEach.call(files, (file: File) => {
          if (verifyFile(file, size)) {
            const body = new FormData();
            body.append("file", file);
            chunks.push(body);
          }
        });
        if (chunks.length) {
          return resolve(chunks);
        } else {
          return reject();
        }
      } catch (error) {
        reject(error);
      }
    };
  });
}
