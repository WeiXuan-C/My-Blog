import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setMovie } from '../../../store/modules/movie';

const Movie = () => {
  const movie = useSelector((state) => state.movie.movie); // Access movie state
  useEffect(() => {
    if (movie) {
      console.log("Movie added:", movie);
    } else {
      console.log("No movie added");
    }
  }, [movie]);

  return (
    <div>
      <Outlet />
    </div>
  )
};

export default Movie;
