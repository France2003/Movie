import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://api.themoviedb.org/3/search/movie";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

function SearchResultsPage() {
    const { title } = useParams<{ title?: string }>();
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (title) {
            const fetchResults = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(API, {
                        params: { query: decodeURIComponent(title) },
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

            fetchResults();
        }
    }, [title]);

    return (
        <div className="w-full max-w-screen-lg mx-auto mt-8 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Search Results for "{decodeURIComponent(title)}"
            </h1>
            
            {loading && <p className="text-center text-blue-600">Loading...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((movie) => (
                        <div key={movie.id} className="bg-[#1e1e2a] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                            <Link to={`/movie/${movie.id}`} className="group flex flex-col items-center">
                                <span className="text-white text-xl font-bold mr-4"></span>
                                <img
                                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 truncate">{movie.title}</h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResultsPage;
