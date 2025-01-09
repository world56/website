import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isVoid(value: any) {
  return ["", undefined, null, NaN].includes(value);
}
