import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Actor from '../../components/Actor/Actor';
import LoaderApp from '../../components/Loader/Loader';
import * as api from '../../components/Api/Api';
import './Cast.css';
const Cast = () => {
  const [credits, setActors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const match = useRouteMatch();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const { movieId } = match.params;

    setLoading(true);

    try {
      const { cast } = await api.getMovieCredits(movieId);
      console.log(cast);
      setActors(cast);
    } catch (error) {
      console.error('Smth wrong with fetch cast on movie page', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Actors">
      {isLoading && <LoaderApp />}

      {credits && (
        <ul className="list">
          {credits.map(({ id, profile_path, name, character }) => {
            return (
              <li key={id} className="">
                <Actor photo={profile_path} name={name} character={character} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cast;
