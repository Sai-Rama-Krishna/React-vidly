import { GET_CUSTOMER_LIST } from "../actions/customerslistAction";

const customersReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_CUSTOMER_LIST:
      return payload;
    default:
      return state;
  }
};

export default customersReducer;
