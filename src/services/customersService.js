import http from "./httpService";

const url = "/customers";

export async function getCustomers() {
  return await http.get(url);
}
