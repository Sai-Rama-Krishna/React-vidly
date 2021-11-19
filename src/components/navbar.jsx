import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <h1 className="nav-link" aria-current="page" to="/">
          Vidly
        </h1>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/users">
          Users
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/customers">
          Customers
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/rentals">
          Rentals
        </NavLink>
      </li>
      {user && (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              {user.name}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </React.Fragment>
      )}
      {!user && (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavBar;
