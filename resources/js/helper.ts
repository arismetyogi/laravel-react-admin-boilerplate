import {User} from "@/types";

export function can(user: User, permission: string): boolean {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

export function hasRole(user: User, role: string): boolean {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
}

