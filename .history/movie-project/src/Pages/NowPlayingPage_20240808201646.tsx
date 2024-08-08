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
            <section className="container">
                <div className="heading mt-[70px]">
                    <h2 className="heading-title">Now Playing</h2>
                </div>
                <div className="popular-content swiper flex gap-5 flex-wrap justify-between">
                    <MoviesListNoSwiper 
                        url={`/top_rated`} 
                        page={currentPage} 
                        setTotalPages={setTotalPages} 
                    />
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-8">
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
