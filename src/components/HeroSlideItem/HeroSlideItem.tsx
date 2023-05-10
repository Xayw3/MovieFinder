import { FC } from 'react';
import { Link } from 'react-router-dom';
import './hero-slide-item.scss';

type HeroSlideItemProps = {
  title: string,
  desc: string,
  className: string,
  bgImage: string,
  poster: string,
  link: string,
}

const HeroSlideItem: FC<HeroSlideItemProps> = ({
  title, desc, className, bgImage, poster, link,
}) => {
  const originalImage = (url: string) => `https://www.themoviedb.org/t/p/original/${url}`;
  const mediumImage = (url: string) => `https://www.themoviedb.org/t/p/w500/${url}`;

  return (
    <div className={`hero-slide__item ${className}`} style={{ backgroundImage: `url(${originalImage(bgImage)})` }}>
      <div className="container">
        <div className="hero-slide__content">
          <div className="hero-slide__content-info">
            <h2 className="hero-slide__title">{title}</h2>
            <p className="hero-slide__overview">{desc}</p>
            <div className="hero-slide__btns">
              <Link to={link || '/'} className="btn">Watch now</Link>
            </div>
          </div>
          <div className="hero-slide__content-poster">
            <img src={mediumImage(poster)} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideItem;
