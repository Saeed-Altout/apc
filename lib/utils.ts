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

export function getRoleName(
  roleId: string,
  roles: { id: number; name: string }[]
): string {
  const role = roles.find((r) => r.id === +roleId);
  return role ? role.name : "Unknown Role";
}

export function getRoles(roles: IRole[]): { id: number; name: string }[] {
  return roles
    .map((role) => {
      return {
        id: role.id,
        name: role.name,
      };
    })
    .sort((a, b) => a.id - b.id);
}
