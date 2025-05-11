import { Link } from "react-router-dom"
import { Film } from "lucide-react"

function NotFoundPage() {
  return (
    <div className="not-found">
      <Film className="w-16 h-16 text-primary mb-4" />
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-button">
        Go back home
      </Link>
    </div>
  )
}

export default NotFoundPage
