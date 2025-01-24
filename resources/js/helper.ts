import {User} from "@/types";
import axiosInstance from "@/lib/axios";

export function can(user: User, permission: string): boolean {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

export function hasRole(user: User, role: string): boolean {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
}

export const ucwords = (str: string) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
