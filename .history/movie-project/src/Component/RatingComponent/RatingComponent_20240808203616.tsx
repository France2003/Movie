import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

interface ReviewComponentProps {
  movieId: number;
}

const RatingComponent = ({ movieId }: ReviewComponentProps) => {
  const [review, setReview] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${API}${movieId}/reviews`,
        { content: review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Review submitted successfully!");
      setMessage("Review submitted successfully!");
      setReview(""); // Clear input after submission
    } catch (error) {
      toast.error("Failed to submit review.");
      setMessage("Failed to submit review.");
    }
  };

  return (
    <div className="p-4 bg-[#1e1e2a] rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-semibold text-white mb-2">Write a Review</h3>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-2 rounded-md bg-gray-700 text-white"
        placeholder="Write your review here..."
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
      >
        Submit Review
      </button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default RatingComponent;
