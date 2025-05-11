// TMDB API Functions
const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || process.env.REACT_APP_TMDB_API_KEY || "3e837d475d289ab535e8df4220e9ff9b"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`)

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies")
  }

  const data = await res.json()
  return data.results
}

export async function getSearchResults(query, page = 1, sortBy = "popularity.desc", year = "") {
  let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
    query,
  )}&page=${page}&sort_by=${sortBy}`

  if (year) {
    url += `&primary_release_year=${year}`
  }

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch search results")
  }

  const data = await res.json()
  return {
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  }
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`)

  if (!res.ok) {
    throw new Error(`Failed to fetch movie details for ID: ${id}`)
  }

  return res.json()
}

export async function getMovieCredits(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)

  if (!res.ok) {
    throw new Error(`Failed to fetch movie credits for ID: ${id}`)
  }

  return res.json()
}

export async function getSimilarMovies(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)

  if (!res.ok) {
    throw new Error(`Failed to fetch similar movies for ID: ${id}`)
  }

  const data = await res.json()
  return data.results
}

export async function getMoviesByGenre(genreId, page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch movies for genre ID: ${genreId}`)
  }

  const data = await res.json()
  return {
    results: data.results,
    total_pages: data.total_pages,
  }
}

export async function getGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)

  if (!res.ok) {
    throw new Error("Failed to fetch genres")
  }

  const data = await res.json()
  return data.genres
}
