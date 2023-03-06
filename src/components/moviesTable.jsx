import React from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";
// import loading from "./common/loading";
import ReactLoading from "react-loading";

class MoviesTable extends React.Component {
  state = {
    isLoading: null,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  colums = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },

    {
      key: "like",
      label:'Like',
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: " Delete",
    label:'Action',
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    this.state = { isLoading: true };
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.colums.push(this.deleteColumn);
  }
  render() {
    const { movies, sortColumn, onSort } = this.props;

    return this.state.isLoading ? (
      <div>
        <ReactLoading type="bars" color="#aaaa" height={"30%"} width={"30%"} />
      </div>
    ) : (
      <div>
        <Table
          colums={this.colums}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default MoviesTable;
