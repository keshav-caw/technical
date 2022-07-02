import "../Landing/Landing.css";
import "../../App.css";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";

export default function Landing() {
  return (
    <>
      <Nav />

      <main>
        <div className="section">
          <div>
            <h1>Programs and Courses</h1>
          </div>
          <div>
            <h1>Notices</h1>
          </div>
          <div>
            <h1>Events</h1>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
