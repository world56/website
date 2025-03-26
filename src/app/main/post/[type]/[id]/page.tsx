import Prism from "prismjs";
import { cache } from "react";
import { prisma } from "@/lib/db";
import Empty from "@/components/Empty";
import PostTools from "@/components/PostTools";

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
import "prismjs/components/prism-nginx.min.js";
import "prismjs/components/prism-scala.min.js";
import "prismjs/components/prism-docker.min.js";
import "prismjs/components/prism-kotlin.min.js";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-csharp.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-markup-templating.min.js";

import { ENUM_COMMON } from "@/enum/common";

import type { Post } from "@prisma/client";

interface TypePostProps {
  params: Pick<Post, "type" | "id">;
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
    const grammar = Prism.languages?.[language];
    if (grammar) {
      const beautifyCode = Prism.highlight(
        formatEntities(code),
        grammar,
        language,
      );
      highlightedRichText = highlightedRichText.replace(
        text,
        `<pre class="language-${language}">${beautifyCode}</pre>`,
      );
    }
  }
  return highlightedRichText;
}

const requestPost = cache(async (id?: number) => {
  if (isNaN(Number(id))) return null;
  return await prisma.post.findUnique({
    where: { id: Number(id), status: ENUM_COMMON.STATUS.ENABLE },
  });
});

export async function generateMetadata({ params: { id } }: TypePostProps) {
  const res = await requestPost(id);
  return {
    title: res?.title ? res.title : "not found",
    description: res?.description,
  };
}

export async function generateStaticParams() {
  const res = await prisma.post.findMany({
    where: { status: ENUM_COMMON.STATUS.ENABLE },
  });
  return res.map((v) => ({ id: String(v.id), type: v.type }));
}

const Post: React.FC<TypePostProps> = async ({ params: { id } }) => {
  const res = await requestPost(id);
  if (res) {
    const __html = highlightCodeInRichText(res.content);
    return (
      <article>
        <header>
          <h1 className="text-3xl font-bold mt-[10px] mb-[22px] break-words whitespace-normal">
            {res.title}
          </h1>
          <PostTools title={res.title} date={res.createTime} />
        </header>

        <section
          dangerouslySetInnerHTML={{ __html }}
          className="mce-content-body no-tailwindcss min-h-[340px] md:min-h-[398px]"
        />
        {res?.footer ? (
          <footer>
            <p className="text-sm mt-8 text-gray-400 text-center select-none">
              {res.footer}
            </p>
          </footer>
        ) : null}
      </article>
    );
  } else {
    return <Empty height={520} />;
  }
};

export default Post;
