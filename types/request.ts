import { Request } from "@/schemas/request";

export interface IRequestResponse {
  message: string;
  data: {
    request: Request;
  };
}

export interface IRequestsResponse {
  message: string;
  data: {
    items: Request[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
  };
}
