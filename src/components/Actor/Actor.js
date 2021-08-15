import React from 'react';
import PropTypes from 'prop-types';
import './Actor.css';
const Actor = ({ photo, name, character }) => {
  const photoUrl = photo ? `https://image.tmdb.org/t/p/w300${photo}` : '';

  return (
    <div>
      <div className="">
        <img src={photoUrl} className="ImageActor" alt={name} />
      </div>
      <p className="">{name}</p>
      <p>
        <span>Character: </span>
        <b>{character}</b>
      </p>
    </div>
  );
};

Actor.dedaultProps = {
  photo: '',
};

Actor.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default Actor;
