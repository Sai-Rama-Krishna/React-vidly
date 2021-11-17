import store from "../store/index";
import { toast } from "react-toastify";

import { getCustomers } from "../../services/customersService";

export var GET_CUSTOMER_LIST = "GET_CUSTOMER_LIST";

async function get_customers() {
  try {
    const data = await getCustomers();
    store.dispatch({
      type: GET_CUSTOMER_LIST,
      payload: {
        customers: data.data,
        intial: false,
      },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404)
      toast("This Movie already been deleted");
  }
}

export default get_customers;
