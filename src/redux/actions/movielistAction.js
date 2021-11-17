import store from "../store/index";

import { getMovies } from "../../services/movieService";

export var GET_MOVIE_LIST = "GET_MOVIE_LIST";
export var ADD_MOVIE_LIST = "ADD_MOVIE_LIST";
export var DELETE_MOVIE_LIST = "DELETE_MOVIE_LIST";

let changedata = [];

async function get_movielist() {
  const data = await getMovies();
  changedata = data.data;
  store.dispatch({
    type: GET_MOVIE_LIST,
    payload: {
      movies: data.data,
      intial: false,
    },
  });
}

export async function delete_movie(movie) {
  const filtered = changedata.filter((movi) => movi._id !== movie._id);
  store.dispatch({
    type: DELETE_MOVIE_LIST,
    payload: {
      movies: filtered,
      intial: false,
    },
  });
}
export async function add_movie(movie) {
  store.dispatch({
    type: ADD_MOVIE_LIST,
    payload: {
      movies: movie,
      intial: false,
    },
  });
}

export default get_movielist;
