import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Gallery from "./components/Gallery/Gallery";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import OrganizationalStructure from "./Pages/OrganizationalStructure";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/organizational-structure"
          element={<OrganizationalStructure />}
        />
      </Routes>
    </Router>
  );
}

export default App;
