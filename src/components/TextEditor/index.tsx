"use client";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Spin } from "antd";
import Script from "next/script";
import { useDebounceFn } from "ahooks";
import styles from "./editor.module.sass";
import { useDebounceEffect } from "ahooks";
import CONFIG, { HTML_TEMPLATE } from "./config";

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
      /**
       * @param value 文本内容
       */
      value?: string;
      /** @name onChange 输入监听器 */
      onChange?(value?: T): void;
    }
  > {}

/**
 * @name TextEditor 文本编辑器
 */
const TxtEditor: TypeTxtEditorProps = ({ value = "", onChange }, ref) => {
  const edit = useRef<Editor>();

  const [load, setLoad] = useState(true);

  const { run: onInputChange } = useDebounceFn(() => {
    onChange?.(edit.current?.getContent());
  });

  const { run: onCreate } = useDebounceFn(() => {
    window.tinymce?.init({
      ...CONFIG,
      selector: `#editor`,
      init_instance_callback: (e) => {
        edit.current = e;
        edit.current?.on("input", onInputChange);
        setLoad(false);
      },
      setup(editor) {
        editor.ui.registry.addButton("title", {
          icon: "template",
          tooltip: "标题",
          enabled: false,
          onAction: () => editor?.insertContent(HTML_TEMPLATE.TITLE),
          onSetup: (buttonApi) => {
            const editorEventCallback = () => buttonApi.setEnabled(true);
            editor?.on("NodeChange", editorEventCallback);
            return () => editor?.off("NodeChange", editorEventCallback);
          },
        });
      },
    });
  });

  useEffect(() => {
    onCreate();
    return () => {
      edit.current && window.tinymce?.remove();
    };
  }, [onCreate]);

  useDebounceEffect(
    () => {
      if (!load) {
        const index = edit.current?.selection.getBookmark(2)!;
        edit.current?.setContent(value);
        edit.current?.selection.moveToBookmark(index);
      }
    },
    [load, value],
    { wait: 100 },
  );

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
