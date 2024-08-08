import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

interface RatingComponentProps {
    movieId: number;
}

const RatingComponent = ({ movieId }: RatingComponentProps) => {
    const [rating, setRating] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [submittedRating, setSubmittedRating] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            // Thực hiện yêu cầu POST tới API
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
            toast.success("Rating submitted successfully!");
            setMessage("Rating submitted successfully!");
            setSubmittedRating(rating); // Cập nhật đánh giá đã gửi
            setRating(""); // Xóa nội dung trong textarea
        } catch (error) {
            // Xử lý lỗi khi gửi yêu cầu
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data);
                const errorMessage = error.response?.data?.status_message || "Failed to submit rating.";
                toast.error(errorMessage);
                setMessage(errorMessage);
            } else {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred.");
                setMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="p-4 bg-[#1e1e2a] rounded-lg shadow-md mt-4">
            {submittedRating && (
                <div className="mt-4 p-5 bg-gray-800 rounded-md text-white leading-8">
                    <h4 className="text-lg font-semibold">Your Submitted Review:</h4>
                    <p >{submittedRating}</p>
                </div>
            )}
            <h3 className="text-xl font-semibold text-white mb-2 mt-5">Rate this Movie</h3>
            <textarea
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 text-white"
                placeholder="Write your review here..."
                rows={4}
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
