export const CONFIG = {
  relative_urls: false,
  remove_script_host: false,
  language: "zh-Hans",
  language_url: "/lib/tinymce/lang/zh-Hans.js",
  fontsize_formats:
    "14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px 26px 27px 28px 29px 30px 32px 48px",
  codesample_global_prismjs: true,
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "CSS", value: "css" },
    { text: "PHP", value: "php" },
    { text: "Ruby", value: "ruby" },
    { text: "Python", value: "python" },
    { text: "Java", value: "java" },
    { text: "C", value: "c" },
    { text: "C#", value: "csharp" },
    { text: "C++", value: "cpp" },
  ],
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "codesample",
    "wordcount",
  ],
  toolbar1: `
    blocks fontfamily fontsize |
    forecolor backcolor bold italic underline strikethrough removeformat | alignleft aligncenter alignright alignjustify 
    bullist numlist outdent indent undo redo |
    link uploadImage uploadVideo | blockquote title table codesample | preview fullscreen
  `,
};

export const HTML_TEMPLATE = {
  TITLE: `
    <div style='
      width: max-content;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 39px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      margin: 30px 0;
      background: black;
      border-radius: 1px 20px;
    '>
      <span>标题</span>
    </div>
  `,
};
