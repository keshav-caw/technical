import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "../components/Navbar/Nav";
import "./NewMovie.css";

export default function NewMovie ({token}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${token}`
    },
  };
  const addMovie = async () => {
    try {
      if(rating>10 || rating<1){
        setMessage("Rating can only be from 1 to 10!");
        return;
      }
      await axios.post(
        "/movies/create",
        { title, platform, rating, review },
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
        <h2 className="center">Add movies</h2>
        {message && message.length > 0 && (
          <div className="message">{message}</div>
        )}
        <div className="input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
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
        <button type="button" className="center whitener" onClick={addMovie}>Add Movie</button>
      </main>
    </>
  );
};

NewMovie.propTypes = {
  token: PropTypes.string
}

NewMovie.defaultProps = {
  token: ''
}