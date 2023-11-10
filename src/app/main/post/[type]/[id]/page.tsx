import { getPost } from "@/app/api";
import styles from "./post.module.sass";
import { dateToTime } from "@/utils/format";
import { FieldTimeOutlined } from "@ant-design/icons";

interface TypePostProps {
  params: Record<"type" | "id", string>;
}

const Post: React.FC<TypePostProps> = async ({ params: { id } }) => {
  const res = await getPost({ id });
  const time = dateToTime(res.createTime);

  return (
    <div className={styles.post}>
      <div className={styles.title}>
        <h1>{res.title}</h1>
        <time dateTime={time}>
          <FieldTimeOutlined />
          {time}
        </time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: res.content }} />
    </div>
  );
};

export default Post;
