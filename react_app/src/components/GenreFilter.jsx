"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getGenres } from "../lib/tmdb"

function GenreFilter() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getGenres()
        setGenres(genreData)
      } catch (error) {
        console.error("Failed to fetch genres:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`)
  }

  if (loading) {
    return (
      <div className="filter-bar animate-pulse">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="filter-bar">
      {genres.slice(0, 10).map((genre) => (
        <button
          key={genre.id}
          className="genre-badge hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </button>
      ))}
      <button className="genre-badge bg-primary text-primary-foreground" onClick={() => navigate("/genres")}>
        More Genres
      </button>
    </div>
  )
}

export default GenreFilter
