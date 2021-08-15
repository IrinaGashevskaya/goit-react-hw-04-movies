import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Review from '../../components/Review/Review';
import Loader from '../../components/Loader/Loader';
//import Message from '../Message';

import * as api from '../../components/Api/Api';
//import styles from './Reviews.module.scss';

// Компонент списка обзоров
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  //const [error, setError] = useState('');

  const match = useRouteMatch();

  // Срабатывает при маунте
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Запрос за обзорами
  const fetchData = async () => {
    const { movieId } = match.params; // Получаем id фильма из match.params

    setLoading(true);

    try {
      const results = await api.getMovieReviews(movieId);
      console.log(results);
      setReviews(results);
    } catch (error) {
      console.error('Smth wrong with fetch reviews on movie page', error);
      //setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      {reviews && reviews.length > 0 ? (
        <ul className="">
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id} className="">
                <Review author={author} content={content} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Reviews;
