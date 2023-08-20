"use client";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Spin } from "antd";
import CONFIG from "./config";
import Script from "next/script";
import styles from "./editor.module.sass";

import type { Editor, EditorManager } from "tinymce";

declare global {
  interface Window {
    tinymce?: EditorManager;
  }
}

interface TypeTxtEditorProps<T = string>
  extends React.ForwardRefRenderFunction<
    Editor | undefined,
    {
      /** @param value 初始化文本内容 */
      value?: string;
      /** @name onChange 输入监听器 */
      onChange?(value?: T): void;
    }
  > {}

/**
 * @name TextEditor 文本编辑器
 */
const TxtEditor: TypeTxtEditorProps = ({ value, onChange }, ref) => {
  const edit = useRef<Editor>();

  const [load, setLoad] = useState(true);

  function onCreate() {
    window.tinymce?.init({
      ...CONFIG,
      selector: `#editor`,
      setup: (e) => {
        edit.current = e;
        setLoad(false);
        setTimeout(() => edit.current?.setContent(value || ""), 500);
        edit.current?.on("keyup change", () => {
          onChange?.(edit.current?.getContent());
        });
      },
    });
  }

  useEffect(() => {
    return () => {
      window.tinymce?.remove(edit.current!);
    };
  }, []);

  useImperativeHandle(ref, () => edit.current, [edit.current]);

  return (
    <>
      <Script onReady={onCreate} src="/lib/tinymce/tinymce.min.js" />
      <div className={styles.editor}>
        <Spin spinning={load} tip="正在加载文本编辑器">
          <textarea id="editor" />
        </Spin>
      </div>
    </>
  );
};

export { Editor };

export default forwardRef(TxtEditor);
