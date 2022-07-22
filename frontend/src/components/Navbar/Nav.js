import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import "../../App.css";


export default function Nav() {
  return (
    <div className="navbar">
      <Link to="/" className="brand">
        {" PROJECT"}
      </Link>

      <div className="menu">
        <Link to="/movies">
          <li>Movies </li>
        </Link>
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      </div>
    </div>
  );
}
