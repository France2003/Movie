import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link} from "react-router-dom";

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
        <div>
            
            <main className="container w-[1060px] mt-[50px]">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {!loading && !error && (
                    <div>
                        <h1>Search Results for "{decodeURIComponent(title)}"</h1>
                        <ul>
                            {results.map((movie) => (
                                <li key={movie.id} className="p-2 border-b border-gray-300 flex items-center">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-12 h-16 object-cover rounded-md mr-2"
                                    />
                                    <Link to={`/movie/${movie.id}`} className="block">
                                        <span className="text-black">{movie.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
}

export default SearchResultsPage;
