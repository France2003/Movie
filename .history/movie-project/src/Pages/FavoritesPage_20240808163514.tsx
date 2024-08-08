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
    <div className="p-6 bg-[#1e1e2a] w-[650px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Favorite Movies</h1>
      {movies.length > 0 ? (
        <ul className="space-y-6">
          {movies.map((movie) => (
            <li key={movie.id} className="bg-[#1e1e2a] rounded-lg shadow-md flex items-center p-4 hover:shadow-lg transition-shadow duration-300">
              <Link to={`/movie/${movie.id}`} className="flex items-center container">
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-20 h-30 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{movie.original_title}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-600">No favorite movies found.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
