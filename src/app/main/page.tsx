import Link from "next/link";
import { cache } from "react";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import { DBlocal, prisma } from "@/lib/db";

import { BASE_URL } from "@/lib/request";

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
        className="no-tailwindcss-base"
        dangerouslySetInnerHTML={
          local.profile ? { __html: local.profile } : undefined
        }
      />

      {skills?.length ? (
        <>
          <div className="w-[150px] h-[45px] p-x-[39px] my-[30px] flex items-center justify-center font-bold text-[16px] bg-black rounded-[1px_20px_1px_20px]">
            <span className="text-white">技能简介</span>
          </div>
          <div className="flex flex-wrap">
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
                      src={`${BASE_URL}${v.icon}`}
                      className="min-w-[60px] w-auto h-[50px] m-[10px] cursor-pointer"
                    />
                  </Link>
                ) : (
                  <Image
                    alt="#"
                    width={60}
                    height={50}
                    src={`${BASE_URL}${v.icon}`}
                    className="min-w-[60px] w-auto h-[50px] m-[10px] cursor-default"
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
