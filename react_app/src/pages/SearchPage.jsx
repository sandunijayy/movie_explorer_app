"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter } from "lucide-react"
import { getSearchResults } from "../lib/tmdb"
import MovieGrid from "../components/MovieGrid"
import EmptyState from "../components/EmptyState"

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query") || ""
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("popularity.desc")
  const [yearFilter, setYearFilter] = useState("")

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setMovies([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const { results, total_pages } = await getSearchResults(query, 1, sortBy, yearFilter)
        setMovies(results)
        setTotalPages(Math.min(total_pages, 500))
      } catch (err) {
        console.error("Error fetching search results:", err)
        setError("Failed to load search results. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [query, sortBy, yearFilter])

  const fetchMoreMovies = async (page) => {
    if (!query) return { results: [], total_pages: 0 }
    const data = await getSearchResults(query, page, sortBy, yearFilter)
    return data
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleYearChange = (e) => {
    setYearFilter(e.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
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

  if (!query) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <EmptyState
          title="Search for movies"
          description="Enter a movie title in the search bar to find movies"
          link="/"
          linkText="Go to Home"
        />
      </div>
    )
  }

  if (movies.length === 0 && !loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="section-title">Search Results for "{query}"</h1>
        <EmptyState
          title="No movies found"
          description={`We couldn't find any movies matching "${query}"`}
          link="/"
          linkText="Go to Home"
        />
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="section-title">Search Results for "{query}"</h1>

      <div className="mb-6 flex justify-between items-center">
        <div className="text-muted-foreground">Found {movies.length} results</div>
        <button onClick={toggleFilters} className="flex items-center gap-2 px-3 py-2 border rounded-md">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="filter-bar mb-6 p-4 border rounded-md bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select value={sortBy} onChange={handleSortChange} className="filter-select w-full">
                <option value="popularity.desc">Popularity (Descending)</option>
                <option value="popularity.asc">Popularity (Ascending)</option>
                <option value="vote_average.desc">Rating (Descending)</option>
                <option value="vote_average.asc">Rating (Ascending)</option>
                <option value="release_date.desc">Release Date (Descending)</option>
                <option value="release_date.asc">Release Date (Ascending)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Release Year</label>
              <select value={yearFilter} onChange={handleYearChange} className="filter-select w-full">
                <option value="">All Years</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <MovieGrid fetchMovies={fetchMoreMovies} initialMovies={movies} initialPage={1} initialHasMore={totalPages > 1} />
    </div>
  )
}

export default SearchPage
