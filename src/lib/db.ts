import { join } from "path";
import { createWriteStream, existsSync, writeFileSync, readFileSync } from "fs";

/**
 * @name LocalStorage 本地存储
 */
class LocalStorage {
  static PATH = join(__dirname, "../../../../../resource/config.json");

  set(obj: object) {
    const pre = this.get();
    const data = { ...JSON.parse(pre), ...obj };
    const writer = createWriteStream(LocalStorage.PATH, { autoClose: true });
    writer.write(JSON.stringify(data));
    return data;
  }

  get() {
    !existsSync(LocalStorage.PATH) && writeFileSync(LocalStorage.PATH, "{}");
    return readFileSync(LocalStorage.PATH, "utf-8");
  }
}

const DBlocal = new LocalStorage();

export { DBlocal };
