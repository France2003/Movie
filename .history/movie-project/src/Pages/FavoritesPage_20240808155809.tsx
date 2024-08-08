import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      const fetchMovies = async () => {
        const moviesData = await Promise.all(
          favorites.map((id: number) =>
            axios.get(`${API}${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );
        setMovies(moviesData.map((res) => res.data));
      };

      fetchMovies();
    }
  }, [favorites]);

  return (
    <div className="movie-box">
      <h1>Favorite Movies</h1>
      {movies.length > 0 ? (
        <div className="movies-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`}>
                <img className="movie-box-img"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                  alt={movie.original_title}
                />
                <h2>{movie.original_title}</h2>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite movies found.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
