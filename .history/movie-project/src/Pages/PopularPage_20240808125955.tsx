import React, { useState } from "react";
import { Helmet } from "react-helmet";
import MoviesListNoSwiper from "../MoviesListNoSwiper";

const PopularPage = () => {
    const [page, setPage] = useState(1);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Popular</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <section className="popular container popular-route" id="popular">
                <div className="heading">
                    <h2 className="heading-title">Popular Movies</h2>
                </div>
                <div className="popular-content flex gap-5 flex-wrap justify-between">
                    <MoviesListNoSwiper url={`/popular`} page={page} />
                </div>
                <div className="pagination-buttons">
                    <button onClick={handlePreviousPage} disabled={page === 1} className="prev-btn">Previous Page</button>
                    <button onClick={handleNextPage} className="next-btn">Next Page</button>
                </div>
            </section>
        </>
    );
};

export default PopularPage;
