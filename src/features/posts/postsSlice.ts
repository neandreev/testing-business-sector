import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISortBy, ISortOrder } from "./types";

const sortOrders: ISortOrder[] = ["ascending", "descending", "none"];

// const carouselSortTypes = (currentSortType: ISortType) => {
//   const newSortType =
//     sortTypes[_.indexOf(sortTypes, currentSortType) + 1] || sortTypes[0];
//   return newSortType as ISortType;
// };

const getNextSortOrder = (currentSortOrder: ISortOrder) => {
  const { length: n } = sortOrders;
  const i = _.indexOf(sortOrders, currentSortOrder) + 1;
  const newSortOrder = sortOrders[(i % n + n) % n];
  return newSortOrder;
}

interface PostsState {
  search: string;
  sortBy: ISortBy;
  sortOrder: ISortOrder;
}

const initialState: PostsState = {
  search: "",
  sortBy: null,
  sortOrder: "none",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    updateSort: (state, action: PayloadAction<string | null>) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = getNextSortOrder(state.sortOrder);
      } else {
        state.sortBy = action.payload;
        state.sortOrder = "ascending";
      }
    },
  },
});

export const { updateSearch, updateSort } = postsSlice.actions;

export default postsSlice.reducer;
