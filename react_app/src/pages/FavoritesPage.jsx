"use client"

import { useFavorites } from "../contexts/FavoritesContext"
import { useAuth } from "../contexts/AuthContext"
import MovieCard from "../components/MovieCard"
import EmptyState from "../components/EmptyState"

function FavoritesPage() {
  const { favorites } = useFavorites()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <EmptyState
          title="Login Required"
          description="Please login to view your favorite movies"
          link="/login"
          linkText="Go to Login"
        />
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="section-title">Your Favorite Movies</h1>

      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No favorites yet"
          description="Start exploring movies and add them to your favorites"
          link="/"
          linkText="Explore Movies"
        />
      )}
    </div>
  )
}

export default FavoritesPage
