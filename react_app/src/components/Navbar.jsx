"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Film, Heart, LogIn, LogOut, Moon, Search, Sun, Menu, X } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Extract search query from URL if present
    const params = new URLSearchParams(location.search)
    const query = params.get("query")
    if (query) {
      setSearch(query)
    }
  }, [location.search])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`)
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Film className="w-6 h-6" />
          <span>Movie Explorer</span>
        </Link>

        <form onSubmit={handleSearch} className="navbar-search">
          <div className="relative w-full">
            <Search className="search-icon" size={18} />
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
          </div>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="navbar-action-button" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/favorites" className="navbar-action-button" aria-label="Favorites">
            <Heart size={20} />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden lg:inline-block">{user.username}</span>
              <button onClick={handleLogout} className="navbar-action-button" aria-label="Log out">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar-action-button" aria-label="Log in">
              <LogIn size={20} />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="p-2 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="mobile-search">
        <div className="relative w-full">
          <Search className="search-icon" size={18} />
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
        </div>
      </form>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container px-4 py-3 mx-auto space-y-3">
            <Link to="/favorites" className="flex items-center gap-2 p-2" onClick={() => setIsMenuOpen(false)}>
              <Heart size={20} />
              <span>Favorites</span>
            </Link>
            <button onClick={toggleTheme} className="flex items-center gap-2 p-2 w-full text-left">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
            {user ? (
              <div className="border-t pt-3">
                <div className="text-sm text-muted-foreground mb-2">
                  Signed in as <span className="font-medium">{user.username}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 p-2 w-full text-left">
                  <LogOut size={20} />
                  <span>Log out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 p-2 border-t pt-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={20} />
                <span>Log in</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
