import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FiPlay } from "react-icons/fi";
import MoviesList from "../MoviesList";

const HomePage = () => {
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

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <section className="home container max-w-full lg:max-w-[1060px] mx-auto my-8 px-4 sm:px-6 lg:px-8" id="home">
                <img src="https://movie-site-delta.vercel.app/img/home-background.png" alt="" className="home-img w-full rounded-lg" />
                <div className="home-text mt-8 text-center lg:text-left">
                    <h1 className="home-title text-3xl lg:text-4xl font-bold text-white">
                        Hitman's Wife's <hr className="my-2 border-t-2 border-white w-1/3 mx-auto lg:mx-0" />
                        Bodyguard
                    </h1>
                    <p className="text-lg text-white mt-2">Releasing 23 July</p>
                    <a href="#" className="watch-btn inline-flex items-center justify-center mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        <FiPlay className="mr-2" />
                        <span>Watch the trailer</span>
                    </a>
                </div>
            </section>
            <section className="popular container max-w-full lg:max-w-[1060px] mx-auto my-8 px-4 sm:px-6 lg:px-8" id="popular">
                <div className="heading mb-4 mt-2">
                    <h2 className="heading-title text-2xl font-semibold text-gradient text-center lg:text-left">
                        Popular Movies
                    </h2>
                </div>
                <div className="popular-content swiper animate-from-right">
                    <MoviesList url={`/popular`} />
                </div>
            </section>
            <section className="movies-container container max-w-full lg:max-w-[1060px] mx-auto my-8 px-4 sm:px-6 lg:px-8" id="movies">
                <div className="heading mb-4">
                    <h2 className="heading-title text-2xl font-semibold text-gradient text-center lg:text-left">Now Playing</h2>
                </div>
                <div className="movies-content">
                    <div className="popular-content swiper animate-from-right">
                        <MoviesList url={`/now_playing`} />
                    </div>
                </div>
            </section>
            <div className="movies-content mt-8 animate-from-left">
                <div className="popular-content swiper">
                    <MoviesList url={`/top_rated`} />
                </div>
            </div>
            <div className="next-page mt-8 text-center">
                <a href="#" className="next-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next Page</a>
            </div>
        </>
    );
};

export default HomePage;
