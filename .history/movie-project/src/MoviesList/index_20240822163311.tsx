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

const MoviesList = ({ url }: { url: string }) => {
  const [movies, setMovies] = useState<IResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}${url}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setMovies(response.data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, [url]); 

  useEffect(() => {
    const swiper = new SwiperCore('.swiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Cleanup để hủy đối tượng Swiper khi component bị unmount
    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <Swiper className="movie"
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
            <SwiperSlide key={movie.id} className="movie">
              <div className="movie-box ">
                <Link to={`/Movie/${movie.id}`}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-box-img "
                  />
                  <div className="box-text">
                    <h1 className="movie-tittle">{movie.title}</h1>
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
    </>
  );
};

export default MoviesList;
