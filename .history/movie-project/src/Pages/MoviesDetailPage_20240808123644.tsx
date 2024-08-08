import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";
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

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="detail-movie">
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
              </div>
              <div className="tags">
                {movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
              <button onClick={handleWatchFullMovie} className="watch-btn">
                <FiPlay className="bx" style={{backgroundColor:"#FFB43A", height:43,width:43, borderRadius:45, fontSize:14}}
                />
                <span>Watch the full movie</span>
              </button>
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
        </>
      )}
    </div>
  );
};

export default MoviesDetailPage;
