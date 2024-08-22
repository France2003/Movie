import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";

const API = "https://api.themoviedb.org/3/movie";
const token = `YOUR_API_TOKEN`;

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

const MoviesListNoSwiper = ({ url, page }: { url: string, page: number }) => {
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
        <div className="movies-grid">
            {movies && movies.results.length > 0 && movies.results.map((movie) => (
                <div key={movie.id} className="movie-box">
                    <Link to={`/movie/${movie.id}`}>
                        <img
                            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                            alt={movie.title}
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
            ))}
        </div>
    );
};

export default MoviesListNoSwiper;