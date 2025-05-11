### Movie Explorer – Discover Your Favorite Films

## 📝 Project Overview

Movie Explorer is a responsive web application that allows users to search for movies, view details, and discover trending films. The application fetches real-time data from The Movie Database (TMDb) API to display information about movies, including titles, posters, ratings, overviews, cast information, and trailers.

## ✨ Features Implemented

- **User Authentication**

- Login interface with username and password
- Persistent login state using local storage



- **Movie Discovery**

- Trending movies section displaying popular movies
- Search functionality with filters for year and sort options
- Genre-based movie browsing
- Infinite scrolling with "Load More" button



- **Movie Details**

- Comprehensive movie information (title, poster, description, rating, genres)
- Cast and crew information
- Similar movie recommendations
- YouTube trailer integration



- **User Preferences**

- Light/dark mode toggle
- Favorite movies functionality with local storage persistence
- Last searched movie persistence



- **Responsive Design**

- Mobile-first approach
- Optimized for all device sizes





## 🛠️ Technologies Used

- **Frontend Framework**: React.js with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Native Fetch API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **API**: The Movie Database (TMDb) API


## 🚀 Project Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer
```


2. Install dependencies:

```shellscript
npm install
```


3. Create a `.env` file in the root directory and add your TMDb API key:

```plaintext
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```


4. Start the development server:

```shellscript
npm run dev
```


5. Build for production:

```shellscript
npm run build
```


6. Preview the production build:

```shellscript
npm run preview
```




## 🔑 API Usage

This project uses The Movie Database (TMDb) API to fetch movie data. The following API endpoints are used:

- `/trending/movie/day` - Get trending movies
- `/search/movie` - Search for movies by title
- `/movie/{id}` - Get detailed information about a specific movie
- `/movie/{id}/credits` - Get cast and crew information
- `/movie/{id}/similar` - Get similar movies
- `/discover/movie` - Discover movies by genre
- `/genre/movie/list` - Get list of movie genres


API calls are handled in the `src/lib/tmdb.js` file. Each function is designed to fetch specific data from the TMDb API and handle errors appropriately.

## 📁 Project Structure

```plaintext
movie-explorer/
├── public/               # Static assets
├── src/                  # Source files
│   ├── api/              # API integration
│   ├── components/       # Reusable components
│   ├── contexts/         # React Context providers
│   ├── lib/              # Utility functions and API clients
│   ├── pages/            # Page components
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Project documentation
```

## 🎯 Feature Details

### User Authentication

The application implements a simple authentication system using React Context API and local storage. Users can log in with any username and password (for demo purposes), and their session is persisted in local storage.

### Movie Discovery

The home page displays trending movies fetched from the TMDb API. Users can search for movies using the search bar, and results are displayed with pagination. The search functionality includes filters for release year and sorting options.

### Movie Details

Clicking on a movie card navigates to the movie details page, which displays comprehensive information about the movie, including:

- Title, poster, and release year
- Rating and runtime
- Overview
- Genres
- Cast and crew information
- Similar movies
- YouTube trailer (if available)


### User Preferences

The application supports both light and dark modes, which can be toggled using the theme switcher in the navbar. User preferences, including theme choice and favorite movies, are stored in local storage for persistence.

### Responsive Design

The application is designed to be responsive and work well on all device sizes, from mobile phones to desktop computers. The layout adjusts dynamically based on the screen size.

