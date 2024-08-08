import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const RankingPage = () => {
  const { movieId } = useParams(); // Lấy ID phim từ URL
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API}${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!movie) return <p>No movie found.</p>;

  return (
    <div className="p-6 bg-[#1e1e2a] m-auto w-[1200px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">{movie.original_title}</h1>
      <div className="flex flex-col items-center">
        <img
          src={`https://www.themoviedb.org/t/p/w780${movie.poster_path}`}
          alt={movie.original_title}
          className="w-[300px] h-[450px] object-cover rounded-md"
        />
        <div className="mt-4 text-white">
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
