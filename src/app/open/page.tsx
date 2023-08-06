import List from "@/components/List";
import IMAGE_DRIVE from "@/assets/drive.png";

/**
 * @name Open 开源项目介绍
 */
const Open = () => {
  return (
    <List>
      <List.Item
        src={IMAGE_DRIVE}
        name="DriveCloud"
        url="https://wwww.baidu.com"
        desc="基于微服务开发的网络云盘"
      />
    </List>
  );
};

export default Open;
