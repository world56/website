import { DBlocal } from "@/lib/db";
import styles from "./main.module.sass";
import Personal from "@/components/Personal";
import Navigation from "@/components/Navigation/Main";

import type { Metadata } from "next";

const config = DBlocal.get();

export const metadata: Metadata = {
  title: config.title || "网站标题",
  description: "description",
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
