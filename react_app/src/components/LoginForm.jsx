"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Film, Loader } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    try {
      setIsLoading(true)
      await login(username, password)
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-form">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Film className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            className="form-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={16} />
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
