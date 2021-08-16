import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'; // Пакет для query string
import { ToastContainer, toast } from 'react-toastify';

import SearchForm from '../../components/SearchForm/SearchForm';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';

import * as api from '../../components/Api/Api';
import 'react-toastify/dist/ReactToastify.min.css';

const MoviesPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { search } = location;
  const { query } = queryString.parse(search);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    getMovies();
    // eslint-disable-next-line
  }, [searchQuery]);

  const getMovies = async () => {
    setLoading(true);

    try {
      const results = await api.searchMovies(searchQuery, page);

      if (results.length === 0) {
        toast.info('Nothing found 🙄', {
          autoClose: 2000,
        });
      }

      setMovies(prev => [...prev, ...results]);
      setPage(prev => prev + 1);
      setLoading(true);
    } catch (error) {
      console.error('Smth wrong with search fetch', error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  const onChangeQuery = query => {
    setMovies([]);
    setSearchQuery(query);
    setPage(1);
    setError(null);

    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  return (
    <main>
      <SearchForm onSearch={onChangeQuery} />

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={{ pathname: `/movies/${movie.id}`, state: { from: `/movies?query=${query}` } }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>

      {isLoading && <Loader />}

      <ToastContainer />
    </main>
  );
};

export default MoviesPage;
