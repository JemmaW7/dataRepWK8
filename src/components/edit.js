import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Component to edit movie details
export default function Edit(props) {
  let { id } = useParams(); // Get movie ID from URL params
  const [title, setTitle] = useState(""); // State for movie title
  const [year, setYear] = useState(""); // State for release year
  const [poster, setPoster] = useState(""); // State for poster URL
  const navigate = useNavigate(); // Hook for navigation

  // Fetch movie details when component mounts or ID changes
  useEffect(() => {
    axios.get('http://localhost:4000/api/movie/' + id)
        .then((response) => {
            setTitle(response.data.title); // Set title state
            setYear(response.data.year);  // Set year state
            setPoster(response.data.poster); // Set poster state
        })
        .catch((error) => console.log(error)); // Log errors
  }, [id]);

  // Handle form submission to update movie details
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form behavior
    const newMovie = { id, title, year, poster }; // Updated movie object
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)
        .then((res) => {
            console.log("Success:" + res.data); // Log success
            navigate('/read'); // Redirect to the read page
        });
  }

  // Render the edit form
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Edit Movie Title: </label>
                <input type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Edit Release Year: </label>
                <input type="text" 
                className="form-control" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Poster URL: </label>
                <input type="text" 
                className="form-control" 
                value={poster} 
                onChange={(e) => setPoster(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="submit" value="Edit Movie" className="btn btn-primary" />
            </div>
        </form>
    </div>
  );
}
