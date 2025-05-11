function MovieCardSkeleton() {
  return (
    <div className="movie-card animate-pulse">
      <div className="movie-poster">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="movie-info">
        <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton
