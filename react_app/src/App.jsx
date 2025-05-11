"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import LoginPage from "./pages/LoginPage"
import FavoritesPage from "./pages/FavoritesPage"
import GenrePage from "./pages/GenrePage"
import SearchPage from "./pages/SearchPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="genre/:id" element={<GenrePage />} />
        <Route path="login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="favorites" element={user ? <FavoritesPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
