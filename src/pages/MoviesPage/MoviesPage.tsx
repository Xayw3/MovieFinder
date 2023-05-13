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
    const changeLocation = () => {
      setPage(1);
      setGenreId(0);
      setCurrentGenre('');
      window.scrollTo(0, 0);
    };

    setInputValue('');

    changeLocation();
  }, [location.pathname]);

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
  }, [page, location, genreId, location.pathname]);

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
            <button onClick={() => { setPage(1); searchMovies(); }} className="btn">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 119.828 122.88" enableBackground="new 0 0 119.828 122.88" xmlSpace="preserve"><g><path d="M48.319,0C61.662,0,73.74,5.408,82.484,14.152c8.744,8.744,14.152,20.823,14.152,34.166 c0,12.809-4.984,24.451-13.117,33.098c0.148,0.109,0.291,0.23,0.426,0.364l34.785,34.737c1.457,1.449,1.465,3.807,0.014,5.265 c-1.449,1.458-3.807,1.464-5.264,0.015L78.695,87.06c-0.221-0.22-0.408-0.46-0.563-0.715c-8.213,6.447-18.564,10.292-29.814,10.292 c-13.343,0-25.423-5.408-34.167-14.152C5.408,73.741,0,61.661,0,48.318s5.408-25.422,14.152-34.166C22.896,5.409,34.976,0,48.319,0 L48.319,0z M77.082,19.555c-7.361-7.361-17.53-11.914-28.763-11.914c-11.233,0-21.403,4.553-28.764,11.914 C12.194,26.916,7.641,37.085,7.641,48.318c0,11.233,4.553,21.403,11.914,28.764c7.36,7.361,17.53,11.914,28.764,11.914 c11.233,0,21.402-4.553,28.763-11.914c7.361-7.36,11.914-17.53,11.914-28.764C88.996,37.085,84.443,26.916,77.082,19.555 L77.082,19.555z" /></g></svg>
            </button>
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
            movies.map(({
              id, title, poster_path, name,
            }) => (
              <MovieCard
                key={id}
                className="movies__item"
                link={`${location.pathname}/${id}`}
                image={poster_path}
                title={title || name}
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
