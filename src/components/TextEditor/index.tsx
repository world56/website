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
import template from "./template";
import { CONFIG } from "./config";
import { useDebounceFn } from "ahooks";
import { uploadFiles } from "@/app/api";
import Loading from "@/components/Loading";
import { getFileType, getUploadFiles } from "@/lib/filter";

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

  async function upload() {
    const data = await getUploadFiles({
      multiple: true,
      accept: ".svg, .jpg, .jpeg, .png, .webp, .mp4, .mp3, .aac, .m4a",
    });
    toast.promise(
      async () => {
        const files = await uploadFiles(data);
        let html = "";
        for (let v of files) {
          const type = getFileType(v.url);
          switch (type) {
            case ENUM_COMMON.UPLOAD_FILE_TYPE.IMAGE:
              html += template.getImage(v.url);
              break;
            case ENUM_COMMON.UPLOAD_FILE_TYPE.VIDEO:
              html += template.getVideo(v.url);
              break;
            case ENUM_COMMON.UPLOAD_FILE_TYPE.AUDIO:
              html += template.getAudio(v.url);
              break;
          }
        }
        edit?.current?.execCommand("mceInsertContent", false, html);
        return Promise.resolve(files);
      },
      {
        loading: "正在上传资源",
        success: (data) => `${data.length}个资源上传成功`,
        error: () => `资源上传失败`,
      },
    );
  }

  const { run: updateValue } = useDebounceFn(
    () => {
      const value = edit.current?.getContent();
      onChange?.(value);
    },
    { wait: 100 },
  );

  const { run: onCreate } = useDebounceFn(() => {
    window?.tinymce?.init({
      ...CONFIG,
      height,
      selector: `#editor`,
      init_instance_callback: (e) => {
        edit.current = e;
        edit.current?.on("input", updateValue);
        edit.current?.on("change", updateValue);
        edit.current?.on("setcontent", updateValue);
        setLoad(false);
      },
      setup(editor) {
        editor.on("init", () => {
          const iframe = editor.iframeElement?.contentDocument!;
          const script = iframe.createElement("script");
          script.src = `/lib/player/index.js`;
          iframe!.head.appendChild(script);
        });
        editor.ui.registry.addButton("title", {
          icon: "permanent-pen",
          tooltip: "插入标题",
          onAction: () => editor?.insertContent(template.getTitle()),
        });
        editor.ui.registry.addButton("upload", {
          icon: "upload",
          tooltip: "上传资源（图片、音频、视频）",
          onAction: upload,
        });
        editor.ui.registry.addButton("player-left", {
          icon: "align-left",
          tooltip: "左",
          onAction: () => changeAlign(editor, "left"),
        });
        editor.ui.registry.addButton("player-center", {
          icon: "align-center",
          tooltip: "居中",
          onAction: () => changeAlign(editor, "center"),
        });
        editor.ui.registry.addButton("player-right", {
          icon: "align-right",
          tooltip: "右",
          onAction: () => changeAlign(editor, "right"),
        });
        editor.ui.registry.addButton("player-zoom-in", {
          icon: "zoom-in",
          tooltip: "放大",
          onAction: () => changeWidth(editor, "ADD"),
        });
        editor.ui.registry.addButton("player-zoom-out", {
          icon: "zoom-out",
          tooltip: "缩小",
          onAction: () => changeWidth(editor, "REDUCE"),
        });
        editor.ui.registry.addContextToolbar("Format", {
          predicate: (e) =>
            !edit.current?.selection.isCollapsed() &&
            !/(\btiny-pageembed\b|\bplayer-media\b)/.test(e.className) &&
            !["BODY", "PRE"].includes(e.tagName),
          position: "selection",
          scope: "node",
          items:
            "bold strikethrough removeformat blockquote link | alignleft aligncenter alignright",
        });
        editor.ui.registry.addContextToolbar("player", {
          predicate: (e) => e.className === "player-media",
          items:
            "player-left player-center player-right | player-zoom-in player-zoom-out",
          position: "node",
          scope: "node",
        });
        editor.ui.registry.addContextToolbar("delete", {
          predicate: (e) =>
            /(\btiny-pageembed\b|\bplayer-media\b|\blanguage-\b)/.test(
              e.className,
            ),
          items: "remove",
          position: "node",
          scope: "node",
        });
      },
    });
  });

  function changeWidth(editor: Editor, type: "ADD" | "REDUCE") {
    const ele = editor?.selection.getNode().children[0] as HTMLElement;
    const num = Number(ele.style.width.slice(0, -1));
    if (type === "ADD" && num === 100) {
      return toast.warning("已达最大尺寸");
    } else if (type === "REDUCE") {
      const IS_AUDIO = ele.hasAttribute("audio");
      if ((IS_AUDIO && num === 50) || (!IS_AUDIO && num === 40)) {
        return toast.warning("已达最小尺寸");
      }
    }
    const width = `${type === "ADD" ? num + 10 : num - 10}%`;
    editor.dom.setStyle(ele, "width", width);
    editor.fire("change");
  }

  function changeAlign(editor: Editor, type: "left" | "center" | "right") {
    editor.dom.setStyle(editor.selection.getNode(), "text-align", type);
    editor.fire("change");
  }

  useEffect(() => {
    onCreate();
    return () => {
      edit.current?.off("input");
      edit.current?.off("change");
      edit.current?.off("setcontent");
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
      {value}
      <textarea id="editor" style={{ minHeight: 780 }} />
      <Script onReady={onCreate} src="/lib/tinymce/tinymce.min.js" />
    </Loading>
  );
};

export { Editor };

export default forwardRef(TxtEditor);
