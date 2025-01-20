import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getAvatar = (name: string) => {
  const names = name.split(" ");
  return name[0].substring(0,1) + names?.[1].substring(0,1).toUpperCase();
}
