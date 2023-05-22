import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MoviePage from './pages/MoviePage/MoviePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/tv" element={<MoviesPage />} />
        <Route path="/tv/:id" element={<MoviePage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
