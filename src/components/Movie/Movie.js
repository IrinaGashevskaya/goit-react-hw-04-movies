import PropTypes from 'prop-types';
import './Movie.css';
const Movie = ({ movie }) => {
  const { title, release_date, vote_average, poster_path, overview, genres } = movie;

  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : null;

  return (
    <article className="Movie">
      <div className="">
        <img src={posterUrl} alt={title} title={title} className="image" />
      </div>

      <div className="movie">
        {title && (
          <h1 className="">
            {title} {release_date ? <span>({release_date.substring(0, 4)})</span> : <span>(N/A)</span>}
          </h1>
        )}

        <p className="">
          <b className="Score">User score: </b>
          {vote_average ? <span>{vote_average * 10}%</span> : <span>N/A</span>}
        </p>
        <h2 className="TitleOverview">Overview</h2>
        <p className="Overview">{overview ? <span>{overview}</span> : <span>N/A</span>}</p>

        <h3 className="">Genres</h3>

        {genres ? (
          <ul className="Genres list">
            {genres.map(({ id, name }) => (
              <li key={id} className="genre">
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span>N/A</span>
        )}
      </div>
    </article>
  );
};

Movie.defaultProps = {
  movie: PropTypes.shape({
    release_date: '',
    vote_average: 0,
    poster_path: null,
    overview: '',
    genres: [],
  }),
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};
export default Movie;
