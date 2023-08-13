import styles from "./main.module.sass";
import Personal from "@/components/Personal";
import Navigation from "@/components/Navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "个人开发者",
  description: "个人开发者",
};

interface TypeMainProps {
  children?: React.ReactNode;
}

const Layout: React.FC<TypeMainProps> = ({ children }) => (
  <main className={styles.main}>
    <aside className={styles.sidebar}>
      <Personal />
    </aside>
    <div className={styles.context}>
      <Navigation />
      {children}
    </div>
  </main>
);

export default Layout;
