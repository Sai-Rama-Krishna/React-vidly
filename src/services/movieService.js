//import { apiUrl } from "../config.json";
import get_movielist from "../redux/actions/movielistAction";
//import { add_movie } from "../redux/actions/movielistAction";

import http from "./httpService";

const url = "/movies";

function movieUrl(id) {
  return `${url}/${id}`;
}
export async function getMovies() {
  return await http.get(url);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    const ss = await http.put(movieUrl(movie._id), body);

    return ss && get_movielist();
  }

  const bb = await http.post(url, movie);
  return (
    bb &&
    // add_movie(movie);
    get_movielist()
  );
}

export function deleteMovie(movieId) {
  const gg = http.delete(movieUrl(movieId));

  return gg;
}
