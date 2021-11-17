import React from "react";
import MoviesTable from "./moviesTable";
import { toast } from "react-toastify";
import _ from "lodash";
// import auth from "../services/authService";
import { deleteMovie } from "../services/movieService";
// import { getMovies, deleteMovie } from "../services/fakeMovieService";
// import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { connect } from "react-redux";
import get_movielist from "../redux/actions/movielistAction";
import get_genres from "../redux/actions/genreslistAction";
// import entities from "../redux/reducer/entities";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [{ _id: "", name: "All Genres" }],
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  // async componentDidMount() {

  //   const { data } = await getGenres();
  //   const genres = [{ name: "All Genres", _id: "" }, ...data];

  //   const { data: movies } = await getMovies();

  //   this.setState({ genres, movies });
  // }

  // async componentDidUpdate() {
  //   // console.log("updated");
  //   const moviesInStore = await this.props.getmovielist;
  //   // console.log(moviesInStore);
  //   if (this.state.movies !== moviesInStore)
  //     this.setState({ movies: moviesInStore });
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  componentDidMount = async () => {
    if (!this.props.getmovielist) {
      await get_movielist();
    }
    if (!this.props.getgenrelist) {
      await get_genres();
    }

    // this.unsubscribe = store.subscribe(async () => {
    //   // if (this.state.movies !== moviesInStore)
    // });

    // const { data } = await getGenres();

    // const stt = this.props;
    // console.log(stt);

    const ss = (await this.props) && this.props.getgenrelist;

    const genres = [...ss.genres];

    // const {data:movies} = await getMovies();

    const dd = await this.props.getmovielist;

    await this.setState({ movies: dd.movies, genres });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);

    try {
      await deleteMovie(movie._id);
      // get_movielist();
      // setTimeout(async () => {}, 1000);
      this.setState({ movies });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast("This Movie already been deleted");
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { searchQuery } = this.state.movies;

    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row mt-5">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && user.isAdmin && (
            <Link to="/movies/new" style={{ marginBottom: 20 }}>
              New Movie
            </Link>
          )}
          <p className="mt-3"> Showing {totalCount} movies in database </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

// export default Movies;

const mapStateToProps = (state) => {
  return {
    getmovielist: state.getmovielist,
    getgenrelist: state.getgenrelist,
    //  entities : state.entities
  };
};

export default connect(mapStateToProps)(Movies);
