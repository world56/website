import { Tooltip } from "antd";
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
      <div dangerouslySetInnerHTML={{ __html: data.profile }} />

      <Title>座右铭</Title>
      <p>心中充满善意 不懈追求完美</p>

      <Title>未来规划</Title>
      <p>
        随着互联网发展行业的不断发展，近年来对于从业人员的需求，也在不断变化，特别是对“专精型人才”，转向为“多边形人才”的趋势，不可阻挡。
      </p>
      <p>
        对于技能，我想通过不断的自我驱动，学习到更多实用的技能技术，可为业务方提供更好的服务。
      </p>
      <p>
        对于职业方向，我想有更多的机会能与业务直接接触，一方面会提升对编程设计模式的理解与实践，同时，可以更好的利用我个人的表达、沟通能力的优势，为下一个十年的职业发展转型升级，准备更多的选项。
      </p>

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
