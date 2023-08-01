import styles from "./page.module.sass";
import Personal from "@/components/Personal";

const Home = () => (
  <main className={styles.layout}>
    <Personal />
  </main>
);

export default Home;
