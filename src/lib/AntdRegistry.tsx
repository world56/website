"use client";

import { ConfigProvider } from "antd";
import { useServerInsertedHTML } from "next/navigation";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";

/**
 * @name StyledComponentsRegistry Antd 避免样式山东
 * @description 使用客户端组件，按需引入，配合改成黑色
 */
const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = createCache();
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0f0f0f",
        },
      }}
    >
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default StyledComponentsRegistry;
