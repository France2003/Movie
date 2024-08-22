import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const RankingPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchTopRatedMovies = async (page: number) => {
      try {
        const response = await axios.get(`${API}top_rated`, {
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
        setError("Failed to fetch top rated movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-[#1e1e2a] m-auto w-[1200px] mt-[70px] animate__animated animate__fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-center text-white animate__animated animate__fadeInDown">
        Top Rated Movies
      </h1>

      {movies.length > 0 ? (
        <ul className="space-y-6">
          {movies.map((movie, index) => (
            <li
              key={movie.id}
              className="bg-[#2e2e38] rounded-lg shadow-md flex items-center p-4 hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp"
            >
              <Link to={`/movie/${movie.id}`} className="flex items-center container group">
                <span className="text-white text-xl font-bold mr-4">
                  {(currentPage - 1) * 20 + index + 1}
                </span>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-20 h-30 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  style={{ border: 1, borderStyle: "solid", borderColor: "white" }}
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-normal text-white group-hover:text-blue-400 transition-colors duration-300">
                    {movie.original_title}
                  </h2>
                  <p className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    Rating: {movie.vote_average}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-600">No movies found.</p>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded-l transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded-r transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RankingPage;
