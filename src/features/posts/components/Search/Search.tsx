import { useSearchParams } from "react-router-dom";
import { updateSearch } from "../../postsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ReactComponent as SearchIcon } from "./SearchIcon.svg";
import classes from "./Search.module.css";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((store) => store.posts);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(`page=1`);
    dispatch(updateSearch(e.target.value));
  };

  return (
    <div className={classes.search}>
      <input
        className={classes["search__input"]}
        type='text'
        placeholder='Поиск'
        value={search}
        onChange={handleSearch}
      />
      <SearchIcon className={classes["search__icon"]} />
    </div>
  );
};
