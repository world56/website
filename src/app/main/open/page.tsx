import List from "@/components/List";

import IMAGE_DRIVE from "@/assets/drive.png";
import IMAGE_WEBSITE from "@/assets/website.png";

/**
 * @name Open 开源项目介绍
 */
const Open = () => {
  return (
    <List>
      <List.Item
        src={IMAGE_DRIVE}
        name="DriveCloud"
        desc="基于微服务架构开发的网络云盘"
        url="https://github.com/world56/drive"
      />
      <List.Item
        src={IMAGE_WEBSITE}
        name="MyWebsite"
        desc="基于Next.js开发的个人主页 "
        url="https://github.com/world56/website"
      />
    </List>
  );
};

export default Open;
