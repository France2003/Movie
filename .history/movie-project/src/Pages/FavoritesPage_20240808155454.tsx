import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="favorites-page p-4">
      <h1 className="text-3xl font-bold mb-4">Favorite Movies</h1>
      {movies.length > 0 ? (
        <div className="movies-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item bg-gray-800 text-white p-2 rounded-lg">
              <Link to={`/movie/${movie.id}`} className="block">
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-auto object-cover mb-2 rounded"
                />
                <h2 className="text-lg font-semibold">{movie.original_title}</h2>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No favorite movies found.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
