import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = "https://api.themoviedb.org/3/tv/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const TVShowDetailsPage = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState<any>(null);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const response = await axios.get(`${API}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShowDetails(response.data);

        const seasonsResponse = await axios.get(`${API}${id}/season/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSeasons(seasonsResponse.data.seasons);
      } catch (err) {
        setError("Failed to fetch TV show details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-[#1e1e2a] m-auto w-[1200px] mt-[70px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">{showDetails?.name}</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">Seasons</h2>
        <ul className="space-y-4">
          {seasons.map((season) => (
            <li key={season.id} className="bg-[#2e2e3a] p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white">{season.name}</h3>
              <p className="text-gray-400">Number of Episodes: {season.episode_count}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TVShowDetailsPage;
