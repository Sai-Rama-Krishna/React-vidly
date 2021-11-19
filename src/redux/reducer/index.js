import { combineReducers } from "redux";
// import entitiesReducer from "./entities";
import movieReducer from "./movieReducer";
import genreReducer from "./genresReducer";
import customersReducer from "./customersReducer";
import usersReducer from "./usersReducer";

export default function allReducers() {
  return combineReducers({
    // getentites:entitiesReducer,
    getmovielist: movieReducer,
    getgenrelist: genreReducer,
    getcustomerslist: customersReducer,
    getuserslist: usersReducer,
  });
}
