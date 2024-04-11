export const CONFIG = {
  relative_urls: false,
  remove_script_host: false,
  language: "zh-Hans",
  language_url: "/lib/tinymce/lang/zh-Hans.js",
  font_size_formats:
    "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 18pt 24pt 36pt 42pt",
  codesample_global_prismjs: true,
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript/TypeScript", value: "javascript" },
    { text: "CSS", value: "css" },
    { text: "Bash", value: "bash" },
    { text: "Java", value: "java" },
    { text: "Python", value: "python" },
    { text: "Go", value: "go" },
    { text: "PHP", value: "php" },
    { text: "Ruby", value: "ruby" },
    { text: "Rust", value: "rust" },
    { text: "Dart", value: "dart" },
    { text: "Swift", value: "swift" },
    { text: "Kotlin", value: "kotlin" },
    { text: "SQL", value: "sql" },
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
