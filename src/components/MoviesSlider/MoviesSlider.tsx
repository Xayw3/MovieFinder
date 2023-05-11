/* eslint-disable camelcase */
import { FC } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import Movies from '../../models/moviesModel';
import MovieCard from '../MovieCard/MovieCard';
import MoviesList from '../MoviesList/MoviesList';

type MoviesSliderProps = {
  data?: Movies[],
  link: string,
  listTitle?: string,
  viewLink: string,
  stateLink?: string,
  btnClass?: string
}

const MoviesSlider: FC<MoviesSliderProps> = ({
  data, link, listTitle, viewLink, stateLink, btnClass,
}) => (
  <div className="container">
    <MoviesList link={viewLink} btnClass={btnClass || ''} linkState={stateLink} title={listTitle || ''}>
      <Swiper
        className="slider"
        grabCursor
        spaceBetween={10}
        slidesPerView="auto"
      >
        {
          data ? data.map(({ id, title, poster_path }) => (
            <SwiperSlide className="slide" key={id}>
              <MovieCard link={`/${link}/${id}`} image={poster_path} title={title} />
            </SwiperSlide>
          )) : null
        }
      </Swiper>
    </MoviesList>
  </div>
);

export default MoviesSlider;