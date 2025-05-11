"use client"

import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { useFavorites } from "../contexts/FavoritesContext"

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const isMovieFavorite = isFavorite(movie.id)

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isMovieFavorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
  const rating = movie.vote_average || 0

  // Determine rating class
  let ratingClass = "rating-medium"
  if (rating >= 7) {
    ratingClass = "rating-high"
  } else if (rating < 5) {
    ratingClass = "rating-low"
  }

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            loading="lazy"
          />
          <button
            className={`favorite-btn ${isMovieFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
            aria-label={isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isMovieFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span>{releaseYear}</span>
            <span className={`rating-badge ${ratingClass}`}>★ {rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
