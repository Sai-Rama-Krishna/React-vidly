import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import get_genres from "../redux/actions/genreslistAction";
import get_movielist from "../redux/actions/movielistAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: [],
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Daily Rental Rate"),
  };

  async populateGenre() {
    const { data: genres } = await getGenres();

    // let rrr = (await this.props) && this.props.getgenrelist;
    // const data = rrr.genres;

    this.setState({ genres: genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;

      let ttt = await this.props.getmovielist;
      const mvve = ttt.movies;

      if (movieId === "new") return;
      let movie = mvve.find((obj) => obj._id === movieId);
      // const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    if (!this.props.getmovielist) {
      await get_movielist();
    }
    if (!this.props.getgenrelist) {
      await get_genres();
    }

    await this.populateMovie();
    await this.populateGenre();
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    // await  get_movielist();

    // this.setState({ movies });
    this.props.history.push("/movies");
  };
  render() {
    const user = auth.getCurrentUser();
    if (!user.isAdmin) return <Redirect to="/movies" />;

    return (
      <div>
        <h1> MovieForm</h1>
        <form onSubmit={this.handlesubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1> MoiveForm {match.params.id}</h1>;
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

const mapStateToProps = (state) => {
  return {
    getgenrelist: state.getgenrelist,
    getmovielist: state.getmovielist,

    //  entities : state.entities
  };
};

export default connect(mapStateToProps)(MovieForm);
