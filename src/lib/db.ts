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
  private readonly FILE_PATH = join("./resource/config.json");
  private readonly FOLDER_PATH = join("./resource");

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
   * @name clear 清空配置
   * @description 走的是删除配置文件逻辑，获取值若无配置，会自动创建
   */
  clear() {
    existsSync(this.FILE_PATH) &&
      unlink(this.FILE_PATH, (err) => {
        if (err) {
          console.error("配置文件删除失败", err);
        } else {
          console.log("配置文件删除成功", this.FILE_PATH);
        }
      });
  }
}

const prisma = new PrismaClient();
const DBlocal = new LocalStorage();

prisma.$disconnect().then(() => {
  console.log("Mysql disconnect", process.env.DATABASE_URL);
});
prisma.$connect().catch(() => {
  console.log("Mysql connection error", process.env.DATABASE_URL);
});

export { DBlocal, prisma };
