import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const MovieDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${API}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMovie(response.data);
            } catch (error: any) {
                setError("Failed to fetch movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    return (
        <div className="p-6 bg-[#1e1e2a] min-h-screen overflow-auto">
            {loading ? (
                <p className="text-center text-lg text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-lg text-red-600">{error}</p>
            ) : movie ? (
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{movie.title}</h1>
                    <div className="flex flex-col md:flex-row">
                        <img
                            src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full md:w-1/3 rounded-md shadow-md"
                        />
                        <div className="md:ml-6 flex-grow">
                            <p className="text-lg text-gray-400 mt-4 md:mt-0">{movie.overview}</p>
                            <p className="text-gray-400 mt-4"><strong>Release Date:</strong> {movie.release_date}</p>
                            <p className="text-gray-400 mt-2"><strong>Rating:</strong> {movie.vote_average} / 10</p>
                            <p className="text-gray-400 mt-2"><strong>Genres:</strong> {movie.genres.map((genre: any) => genre.name).join(", ")}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg text-gray-600">Movie not found.</p>
            )}
        </div>
    );
};

export default MovieDetail;
