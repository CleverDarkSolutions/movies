export const TEXT_LABELS = {
  general: {
    appName: 'MOVIE HUB',
    searchPlaceholder: 'Search for a movie...',
    searchButton: 'Search',
    loading: 'Loading...',
    error: 'Something went wrong. Please try again.',
    noResults: 'No movies found.',
    notApplicable: 'N/A',
    headerLabels: {
      popularMovies: 'Popular Movies',
      advancedSearch: 'Results for the advanced criteria above',
      resultsHeader: (query: string) => `Results for query "${query}"`,
    },
  },
  home: {
    header: 'Popular Movies',
    resetSearch: 'Reset Search',
  },
  movie: {
    detailsHeader: 'Movie Details',
    genres: 'Genres',
    releaseDate: 'Release Date',
    rating: 'Rating',
    overview: 'Overview',
    duration: 'Duration',
    noPoster: 'No poster available',
    runtime: 'Runtime',
    productionCompanies: 'Production Companies',
  },
  search: {
    advancedSearch: 'Advanced Search',
    clearFilters: 'Clear Filters',
    applyFilters: 'Apply Filters',
    movieTitle: 'Movie Title',
    allGenres: 'All Genres',
    genre: 'Genre',
    releaseYear: 'Release Year',
    minimumRating: 'Minimum Rating',
    popularityDesc: 'Popularity (High to Low)',
    voteAverageDesc: 'Rating (High to Low)',
    releaseDateDesc: 'Newest First',
    releaseDateAsc: 'Oldest First',
    searchButton: 'Search Movies',
    sortBy: 'Sort By',
  },
  notifications: {
    success: {
      general: 'Operation completed successfully.',
      defaultResults: 'Results restored to default',
    },
    failure: {
      general: 'An error occurred. Please try again',
      movie: 'Movie not found',
      movies: 'Movies not found',
      genres: 'Genres not found',
      emptyQuery: 'No query found',
    },
  },
};

export default TEXT_LABELS;
