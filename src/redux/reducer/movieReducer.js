import { GET_MOVIE_LIST, ADD_MOVIE_LIST } from "../actions/movielistAction";
import store from "../store/index";

const movieReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_LIST:
      return payload;

    case ADD_MOVIE_LIST:
      state = payload.movies;
      return state;
    default:
      return state;
  }
};

export default movieReducer;
