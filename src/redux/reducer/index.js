import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import movieReducer from "./movieReducer";
import genreReducer from "./genresReducer";
import customersReducer from "./customersReducer";

export default function allReducers() {
  return combineReducers({
    // getentites:entitiesReducer,
    getmovielist: movieReducer,
    getgenrelist: genreReducer,
    getcustomerslist: customersReducer,
  });
}
