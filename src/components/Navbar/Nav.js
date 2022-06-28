import "../Navbar/Nav.css";
import "../../App.css";

export default function Nav() {
  return (
    <div className="navbar">
      <a href="/" className="brand">
        {" PROJECT"}
      </a>

      <div className="menu">
        <li>About us </li>
        <li>Organizational Structure </li>
        <li>Photo gallery </li>
        <li>Others</li>
      </div>
    </div>
  );
}
