import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <NavLink to="/" className="navbar-brand">
        Inventory Mechanical Shop
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <NavLink to="/" className="nav-link" exact activeClassName="active">
            Inventory List
          </NavLink>
          <NavLink
            to="/create"
            className="nav-link"
            exact
            activeClassName="active"
          >
            Add to Inventory
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
