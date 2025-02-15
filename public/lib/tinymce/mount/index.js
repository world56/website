var PATH = `/lib/tinymce/skins/`;

updateTheme();
loadScript("/lib/player/index.js");
loadStylesheet("/lib/player/index.css");
loadStylesheet("/lib/tinymce/mount/index.css");
loadStylesheet("/lib/tinymce/mount/inject.css");

function loadScript(src, callback) {
  var script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = () => {
    if (callback) callback();
  };
  script.onerror = () => console.error("script onload error");
  document.head.appendChild(script);
}

function loadStylesheet(href, id) {
  if (id) {
    var exists = document.getElementById(id);
    exists && exists.remove();
  }
  var link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;
  link.media = "all";
  link.onerror = () => console.error(`Failed to load stylesheet: ${href}`);
  document.head.appendChild(link);
}

window.addEventListener("storage", function (event) {
  event.key === "theme" && updateTheme();
});

function updateTheme(type = localStorage.getItem(`theme`)) {
  if (type === "dark") {
    document.documentElement.className = "dark";
    document.body.style.backgroundColor = "#191B1F";
    loadStylesheet(`${PATH}ui/oxide-dark/content.min.css`, "theme-ui");
    loadStylesheet(`${PATH}content/dark/content.min.css`, "theme-content");
  } else {
    document.documentElement.className = "";
    document.body.style.backgroundColor = "#fff";
    loadStylesheet(`${PATH}ui/oxide/content.min.css`, "theme-ui");
    loadStylesheet(`${PATH}content/default/content.min.css`, "theme-content");
  }
}
