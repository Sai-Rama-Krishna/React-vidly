import { apiUrl } from "../config.json";

import http from "./httpService";

const url = apiUrl + "/movies";

export async function getMovies() {
  return await  http.get(url);
}
export function getMovie(movieId) {
  return http.get(url + "/" + movieId + "s");
}

export  async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
     return  await http.put(url + "/" + movie._id, movie);
  }

  return await  http.post(url, movie);
}

export function deleteMovie(movieId) {
  return http.delete(url + "/" + movieId);
}
