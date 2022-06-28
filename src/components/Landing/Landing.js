import "../Landing/Landing.css";
import "../../App.css";
import Nav from "../Navbar/Nav";
import comingSoon from "../../assets/coming-soon.jpg";

export default function Landing() {
  return (
    <main>
      <Nav />
      <div className="landing">
        <h1>Coming Soon...</h1>
        <img src={comingSoon} alt="Coming Soon" />
      </div>
    </main>
  );
}
