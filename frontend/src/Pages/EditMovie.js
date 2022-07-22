import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "../components/Navbar/Nav";
import "./NewMovie.css";


export default function EditMovie({ token, movie }) {
  const [id] = useState(movie._id);
  const [title, setTitle] = useState(movie.title);
  const [platform, setPlatform] = useState(movie.platform);
  const [rating, setRating] = useState(movie.rating);
  const [review, setReview] = useState(movie.review);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const editMovie = async () => {
    try {
      if(rating>10 || rating<1){
        setMessage("Rating can only be from 1 to 10!");
        return;
      }
      await axios.post(
        "/movies/edit",
        { id, title, platform, rating, review },
        config
      );
      navigate("../movies");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Nav />
      <main className="main">
        <h2 className="center">Edit movies</h2>
        {message && message.length > 0 && (
          <div className="message">{message}</div>
        )}
        <div className="input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="Title"
            className="padder"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="platform">Platform</label>
          <input
            type="text"
            id="platform"
            className="padder"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            min={1}
            max={10}
            id="rating"
            className="padder"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="review">Review</label>
          <textarea
            type="text"
            id="review"
            className="padder"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button className="center whitener" onClick={editMovie} type="button">
          Edit Movie
        </button>
      </main>
    </>
  );
}

EditMovie.propTypes = {
  token: PropTypes.string.isRequired,
  movie: PropTypes.object,
};

EditMovie.defaultProps = {
  movie:{}
}
