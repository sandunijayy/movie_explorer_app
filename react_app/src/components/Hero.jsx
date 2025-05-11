"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { getTrendingMovies } from "../lib/tmdb"

function Hero() {
    const [backdrop, setBackdrop] = useState(null)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBackdrop = async () => {
            try {
                const movies = await getTrendingMovies()
                // Find a movie with a backdrop
                const movieWithBackdrop = movies.find((movie) => movie.backdrop_path)
                if (movieWithBackdrop) {
                    setBackdrop(movieWithBackdrop)
                }
            } catch (error) {
                console.error("Failed to fetch backdrop:", error)
            }
        }

        fetchBackdrop()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim()) {
            navigate(`/search?query=${encodeURIComponent(search.trim())}`)
        }
    }

    return (
        <section className="hero-section">
            {backdrop && (
                <div className="hero-backdrop">
                    <img src={`https://image.tmdb.org/t/p/original${backdrop.backdrop_path}`} alt="Movie backdrop" />
                </div>
            )}
            <div className="hero-content">
                <h1 className="hero-title">Discover Your Favorite Films</h1>
                <p className="hero-description">
                    Explore thousands of movies, from blockbuster hits to hidden gems. Find what to watch next!
                </p>
                <form onSubmit={handleSearch} className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="search"
                        placeholder="Search for movies..."
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Hero
