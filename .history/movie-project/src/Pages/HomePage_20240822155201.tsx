import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FiPlay } from "react-icons/fi";
import MoviesList from "../MoviesList";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        const elementsLeft = document.querySelectorAll('.animate-from-left');
        const elementsRight = document.querySelectorAll('.animate-from-right');

        elementsLeft.forEach((el) => observer.observe(el));
        elementsRight.forEach((el) => observer.observe(el));

        return () => {
            elementsLeft.forEach((el) => observer.unobserve(el));
            elementsRight.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <section className="home container mx-auto my-8 px-4 lg:px-0" id="home">
                <img
                    src="https://movie-site-delta.vercel.app/img/home-background.png"
                    alt="Home Background"
                    className="home-img w-full h-auto"
                />
                <div className="home-text mt-8 text-center lg:text-left">
                    <h1 className="home-title text-3xl lg:text-4xl font-bold text-white">
                        Hitman's Wife's <hr className="my-2 border-t-2 border-white inline-block w-16 lg:w-24" />
                        Bodyguard
                    </h1>
                    <p className="text-base lg:text-lg text-white">Releasing 23 July</p>
                    <a href="#" className="watch-btn inline-flex items-center justify-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-full">
                        <FiPlay className="mr-2" />
                        <span>Watch the trailer</span>
                    </a>
                </div>
            </section>
            <section className="popular container mx-auto my-8 px-4 lg:px-0" id="popular">
                <div className="heading mb-4 mt-2">
                    <h2 className="heading-title text-xl lg:text-2xl font-semibold text-gradient text-center lg:text-left">
                        Popular Movies
                    </h2>
                </div>
                <div className="popular-content swiper animate-from-right">
                    <MoviesList url={`/popular`} />
                </div>
            </section>
            <section className="movies-container container mx-auto my-8 px-4 lg:px-0" id="movies">
                <div className="heading mb-4">
                    <h2 className="heading-title text-xl lg:text-2xl font-semibold text-gradient text-center lg:text-left">Now Playing</h2>
                </div>
                <div className="movies-content">
                    <div className="popular-content swiper animate-from-right">
                        <MoviesList url={`/now_playing?page=${currentPage}`} />
                    </div>
                </div>
            </section>
            <div className="movies-content mt-8 animate-from-left container mx-auto px-4 lg:px-0">
                <div className="popular-content swiper">
                    <MoviesList url={`/top_rated`} />
                </div>
            </div>
            <div className="pagination-controls flex justify-center items-center mt-8">
                <button
                    onClick={handlePrevPage}
                    className="prev-btn bg-gray-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <button
                    onClick={handleNextPage}
                    className="next-btn bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Next Page
                </button>
            </div>
        </>
    );
};

export default HomePage;
