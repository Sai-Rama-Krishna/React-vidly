import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import genreReducer from "./genresReducer";



export default function entities(){
    return combineReducers({
        getmovielist: movieReducer ,
        getgenrelist:genreReducer
    });
}