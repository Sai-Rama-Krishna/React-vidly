import { GET_USERS_LIST } from "../actions/userslistAction";

const usersReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_USERS_LIST:
      return payload;
    default:
      return state;
  }
};

export default usersReducer;
