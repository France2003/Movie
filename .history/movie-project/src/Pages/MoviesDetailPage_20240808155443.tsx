import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { FiPlay, FiX, FiHeart } from "react-icons/fi";
import "react-loading-skeleton/dist/skeleton.css";

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
        append_to_response: "videos",
      },
    });
    return result.data;
  };

  const { data: movie, error, isLoading } = useQuery<IMoviesDetail, Error>({
    queryKey: ["movie-detail", id],
    queryFn: () => getMovieDetails(Number(id)),
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

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favId: number) => favId !== Number(id));
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(Number(id));
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="detail-movie p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{movie?.original_title}</title>
        <link rel="canonical" href={`http://mysite.com/example/${id}`} />
      </Helmet>
      {movie && (
        <>
          <div className="play-container flex flex-col md:flex-row items-center p-4">
            <img
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
              alt={movie.original_title}
              className="play-img w-full md:w-1/3 h-auto object-cover"
            />
            <div className="play-text flex flex-col md:ml-4 md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">{movie.original_title}</h2>
              <div className="rating mb-2">
                <i className="bx bxs-star text-yellow-400"></i>
                <i className="bx bxs-star text-yellow-400"></i>
                <i className="bx bxs-star text-yellow-400"></i>
                <i className="bx bxs-star text-yellow-400"></i>
                <i className="bx bxs-star-half text-yellow-400"></i>
              </div>
              <div className="tags mb-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2">
                    {genre.name}
                  </span>
                ))}
              </div>
              <button onClick={handleWatchFullMovie} className="watch-btn bg-yellow-500 text-white py-2 px-4 rounded flex items-center hover:bg-yellow-600">
                <FiPlay className="mr-2 text-xl" />
                <span>Watch the full movie</span>
              </button>
              <button onClick={handleToggleFavorite} className={`favorite-btn mt-4 p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}>
                <FiHeart className="text-2xl" />
              </button>
            </div>
          </div>
          {showVideo && fullMovieUrl && (
            <div className="video-container fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
              <button onClick={handleCloseVideo} className="close-btn absolute top-4 right-4 text-white text-xl">
                <FiX />
              </button>
              <iframe
                width="80%"
                height="80%"
                src={fullMovieUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Full Movie"
              ></iframe>
            </div>
          )}
          <div className="about-movie p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.original_title}</h2>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesDetailPage;
