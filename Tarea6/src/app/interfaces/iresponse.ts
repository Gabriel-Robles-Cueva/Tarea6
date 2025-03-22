import { IUser } from "./iuser";

export interface IResponse {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  results: IUser[];
}