import { Tooltip } from "antd";
import Image from "next/image";
import Title from "@/components/Title";
import styles from "./page.module.sass";

import ICON_TS from "@/assets/ts.svg";
import ICON_JS from "@/assets/js.svg";
import ICON_VUE from "@/assets/vue.svg";
import ICON_CSS from "@/assets/css.svg";
import ICON_HTML from "@/assets/html.svg";
import ICON_NODE from "@/assets/node.svg";
import ICON_NEXT from "@/assets/next.svg";
import ICON_NEST from "@/assets/nest.svg";
import ICON_REDIS from "@/assets/redis.svg";
import ICON_NGINX from "@/assets/nginx.svg";
import ICON_LINUX from "@/assets/linux.svg";
import ICON_MYSQL from "@/assets/mysql.svg";
import ICON_DOCKER from "@/assets/docker.svg";
import ICON_REACT from "@/assets/react.svg";
import ICON_GRPC from "@/assets/gRPC.svg";
import ICON_PRISMA from "@/assets/prisma.svg";

const SKILLS = [
  {
    icon: ICON_HTML,
    name: "HTML5",
    desc: "熟悉，入行后一直都在写HTML5",
  },
  {
    icon: ICON_CSS,
    name: "CSS3",
    desc: "熟悉，入行后一直都在写CSS3",
  },
  {
    icon: ICON_JS,
    name: "JavaScript",
    desc: "熟悉，6年+实战经验，知晓其优化方式、疑难点等",
  },
  {
    icon: ICON_TS,
    name: "TypeScript",
    desc: "实际使用超4年，有大量实战经验，涵盖React、NestJS、NextJS等业务开发实践，熟悉各种类型使用、封装",
  },
  {
    icon: ICON_REACT,
    name: "React",
    desc: "拥有 React + TS 大量实战经验，熟悉开发生态 Redux、Mobx、Redux-Saga、Redux-thunk、React-Router等，熟悉Hooks封装，熟知React底层原理，懂得优化",
  },
  {
    icon: ICON_VUE,
    name: "Vue",
    desc: "有大量Vue2 Vue3项目实战经验，熟悉Vuex、Vue-Router、自定义指令等",
  },
  {
    icon: ICON_NEXT,
    name: "NextJS",
    desc: "有多个实战经验，知晓设计思路，熟悉AppRoute、APIRoute，包括各类渲染方式SSR、SSG、ISR、DPR",
  },
  {
    icon: ICON_LINUX,
    name: "Linux",
    desc: "熟悉基础指令，包括但不限于文本、文件操作，安装各类包、服务部署的经验",
  },
  {
    icon: ICON_DOCKER,
    name: "Docker",
    desc: "熟悉基本原理，熟练掌握数据卷、各类网络模式，以及Dockerfile、docker-compose.yml编写，docker基本指令，以及Docker-Compose的的使用",
  },
  {
    icon: ICON_GRPC,
    name: "gRPC",
    desc: "在微服务项目中有实战经验，与其他不同语言有服务对接（NodeJS、Java）",
  },
  {
    icon: ICON_NGINX,
    name: "Nginx",
    desc: "了解基本概念，掌握基本配置、含义，包括负载均衡、高可用、反向代理、二级域名、HTTPS、防盗链、0拷贝等均有实战经验",
  },
  {
    icon: ICON_MYSQL,
    name: "Mysql",
    desc: "掌握基本语句，熟悉表关系模式、事物、索引、锁等概念，能进行日常的需求开发、优化等",
  },
  {
    icon: ICON_REDIS,
    name: "Redis",
    desc: "掌握Redis基本语句，熟悉基本的数据类型、发布订阅等模式",
  },
  {
    icon: ICON_NODE,
    name: "NodeJS",
    desc: "拥有微服务开发经验，知晓基本概念，以及在日常使用中优化点",
  },
  {
    icon: ICON_NEST,
    name: "NestJS",
    desc: "知晓其设计模式，有大量NestJS(FastifyJS)微服务开发经验",
  },
  {
    icon: ICON_PRISMA,
    name: "Prisma",
    desc: "大量实战经验，是本人最常用的关系型数据库ORM之一",
  },
];
//
/**
 * @name About 自我介绍页
 */
const About = () => (
  <>
    <h2>您好 👋</h2>
    <p>
      我叫<strong>黄俊睿</strong>
      ，来自于四川成都，6年以来，一直从事Web前端开发工作。
    </p>

    <p>
      在生活中，我性格友善和谐，擅长与人沟通表达。我热爱音乐和骑行，常常与朋友们一起骑行天府绿道，每次都能轻松完成30公里的骑行目标。
    </p>

    <p>
      在职业生涯中，我参与并主导了多个中大型项目的开发， 涵盖
      <strong>中后台</strong> 、<strong>可视化</strong>、<strong>小程序</strong>
      、<strong>跨平台应用</strong>
      等。同时，我对代码质量和项目规范性十分重视，始终致力于为同事提供更好的工作体验，为客户创造更优秀的使用体验。
    </p>

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
      {SKILLS.map((v) => (
        <Tooltip key={v.name} title={v.desc}>
          <Image src={v.icon} alt="#" />
        </Tooltip>
      ))}
    </div>
  </>
);

export default About;
