function MovieDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
        <div className="bg-gray-300 rounded-lg aspect-[2/3] dark:bg-gray-700" />

        <div className="space-y-4">
          <div className="h-10 rounded bg-gray-300 dark:bg-gray-700 w-3/4" />

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 rounded-full bg-gray-300 dark:bg-gray-700 w-20" />
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 rounded bg-gray-300 dark:bg-gray-700 w-32" />
            ))}
          </div>

          <div className="space-y-2">
            <div className="h-7 rounded bg-gray-300 dark:bg-gray-700 w-32" />
            <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 w-full" />
            <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 w-full" />
            <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 w-3/4" />
          </div>

          <div className="space-y-2">
            <div className="h-7 rounded bg-gray-300 dark:bg-gray-700 w-32" />
            <div className="rounded-lg bg-gray-300 dark:bg-gray-700 aspect-video w-full" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex border-b">
          <div className="px-4 py-2 border-b-2 border-primary w-20" />
          <div className="px-4 py-2 w-32" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="bg-gray-300 rounded-lg aspect-[2/3] dark:bg-gray-700" />
              <div className="h-5 rounded bg-gray-300 dark:bg-gray-700 w-full" />
              <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsSkeleton
