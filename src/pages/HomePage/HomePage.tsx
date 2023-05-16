import axios from 'axios';
import { useEffect, useState } from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import MoviesSlider from '../../components/MoviesSlider/MoviesSlider';
import Movies from '../../models/moviesModel';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState<Movies[]>();
  const [topRatedMovies, setTopRatedMovies] = useState<Movies[]>();
  const [topRatedShows, setTopRatedShows] = useState<Movies[]>();
  const [popularShows, setPopularShows] = useState<Movies[]>();
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    const popularShowsData = await axios.get(
      'https://api.themoviedb.org/3/tv/popular?api_key=433e58e14ddff9586a5b1f8d7895559f',
    );
    const topRatedMoviesData = await axios.get(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=433e58e14ddff9586a5b1f8d7895559f',
    );
    const topRatedShowsData = await axios.get(
      'https://api.themoviedb.org/3/tv/top_rated?api_key=433e58e14ddff9586a5b1f8d7895559f',
    );
    const popularMoviesData = await axios.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=433e58e14ddff9586a5b1f8d7895559f',
    );

    const filterData = (data: Movies[]) => data.filter((el: Movies) => el.backdrop_path !== null);

    setPopularMovies(filterData(popularMoviesData.data.results));
    setTopRatedMovies(filterData(topRatedMoviesData.data.results));
    setTopRatedShows(filterData(topRatedShowsData.data.results));
    setPopularShows(filterData(popularShowsData.data.results));
  };

  useEffect(() => {
    if (popularMovies?.length === 0 || popularShows?.length === 0 || topRatedMovies?.length === 0 || topRatedShows?.length === 0) {
      setLoading(true);
    } else setLoading(false);
  }, [popularMovies, topRatedMovies, topRatedShows, popularShows]);

  const moviesData = [
    {
      data: popularMovies,
      link: 'movie',
      title: 'Popular Movies',
      stateLink: 'popular',
    },
    {
      data: topRatedMovies,
      link: 'movie',
      title: 'Top Rated Movies',
      stateLink: 'top_rated',
    },
    {
      data: popularShows,
      link: 'tv',
      title: 'Popular TV Shows',
      stateLink: 'popular',
    },
    {
      data: topRatedShows,
      link: 'tv',
      title: 'Top Rated TV Shows',
      stateLink: 'top_rated',
    },
  ];

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <HeroSlider />
      {
        moviesData.map((el) => (
          <MoviesSlider
            key={Math.random()}
            data={el.data}
            link={el.link}
            listTitle={el.title}
            viewLink={el.link}
            stateLink={el.stateLink}
          />
        ))
      }
    </>
  );
};

export default HomePage;
