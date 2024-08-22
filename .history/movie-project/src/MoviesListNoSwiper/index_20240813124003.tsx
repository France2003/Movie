import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

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
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
  }, [url, page, setTotalPages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-3xl animate-spin" />
      </div>
    );
  }
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-[#1e1e2a] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/movie/${movie.id}`} className="group flex flex-col items-center">
              <img
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                alt={movie.original_title}
                className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-lg"
                style={{ border: 1, borderStyle: 'solid', borderColor: 'white' }}
              />
              <div className="mt-2">
                <h2 className="text-lg font-normal text-white group-hover:text-blue-400 transition-colors duration-300">
                  {movie.original_title}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesListNoSwiper;
