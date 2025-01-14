updateTheme();
loadScript("/lib/player/index.js");
loadStylesheet("/lib/player/index.css");
loadStylesheet("/lib/tinymce/index.css");

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
  var link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;
  link.media = "all";
  link.onerror = () => console.error("link onload error");
  document.head.appendChild(link);
}

function updateTheme(type = localStorage.getItem(`theme`)) {
  if (type === "dark") {
    document.documentElement.className = "dark";
    document.body.style.backgroundColor = "#191B1F";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
}
