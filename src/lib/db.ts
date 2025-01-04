import {
  unlink,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  createWriteStream,
} from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

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

const prisma = global.prisma || new PrismaClient();
global.prisma = prisma;

prisma.$disconnect();
prisma.$connect().catch(() => console.log("prisma connection error"));

const DBlocal = global.DBlocal || new LocalStorage();
global.DBlocal = DBlocal;

export { DBlocal, prisma };
