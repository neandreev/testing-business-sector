import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPosts } from "./types";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPosts, void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
