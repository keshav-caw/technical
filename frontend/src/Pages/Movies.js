import React, { useState, useEffect } from "react";
import "./Movies.css";
import { StarIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Nav from "../components/Navbar/Nav";

const customStyles = {
  content: {
    width: "25%",
    height: "25%",
    padding: "1.5rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: "15px",
  },
};

export default function Movies({ token, setMovie }) {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState();
  const [id, setId] = useState("");

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(idd) {
    setId(idd);
    setIsOpen(true);
  }

  const generateKey = (pre) => {
    const result =  `${pre}_${new Date().getTime()}`;
    return result;
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getMovies = async () => {
    try {
      const { data } = await axios.get("/movies", config);
      setMovies(data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const deleteMovie = async () => {
    try {
      await axios.post("/movies/delete", { id }, config);
      getMovies();
      closeModal();
    } catch (error) {
      setMessage(error.response.data.message);
      closeModal();
    }
  };

  const navigator = useNavigate();
  return (
    <>
      <Nav />
      <main className="main">
        <button
          type="button"
          className="button"
          onClick={() => navigator("../newMovie")}
        >
          + Add new Movie
        </button>
        {message && message.length > 0 && (
          <div className="message">{message}</div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="sure">Are you sure</div>
          <div className="buttons">
            <button type="button" className="button" onClick={deleteMovie}>
              Yes
            </button>
            <button type="button" className="button" onClick={closeModal}>
              No
            </button>
          </div>
        </Modal>
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => (
            <div className="movie" key={movie._id}>
              <div className="title">{movie.title}</div>
              <div className="platform">on - {movie.platform}</div>
              <div className="rating">
                {Array(movie.rating)
                  .fill()
                  .map((_, i) => (
                    <StarIcon className="rate" key={generateKey(i)} />
                  ))}
              </div>
              <div className="review">{movie.review}</div>
              <div className="icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() => {
                    setMovie(movie);
                    navigator("../edit");
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: "red" }}
                  onClick={() => openModal(movie._id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}

Movies.propTypes = {
  token: PropTypes.string,
  setMovie: PropTypes.func.isRequired,
};

Movies.defaultProps = {
  token: "",
};
