import './footer.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import bg from '../../assets/images/footer-bg.jpg';

const Footer = () => {
  const menu = [
    ['Home', 'Contact us', 'Term of services', 'About us'],
    ['Live', 'FAQ', 'Premium', 'Privacy policy'],
    ['You must watch', 'Recent release', 'Top IMDB'],
  ];

  const handleClick = (link: string) => {
    if (link === 'Home') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container">
        <div className="footer-logo">
          <img src={logo} alt="Movies" />
          <Link to="/">MovieFinder</Link>
        </div>
        <div className="footer__menus">
          {
            menu.map((el) => (
              <ul key={Math.random()} className="footer__menu">
                {
                  el.map((link) => (
                    <li key={Math.random()} className="footer__item">
                      <Link to="/" onClick={() => handleClick(link)}>{link}</Link>
                    </li>
                  ))
                }
              </ul>
            ))
          }
        </div>
      </div>
    </footer>
  );
};

export default Footer;
