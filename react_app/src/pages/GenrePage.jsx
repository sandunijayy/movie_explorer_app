"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getMoviesByGenre, getGenres } from "../lib/tmdb"
import MovieGrid from "../components/MovieGrid"
import EmptyState from "../components/EmptyState"

function GenrePage() {
  const { id } = useParams()
  const [genreName, setGenreName] = useState("")
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        const genres = await getGenres()
        const genre = genres.find((g) => g.id.toString() === id)
        if (genre) {
          setGenreName(genre.name)
        }
      } catch (err) {
        console.error("Error fetching genre name:", err)
      }
    }

    fetchGenreName()
  }, [id])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const { results, total_pages } = await getMoviesByGenre(id, 1)
        setMovies(results)
        setTotalPages(Math.min(total_pages, 500))
      } catch (err) {
        console.error("Error fetching genre movies:", err)
        setError("Failed to load movies. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [id])

  const fetchMoreMovies = async (page) => {
    const data = await getMoviesByGenre(id, page)
    return data
  }

  if (loading && !movies.length) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="loader">
          <div className="spinner"></div>
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
        </div>
      </div>
    )
  }

  if (movies.length === 0 && !loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="section-title">{genreName || "Genre"} Movies</h1>
        <EmptyState
          title="No movies found"
          description={`We couldn't find any ${genreName.toLowerCase()} movies`}
          link="/"
          linkText="Go to Home"
        />
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>

      <h1 className="section-title">{genreName || "Genre"} Movies</h1>

      <MovieGrid fetchMovies={fetchMoreMovies} initialMovies={movies} initialPage={1} initialHasMore={totalPages > 1} />
    </div>
  )
}

export default GenrePage
