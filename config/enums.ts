export enum ModalType {
  ADD_USER = "ADD_USER",
  EDIT_USER = "EDIT_USER",
  EXPORT_USER = "EXPORT_USER",
  ADD_REQUEST = "ADD_REQUEST",
  EDIT_REQUEST = "EDIT_REQUEST",
  APPROVE_REQUEST = "APPROVE_REQUEST",
  REJECT_REQUEST = "REJECT_REQUEST",
  EXPORT_REQUEST = "EXPORT_REQUEST",
  LOGOUT = "LOGOUT",
  DELETE_USER = "DELETE_USER",
  BLOCK_USER = "BLOCK_USER",
  DELETE_MULTIPLE_USERS = "DELETE_MULTIPLE_USERS",
  BLOCK_MULTIPLE_USERS = "BLOCK_MULTIPLE_USERS",
  DELETE_DEVICE = "DELETE_DEVICE",
  SET_MAIN_DEVICE = "SET_MAIN_DEVICE",
}

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
  GUEST = "guest",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  PENDING = "pending",
}

export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
