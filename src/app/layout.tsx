import "./globals.css";
import styles from "./page.module.sass";
import { Inter } from "next/font/google";
import Personal from "@/components/Personal";
import Navigation from "@/components/Navigation";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "个人开发者",
  description: "个人开发者",
};

const Entrance = ({ children }: { children: React.ReactNode }) => (
  <html lang="cn">
    <body>
    <main className={styles.layout}>
    <Personal />
    <div className={styles.context}>
      <Navigation />
      {children}
    </div>
  </main>
    </body>
  </html>
);

export default Entrance;