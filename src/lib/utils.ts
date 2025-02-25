import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isVoid(value: any) {
  return ["", undefined, null, NaN].includes(value);
}

export function loadStylesheet(href: string, id: string) {
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

export function keepAliveSignin() {
  const [, prefix] = location.pathname.split("/");
  if (prefix === "console") {
    window.open("/signin?K=1", "", `width=500,height=500,top=300,left=200`);
  }
}
