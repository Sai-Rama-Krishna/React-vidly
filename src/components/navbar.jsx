import React from "react";
import { Link, NavLink } from "react-router-dom";

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
    </ul>
  );
};

export default NavBar;
