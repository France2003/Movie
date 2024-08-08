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
  const [removedMovieTitle, setRemovedMovieTitle] = useState<string | null>(null);

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
        // Sort movies by ID in descending order
        const sortedMovies = moviesData.map((res) => res.data).sort((a, b) => b.id - a.id);
        setMovies(sortedMovies);
      };

      fetchMovies();
    }
  }, [favorites]);

  const removeFavorite = async (movieId: number) => {
    // Get the movie title before removing
    const movieToRemove = movies.find(movie => movie.id === movieId);
    const movieTitle = movieToRemove?.original_title || "Unknown title";
    
    const updatedFavorites = favorites.filter(id => id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setMovies(movies.filter(movie => movie.id !== movieId));

    // Set the notification message with the movie title
    setRemovedMovieTitle(movieTitle);
    setNotification(`Đã xóa phim "${movieTitle}" khỏi danh sách yêu thích!`);

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
      setRemovedMovieTitle(null);
    }, 300000);
  };

  return (
    <div className="p-6 bg-[#1e1e2a] mt-[70px] m-auto w-[1200px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Favorite Movies</h1>

      {/* Notification */}
      {notification && (
        <div className="mb-4 p-3 bg-green-600 text-white w-[450px] fixed top-[90px] left-[1060px]  z-10  rounded-md">
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
                  style={{border:1, borderStyle:'solid', borderColor:'white'}}
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-normal text-white">{movie.original_title}</h2>
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
