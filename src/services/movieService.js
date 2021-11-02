import { apiUrl } from "../config.json";

import http from "./httpService";

const url = apiUrl + "/movies";

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

    return await http.put(movieUrl(movie._id), body);
  }

  return await http.post(url, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
