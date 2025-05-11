import { Link } from "react-router-dom"
import { Film, Heart, Github } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t py-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Film className="w-6 h-6" />
              <span>Movie Explorer</span>
            </Link>
            <p className="text-muted-foreground">Discover your favorite films with our comprehensive movie database.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/search?query=action"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Action Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/search?query=comedy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Comedy Movies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-muted-foreground mb-4">
              Movie Explorer is a web application that allows you to search for movies, view details, and discover
              trending films.
            </p>
            <p className="text-muted-foreground">
              Data provided by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                TMDb
              </a>
              .
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© {currentYear} Movie Explorer. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Heart size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
