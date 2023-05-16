/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import './movie-card.scss';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type MovieCardProps = {
  image?: string,
  smallImage?: string,
  link: string,
  title: string,
  className?: string,
}

const MovieCard: FC<MovieCardProps> = ({
  image, link, title, className, smallImage,
}) => {
  const mediumImage = (url: string) => `https://www.themoviedb.org/t/p/w500/${url}`;
  const originalImage = (url: string) => `https://www.themoviedb.org/t/p/original/${url}`;

  return (
    <Link className={`movie-link ${className || ''}`} to={link}>
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${smallImage !== '' ? mediumImage(smallImage || '') : originalImage(image || '')})` }}
      >
        <button className="btn-outline btn movie-card__btn"><FaPlay className="icon" /></button>
        <h2 className="movie-title">{title}</h2>
      </div>
    </Link>
  );
};

export default MovieCard;
