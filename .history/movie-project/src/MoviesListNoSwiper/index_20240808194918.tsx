import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

interface MoviesListNoSwiperProps {
  url: string;
  page: number;
  setTotalPages: (totalPages: number) => void;
}

const MoviesListNoSwiper = ({ url, page, setTotalPages }: MoviesListNoSwiperProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API}${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className="space-y-6">
      {movies.map((movie) => (
        <li key={movie.id} className="bg-[#1e1e2a] rounded-lg shadow-md flex items-center p-4 hover:shadow-lg transition-shadow duration-300">
          <Link to={`/movie/${movie.id}`} className="flex items-center container">
            <img
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
              alt={movie.original_title}
              className="w-20 h-30 object-cover rounded-md"
              style={{ border: 1, borderStyle: 'solid', borderColor: 'white' }}
            />
            <div className="ml-4 flex-1">
              <h2 className="text-xl font-normal text-white">{movie.original_title}</h2>
              <p className="text-gray-400">Rating: {movie.vote_average}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesListNoSwiper;
