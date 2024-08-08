import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FiPlay } from "react-icons/fi";
import MoviesList from "../MoviesList";

const HomePage = () => {
    const [page, setPage] = useState(1);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <section className="home container w-[1060px]" id="home">
                <img src="https://movie-site-delta.vercel.app/img/home-background.png" alt="" className="home-img" />
                <div className="home-text">
                    <h1 className="home-title">Hitman's Wife's <hr />Bodyguard</h1>
                    <p>Releasing 23 July</p>
                    <a href="#" className="watch-btn">
                        <div className="bx">
                            <FiPlay className="" />
                        </div>
                        <span>Watch the trailer</span>
                    </a>
                </div>
            </section>
            <section className="popular container" id="popular">
                <div className="heading">
                    <h2 className="heading-title">Popular Movies</h2>
                </div>
                <div className="popular-content swiper">
                    <MoviesList url={`/popular`} page={page} />
                </div>
            </section>
            <section className="movies-container container" id="movies">
                <div className="heading">
                    <h2 className="heading-title">Now Playing</h2>
                </div>
                <div className="movies-content">
                    <div className="popular-content swiper">
                        <MoviesList url={`/now_playing`} page={page} />
                    </div>
                </div>
            </section>
            <div className="movies-content mt-[30px]">
                <div className="popular-content swiper">
                    <MoviesList url={`/top_rated`} page={page} />
                </div>
            </div>
            <div className="next-page">
                <button onClick={handleNextPage} className="next-btn">Next Page</button>
            </div>
        </>
    );
};

export default HomePage;
