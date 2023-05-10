import { FC } from 'react';
import Movies, { Actors, Genres, Videos } from '../../models/moviesModel';
import MoviesSlider from '../MoviesSlider/MoviesSlider';
import './details.scss';
import noImage from '../../assets/images/no-image.jpg';

type MovieProps = {
  bgImage: string,
  poster: string,
  title: string,
  genres: Genres[],
  overview: string,
  actors: Actors[],
  videos: Videos[],
  similar: Movies[],
  similarLink: string,
}

const Movie: FC<MovieProps> = ({
  bgImage, poster, title, genres, overview, actors, videos, similar, similarLink,
}) => {
  const originalImage = (url: string) => `https://www.themoviedb.org/t/p/original/${url}`;
  const mediumImage = (url: string) => `https://www.themoviedb.org/t/p/w500/${url}`;

  return (
    <section className="details">
      <div
        className="details-banner"
        style={{ backgroundImage: bgImage ? `url(${originalImage(bgImage)})` : '' }}
      />
      <div className="container">
        <div className="details__content">
          <div
            className="details__poster"
            style={{ backgroundImage: poster ? `url(${originalImage(poster)})` : '' }}
          />
          <div className="details__info">
            <div className="details__info-top">
              <h2 className="details__title">{title}</h2>
              <div className="genres">
                {
                  genres.map((el) => (
                    <span className="genres__item" key={el.id}>{el.name}</span>
                  ))
                }
              </div>
              <p className="details__overview">{overview}</p>
            </div>
            <div className="actors">
              <h3 className="actors__title">Actors</h3>
              <div className="actors__wrapper">
                {
                  actors.map((actor) => (
                    <div key={actor.cast_id} className="actors__item">
                      <div
                        className="actors__img"
                        style={{
                          backgroundImage: `url(${actor.profile_path !== null
                            ? mediumImage(actor.profile_path) : noImage})`,
                        }}
                      />
                      <p className="actors__name">{actor.original_name}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="videos">
          {
            videos.map((video) => (
              <div key={video.id} className="video__item">
                <h3 className="video__title">{video.name}</h3>
                <iframe
                  className="video"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  width="100%"
                />
              </div>
            ))
          }
        </div>
        {
          similar.length > 0
            ? <MoviesSlider link={similarLink} btnClass="btn-none" viewLink="/" data={similar} listTitle="Similar" /> : null
        }
      </div>
    </section>
  );
};

export default Movie;
