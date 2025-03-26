export const CONFIG = {
  license_key: "gpl",
  skin: false,
  content_css: false,
  verify_html: false,
  relative_urls: false,
  sandbox_iframes: false,
  codesample_global_prismjs: true,
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
    { text: "Scala", value: "scala" },
    { text: "Dockerfile", value: "docker" },
    { text: "Nginx", value: "nginx" },
  ],
  plugins: [
    "lists",
    "link",
    "table",
    "image",
    "preview",
    "checklist",
    "pageembed",
    "editimage",
    "codesample",
    "fullscreen",
    "searchreplace",
  ],
  toolbar1: `
    blocks fontsizeinput 
    | forecolor backcolor bold italic underline title codetag
    | align lineheight numlist bullist checklist table
    | upload pageembed codesample
  `,
};
