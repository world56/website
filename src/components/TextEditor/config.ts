export const CONFIG = {
  language: "zh_CN",
  license_key: "gpl",
  language_url: "/lib/tinymce/langs/zh_CN.js",
  codesample_global_prismjs: true,
  verify_html: false,
  sandbox_iframes: false,
  relative_urls: false,
  custom_elements:
    "media-controller,media-control-bar,media-play-button,media-time-display,media-time-range,media-playback-rate-button,media-mute-button,media-volume-range",
  extended_valid_elements:
    "media-controller[audio|class|contenteditable|gesturesdisabled|mceNonEditable|style]",
  valid_elements: "media-controller",
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
    "lists",
    "link",
    "table",
    "image",
    "advlist",
    "preview",
    "checklist",
    "codesample",
    "fullscreen",
    "searchreplace",
    "pageembed",
  ],
  toolbar1: `
    blocks fontsizeinput 
    | forecolor backcolor bold italic underline title 
    | align lineheight numlist bullist checklist table
    | upload pageembed codesample
  `,
};
