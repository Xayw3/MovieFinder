/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import './hero-slider.scss';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSlideItem from '../HeroSlideItem/HeroSlideItem';
import Movies from '../../models/moviesModel';

const HeroSlider = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  const getMovies = async () => {
    const data = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=433e58e14ddff9586a5b1f8d7895559f',
    );

    setMovies(data.data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  SwiperCore.use([Autoplay]);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        grabCursor
        spaceBetween={0}
        slidesPerView={1}
      >
        {
          movies.map(({
            title, overview, id, backdrop_path, poster_path,
          }) => (
            <SwiperSlide key={id}>
              {({ isActive }) => (
                <HeroSlideItem
                  className={isActive ? 'active' : ''}
                  title={title}
                  desc={overview}
                  bgImage={backdrop_path}
                  poster={poster_path}
                  link={`/movie/${id}`}
                />
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default HeroSlider;
