import {
  unlink,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  createWriteStream,
} from "fs";
import { join } from "path";
import { Cacheable } from "cacheable";
import { PrismaClient } from "@prisma/client";
import type { CacheableOptions } from "cacheable";

/**
 * @name LocalStorage 本地存储
 */
class LocalStorage {
  readonly FOLDER_PATH = join(process.cwd(), "./resource");
  readonly FILE_PATH = join(process.cwd(), "./resource/config.json");

  /**
   * @name set 新增、设置值
   * @description merge操作，不会影响其他已经存在的值
   */
  set(obj: object) {
    try {
      const data = { ...this.get(), ...obj };
      const writer = createWriteStream(this.FILE_PATH, { autoClose: true });
      writer.write(JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("ERROR-LocalStorage-SET", error);
      return {};
    }
  }

  /**
   * @name get 获取配置
   */
  get(): Record<string, string> {
    try {
      !existsSync(this.FOLDER_PATH) && mkdirSync(this.FOLDER_PATH);
      !existsSync(this.FILE_PATH) && writeFileSync(this.FILE_PATH, "{}");
      const json = readFileSync(this.FILE_PATH, "utf-8");
      return JSON.parse(json);
    } catch (error) {
      console.log("ERROR-LocalStorage-GET", error);
      return {};
    }
  }

  /**
   * @name remove 删除文件
   */
  remove(name: string) {
    const path = `${this.FOLDER_PATH}/${name}`;
    if (existsSync(path)) {
      return unlink(path, (err) => (err ? false : true));
    }
    return false;
  }
}

class MemoryStorage extends Cacheable {
  constructor(props?: CacheableOptions) {
    super(props);
  }

  async incr(params: {
    ttl: string;
    maximum: number;
    key: string | null | undefined;
  }) {
    const { key, maximum, ttl } = params;
    const KEY = key ?? "unknown";
    let int = (await this.get<number>(KEY)) ?? 0;
    if (maximum && maximum === int) return false;
    await this.set(KEY, ++int, ttl);
    return await this.get(KEY);
  }
}

const prisma = global.prisma || new PrismaClient();
global.prisma = prisma;

const DBlocal = global.DBlocal || new LocalStorage();
global.DBlocal = DBlocal;

const cacheable = global.cacheable || new MemoryStorage();
global.cacheable = cacheable;

export { DBlocal, cacheable, prisma };
