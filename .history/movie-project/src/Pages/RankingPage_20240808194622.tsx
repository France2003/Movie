import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const RankingPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(`${API}top_rated`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch top rated movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-[#1e1e2a] m-auto w-[1200px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Top Rated Movies</h1>

      {movies.length > 0 ? (
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
      ) : (
        <p className="text-center text-lg text-gray-600">No movies found.</p>
      )}
    </div>
  );
};

export default RankingPage;
