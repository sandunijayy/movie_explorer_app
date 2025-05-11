"use client"

import { useState, useEffect } from "react"
import { getTrendingMovies } from "../lib/tmdb"
import MovieCard from "./MovieCard"
import MovieCardSkeleton from "./MovieCardSkeleton"

function TrendingMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true)
        const data = await getTrendingMovies()
        setMovies(data)
      } catch (err) {
        console.error("Error fetching trending movies:", err)
        setError("Failed to load trending movies")
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [])

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>
  }

  return (
    <div className="movie-grid">
      {loading
        ? Array.from({ length: 10 }).map((_, index) => <MovieCardSkeleton key={index} />)
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  )
}

export default TrendingMovies
