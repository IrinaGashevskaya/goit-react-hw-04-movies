import { useState, useEffect } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../../components/Api/Api';
import GoBackButton from '../../components/GoBackButton/GoBackButton';
import Movie from '../../components/Movie/Movie';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import Loader from '../../components/Loader/Loader';
import routes from '../../routes';
import './MovieDetailsPage.css';
const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    const { movieId } = match.params;
    setLoading(true);

    try {
      const result = await api.getMovieDetails(movieId);

      setMovie(result);
    } catch (error) {
      console.error('Smth wrong with fetch movie on movie page', error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    history.push(location?.state?.from || '/');
  };

  return (
    <>
      <hr></hr>
      <GoBackButton onBack={handleGoBack} />
      {movie && <Movie movie={movie} />}
      <hr></hr>
      <section className="">
        <p className="information">Additional information</p>
        <ul>
          <li>
            {' '}
            <NavLink className="link" activeClassName="activeLink" to={{ pathname: `${match.url}${routes.cast}` }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className="link" activeClassName="activeLink" to={{ pathname: `${match.url}${routes.reviews}` }}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </section>
      <Switch>
        <Route exact path={`${match.path}${routes.cast}`}>
          <Cast />
        </Route>
        <Route exact path={`${match.path}${routes.reviews}`}>
          <Reviews />
        </Route>
      </Switch>

      {isLoading && <Loader />}
    </>
  );
};

MovieDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default MovieDetailsPage;
