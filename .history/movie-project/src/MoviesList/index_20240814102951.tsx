import { useEffect, useState, useRef } from "react";
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

  // Refs for custom navigation buttons
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

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

  if (error) return <div>Error: {error}</div>;
  return (
    <>
      {/* Custom navigation buttons */}
      <div className="custom-swiper-navigation">
        <div ref={prevRef} className="swiper-button-prev-custom">Prev</div>
        <div ref={nextRef} className="swiper-button-next-custom">Next</div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Assign navigation buttons to swiper
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        spaceBetween={20}
        slidesPerView={4}
      >
        {movies &&
          movies.results.length > 0 &&
          movies.results.map((movie) => (
            <SwiperSlide key={movie.id}>
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
