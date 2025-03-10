import Link from "next/link";
import { cache } from "react";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import { DBlocal, prisma } from "@/lib/db";
import SkillTitle from "@/components/SkillTitle";

import { API_RESOURCE } from "@/app/api";
import { ENUM_COMMON } from "@/enum/common";

const requestPerson = cache(async () => {
  const local = DBlocal.get();
  const skills = await prisma.tag.findMany({
    orderBy: { index: "asc" },
    where: { type: ENUM_COMMON.TAG.SKILL },
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
        className="mce-content-body no-tailwindcss about-me"
        dangerouslySetInnerHTML={
          local.profile ? { __html: local.profile } : undefined
        }
      />
      {skills?.length ? (
        <>
          <SkillTitle />
          <div className="md:pb-0 md:flex-wrap md:overflow-auto flex pb-1 overflow-x-scroll">
            {skills.map((v) => (
              <Tooltip
                key={v.name}
                title={
                  <div className="max-w-56 text-left text-sm">
                    {v.name ? <p className="font-bold mb-1">{v.name}</p> : null}
                    {v.description ? (
                      <p className="mb-1">{v.description}</p>
                    ) : null}
                  </div>
                }
              >
                {v.url ? (
                  <Link target="_blank" href={v.url}>
                    <Image
                      alt="#"
                      width={60}
                      height={50}
                      draggable="false"
                      src={`${API_RESOURCE}${v.icon}`}
                      className="min-w-[60px] w-auto h-[50px] m-[10px] cursor-pointer dark:dark-icon dark:hover:dark-icon-hover"
                    />
                  </Link>
                ) : (
                  <Image
                    alt="#"
                    width={60}
                    height={50}
                    draggable="false"
                    src={`${API_RESOURCE}${v.icon}`}
                    className="min-w-[60px] w-auto h-[50px] m-[10px] cursor-default dark:dark-icon dark:hover:dark-icon-hover"
                  />
                )}
              </Tooltip>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default About;
