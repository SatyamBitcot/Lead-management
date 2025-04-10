export type AnyType<T> = T | undefined | null | void | [];

export type PaginationParamsT = {
  size: number;
  page: number;
  search: string;
  direction?: "ASC" | "DESC";
  sortBy?: string;
  sort?: "ASC" | "DESC";
};

export type UsePaginationT = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

export type User_Management_Type = {
  userName: string;
  role: string;
  accounts: string[];
  entityName?: string;
  entityId?: string;
  AccountIds?: string[];
};
