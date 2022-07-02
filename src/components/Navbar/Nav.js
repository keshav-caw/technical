import "../Navbar/Nav.css";
import "../../App.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navbar">
      <Link to={"/"} className="brand">
        {" PROJECT"}
      </Link>

      <div className="menu">
        <Link to={"/about-us"}>
          <li>About us </li>
        </Link>
        <Link to={"/organizational-structure"}>
          <li>Organizational Structure </li>
        </Link>
        <Link to={"/gallery"}>
          <li>Photo gallery </li>
        </Link>
        <Link to={"/contact-us"}>
          <li>Contact us</li>
        </Link>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
