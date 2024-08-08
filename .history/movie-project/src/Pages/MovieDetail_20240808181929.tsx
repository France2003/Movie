import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API = "https://api.themoviedb.org/3/search/movie";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const MovieDetail = () => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || "";

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API, {
                    params: { query },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setResults(response.data.results);
            } catch (error: any) {
                setError("Failed to fetch search results.");
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <div className="p-6 bg-[#1e1e2a]">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Results</h1>
            {loading ? (
                <p className="text-center text-lg text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-lg text-red-600">{error}</p>
            ) : results.length > 0 ? (
                <ul className="space-y-6">
                    {results.map((movie) => (
                        <li key={movie.id} className="bg-[#1e1e2a] rounded-lg shadow-md p-4">
                            <div className="flex items-center">
                                <img
                                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-12 h-16 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
                                    <p className="text-gray-400">{movie.overview}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-lg text-gray-600">No results found.</p>
            )}
        </div>
    );
};

export default MovieDetail;
