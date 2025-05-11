"use client"

import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, movie]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      toast.success(`${movie.title} added to favorites!`)
      return newFavorites
    })
  }

  const removeFromFavorites = (movieId) => {
    setFavorites((prevFavorites) => {
      const movie = prevFavorites.find((fav) => fav.id === movieId)
      const newFavorites = prevFavorites.filter((movie) => movie.id !== movieId)
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      if (movie) {
        toast.success(`${movie.title} removed from favorites!`)
      }
      return newFavorites
    })
  }

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
