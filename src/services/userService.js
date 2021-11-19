// import { apiUrl } from "../config.json";

import http from "./httpService";

const url = "/users";

export async function getUsers() {
  return await http.get(url);
}

export function register(user) {
  return http.post(url, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
