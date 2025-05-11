"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import toast from "react-hot-toast"
import YoutubeEmbed from "./YoutubeEmbed"

function MovieDetails({ movie, credits, similarMovies }) {
  const [activeTab, setActiveTab] = useState("cast")
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    return favorites.some((fav) => fav.id === movie.id)
  })

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      setIsFavorite(false)
      toast.success(`${movie.title} removed from favorites`)
    } else {
      const updatedFavorites = [...favorites, movie]
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      setIsFavorite(true)
      toast.success(`${movie.title} added to favorites`)
    }
  }

  const director = credits?.crew?.find((person) => person.job === "Director")
  const cast = credits?.cast?.slice(0, 10) || []

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"

  // Find trailer
  const trailer =
    movie.videos?.results?.find((video) => video.type === "Trailer" && video.site === "YouTube") ||
    movie.videos?.results?.[0]

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
        <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/400x600?text=No+Image"
            }
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold md:text-4xl">
              {movie.title} <span className="text-muted-foreground">({releaseYear})</span>
            </h1>
            <button className={`p-2 border rounded-full ${isFavorite ? "text-red-500" : ""}`} onClick={toggleFavorite}>
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="px-2 py-1 text-sm rounded-full bg-secondary">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <strong>Rating:</strong> {movie.vote_average?.toFixed(1)}/10
            </div>
            <div>
              <strong>Runtime:</strong> {runtime}
            </div>
            <div>
              <strong>Release:</strong> {movie.release_date}
            </div>
            {director && (
              <div>
                <strong>Director:</strong> {director.name}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-muted-foreground">{movie.overview || "No overview available."}</p>
          </div>

          {trailer && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Trailer</h2>
              <YoutubeEmbed videoId={trailer.key} />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === "cast" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("cast")}
          >
            Cast
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "similar" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("similar")}
          >
            Similar Movies
          </button>
        </div>

        {activeTab === "cast" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {cast.map((person) => (
              <div key={person.id} className="space-y-2">
                <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
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
                <div>
                  <p className="font-medium truncate">{person.name}</p>
                  <p className="text-sm truncate text-muted-foreground">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "similar" && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {similarMovies.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                className="overflow-hidden transition-all rounded-lg shadow-md hover:shadow-lg bg-card"
              >
                <div className="relative aspect-[2/3]">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{movie.title}</h3>
                  <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
                    <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}</span>
                    <span className="flex items-center">
                      ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
