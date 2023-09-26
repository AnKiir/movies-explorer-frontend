const searchMovies = (moviesData, query, checkShortMovies, checkShortMoviesSaved) => {
    let moviesFilter;

    if (query !== null && Array.isArray(moviesData)) {
        moviesFilter = moviesData.filter(
            (movie) =>
                movie.nameRU
                    .trim()
                    .split(' ')
                    .some((word) => word.match(RegExp(`^${query.trim()}`, 'i'))) ||
                movie.nameEN
                    .trim()
                    .split(' ')
                    .some((word) => word.match(RegExp(`^${query.trim()}`, 'i'))) ||
                movie.nameRU
                    .trim()
                    .split(/[.,/?'"!@#$%^&*()_+~`№^;:&|<>\-=\\{}«»[]/)
                    .join('')
                    .split(' ')
                    .some((word) => word.match(RegExp(`^${query.trim()}`, 'i'))) ||
                movie.nameEN
                    .trim('')
                    .split(/[.,/?'"!@#$%^&*()_+~`№^;:&|<>\-=\\{}«»[]/)
                    .join('')
                    .split(' ')
                    .some((word) => word.match(RegExp(`^${query.trim()}`, 'i')))
        );
    }
    if (query === ' ') { moviesFilter = moviesData; }
    if (checkShortMovies || checkShortMoviesSaved) {
        moviesFilter = moviesFilter.filter((movie) => movie.duration <= 40);
    }

    return moviesFilter;
};

export { searchMovies };
