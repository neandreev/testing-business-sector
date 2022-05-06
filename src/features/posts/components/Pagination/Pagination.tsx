import _ from "lodash";
import cn from "classnames";
import { Link, useSearchParams } from "react-router-dom";
import classes from "./Pagination.module.css";

interface IPagination {
  currentPageNumber: number;
  amountOfPages: number;
}

export const Pagination: React.FC<IPagination> = ({
  currentPageNumber,
  amountOfPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePrevPage = () => {
    if (currentPageNumber === 1) return;
    setSearchParams(`page=${currentPageNumber - 1}`);
  };
  const handleNextPage = () => {
    if (currentPageNumber === amountOfPages) return;
    setSearchParams(`page=${currentPageNumber + 1}`);
  };

  const pagesArray = _.times(amountOfPages, (n) => n + 1);

  return (
    <div className={classes.pagination}>
      <button
        className={classes["pagination__nav-button"]}
        onClick={handlePrevPage}
      >
        Назад
      </button>
      <div>
        {pagesArray.map((pageNumber) => {
          const className = cn(classes["pagination__page-link"], {
            [classes["pagination__page-link_current"]]:
              pageNumber === currentPageNumber,
          });

          return (
            <Link
              className={className}
              to={`/?page=${pageNumber}`}
              key={pageNumber}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>
      <button
        className={classes["pagination__nav-button"]}
        onClick={handleNextPage}
      >
        Далее
      </button>
    </div>
  );
};
