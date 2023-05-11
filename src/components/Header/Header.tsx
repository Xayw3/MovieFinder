import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';

const Header = () => {
  const [headerClass, setHeaderClass] = useState('');

  const location = useLocation().pathname;

  const headerMenu = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Movies',
      path: '/movie',
    },
    {
      title: 'TV Series',
      path: '/tv',
    },
  ];

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        setHeaderClass('shrink');
      } else {
        setHeaderClass('');
      }
    };

    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <header className={`header ${headerClass}`}>
      <div className="container">
        <div className="header__wrapper">
          <div className="logo">
            <img src={logo} alt="Movies" />
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>MovieFinder</Link>
          </div>
          <ul className="header__menu">
            {
              headerMenu.map(({ title, path }, i) => (
                <li key={title} className={`header__menu-item ${path === location ? 'active' : ''}`}>
                  <Link
                    className={`header__menu-link ${path === location ? 'active' : ''}`}
                    to={path}
                  >
                    {title}

                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
