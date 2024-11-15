"use client";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { toast } from "sonner";
import Script from "next/script";
import { useDebounceFn } from "ahooks";
import { uploadFiles } from "@/app/api";
import Loading from "@/components/Loading";
import { getUploadFiles } from "@/lib/filter";
import { CONFIG, HTML_TEMPLATE } from "./config";

import { ENUM_COMMON } from "@/enum/common";

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
       * @param height 编辑器高度
       */
      height?: number;
      /**
       * @param value 文本内容
       */
      value?: string;
      /**
       * @name onChange 内容监听器
       */
      onChange?(value?: T): void;
    }
  > {}

/**
 * @name TextEditor 文本编辑器
 */
const TxtEditor: TypeTxtEditorProps = (
  { height = 780, value = "", onChange },
  ref,
) => {
  const edit = useRef<Editor>();

  const [load, setLoad] = useState(true);

  async function upload(type: ENUM_COMMON.UPLOAD_FILE_TYPE) {
    const IS_IMAGE = type === ENUM_COMMON.UPLOAD_FILE_TYPE.IMAGE;
    const data = await getUploadFiles({
      multiple: true,
      size: IS_IMAGE ? 10485760 : 31457280,
      accept: IS_IMAGE ? ".svg, .jpg, .jpeg, .png, .webp" : ".mp4, .mp3",
    });
    toast.promise(
      async () => {
        const files = await uploadFiles(data);
        let html = "";
        for (let v of files) {
          const IS_IMAGE = type === ENUM_COMMON.UPLOAD_FILE_TYPE.IMAGE;
          html += IS_IMAGE
            ? `<img src='${v.url}' alt='#' style='width:max-content;' />`
            : `<video controls  controlsList="nodownload"><source src='${v.url}' type='video/mp4' /></video>`;
        }
        edit?.current?.execCommand("mceInsertContent", false, html);
        onChange?.(edit.current?.getContent());
        return Promise.resolve(files);
      },
      {
        loading: "正在上传资源",
        success: (data) => `${data.length}个资源上传成功`,
        error: () => `资源上传失败`,
      },
    );
  }

  const { run: onCreate } = useDebounceFn(() => {
    window?.tinymce?.init({
      ...CONFIG,
      height,
      selector: `#editor`,
      init_instance_callback: (e) => {
        edit.current = e;
        edit.current?.on("change", (e) => onChange?.(e?.target.getContent()));
        edit.current?.on("remove", (e) => onChange?.(undefined));
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
        editor.ui.registry.addButton("uploadImage", {
          icon: "image",
          tooltip: "上传图片",
          onAction: () => upload(ENUM_COMMON.UPLOAD_FILE_TYPE.IMAGE),
        });
        editor.ui.registry.addButton("uploadVideo", {
          icon: "embed",
          tooltip: "上传视频",
          onAction: () => upload(ENUM_COMMON.UPLOAD_FILE_TYPE.VIDEO),
        });
      },
    });
  });

  useEffect(() => {
    onCreate();
    return () => {
      edit.current && window?.tinymce?.remove();
    };
  }, [onCreate]);

  useEffect(() => {
    if (!load) {
      const index = edit.current?.selection?.getBookmark(2)!;
      if (edit.current?.getContent() !== value) {
        edit.current?.setContent(value);
      }
      edit.current?.selection?.moveToBookmark?.(index);
    }
  }, [load, value]);

  useImperativeHandle(ref, () => edit.current, [edit]);

  return (
    <Loading loading={load}>
      <textarea id="editor" style={{ minHeight: 780 }} />
      <Script onReady={onCreate} src="/lib/tinymce/tinymce.min.js" />
    </Loading>
  );
};

export { Editor };

export default forwardRef(TxtEditor);
