import _ from "lodash";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useGetPostsQuery } from "./postsAPI";
import { IPosts, IPost, ISortBy, ISortOrder } from "./types";
import { PostsTable } from "./components/PostsTable/PostsTable";
import { Pagination } from "./components/Pagination/Pagination";
import { Search } from "./components/Search/Search";

interface ISortPosts {
  filteredPosts: IPosts;
  sortBy: ISortBy;
  sortOrder: ISortOrder;
}

const sortPosts = ({ filteredPosts, sortBy, sortOrder }: ISortPosts) => {
  if (sortBy === null || sortOrder === "none") return filteredPosts;

  const sortedPosts = _.sortBy(filteredPosts, sortBy);
  return sortOrder === "ascending" ? sortedPosts : sortedPosts.reverse();
};

export const Posts: React.FC = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const [searchParams] = useSearchParams();
  const { search, sortBy, sortOrder } = useAppSelector((store) => store.posts);

  const currentPageNumber = +searchParams.get("page")! || 1;

  if (isLoading) return <p>Загрузка постов...</p>;
  if (!posts || error) return <p>Нет данных!</p>;

  const filteredPosts = posts.filter(
    ({ title, body }: IPost) => title.includes(search) || body.includes(search)
  );
  const sortedPosts = sortPosts({ filteredPosts, sortBy, sortOrder });
  const pagesPosts = _.chunk(sortedPosts, 10);
  const pagePosts = pagesPosts[currentPageNumber - 1];
  const amountOfPages = pagesPosts.length;

  return (
    <div>
      <Search />
      <PostsTable pagePosts={pagePosts} />
      <Pagination
        currentPageNumber={currentPageNumber}
        amountOfPages={amountOfPages}
      />
    </div>
  );
};
