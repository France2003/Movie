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
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Favorite Movies</h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <Link to={`/movie/${movie.id}`} className="block">
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">{movie.original_title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">No favorite movies found.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
