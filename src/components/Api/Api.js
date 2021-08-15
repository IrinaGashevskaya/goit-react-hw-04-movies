export const searchMovies = (searchQuery = '', page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=49133404fcc28c8d69cb3cca2c865e85&query=${searchQuery}&page=${page}`,
  )
    .then(res => res.json())
    .then(data => data.results);
};

export const getTrending = () => {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=49133404fcc28c8d69cb3cca2c865e85`)
    .then(res => res.json())
    .then(data => data.results);
};
export const getMovieDetails = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=49133404fcc28c8d69cb3cca2c865e85`).then(res =>
    res.json(),
  );
};
export const getMovieCredits = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=49133404fcc28c8d69cb3cca2c865e85`).then(res =>
    res.json(),
  );
};
export const getMovieReviews = id => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=49133404fcc28c8d69cb3cca2c865e85`)
    .then(res => res.json())
    .then(data => data.results);
};
