"use client"

import { ConfigProvider } from "antd";
import { useRef, useMemo } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

import type Entity from "@ant-design/cssinjs/es/Cache";
import type { ConfigProviderProps } from "antd/es/config-provider";

interface TypeStyledComponentsRegistryProps
  extends Pick<ConfigProviderProps, "theme"> {
  children?: React.ReactNode;
}

const StyledComponentsRegistry = ({
  theme,
  children,
}: TypeStyledComponentsRegistryProps) => {
  const cache = useMemo<Entity>(createCache, []);
  const isInsert = useRef(false);

  useServerInsertedHTML(() => {
    if (isInsert.current) return;
    isInsert.current = true;
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });
  return (
    <ConfigProvider theme={theme}>
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default StyledComponentsRegistry;
