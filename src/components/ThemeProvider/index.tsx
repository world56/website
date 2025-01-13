"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const IS_DARK = media.matches;
      localStorage.setItem("theme", IS_DARK ? "dark" : "light");
      document.documentElement.classList.toggle("dark", IS_DARK);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
