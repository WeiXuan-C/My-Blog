import './index.scss';
import { Link } from 'react-router-dom';
import DisplayBreadcrumb from '../../Header/breadcrumb';

const breadcrumbPath = [
  {
    title: 'Movie List'
  },
];

const defaultMovie = () => {

  const handleNavigation = () => {
    console.log('Navigating to createMovie page');
  };

  return (
    <div className='title'>        
      <h1>
        <DisplayBreadcrumb path={breadcrumbPath}/>
      </h1>
      <div className='createMovieButton'>
        <Link to="createMovie" onClick={handleNavigation}>
          <button>+</button>
        </Link>        
      </div>
    </div>
  );
};

export default defaultMovie;
