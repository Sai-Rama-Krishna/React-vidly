import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import http from "./httpService";

const url = apiUrl + "/auth";

const tokenkey = "token";

 http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenkey);
}
export async function login(email, password) {
  const { data: jwt } = await http.post(url, { email, password });
  localStorage.setItem("token", jwt);
}

export function loginWithjwt(jwt) {
  return localStorage.setItem("token", jwt);
}

export function logout() {
  return localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithjwt,
  
};
