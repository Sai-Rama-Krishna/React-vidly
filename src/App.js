import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import React from "react";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import notFound from "./components/notFound";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import auth from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./components/registerForm";
import Users from "./components/users";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <ProtectedRoute path="/movies/new" component={MovieForm} />
            <ProtectedRoute
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></ProtectedRoute>
            <ProtectedRoute path="/users" component={Users}></ProtectedRoute>
            <ProtectedRoute
              path="/customers"
              component={Customers}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/rentals"
              component={Rentals}
            ></ProtectedRoute>
            <Route path="/notfound" component={notFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/notfound" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
