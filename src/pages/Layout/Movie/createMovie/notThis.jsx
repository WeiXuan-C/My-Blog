import './index.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayBreadcrumb from '../../Header/breadcrumb';

const breadcrumbPath = [
  {
    title: 'Movie List',
    link: '/movie'
  },
  {
    title: 'Create New Movie'
  },
];

const CreateMovie = ({onAddMovie}) => {
  //ori state for createMovieForm
  // const [movie, setMovie] = useState({
  //   title: '', 
  //   image: null,
  //   runningTimeHours: '',
  //   runningTimeMinutes: '',
  //   cast: '',
  //   synopsis: '',
  //   trailer: '',
  //   director: '',
  //   genre: '',
  //   spokenLanguage: '',
  //   subtitles: [],
  //   classification: '',
  //   releaseDate: '',
  // });

  //ori state for errorMsg
  const [validationErrors, setValidationErrors] = useState({
    title: "Title is required.",
    image: "Image is required.",
    runningTimeHours: "Running Time is required.",
    cast: "Cast is required.",
    synopsis: "Synopsis is required.",
    trailer: "Trailer link is required.",
    director: "Director is required.",
    genre: "Genre is required.",
    spokenLanguage: "Spoken Language is required.",
    classification: "Classification is required.",
    subtitles: "At least one subtitle is required.",
    releaseDate: "Release Date is required.",
  });

  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([/a-zA-Z0-9#?&%-]*)?$/;

  // const handleInputChange = (e) => {
  //   const {name, type, checked} = e.target
  //   const value = e.target.value ? e.target.value.trim() : '';
  //   // Handle file input
  //   if (type === 'file' && name === 'image') {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  //       const maxSize = 5 * 1024 * 1024; // 5MB size limit
    
  //       // Check file type and size
  //       if (!validTypes.includes(file.type)) {
  //         setValidationErrors((prevErrors) => ({
  //           ...prevErrors,
  //           image: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.',
  //         }));
  //       } else if (file.size > maxSize) {
  //         setValidationErrors((prevErrors) => ({
  //           ...prevErrors,
  //           image: 'File size exceeds the 5MB limit.',
  //         }));
  //       } else {
  //         // Clear the error when the file is valid
  //         setValidationErrors((prevErrors) => ({ ...prevErrors, image: '' }));
  //         setMovie((prevMovie) => ({ ...prevMovie, image: file }));
  //       }
  //     } else {
  //       // Show error if no file is selected
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         image: 'Image is required.',
  //       }));
  //     }
  //   }
  //   //handle checkbox
  //   else if(type === 'checkbox' && name === 'subtitles'){
  //     setMovie((prevMovie)=> {
  //       const updatedSubtitles = checked 
  //         ? [...prevMovie.subtitles, value]
  //         : prevMovie.subtitles.filter((subtitle) => subtitle !== value)
  //       return {...prevMovie, subtitles: updatedSubtitles}
  //     })
  //   }
  //   else{
  //     setMovie((prevMovie) => ({ 
  //       ...prevMovie, 
  //       [name]: value
  //     }))
  //   }    
  // }

  // const handleBlur = (e) => {
  //   const { name, value } = e.target;
  //   const minLength = e.target.minLength;
  
  //   const formatFieldName = (fieldName) => {
  //     return fieldName
  //       .replace(/([A-Z])/g, ' $1')
  //       .replace(/^./, (str) => str.toUpperCase());
  //   };
  //   const minDate = new Date().toISOString().split('T')[0];
  
  //   // Validation for subtitles
  //   if (name === 'subtitles') {
  //     if (movie.subtitles.length === 0) {
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         subtitles: 'At least one subtitle is required.',
  //       }));
  //     } else {
  //       const updatedErrors = { ...validationErrors };
  //       delete updatedErrors.subtitles; // Clear error if at least one subtitle is selected
  //       setValidationErrors(updatedErrors);
  //     }
  //   } 
  //   // Validation for releaseDate
  //   else if (name === 'releaseDate') {
  //     if (!value) {
  //       const errorMessage = `${formatFieldName(name)} is required.`;
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         releaseDate: errorMessage,
  //       }));
  //     } else if (value < minDate) { // Compare entered date with minDate
  //       const errorMessage = `${formatFieldName(name)} cannot be earlier than today.`;
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         releaseDate: errorMessage,
  //       }));
  //     } else {
  //       const updatedErrors = { ...validationErrors };
  //       delete updatedErrors.releaseDate; // Clear error if value is valid
  //       setValidationErrors(updatedErrors);
  //     }
  //     setMovie((prevData) => ({
  //       ...prevData,
  //       releaseDate: value,
  //     }));
  //   } 
  //   // Validation for image
  //   else if (name === 'image') {
  //     if (!movie.image) {
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         image: `${formatFieldName('image')} is required.`,
  //       }));
  //     } else if (!(movie.image instanceof File)) {
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         image: `${formatFieldName('image')} must be a valid file.`,
  //       }));
  //     } else if (movie.image.size > 5 * 1024 * 1024) { // Check file size (5MB)
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         image: `${formatFieldName('image')} must be less than 5MB.`,
  //       }));
  //     } else if (movie.image && !['image/jpeg', 'image/png', 'image/gif'].includes(movie.image.type)) { // Check file type
  //       setValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         image: `${formatFieldName('image')} must be a JPEG, PNG, or GIF file.`,
  //       }));
  //     } else {
  //       const updatedErrors = { ...validationErrors };
  //       delete updatedErrors.image; // Clear error if the image is valid
  //       setValidationErrors(updatedErrors);
  //     }
  //   }
  //   // General validation for other fields
  //   else if (value.trim() === '') {
  //     setValidationErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [name]: `${formatFieldName(name)} is required.`,
  //     }));
  //   } else if (minLength && value.trim().length < minLength) {
  //     setValidationErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [name]: `${formatFieldName(name)} must be at least ${minLength} characters.`,
  //     }));
  //   } else {
  //     const updatedErrors = { ...validationErrors };
  //     delete updatedErrors[name]; // Clear error if value is valid
  //     setValidationErrors(updatedErrors);
  //   }
  // };
  
  const validateWebsite = (e) => {
    const inputValue = e.target.value ? e.target.value.trim() : ''; // Get the trimmed value, or an empty string if null or undefined
    console.log(inputValue)
    if (!inputValue) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        trailer: "Trailer Link is required.",
      }));
    } else if (!urlRegex.test(inputValue)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        trailer: "Please enter a valid trailer link.",
      }));
    } else {
      setValidationErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors }; // Create a shallow copy of the errors object
        delete updatedErrors.trailer; // Remove the trailer key
        return updatedErrors; // Return the updated object
      });
    }
    
    setMovie((prevData) => ({
      ...prevData,
      trailer: inputValue,
    }));
  }

  const isFormValid = () => {
    console.log("Validation Errors: ", validationErrors)
    const isValid =      
      !Object.keys(validationErrors).length && 
      movie.title.trim() && //not empty
      movie.image && 
      movie.runningTimeHours && 
      movie.cast.trim() &&
      movie.synopsis.trim() && 
      movie.trailer.trim() && 
      movie.director.trim() && 
      movie.genre.trim() && 
      movie.spokenLanguage.trim() && 
      movie.subtitles.length > 0 && 
      movie.classification.trim() && 
      movie.releaseDate;
    return isValid;
  }

  // const handleSubmit = () => {
  //   if (onAddMovie) {
  //     onAddMovie(movie);
  //   }
  //   setMovie({ title: '', image: null, runningTimeHours: '', runningTimeMinutes: '', cast: '', synopsis: '', trailer: '', director: '', genre: '', spokenLanguage: '', subtitles: [], classification: '', releaseDate: '' }); // Reset form
  //   navigate('/movie')
  //   console.log('Navigating to movieList page')
  // };

  //test font-family and font size
  // const inputRef = useRef(null)
  // useEffect(()=>{
  // const inputElement = document.querySelector('input');
  // const computedStyles = window.getComputedStyle(inputElement);
  // const fontFamily = computedStyles.fontFamily;
  // const fontSize = computedStyles.fontSize;
  // console.log('Font Family:', fontFamily);
  // console.log('Font Size:', fontSize);
  // },[])

  return (
        <div className="modal">
          <div className="modal-content">          
            <div className='title'>              
              <h2>
                <DisplayBreadcrumb path={breadcrumbPath}/>
              </h2>              
            </div>
            <label>
              Title*
              <input
                // ref={inputRef}
                type="text"
                name="title"
                value={movie.title}
                maxLength = {20}
                onChange = {(e) => handleInputChange(e)} 
                onBlur={(e) => handleBlur(e)}
                required
                minLength={5}
              />
              <div className="input-wrapper">                
                {validationErrors.title ? (
                  <span className='error-message'>{validationErrors.title}</span>
                ):(
                  <span className='proceed'></span>
                )}
                <p> {movie.title.trim().length} / 20</p>
              </div>
            </label>
            <label>
              Image*
              <input
                type="file"
                name="image"
                accept='image/jpeg, image/png, image.gif'
                onChange = {(e) => handleInputChange(e)} 
                onBlur={(e) => handleBlur(e)}
                required
              />
              <div className="input-wrapper">                
                {validationErrors.image ? (
                  <span className='error-message'>{validationErrors.image}</span>
                ):(
                  <span className='proceed'></span>
                )}
              </div>
            </label>
            <label>
              Running Time*
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '170px',
                gap: '2px'
              }}>
                <input
                  type="number"
                  name="runningTimeHours"
                  value={movie.runningTimeHours}
                  onChange = {(e) => handleInputChange(e)} 
                  onBlur={(e) => handleBlur(e)}
                  required
                  min={1}
                  max={23}
                  placeholder='Hours'
                />
                <input
                  type="number"
                  name="runningTimeMinutes"
                  value={movie.runningTimeMinutes}
                  onChange = {(e) => handleInputChange(e)} 
                  onBlur={(e) => handleBlur(e)}
                  min={0}
                  max={59}
                  placeholder='Minutes'
                />
              </div>
              <div className="input-wrapper">                
                {validationErrors.runningTimeHours ? (
                  <span className='error-message'>{validationErrors.runningTimeHours}</span>
                ):(
                  <span className='proceed'></span>
                )}
              </div>
            </label>
            <label>
              Cast*
              <textarea
                type="text"
                name="cast"
                value={movie.cast}
                maxLength = {200}
                onChange = {(e) => handleInputChange(e)} 
                onBlur={(e) => handleBlur(e)}
                required
                minLength={10}
              />
              <div className="input-wrapper">                
                {validationErrors.cast ? (
                  <span className='error-message'>{validationErrors.cast}</span>
                ):(
                  <span className='proceed'></span>
                )}
                <p> {movie.cast.trim().length} / 200</p>
              </div>
            </label> 
            <label>
              Synopsis*
              <textarea
                type="text"
                name="synopsis"
                value={movie.synopsis}
                maxLength = {1000}
                onChange = {(e) => handleInputChange(e)} 
                onBlur={(e) => handleBlur(e)}
                required
                minLength={30}
              />
              <div className="input-wrapper">                
                {validationErrors.synopsis ? (
                  <span className='error-message'>{validationErrors.synopsis}</span>
                ):(
                  <span className='proceed'></span>
                )}
                <p> {movie.synopsis.trim().length} / 1000</p>
              </div>
            </label>
            <label>
              Trailer*
              <input
                type="text"
                name="trailer"
                value={movie.trailer}
                onChange = {(e) => validateWebsite(e)} 
                // onBlur={(e) => validateWebsite(e)}
                required
                maxLength={50}
              />
              <div className="input-wrapper">                
                {validationErrors.trailer ? (
                  <span className='error-message'>{validationErrors.trailer}</span>
                ):(
                  <span className='proceed'></span>
                )}
                <p> {movie.trailer.trim().length} / 50</p>
              </div>
            </label>
            <label>
              Director*
              <input
                type="text"
                name="director"
                value={movie.director}
                maxLength={20}
                onChange={(e) => handleInputChange(e)}
                onBlur={(e) => handleBlur(e)}
                required
                minLength={5}
              />
              <div className="input-wrapper">                
                {validationErrors.director ? (
                  <span className='error-message'>{validationErrors.director}</span>
                ):(
                  <span className='proceed'></span>
                )}
                <p> {movie.director.trim().length} / 20</p>
              </div>
            </label>
            <label>
              Genre*
              <input
                type="text"
                name="genre"
                value={movie.genre}
                maxLength={20}
                onChange={(e) => handleInputChange(e)}
                onBlur = {(e) => handleBlur(e)}
                required
                minLength={5}
              />
              <div className="input-wrapper">                
                {validationErrors.genre ? (
                  <span className='error-message'>{validationErrors.genre}</span>
                ):(
                  <span className='proceed'></span>
                )}
                <p> {movie.genre.trim().length} / 20</p>
              </div>
            </label>
            <label>
              Spoken Language*
              <select
                name="spokenLanguage"
                value={movie.spokenLanguage}
                onChange={(e) => handleInputChange(e)}
                onBlur = {(e) => handleBlur(e)}
                required
              >
                <option value="" disabled>Select a language</option>
                <option value="CN">Chinese (CN)</option>
                <option value="ENG">English (ENG)</option>
                <option value="ESP">Spanish (ESP)</option>
                <option value="FRA">French (FRA)</option>
                <option value="GER">German (GER)</option>
              </select>
              <div className="input-wrapper">                
                {validationErrors.spokenLanguage ? (
                  <span className='error-message'>{validationErrors.spokenLanguage}</span>
                ):(
                  <span className='proceed'></span>
                )}
              </div>
            </label>
            <label>
              Subtitles*
              <div  
                className='checkbox-group'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '5px 0',
                }}
              >
                {["CN", "ENG"].map((language) => (
                  <label key={language} style={{display: 'flex', alignItems: 'center'}}>
                    <input  
                      type='checkbox'
                      name="subtitles"
                      value={language}
                      onChange={(e) => handleInputChange(e)}
                      onBlur = {(e) => handleBlur(e)}
                      checked={movie.subtitles.includes(language)}
                      required
                    />
                    {language === "CN" && "Chinese (CN)"}
                    {language === "ENG" && "English (ENG)"}
                    </label>
                ))}
              </div>
              <div className="input-wrapper" >                
                <span className="error-message">
                  {validationErrors.subtitles ? (
                    validationErrors.subtitles
                  ) : (
                    <span className='proceed'></span>
                  )}
                </span>
              </div>
            </label>
            <label>
              Classification*
              <select
                name="classification"
                value={movie.classification}
                onChange={(e) => handleInputChange(e)}
                onBlur = {(e) => handleBlur(e)}
                required
              >
                <option value="" disabled>Select a classification</option>
                <option value="P3">All Ages (P3)</option>
                <option value="P12">Parental Guidance (P12)</option>
                <option value="P13">Teens (P13)</option>
                <option value="P18">Restricted Viewing (P18)</option>
              </select>
              <div className="input-wrapper">                
                {validationErrors.classification ? (
                  <span className='error-message'>{validationErrors.classification}</span>
                ):(
                  <span className='proceed'></span>
                )}
              </div>
            </label>
            <label>
              Release Date*
              <input
                type="date"
                name="releaseDate"
                value={movie.releaseDate}
                onChange={(e) => handleInputChange(e)}
                onBlur={(e) => handleBlur(e)}
                required
                //set today's date as the minimum
                min={new Date().toISOString().split("T")[0]}
              />
              <div className="input-wrapper" >                
                {validationErrors.releaseDate ? (
                  <span className='error-message'>{validationErrors.releaseDate}</span>
                ):(
                  <span className='proceed'></span>
                )}
              </div>
            </label>
            <div className="modal-actions">
              <button onClick={handleSubmit} disabled={!isFormValid()}>Upload</button>
            </div>
          </div>
        </div>
  );
};

CreateMovie.propTypes = {
  onAddMovie: PropTypes.func,
};

export default CreateMovie;
