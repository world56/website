import { Spin, Tooltip } from "antd";
import Title from "@/components/Title";
import styles from "./main.module.sass";
import { getBasicDetails } from "../api";

/**
 * @name About 自我介绍页
 */
const About = async () => {
  const data = await getBasicDetails();
  return (
    <>
      <div
        dangerouslySetInnerHTML={
          data.profile ? { __html: data.profile } : undefined
        }
      />
      <Title>技能简介</Title>
      <div className={styles.skill}>
        {data.skills.map((v) => (
          <Tooltip key={v.name} title={v.description}>
            <img src={v.icon} alt="#" />
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default About;
