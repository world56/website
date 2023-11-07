"use client";

import { ConfigProvider } from "antd";
import { useServerInsertedHTML } from "next/navigation";
// https://github.com/ant-design/ant-design/issues/45567
import {  StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs/lib';
// import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";

import type { ConfigProviderProps } from "antd/es/config-provider";

interface TypeStyledComponentsRegistryProps
  extends Pick<ConfigProviderProps, "theme"> {
  children?: React.ReactNode;
}

/**
 * @name StyledComponentsRegistry Antd 避免样式闪动
 * @description 使用客户端组件，按需引入，配合改成黑色
 */
const StyledComponentsRegistry: React.FC<TypeStyledComponentsRegistryProps> = ({
  theme,
  children,
}) => {
  const cache = createCache();
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <ConfigProvider theme={theme}>
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default StyledComponentsRegistry;
