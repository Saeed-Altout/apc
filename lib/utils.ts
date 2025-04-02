import { ROLES } from "@/config/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(value: any) {
  if (value instanceof File) {
    return URL.createObjectURL(value);
  } else if (typeof value === "string") {
    return value;
  }
  return "";
}

export function getRoleId(role: any): string {
  if (!role) return "";
  if (typeof role === "string") return role;
  if (typeof role === "number") return String(role);
  if (typeof role === "object" && role.id) {
    return String(role.id);
  }
  return "";
}

export function getRoleName(roleId: string): string {
  const role = ROLES.find((r) => r.id === roleId);
  return role ? role.name : "Unknown Role";
}
