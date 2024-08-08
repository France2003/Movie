import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";
import "react-loading-skeleton/dist/skeleton.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingComponent from "../Component/RatingComponent/RatingComponent";

// Define movie detail and similar movies interfaces
interface IMoviesDetail {
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
  genres: IType[];
  production_companies: ICompany[];
  videos: {
    results: IVideo[];
  };
  vote_average: number;  // Add this for average rating
  reviews: IReview[];  // Add this for movie reviews
}

interface ISimilarMovie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface IType {
  id: number;
  name: string;
}

interface ICompany {
  name: string;
  logo_path: string;
}

interface IVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface IReview {
  author: string;
  content: string;
}

const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

const MoviesDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showVideo, setShowVideo] = useState(false);
  const [fullMovieUrl, setFullMovieUrl] = useState<string | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/Movie/");
    }
  }, [id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (id && favorites.includes(Number(id))) {
      setIsFavorite(true);
    }
  }, [id]);

  const getMovieDetails = async (id: number) => {
    const result = await axios.get(`${API}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        append_to_response: "videos,reviews",
      },
    });
    return result.data;
  };

  const getSimilarMovies = async (id: number) => {
    const result = await axios.get(`${API}${id}/similar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.results;
  };

  const { data: movie, error: movieError, isLoading: movieLoading } = useQuery<IMoviesDetail, Error>({
    queryKey: ["movie-detail", id],
    queryFn: () => getMovieDetails(Number(id)),
    enabled: !!id,
  });

  const { data: similarMovies, error: similarMoviesError, isLoading: similarMoviesLoading } = useQuery<ISimilarMovie[], Error>({
    queryKey: ["similar-movies", id],
    queryFn: () => getSimilarMovies(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (movie && movie.videos.results.length > 0) {
      const trailerOrClipVideos = movie.videos.results.filter(
        (video) => (video.type === "Trailer" || video.type === "Clip") && video.site === "YouTube"
      );
      const selectedVideo = trailerOrClipVideos[0];
      const url = selectedVideo ? `https://www.youtube.com/embed/${selectedVideo.key}` : undefined;
      setFullMovieUrl(url);
    }
  }, [movie]);

  const handleWatchFullMovie = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (fullMovieUrl) {
      setShowVideo(true);
    } else {
      alert("Sorry, the full movie is not available.");
    }
  };

  const handleCloseVideo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowVideo(false);
  };

  //Thông báo
  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favId: number) => favId !== Number(id));
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      toast.info("Đã xóa vào danh sách yêu thích");
    } else {
      favorites.push(Number(id));
      localStorage.setItem("favorites", JSON.stringify(favorites));
      toast.success("Đã thêm vào danh sách yêu thích");
    }
    setIsFavorite(!isFavorite);
  };

  if (movieLoading || similarMoviesLoading) return <div>Loading...</div>;
  if (movieError || similarMoviesError) return <div>Error: {movieError?.message || similarMoviesError?.message}</div>;

  return (
    <div className="detail-movie mt-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{movie?.original_title}</title>
        <link rel="canonical" href={`http://mysite.com/example/${id}`} />
      </Helmet>
      {movie && (
        <>
          <div className="play-container container">
            <img
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
              alt={movie.original_title}
              className="play-img"
            />
            <div className="play-text">
              <h2>{movie.original_title}</h2>
              <div className="rating">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star-half"></i>
                <span className="text-white -ml-[8px]"> Rating: {movie.vote_average}</span>  {/* Display rating */}
              </div>
              <div className="tags">
                {movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
              <div className="flex items-center mb-[25px] gap-6">
                <button onClick={handleWatchFullMovie} className="watch-btn">
                  <FiPlay className="bx" />
                  <span>Watch the full movie</span>
                </button>
                <button onClick={handleToggleFavorite} className="favorite-btn">
                  <span>{isFavorite ? <FaHeart className="text-red-600" /> : <FaRegHeart className="text-white" />}</span>
                </button>
              </div>
            </div>
          </div>
          {showVideo && fullMovieUrl && (
            <div className="video-container">
              <button onClick={handleCloseVideo} className="close-btn">
                <FiX />
                <span>Close</span>
              </button>
              <iframe
                width="1000"
                height="500"
                src={fullMovieUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Full Movie"
              ></iframe>
            </div>
          )}
          <div className="about-movie container">
            <h2>{movie.original_title}</h2>
            <p>{movie.overview}</p>
          </div>
          <RatingComponent movieId={movie.id} />  {/* Add RatingComponent */}
          {/*  */}
          <div className="similar-movies container mt-8">
            <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
            <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarMovies && similarMovies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movies/${movie.id}`} // Đảm bảo đường dẫn chính xác cho ứng dụng của bạn
                  className="movie-card bg-gray-800 p-2 rounded-lg shadow-lg hover:opacity-80 transition-opacity"
                >
                  <img
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                    alt={movie.original_title}
                    className="movie-poster w-full h-auto rounded-lg"
                  />
                  <h3 className="movie-title text-white mt-2 text-sm truncate">{movie.original_title}</h3>
                </Link>
              ))}
            </div>
          </div>

        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default MoviesDetailPage;
