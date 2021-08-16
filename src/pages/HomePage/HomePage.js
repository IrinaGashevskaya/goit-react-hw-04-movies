import LoaderApp from '../../components/Loader/Loader';
import * as api from '../../components/Api/Api';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './HomePage.css';
const HomePage = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);

    try {
      const movies = await api.getTrending();

      setTrends(movies);
    } catch (error) {
      console.error('Smth wrong with homepage trends fetch', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="Trends">
      <h1>Trending movies</h1>
      <ul>
        {trends.map(movie => (
          <li key={movie.id}>
            <NavLink className="link" to={{ pathname: `/movies/${movie.id}` }}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
      {isLoading && <LoaderApp />}
    </div>
  );
};
export default HomePage;
