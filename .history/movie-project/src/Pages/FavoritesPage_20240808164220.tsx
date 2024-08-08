import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

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

  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter(id => id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setMovies(movies.filter(movie => movie.id !== movieId));

    // Show notification
    setNotification("Đã xóa phim khỏi danh sách yêu thích!");

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="p-6 bg-[#1e1e2a] mt-5 m-auto w-[1200px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Favorite Movies</h1>

      {/* Notification */}
      {notification && (
        <div className="mb-4 p-3 bg-green-600 text-white text-center rounded-md">
          {notification}
        </div>
      )}

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
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-semibold text-white">{movie.original_title}</h2>
                </div>
              </Link>
              <button
                onClick={() => removeFavorite(movie.id)}
                className="ml-4 text-white hover:text-red-700 text-[25px]"
              >
                <FaDeleteLeft />
              </button>
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
