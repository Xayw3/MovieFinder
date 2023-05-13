import './movie-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Movies, { Actors, Movie, Videos } from '../../models/moviesModel';
import Details from '../../components/Details/Details';

const MoviePage = () => {
  const { id } = useParams();
  const location = useLocation().pathname.replace(`${id}`, '');

  const [movie, setMovie] = useState<Movie>();
  const [actors, setActors] = useState<Actors[]>([]);
  const [videos, setVideos] = useState<Videos[]>([]);
  const [similar, setSimilar] = useState<Movies[]>([]);

  const getMovie = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/${location}/${id}?api_key=433e58e14ddff9586a5b1f8d7895559f`,
    );

    const actor = await axios.get(
      `https://api.themoviedb.org/3/${location}/${id}/credits?api_key=433e58e14ddff9586a5b1f8d7895559f`,
    );

    const video = await axios.get(
      `https://api.themoviedb.org/3/${location}/${id}/videos?api_key=433e58e14ddff9586a5b1f8d7895559f`,
    );

    const similars = await axios.get(
      `https://api.themoviedb.org/3/${location}/${id}/similar?api_key=433e58e14ddff9586a5b1f8d7895559f`,
    );

    setActors([...actor.data.cast].slice(0, 6));

    setVideos(video.data.results.filter(
      (el: Videos) => el.type === 'Teaser' && el.name !== 'Tickets on Sale',
    ));

    setMovie(data.data);

    setSimilar(similars.data.results.filter((el: Movies) => el.poster_path !== null));
  };

  useEffect(() => {
    if (id) {
      getMovie();
      window.scrollTo(0, 0);
    }
  }, [id]);

  return (
    <>
      {
        movie ? (
          <Details
            bgImage={movie.backdrop_path ? movie.backdrop_path : ''}
            poster={movie.poster_path}
            title={movie.title || movie.name}
            genres={movie.genres}
            overview={movie.overview}
            actors={actors}
            videos={videos}
            similar={similar}
            similarLink={location.includes('movie') ? 'movie' : 'tv'}
          />
        ) : null
      }
    </>
  );
};

export default MoviePage;
