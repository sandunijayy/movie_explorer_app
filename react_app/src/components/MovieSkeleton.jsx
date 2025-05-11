function MovieSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg shadow animate-pulse bg-card">
          <div className="bg-gray-300 aspect-[2/3] dark:bg-gray-700" />
          <div className="p-4">
            <div className="w-full h-5 mb-2 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center justify-between">
              <div className="w-16 h-4 rounded bg-gray-300 dark:bg-gray-700" />
              <div className="w-12 h-4 rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieSkeleton
