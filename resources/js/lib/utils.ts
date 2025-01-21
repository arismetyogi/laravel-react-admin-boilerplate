import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getAvatar = (name: string) => {
  const names = name.split(" ");

  if (names.length > 1) {
    return name[0].substring(0,1).toUpperCase() + names?.[1].substring(0,1).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
