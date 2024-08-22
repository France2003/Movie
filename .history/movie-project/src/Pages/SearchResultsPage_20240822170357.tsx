import { useLocation, useNavigate } from "react-router-dom";
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
        const fetchResults = async () => {
            if (!query) return;

            console.log(`Searching for: ${query}`); // Debugging: Log the query

            try {
                const response = await axios.get(API, {
                    params: { query },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("API Response:", response.data); // Debugging: Log API response
                setResults(response.data.results);
            } catch (error: any) {
                console.error("API Error:", error); // Debugging: Log errors
                setError("Failed to fetch search results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="p-6 bg-[#1e1e2a] min-h-screen">
            <SearchForm initialQuery={query} />
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Results</h1>
            {loading ? (
                <p className="text-center text-lg text-gray-600">Đang tìm kiếm phim...</p>
            ) : error ? (
                <p className="text-center text-lg text-red-600">{error}</p>
            ) : results.length > 0 ? (
                <ul className="space-y-6">
                    {results.map((movie) => (
                        <li key={movie.id} className="bg-[#1e1e2a] rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
                            <p className="text-gray-400">{movie.overview}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-lg text-gray-600">No results found.</p>
            )}
        </div>
    );
};

const SearchForm = ({ initialQuery }: { initialQuery: string }) => {
    const [query, setQuery] = useState(initialQuery);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) { // Ensure the query isn't empty
            console.log(`Navigating to search: ${query}`); // Debugging: Log the navigation
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
