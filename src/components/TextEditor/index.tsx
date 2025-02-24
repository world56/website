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
import { useTheme } from "next-themes";
import { uploadFile } from "@/app/api";
import Loading from "@/components/Loading";
import { loadStylesheet } from "@/lib/utils";
import { useDebounceFn, useDebounceEffect } from "ahooks";
import { getFileType, getUploadFiles } from "@/lib/filter";

import { ENUM_COMMON } from "@/enum/common";

import type { Editor } from "tinymce";

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

  const { systemTheme } = useTheme();
  const IS_DARK = systemTheme === "dark";

  const [load, setLoad] = useState(true);

  const { run: onCreate } = useDebounceFn(() => {
    window?.tinymce?.init({
      ...CONFIG,
      height,
      selector: `#editor`,
      init_instance_callback: (e) => {
        edit.current = e;
        edit.current?.on("change", () =>
          onChange?.(edit.current?.getContent()),
        );
        setLoad(false);
      },
      setup(editor) {
        editor.on("init", () => {
          const iframe = editor.iframeElement?.contentDocument!;
          const script = iframe.createElement("script");
          script.src = `/lib/tinymce/mount/index.js`;
          iframe!.head.appendChild(script);
        });
        editor.ui.registry.addButton("codetag", {
          icon: "sourcecode",
          tooltip: "代码块标签",
          onAction: () => editor.execCommand("mceToggleFormat", false, "code"),
        });
        editor.ui.registry.addButton("title", {
          icon: "permanent-pen",
          tooltip: "插入标题",
          onAction: () => editor?.insertContent(template.getTitle()),
        });
        editor.ui.registry.addButton("upload", {
          icon: "upload",
          tooltip: "上传资源（图片、音频、视频）",
          onAction: () => upload(editor),
        });
        editor.ui.registry.addButton("remove-ele", {
          icon: "remove",
          tooltip: "删除标题",
          onAction: () => {
            const node = editor.selection.getNode();
            if (node.className === "main-title") {
              node?.parentNode?.removeChild(node);
            }
          },
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
            !["BODY", "PRE", "IMG"].includes(e.tagName),
          position: "selection",
          scope: "node",
          items: "bold strikethrough removeformat codetag blockquote link",
        });

        editor.ui.registry.addContextToolbar("Location", {
          predicate: (e) =>
            !edit.current?.selection.isCollapsed() &&
            !/(\btiny-pageembed\b|\bplayer-media\b)/.test(e.className) &&
            !["BODY", "PRE"].includes(e.tagName),
          position: "selection",
          scope: "node",
          items: "alignleft aligncenter alignright",
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
        editor.ui.registry.addContextToolbar("remove-ele", {
          predicate: (e) => /(\bmain-title\b)/.test(e.className),
          items: "remove-ele",
          position: "node",
          scope: "node",
        });
      },
    });
  });

  async function upload(editor: Editor) {
    const files = await getUploadFiles({
      multiple: true,
      accept: ".svg, .jpg, .jpeg, .png, .webp, .mp4, .mp3, .aac, .m4a",
    });
    let num = 0;
    toast.promise(
      async () => {
        let html = "";
        for await (const file of files) {
          try {
            const { path } = await uploadFile(file);
            num++;
            const type = getFileType(path);
            const url = `/api/resource/${path}`;
            switch (type) {
              case ENUM_COMMON.RESOURCE.IMAGE:
                html += template.getImage(url);
                break;
              case ENUM_COMMON.RESOURCE.VIDEO:
                html += template.getVideo(url);
                break;
              case ENUM_COMMON.RESOURCE.AUDIO:
                html += template.getAudio(url);
                break;
            }
          } catch (error) {
            console.log("@-upload-error", error);
          }
        }
        edit?.current?.execCommand("mceInsertContent", false, html);
        editor.fire("change");
        return Promise.resolve(files);
      },
      {
        loading: "正在上传资源",
        error: () => `资源上传失败`,
        success: () => `${num}个资源上传成功`,
      },
    );
  }

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
    editor.dom.setStyle(editor.selection.getNode(), "justify-content", type);
    editor.fire("change");
  }

  useEffect(() => {
    onCreate();
    return () => {
      edit.current?.off("change");
      edit.current && window?.tinymce?.remove();
    };
  }, [onCreate]);

  useEffect(() => {
    if (!load) {
      if (edit.current?.getContent() !== value) {
        let index = edit.current?.selection?.getBookmark(2)!;
        edit.current?.setContent(value);
        edit.current?.selection?.moveToBookmark?.(index);
      }
    }
  }, [load, value]);

  useDebounceEffect(
    () =>
      loadStylesheet(
        `/lib/tinymce/skins/ui/oxide${IS_DARK ? "-dark" : ""}/skin.min.css`,
        "oxide",
      ),
    [IS_DARK],
    { wait: 100 },
  );

  useImperativeHandle(ref, () => edit.current, [edit]);

  return (
    <Loading loading={load}>
      <div id="editor" style={{ minHeight: 780 }} />
      <Script onReady={onCreate} src="/lib/tinymce/tinymce.min.js" />
    </Loading>
  );
};

export { Editor };

export default forwardRef(TxtEditor);
