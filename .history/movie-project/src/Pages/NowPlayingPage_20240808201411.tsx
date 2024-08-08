import { useState } from "react";
import { Helmet } from "react-helmet";
import MoviesListNoSwiper from "../MoviesListNoSwiper";

const NowPlayingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Now Playing</title>
                <link rel="canonical" href="http://mysite.com/now_playing" />
            </Helmet>
            <section className="container mx-auto p-6 mt-10">
                <div className="heading mb-6">
                    <h2 className="text-3xl font-bold text-center text-white">Now Playing</h2>
                </div>
                <div className="movies-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <MoviesListNoSwiper 
                        url={`/top_rated`} 
                        page={currentPage} 
                        setTotalPages={setTotalPages} 
                    />
                </div>
                {/* Pagination Controls */}
                <div className="pagination-controls flex justify-center mt-8">
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-blue-600 text-white px-4 py-2 rounded-l"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r"
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
};

export default NowPlayingPage;
