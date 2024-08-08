import { useState } from "react";
import axios from "axios";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

interface RatingComponentProps {
  movieId: number;
}

const RatingComponent = ({ movieId }: RatingComponentProps) => {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${API}${movieId}/rating`,
        { value: rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Rating submitted successfully!");
    } catch (error) {
      setMessage("Failed to submit rating.");
    }
  };

  return (
    <div className="p-4 bg-[#1e1e2a] rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-semibold text-white mb-2">Rate this Movie</h3>
      <input
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full p-2 rounded-md bg-gray-700 text-white"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
      >
        Submit Rating
      </button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default RatingComponent;
