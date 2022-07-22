import React,{ useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditMovie from "./Pages/EditMovie";
import Login from "./Pages/Login";
import Movies from "./Pages/Movies";
import NewMovie from "./Pages/NewMovie";

function App() {
  const [token,setToken] = useState('');
  const [movie,setMovie] = useState();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/movies" element={<Movies token={token} setMovie={setMovie} />} />
        <Route path="/newMovie" element={<NewMovie token={token} />} />
        <Route path="/edit" element={<EditMovie token={token} movie={movie} />} />
      </Routes>
    </Router>
  );
}

export default App;
