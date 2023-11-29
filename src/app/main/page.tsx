import { cache } from "react";
import { Tooltip } from "antd";
import Image from "next/image";
import Title from "@/components/Title";
import styles from "./main.module.sass";
import { DBlocal, prisma } from "@/utils/db";

import { ENUM_COMMON } from "@/enum/common";

export const revalidate = 864000;

const requestPerson = cache(async () => {
  const local = DBlocal.get();
  const skills = await prisma.tag.findMany({
    orderBy: { index: "asc" },
    where: { type: ENUM_COMMON.TAG.PERSONAL_SKILL },
  });
  return { local, skills };
});

/**
 * @name About 自我介绍
 */
const About = async () => {
  const { local, skills } = await requestPerson();

  return (
    <>
      <div
        dangerouslySetInnerHTML={
          local.profile ? { __html: local.profile } : undefined
        }
      />
      <Title>技能简介</Title>
      <div className={styles.skill}>
        {skills.map((v) => (
          <Tooltip key={v.name} title={v.description}>
            <Image
              alt="#"
              width={0}
              height={0}
              src={`http://127.0.0.1:3000/${v.icon}`}
            />
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default About;
