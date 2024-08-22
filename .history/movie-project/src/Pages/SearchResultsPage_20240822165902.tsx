import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://api.themoviedb.org/3/search/movie";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const SearchResultsPage = () => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const query = new URLSearchParams(useLocation().search).get('query') || "";

    useEffect(() => {
        if (query.trim()) {
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

            const timeoutId = setTimeout(fetchResults, 500); 
            return () => clearTimeout(timeoutId);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="p-6 bg-[#1e1e2a] min-h-screen">
            <SearchForm initialQuery={query} />
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Results</h1>
            {query && results.length > 0 && (
                        <>
                            {/* <IoClose
                                onClick={clearSearch}
                                className="text-xl absolute top-2 right-2 cursor-pointer"
                                title="Clear search"
                            /> */}
                            <div className="absolute z-10 w-[240px] bg-white border border-gray-300 rounded-md mt-1">
                                <div className="max-h-[500px] overflow-y-auto p-4">
                                    <ul className="space-y-2">
                                        {results.map((movie) => (
                                            <li key={movie.id} className="p-2 border-b border-gray-300 flex items-center">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                    alt={movie.title}
                                                    className="w-12 h-16 object-cover rounded-md mr-2"
                                                    style={{ border: 1, borderStyle: 'solid', borderColor: 'black' }}
                                                />
                                                <Link to={`/movie/${movie.id}`} className="block">
                                                    <span className="text-black">{movie.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                    {loading && (
                        <div className="absolute z-10 w-[240px] bg-[#1e1e2a] border border-gray-300 rounded-md mt-1 p-2">
                            Loading...
                        </div>
                    )}
                    {error && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 p-2 text-red-600">
                            {error}
                        </div>
                    )}
        </div>
    );
};

const SearchForm = ({ initialQuery }: { initialQuery: string }) => {
    const [query, setQuery] = useState(initialQuery);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 text-center">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="p-2 text-lg rounded-lg border-2 border-gray-300 w-80"
            />
            <button
                type="submit"
                className="ml-4 px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md"
            >
                Search
            </button>
        </form>
    );
};

export default SearchResultsPage;
