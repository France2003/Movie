import React from 'react';
import { useFavorites } from './FavoritesContext';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1>Your Favorite Movies</h1>
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((movie) => (
            <div className="movie-box" key={movie.id}>
              <Link to={`${movie.id}`}>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-box-img"
                />
                <div className="box-text">
                  <h1 className="movie-tittle">{movie.title}</h1>
                  <span className="movie-type">{movie.release_date}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
