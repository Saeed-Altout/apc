export enum ModalType {
  ADD_USER = "ADD_USER",
  EDIT_USER = "EDIT_USER",
  BLOCK_USER = "BLOCK_USER",
  DELETE_USER = "DELETE_USER",
  EXPORT_USER = "EXPORT_USER",
}

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  PENDING = "pending",
}
