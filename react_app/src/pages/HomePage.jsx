import Hero from "../components/Hero"
import TrendingMovies from "../components/TrendingMovies"
import GenreFilter from "../components/GenreFilter"

function HomePage() {
  return (
    <div>
      <Hero />
      <div className="container px-4 py-8 mx-auto space-y-8">
        <section>
          <h2 className="section-title">Browse by Genre</h2>
          <GenreFilter />
        </section>

        <section>
          <h2 className="section-title">Trending Movies</h2>
          <TrendingMovies />
        </section>
      </div>
    </div>
  )
}

export default HomePage
