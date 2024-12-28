export const CONFIG:any = {
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
  content_style: `
  .player-media {
    width: 100%;
    margin: 10px 0;
    display: inline-block;
  }

  .player-audio {
    height: 62px;
    background: #fff;
    border-radius: 10px;
    padding: 0 12px 0 20px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  }

  .player-audio media-time-range, media-time-display, media-mute-button, media-playback-rate-button, media-volume-range {
    background: #fff;
  }

  .player-audio media-control-bar {
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .player-audio media-play-button {
    background: #000;
    --media-button-icon-width: 25px;
    --media-button-icon-height: 25px;
    padding: 7px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .player-audio media-time-display {
    padding-left: 15px;
    background: #fff;
    color: rgb(100, 116, 139);
    border-left: 1px solid #e5e7eb;
  }

  .player-audio media-time-range {
    width: calc(100% - 320px);
    --media-range-thumb-width: 5px;
    --media-range-thumb-height: 12px;
    --media-range-track-height: 6px;
    --media-range-bar-color: #000;
    --media-range-track-border-radius: 10px;
    --media-range-thumb-background: #000;
    --media-range-track-background: #e5e7eb;
  }

  .player-audio media-mute-button {
    padding-right: 0;
    --media-icon-color: rgb(100, 116, 139);
  }

  .player-audio media-playback-rate-button {
    color: rgb(100, 116, 139);
  }

  .player-audio media-volume-range {
    padding-right: 0;
    --media-range-thumb-width: 5px;
    --media-range-thumb-height: 12px;
    --media-range-track-height: 6px;
    --media-range-bar-color: #000;
    --media-range-track-border-radius: 10px;
    --media-range-thumb-background: #000;
    --media-range-track-background: #e5e7eb;
  }

  .player-video media-control-bar > * {
    background: rgba(0, 0, 0, 0.8)
  }

  .player-video, .player-video > video {
    border-radius: 6px;
  }

  .player-video media-control-bar {
    margin: 10px;
    overflow: hidden;
    border-radius: 10px;
  }

  .player-video media-time-range {
    width: 150px;
    --media-range-thumb-width: 5px;
    --media-range-thumb-height: 12px;
    --media-range-track-height: 6px;
    --media-range-track-border-radius: 10px;
  }

  .player-video media-volume-range {
    padding-right: 0;
    --media-range-thumb-width: 5px;
    --media-range-thumb-height: 12px;
    --media-range-track-height: 6px;
    --media-range-track-border-radius: 10px;
  }

  .tox-checklist > li:not(.tox-checklist--hidden)::before {
    content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-unchecked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2215%22%20height%3D%2215%22%20x%3D%22.5%22%20y%3D%22.5%22%20fill-rule%3D%22nonzero%22%20stroke%3D%22%234C4C4C%22%20rx%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A");
  }

  .tox-checklist li:not(.tox-checklist--hidden).tox-checklist--checked::before {
    content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-checked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23000%22%20fill-rule%3D%22nonzero%22%20rx%3D%222%22%2F%3E%3Cpath%20id%3D%22Path%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M11.5703186%2C3.14417309%20C11.8516238%2C2.73724603%2012.4164781%2C2.62829933%2012.83558%2C2.89774797%20C13.260121%2C3.17069355%2013.3759736%2C3.72932262%2013.0909105%2C4.14168582%20L7.7580587%2C11.8560195%20C7.43776896%2C12.3193404%206.76483983%2C12.3852142%206.35607322%2C11.9948725%20L3.02491697%2C8.8138662%20C2.66090143%2C8.46625845%202.65798871%2C7.89594698%203.01850234%2C7.54483354%20C3.373942%2C7.19866177%203.94940006%2C7.19592841%204.30829608%2C7.5386474%20L6.85276923%2C9.9684299%20L11.5703186%2C3.14417309%20Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A");
  }

  .tiny-pageembed {
    border-radius: 6px;
  }
  `,
};
