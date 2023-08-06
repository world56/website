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
        desc="基于微服务开发的网络云盘"
        url="https://github.com/world56/drive"
      />
    </List>
  );
};

export default Open;
