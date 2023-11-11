import { Empty } from "antd";
import { getPost } from "@/app/api";
import styles from "./post.module.sass";
import { dateToTime } from "@/utils/format";
import ReadingTools from "@/components/Tools";
import { FieldTimeOutlined } from "@ant-design/icons";

import { ENUM_COMMON } from "@/enum/common";

interface TypePostProps {
  params: Record<"type" | "id", string>;
}

const Post: React.FC<TypePostProps> = async ({ params: { id } }) => {
  const res = await getPost({ id, status: ENUM_COMMON.STATUS.ENABLE });
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
