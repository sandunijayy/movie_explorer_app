"use client"

import { useState, useEffect } from "react"
import MovieCard from "./MovieCard"
import MovieCardSkeleton from "./MovieCardSkeleton"
import InfiniteScroll from "react-infinite-scroll-component"
import { Loader } from "lucide-react"

function MovieGrid({ fetchMovies, initialMovies = [], initialPage = 1, initialHasMore = true }) {
  const [movies, setMovies] = useState(initialMovies)
  const [page, setPage] = useState(initialPage)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setMovies(initialMovies)
    setPage(initialPage)
    setHasMore(initialHasMore)
  }, [initialMovies, initialPage, initialHasMore])

  const loadMoreMovies = async () => {
    if (loading || !hasMore) return

    try {
      setLoading(true)
      const nextPage = page + 1
      const { results, total_pages } = await fetchMovies(nextPage)

      if (results.length === 0) {
        setHasMore(false)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...results])
        setPage(nextPage)
        setHasMore(nextPage < total_pages)
      }
    } catch (err) {
      console.error("Error loading more movies:", err)
      setError("Failed to load more movies. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>
  }

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMoreMovies}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2">
            <Loader className="animate-spin" size={20} />
            <span>Loading more movies...</span>
          </div>
        </div>
      }
      endMessage={
        movies.length > 0 && <p className="text-center text-muted-foreground py-4">You've seen all the movies!</p>
      }
    >
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loading && Array.from({ length: 5 }).map((_, index) => <MovieCardSkeleton key={`skeleton-${index}`} />)}
      </div>
    </InfiniteScroll>
  )
}

export default MovieGrid
