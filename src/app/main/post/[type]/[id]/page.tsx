import Prism from "prismjs";
import { Empty } from "antd";
import { cache } from "react";
import { prisma } from "@/utils/db";
import styles from "./post.module.sass";
import { dateToTime } from "@/utils/format";
import ReadingTools from "@/components/Tools";
import { FieldTimeOutlined } from "@ant-design/icons";

import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-go.min.js";
import "prismjs/components/prism-php.min.js";
import "prismjs/components/prism-sql.min.js";
import "prismjs/components/prism-cpp.min.js";
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-rust.min.js";
import "prismjs/components/prism-dart.min.js";
import "prismjs/components/prism-swift.min.js";
import "prismjs/components/prism-kotlin.min.js";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-csharp.min.js";
import "prismjs/components/prism-csharp.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-markup-templating.min.js";

import { ENUM_COMMON } from "@/enum/common";

const POST_TYPE = {
  [ENUM_COMMON.POST_TYPE.NOTES]: "notes",
  [ENUM_COMMON.POST_TYPE.ACHIEVEMENTS]: "achievements",
};

interface TypePostProps {
  params: Record<"type" | "id", string>;
}

function formatEntities(encodedString: string) {
  const translate_re = /&(nbsp|amp|quot|lt|gt|ldquo|rdquo|#\d+);/g;
  const translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
    ldquo: "“",
    rdquo: "”",
    "#39": "'",
  };
  return encodedString.replace(translate_re, (match, entity) => {
    if (entity.startsWith("#")) {
      return String.fromCharCode(entity.slice(1));
    } else {
      return translate[entity as keyof typeof translate];
    }
  });
}

function highlightCodeInRichText(richText: string) {
  const codeBlockRegex =
    /<pre class="language-(\w+)"><code>([\s\S]*?)<\/code><\/pre>/g;
  let highlightedRichText = richText;
  let match;
  while ((match = codeBlockRegex.exec(richText)) !== null) {
    const [text, language, code] = match;
    const beautifyCode = Prism.highlight(
      formatEntities(code),
      Prism.languages[language],
      language,
    );
    highlightedRichText = highlightedRichText.replace(
      text,
      `<pre class="language-${language}">${beautifyCode}</pre>`,
    );
  }
  return highlightedRichText;
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
    const __html = highlightCodeInRichText(res.content);
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
          className="mce-content-body"
          style={{ minHeight: 398 }}
          dangerouslySetInnerHTML={{ __html }}
        />
        <p className={styles.prompt}>© 著作权归作者所有 转载请注明原链接</p>
      </div>
    );
  } else {
    return <Empty className={styles.empty} description="没有找到相关内容" />;
  }
};

export default Post;
