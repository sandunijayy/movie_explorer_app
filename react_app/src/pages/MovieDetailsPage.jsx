"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, ArrowLeft, Star, Clock, Calendar, User } from "lucide-react"
import { getMovieDetails, getMovieCredits, getSimilarMovies } from "../lib/tmdb"
import { useFavorites } from "../contexts/FavoritesContext"
import YoutubeEmbed from "../components/YoutubeEmbed"
import MovieCard from "../components/MovieCard"

function MovieDetailsPage() {
  const { id } = useParams()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const [movie, setMovie] = useState(null)
  const [credits, setCredits] = useState(null)
  const [similarMovies, setSimilarMovies] = useState([])
  const [activeTab, setActiveTab] = useState("cast")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true)
        const [movieData, creditsData, similarData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getSimilarMovies(id),
        ])

        setMovie(movieData)
        setCredits(creditsData)
        setSimilarMovies(similarData)
      } catch (err) {
        console.error("Error fetching movie details:", err)
        setError("Failed to load movie details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [id])

  const handleFavoriteToggle = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="movie-header animate-pulse">
          <div className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-[2/3]"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20"></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Something went wrong</h2>
          <p className="error-message">{error}</p>
          <Link to="/" className="error-button">
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  if (!movie) return null

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"
  const director = credits?.crew?.find((person) => person.job === "Director")
  const cast = credits?.cast?.slice(0, 10) || []
  const trailer =
    movie.videos?.results?.find((video) => video.type === "Trailer" && video.site === "YouTube") ||
    movie.videos?.results?.[0]

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>

      <div className="movie-details">
        <div className="movie-header">
          <div className="movie-poster-container">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/400x600?text=No+Image"
              }
              alt={movie.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div className="movie-info-container">
            <div className="movie-title-container">
              <h1 className="movie-title-main">
                {movie.title} <span className="movie-year">({releaseYear})</span>
              </h1>
              <button
                className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
                onClick={handleFavoriteToggle}
                aria-label={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-6 w-6 ${isFavorite(movie.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <Link key={genre.id} to={`/genre/${genre.id}`} className="genre-badge">
                  {genre.name}
                </Link>
              ))}
            </div>

            <div className="movie-meta-info">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <strong>{movie.vote_average.toFixed(1)}</strong>/10
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{runtime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{movie.release_date}</span>
              </div>
              {director && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{director.name}</span>
                </div>
              )}
            </div>

            <div className="movie-overview">
              <h2 className="movie-overview-title">Overview</h2>
              <p className="movie-overview-text">{movie.overview || "No overview available."}</p>
            </div>

            {trailer && (
              <div className="movie-trailer">
                <h2 className="movie-trailer-title">Trailer</h2>
                <YoutubeEmbed videoId={trailer.key} />
              </div>
            )}
          </div>
        </div>

        <div className="movie-tabs">
          <div className="tabs">
            <button className={`tab ${activeTab === "cast" ? "active" : ""}`} onClick={() => setActiveTab("cast")}>
              Cast
            </button>
            <button
              className={`tab ${activeTab === "similar" ? "active" : ""}`}
              onClick={() => setActiveTab("similar")}
            >
              Similar Movies
            </button>
          </div>

          <div className="movie-tab-content">
            {activeTab === "cast" && (
              <div className="cast-grid">
                {cast.map((person) => (
                  <div key={person.id} className="cast-card">
                    <div className="cast-image">
                      <img
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"
                        }
                        alt={person.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="cast-name">{person.name}</p>
                    <p className="cast-character">{person.character}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "similar" && (
              <div className="similar-movies">
                {similarMovies.slice(0, 10).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
