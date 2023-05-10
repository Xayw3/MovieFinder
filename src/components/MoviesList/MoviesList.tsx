import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { JsxElement } from 'typescript';
import './movies-list.scss';

type MovieListProps = {
  link: string,
  linkState?: string,
  title: string,
  children: Element | ReactNode,
  btnClass?: string
}

const MoviesList: FC<MovieListProps> = ({
  link, title, children, linkState, btnClass,
}) => (
  <div className="movies-list">
    <div className="movie-list__top">
      <h2>{title}</h2>
      <Link to={link} state={linkState}>
        <button className={`btn btn-outline movie-list__btn ${btnClass || ''}`}>View more</button>
      </Link>
    </div>
    <div className="movie-list__content">
      {children}
    </div>
  </div>
);
export default MoviesList;
