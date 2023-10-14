import Item from "./Item";
import { getBasicDetails } from "@/app/api";
import styles from "./personal.module.sass";

/**
 * @name Personal 个人信息简介
 */
const Personal = async () => {
  const data = await getBasicDetails();
  return (
    <div className={styles.personal}>
      <img src={data.icon} alt="#" />
      <h1>{data.name}</h1>
      <span className={styles.post}>{data.position}</span>
      <hr />
      <ul>
        {data.items.map((v) => (
          <Item key={v.id} icon={v.icon} title={v.name || "-"}>
            {v.description}
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default Personal;
