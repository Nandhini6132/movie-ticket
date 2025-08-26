import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies2020 = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = '63ba76a2';
      const year = 2020;
      const letters = 'earth'
      const moviesList = [];

      for (const letter of letters) {
        try {
          const response = await axios.get(`http://www.omdbapi.com/?s=${letters}&y=${year}&Plot=Full&apikey=63ba76a2`);
          if (response.data && response.data.Response === "True") {
            response.data.Search.forEach(movie => {
              if (movie.Year === year.toString()) {
                moviesList.push(movie);
              }
            });
          }
          console.log(response.data)
        } catch (error) {
          console.error(`Error fetching data for letter: ${letter}`, error);
          setError(error);
          break;
        }
      }

      setMovies(moviesList);
      setLoading(false);
    };

    fetchMovies();
    
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movies: {error.message}</div>;
  }

  return (
    <></>
  );
};

export default Movies2020;
