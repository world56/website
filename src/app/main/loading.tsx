import { Spin } from "antd";
import styles from './main.module.sass';

const Loading = () => {
  return <Spin className={styles.loading} />;
};

export default Loading;
