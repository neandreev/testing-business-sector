import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import { updateSort } from "../../postsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IPosts } from "../../types";
import classes from "./PostsTable.module.css";

interface IPostsTable {
  pagePosts: IPosts;
}

interface IPostsTableBody {
  pagePosts: IPosts;
}

const PostsTableHead: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { sortBy, sortOrder } = useAppSelector((store) => store.posts);

  const handleSort = (key: string) => {
    setSearchParams(`page=1`);
    dispatch(updateSort(key));
  };

  const getSortIconClassname = (key: string) =>
    cn(classes["posts-table__sort-icon"], {
      [classes["posts-table__sort-icon_ascending"]]:
        sortOrder === "ascending" && sortBy === key,
      [classes["posts-table__sort-icon_descending"]]:
        sortOrder === "descending" && sortBy === key,
    });

  return (
    <thead className={classes.thead}>
      <tr className={classes.trhead}>
        <td onClick={() => handleSort("id")}>
          <span>ID</span>
          <i className={getSortIconClassname("id")}></i>
        </td>
        <td onClick={() => handleSort("title")}>
          <span>Заголовок</span>
          <i className={getSortIconClassname("title")}></i>
        </td>
        <td onClick={() => handleSort("body")}>
          <span>Описание</span>
          <i className={getSortIconClassname("body")}></i>
        </td>
      </tr>
    </thead>
  );
};

const PostsTableBody: React.FC<IPostsTableBody> = ({ pagePosts }) => {
  const { search } = useAppSelector((store) => store.posts);

  if (!pagePosts) return <p>Нет постов...</p>;

  const searchText = (text: string) => {
    if (search === "") return text;
    const regex = new RegExp(search, "gi");
    const newText = text.replace(regex, `<mark class="highlight">$&</mark>`);
    return <span dangerouslySetInnerHTML={{ __html: newText }} />;
  };

  return (
    <tbody>
      {pagePosts.map(({ id, title, body }) => {
        const searchedTitle = searchText(title);
        const searchedBody = searchText(body);

        return (
          <tr className={classes.tr} key={id}>
            <td>{id}</td>
            <td>{searchedTitle}</td>
            <td>{searchedBody}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export const PostsTable: React.FC<IPostsTable> = ({ pagePosts }) => (
  <table className={classes["posts-table"]}>
    <PostsTableHead />
    <PostsTableBody pagePosts={pagePosts} />
  </table>
);
