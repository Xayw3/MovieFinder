/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import './hero-slider.scss';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import { InView, useInView } from 'react-intersection-observer';

import axios from 'axios';
import HeroSlideItem from '../HeroSlideItem/HeroSlideItem';
import Movies from '../../models/moviesModel';

const HeroSlider = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isInView, setIsInView] = useState(false);

  const swiperRef = useRef<SwiperCore | null>(null);

  SwiperCore.use([Autoplay, EffectFade]);

  const getMovies = async () => {
    const data = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=433e58e14ddff9586a5b1f8d7895559f',
    );

    setMovies(data.data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsInView(entry.isIntersecting);
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      if (isInView) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    }
  }, [isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    const target = document.querySelector('.hero-slide');
    if (target) {
      observer.observe(target);
    }
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={0}
        modules={[EffectFade]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        effect="fade"
        noSwiping
        allowTouchMove={false}
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
