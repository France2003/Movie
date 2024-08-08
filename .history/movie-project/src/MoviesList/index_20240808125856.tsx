import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlay } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API = "https://api.themoviedb.org/3/movie";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

interface IMovies {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
}

interface IResponse {
    page: number;
    results: IMovies[];
    total_pages: number;
    total_results: number;
}

const MoviesList = ({ url, page }: { url: string, page: number }) => {
    const [movies, setMovies] = useState<IResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API}${url}&page=${page}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setMovies(response.data);
        };
        fetchData();
    }, [url, page]);

    return (
        <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {movies &&
                movies.results.length > 0 &&
                movies.results.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="movie-box">
                            <Link to={`${movie.id}`}>
                                <img
                                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                                    alt=""
                                    className="movie-box-img"
                                />
                                <div className="box-text">
                                    <h1 className="movie-title">{movie.title}</h1>
                                    <span className="movie-type">{movie.release_date}</span>
                                    <a href="#" className="watch-btn play-btn">
                                        <div className="bx">
                                            <FiPlay className="" />
                                        </div>
                                    </a>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
};

export default MoviesList;
