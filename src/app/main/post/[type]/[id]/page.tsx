import { Empty } from "antd";
import { cache } from "react";
import { prisma } from "@/utils/db";
import styles from "./post.module.sass";
import { dateToTime } from "@/utils/format";
import ReadingTools from "@/components/Tools";
import { FieldTimeOutlined } from "@ant-design/icons";

import { ENUM_COMMON } from "@/enum/common";

const POST_TYPE = {
  [ENUM_COMMON.POST_TYPE.NOTES]: "notes",
  [ENUM_COMMON.POST_TYPE.ACHIEVEMENTS]: "achievements",
};

interface TypePostProps {
  params: Record<"type" | "id", string>;
}

const requestPost = cache(async (id?: string) => {
  return await prisma.post.findUnique({
    where: { id, status: ENUM_COMMON.STATUS.ENABLE },
  });
});

export async function generateMetadata({ params: { id } }: TypePostProps) {
  const res = await requestPost(id);
  return { title: res?.title ? res.title : "没有找到相关内容" };
}

export async function generateStaticParams() {
  const res = await prisma.post.findMany({
    where: { status: ENUM_COMMON.STATUS.ENABLE },
  });
  return res.map((v) => ({
    id: v.id,
    type: POST_TYPE[v.type as keyof typeof POST_TYPE],
  }));
}

const Post: React.FC<TypePostProps> = async ({ params: { id } }) => {
  const res = await requestPost(id);
  if (res) {
    const time = dateToTime(res.createTime);
    return (
      <div className={styles.post}>
        <div className={styles.title}>
          <h1>{res.title}</h1>
          <div className={styles.tools}>
            <time dateTime={time}>
              <FieldTimeOutlined />
              {time}
            </time>
            <ReadingTools />
          </div>
        </div>
        <div
          style={{ minHeight: 430 }}
          dangerouslySetInnerHTML={{ __html: res.content }}
        />
        <p className={styles.prompt}>© 著作权归作者所有 转载请注明原链接</p>
      </div>
    );
  } else {
    return (
      <Empty
        className={styles.empty}
        description="没有找到相关内容"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
};

export default Post;
