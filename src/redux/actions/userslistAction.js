import store from "../store/index";
import { toast } from "react-toastify";

import { getUsers } from "../../services/userService";

export var GET_USERS_LIST = "GET_USERS_LIST";

async function get_users() {
  try {
    const data = await getUsers();
    store.dispatch({
      type: GET_USERS_LIST,
      payload: {
        users: data.data,
        intial: false,
      },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404)
      toast("This Movie already been deleted");
  }
}

export default get_users;
