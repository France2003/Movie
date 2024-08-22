import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const API = "https://api.themoviedb.org/3/search/movie";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

function SearchResultsPage() {
    const { title } = useParams<{ title?: string }>();
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (title) {
            const fetchResults = async () => {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                try {
                    const response = await axios.get(API, {
                        params: {
                            query: decodeURIComponent(title),
                            page: currentPage
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setResults(response.data.results);
                    setTotalPages(response.data.total_pages);
                } catch (error: any) {
                    setError("Failed to fetch search results.");
                } finally {
                    setLoading(false);
                }
            };

            fetchResults();
        }
    }, [title, currentPage]);

    if (loading) {
        return <div className="loading-spinner m-auto">
            <div className="spinner"></div>
        </div>
    }
    if (!title) return <p className="text-center text-red-600">{error}</p>;
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full max-w-screen-lg mx-auto mt-[90px] px-6">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Search Results for "{decodeURIComponent(title)}"</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <h1 className="text-3xl font-bold text-white mb-4">
                Search Results for "{decodeURIComponent(title)}"
            </h1>
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                        {results.map((movie) => (
                            <div key={movie.id} className="bg-[#1e1e2a] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                                <Link to={`/movie/${movie.id}`} className="group flex flex-col items-center">
                                    <img
                                        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                                        alt={movie.original_title}
                                        className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-lg"
                                        style={{ border: '1px solid white' }}
                                    />
                                    <div className="mt-2">
                                        <h2 className="text-lg font-normal text-white group-hover:text-blue-400 transition-colors duration-300">
                                            {movie.original_title}
                                        </h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-blue-600 text-white px-4 py-2 rounded-l disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-white">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchResultsPage;
