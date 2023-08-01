import "./globals.css";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "个人开发者",
  description: "个人开发者",
};

const Entrance = ({ children }: { children: React.ReactNode }) => (
  <html lang="cn">
    <body className={inter.className}>{children}</body>
  </html>
);

export default Entrance;