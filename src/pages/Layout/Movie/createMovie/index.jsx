import { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const createMovie = ({ onAddMovie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    genre: '',
    releaseDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = () => {
    if (onAddMovie) {
      onAddMovie(movie);
    }
    setIsModalOpen(false); // Close modal after submission
    setMovie({ title: '', director: '', genre: '', releaseDate: '' }); // Reset form
  };

  return (
    <div className="create-movie">
      <button className="create-movie-btn" onClick={() => setIsModalOpen(true)}>
        +
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Close Icon */}
            <span className="close-icon" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Create a New Movie</h2>
            <p>You will required to fill in all details.</p>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={movie.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Director:
              <input
                type="text"
                name="director"
                value={movie.director}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={movie.genre}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Release Date:
              <input
                type="date"
                name="releaseDate"
                value={movie.releaseDate}
                onChange={handleInputChange}
                //set today's date as the minimum
                min={new Date().toISOString().split("T")[0]}
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleSubmit}>Add Movie</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

createMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};

export default createMovie;
