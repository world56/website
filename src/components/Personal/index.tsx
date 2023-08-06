import Item from "./Item";
import Image from "next/image";
import styles from "./personal.module.sass";

import ICON_PHONE from "@/assets/phone.svg";
import ICON_EMAIL from "@/assets/email.svg";
import ICON_GITHUB from "@/assets/github.svg";
import ICON_AVATAR from "@/assets/avatar.jpeg";
import ICON_ADDRESS from "@/assets/address.svg";
import ICON_TWITTER from "@/assets/twitter.svg";

/**
 * @name Personal 个人信息简介
 */
const Personal = () => {
  return (
    <aside className={styles.personal}>
      <Image src={ICON_AVATAR} priority alt="#" />
      <h1>黄俊睿</h1>
      <span className={styles.post}>前端开发工程师</span>
      <hr />
      <ul>
        <Item icon={ICON_ADDRESS} title="所在城市">
          四川 成都 武侯区
        </Item>

        <Item icon={ICON_PHONE} title="联系电话">
          130 **** 7003
        </Item>

        <Item icon={ICON_EMAIL} title="电子邮件">
          world56@qq.com
        </Item>

        <Item icon={ICON_GITHUB} title="GITHUB">
          <a target="_blank" href="https://github.com/world56">
            github.com/world56
          </a>
        </Item>

        <Item icon={ICON_TWITTER} title="TWITTER">
          twitter.com
        </Item>
      </ul>
    </aside>
  );
};

export default Personal;
