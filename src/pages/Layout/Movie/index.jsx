import './index.scss';
import CreateMovie from './createMovie';

const Movie = () => {
  const handleAddMovie = (newMovie) => {
    console.log('New movie added:', newMovie);
    // Add logic to update state or send data to the server
  };

  return (
    <div>
      <h1>Movie List</h1>
      <hr style={{
        border: "1px solid #ce9b57",
        borderTop: "none"
      }}/>
      {/* Use the CreateMovie component to add movies */}
      <div className='createMovieButton'>
        <CreateMovie onAddMovie={handleAddMovie} />
      </div>
    </div>
  );
};

export default Movie;
