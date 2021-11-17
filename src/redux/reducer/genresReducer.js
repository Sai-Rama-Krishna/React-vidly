import { GET_GENRE_LIST } from "../actions/genreslistAction";

const genreReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_GENRE_LIST:
      
      return payload;
    default:
      return state;
  }
};

export default genreReducer;
