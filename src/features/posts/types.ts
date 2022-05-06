export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type IPosts = IPost[];
export type ISortBy = string | null;
export type ISortOrder = "ascending" | "descending" | "none";
