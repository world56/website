import {
  unlink,
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
  private readonly path = join("./resource/config.json");

  /**
   * @name set 新增、设置值
   * @description merge操作，不会影响其他已经存在的值
   */
  set(obj: object) {
    try {
      const data = { ...this.get(), ...obj };
      const writer = createWriteStream(this.path, { autoClose: true });
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
      !existsSync(this.path) && writeFileSync(this.path, "{}");
      const json = readFileSync(this.path, "utf-8");
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
    existsSync(this.path) &&
      unlink(this.path, (err) => {
        if (err) {
          console.error("配置文件删除失败", err);
        } else {
          console.log("配置文件删除成功", this.path);
        }
      });
  }
}

const prisma = new PrismaClient();
const DBlocal = new LocalStorage();

prisma
  .$connect()
  .then(() => {
    console.log("Mysql connection is successful");
  })
  .catch(() => {
    console.log("Mysql connection error");
  });

export { DBlocal, prisma };
