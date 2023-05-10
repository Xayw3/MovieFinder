/* eslint-disable camelcase */
import './movies-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import MovieCard from '../../components/MovieCard/MovieCard';
import Movies from '../../models/moviesModel';

const MoviesPage = () => {
  const location = useLocation();

  const [movies, setMovies] = useState<Movies[]>([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState(location.state || 'top_rated');
  const [genres, setGenres] = useState<any[]>();
  const [currentGenre, setCurrentGenre] = useState('');
  const [genreId, setGenreId] = useState(0);
  const [activeClass, setActiveClass] = useState(false);

  const filterMovies = (data: Movies[]) => data.filter((el: Movies) => el.poster_path !== null);

  const getMovies = async () => {
    const moviesData = await axios.get(
      `https://api.themoviedb.org/3${location.pathname}/${category}?api_key=433e58e14ddff9586a5b1f8d7895559f&page=${page}`,
    );

    if (page > 1) {
      setMovies([...movies, ...filterMovies(moviesData.data.results)]);
    } else {
      setMovies(filterMovies(moviesData.data.results));
    }
  };

  const getMoviesByGenre = async () => {
    const moviesData = await axios.get(
      `https://api.themoviedb.org/3/discover/${location.pathname}?api_key=433e58e14ddff9586a5b1f8d7895559f&with_genres=${genreId}`,
    );

    if (page > 1) {
      setMovies([...movies, ...filterMovies(moviesData.data.results)]);
    } else {
      setMovies(filterMovies(moviesData.data.results));
    }
  };

  const getGenres = async () => {
    const genresData = await axios.get(`https://api.themoviedb.org/3/genre/${location.pathname}/list?api_key=433e58e14ddff9586a5b1f8d7895559f&`);

    setGenres(genresData.data.genres);
  };

  const searchMovies = async () => {
    const moviesData = await axios.get(
      `https://api.themoviedb.org/3/search/${location.pathname}?api_key=433e58e14ddff9586a5b1f8d7895559f&query=${inputValue}&page=${page}`,
    );

    if (inputValue) {
      if (page > 1) {
        setMovies([...movies, ...filterMovies(moviesData.data.results)]);
      } else {
        setMovies(filterMovies(moviesData.data.results));
      }
    } else {
      setPage(1);
      getMovies();
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  useEffect(() => {
    getGenres();

    if (!inputValue) {
      getMovies();
    } else {
      searchMovies();
    }

    if (genreId > 0) {
      getMoviesByGenre();
    }
  }, [page, location, genreId]);

  useEffect(() => {
    const changeLocation = () => {
      setPage(1);
      window.scrollTo(0, 0);
    };

    setInputValue('');

    changeLocation();
  }, [location.pathname]);

  return (
    <section className="movies">
      <div className="container">
        <div className="movies__top">
          <div className="movies__search">
            <input
              value={inputValue}
              onKeyPress={handleKeyPress}
              onChange={(el) => setInputValue(el.target.value)}
              type="text"
            />
            <button onClick={() => { setPage(1); searchMovies(); }} className="btn">Search</button>
          </div>
          <div className="movies__genres">
            <div onClick={() => setActiveClass(!activeClass)} className="selected">
              {currentGenre === '' ? 'Select Genre' : currentGenre}
              {
                activeClass
                  ? <RiArrowUpSLine className="selected-icon" /> : <RiArrowDownSLine className="selected-icon" />
              }
            </div>
            <div className="select-box">
              <div className={`options-container ${activeClass ? 'active' : ''}`}>
                {
                  genres?.map((el) => (
                    <div key={el.id} className="option">
                      <input
                        type="radio"
                        onClick={() => {
                          setCurrentGenre(el.name); setActiveClass(false); setGenreId(el.id); setPage(1);
                        }}
                        className="radio"
                        id={el.id}
                        name="genre"
                      />
                      <label htmlFor={el.id}>{el.name}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="movies__list">
          {
            movies.map(({ id, title, poster_path }) => (
              <MovieCard
                key={id}
                className="movies__item"
                link={`${location.pathname}/${id}`}
                image={poster_path}
                title={title}
              />
            ))
          }
        </div>
        <button className="btn movies-btn" onClick={() => { setPage(page + 1); getMovies(); }}>Load more</button>
      </div>
    </section>
  );
};

export default MoviesPage;
