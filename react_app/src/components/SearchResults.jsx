"use client"

import { useState, useEffect } from "react"
import MovieCard from "./MovieCard"
import Pagination from "./Pagination"
import EmptyState from "./EmptyState"
import { getSearchResults } from "../lib/tmdb"

function SearchResults({ query, page = 1 }) {
  const [results, setResults] = useState({ movies: [], totalPages: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) return

      try {
        setIsLoading(true)
        const { results: movies, total_pages } = await getSearchResults(query, page)
        setResults({ movies, totalPages: Math.min(total_pages, 500) })
      } catch (err) {
        console.error("Error fetching search results:", err)
        setError("Failed to load search results")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, page])

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  if (isLoading) {
    return <div className="p-4">Searching for movies...</div>
  }

  if (results.movies.length === 0) {
    return <EmptyState title="No movies found" description={`We couldn't find any movies matching "${query}"`} />
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {results.totalPages > 1 && <Pagination currentPage={page} totalPages={results.totalPages} />}
    </div>
  )
}

export default SearchResults
