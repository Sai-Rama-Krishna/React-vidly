import store from "../store/index";
import { toast } from "react-toastify";

import { getGenres } from "../../services/genreService";

export var GET_GENRE_LIST = "GET_GENRE_LIST";

async function get_genres() {
  try {
    const data = await getGenres();
    store.dispatch({
      type: GET_GENRE_LIST,
      payload: {
        genres: data.data,
        intial: false,
      },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 404)
      toast("This Movie already been deleted");
  }
}

export default get_genres;
