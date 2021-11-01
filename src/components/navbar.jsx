import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
        <NavLink className="nav-link" to="/customers">
          Customers
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/rentals">
          Rentals
        </NavLink>
      </li>
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
    </ul>
  );
};

export default NavBar;
