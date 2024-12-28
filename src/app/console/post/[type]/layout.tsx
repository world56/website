"use client";

import { useParams, redirect } from "next/navigation";

import { ENUM_COMMON } from "@/enum/common";

interface TypeLayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<TypeLayoutProps> = ({ children }) => {
  const params = useParams<{ type: ENUM_COMMON.POST_TYPE }>();
  if (Object.values(ENUM_COMMON.POST_TYPE).includes(params?.type!)) {
    return children;
  } else {
    return redirect("/console/post/life");
  }
};

export default Layout;
