import './index.scss'
import DisplayBreadcrumb from '../../Header/breadcrumb'
import Form from '../../../../components/Form/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const breadcrumbPath = [
    {
        title: 'Movie List',
        link: './movie'
    },
    {
        title: 'Create New Movie'
    },
];

const CreateMovie = () => {
    const [movie, setMovie] = useState({
        title: '', 
        image: null,
        runningTimeHours: '',
        runningTimeMinutes: '',
        cast: '',
        synopsis: '',
        trailer: '',
        director: '',
        genre: '',
        spokenLanguage: '',
        subtitles: [],
        classification: '',
        releaseDate: '',
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
    
    const handleInputChange = (e) => {
        const { name, type, value } = e.target;
        if (type === 'file' && name === 'image') {
            const file = e.target.files[0];
            handleFileValidation(file);
        } else {
            setMovie((prevMovie) => ({
                ...prevMovie,
                [name]: value,
            }));
        }
    };

    const handleFileValidation = (file) => {
        if (!file) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                image: 'Image is required.',
            }));
        } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                image: 'Invalid file format. Only JPEG, PNG, and GIF are allowed.',
            }));
        } else if (file.size > 5 * 1024 * 1024) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                image: 'File size exceeds the 5MB limit.',
            }));
        } else {
            setValidationErrors((prevErrors) => ({ ...prevErrors, image: '' }));
            setMovie((prevMovie) => ({ ...prevMovie, image: file }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked, value } = e.target;
    
        if (name === 'subtitles') {
            // Update the subtitles array first
            setMovie((prevData) => {
                let updatedSubtitles = [...prevData.subtitles];
    
                if (checked) {
                    // Add subtitle if checkbox is checked
                    updatedSubtitles.push(value);
                } else {
                    // Remove subtitle if checkbox is unchecked
                    updatedSubtitles = updatedSubtitles.filter((subtitle) => subtitle !== value);
                }
    
                // Validation after updating the subtitles
                if (updatedSubtitles.length === 0) {
                    setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        subtitles: 'At least one subtitle is required.',
                    }));
                } else {
                    setValidationErrors((prevErrors) => {
                        const updatedErrors = { ...prevErrors };
                        delete updatedErrors.subtitles;
                        return updatedErrors;
                    });
                }
    
                return {
                    ...prevData,
                    subtitles: updatedSubtitles,
                };
            });
        }
    };    
    
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const minLength = e.target.minLength;
        const trimmedValue = value.trim();
        const formatFieldName = (fieldName) => {
          return fieldName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
        };
        const minDate = new Date().toISOString().split('T')[0];

        // Validation for releaseDate
        if (name === 'releaseDate') {
            if (!value) {
                const errorMessage = `${formatFieldName(name)} is required.`;
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    releaseDate: errorMessage,
                }));
            } else if (value < minDate) { // Compare entered date with minDate
                const errorMessage = `${formatFieldName(name)} cannot be earlier than today.`;
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    releaseDate: errorMessage,
                }));
            } else {
                setValidationErrors((prevErrors) => {
                    const updatedErrors = { ...prevErrors };
                    delete updatedErrors.releaseDate;
                    return updatedErrors;
                });
            }
            setMovie((prevData) => ({
                ...prevData,
                releaseDate: value,
            }));
        } 
        // Validation for image
        else if (name === 'image') {
            if (!movie.image) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    image: `${formatFieldName('image')} is required.`,
                }));
            } else if (!(movie.image instanceof File)) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    image: `${formatFieldName('image')} must be a valid file.`,
                }));
            } else if (movie.image.size > 5 * 1024 * 1024) { // Check file size (5MB)
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    image: `${formatFieldName('image')} must be less than 5MB.`,
                }));
            } else if (movie.image && !['image/jpeg', 'image/png', 'image/gif'].includes(movie.image.type)) { // Check file type
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    image: `${formatFieldName('image')} must be a JPEG, PNG, or GIF file.`,
                }));
            } else {
                setValidationErrors((prevErrors) => {
                    const updatedErrors = { ...prevErrors };
                    delete updatedErrors.image;
                    return updatedErrors;
                });
            }
        }
        // General validation for other fields
        else if (value.trim() === '') {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `${formatFieldName(name)} is required.`,
            }));
        } else if (minLength && value.trim().length < minLength) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `${formatFieldName(name)} must be at least ${minLength} characters.`,
            }));
        }else {
            setValidationErrors((prevErrors)=>{
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name]; // Clear error if value is valid
                return updatedErrors;
            })            
        }
        setMovie((prevData)=>({
            ...prevData,
            [name]: trimmedValue,
        }))
    };    

    const validateWebsite = (e) => {
        const inputValue = e.target.value ? e.target.value.trim() : ''; // Get the trimmed value, or an empty string if null or undefined
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
        return !Object.keys(validationErrors).length && Object.values(movie).every((value) => value !== '');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isFormValid())
        {            
            const createMovie = {
                title: movie.title, 
                image: movie.image,
                runningTimeHours: movie.runningTimeHours,
                runningTimeMinutes: movie.runningTimeMinutes,
                cast: movie.cast,
                synopsis: movie.synopsis,
                trailer: movie.trailer,
                director: movie.director,
                genre: movie.genre,
                spokenLanguage: movie.spokenLanguage,
                subtitles: movie.subtitles,
                classification: movie.classification,
                releaseDate: movie.releaseDate 
            }
            dispatch(createMovie(createMovie))
            const setMovie = { 
                title: '', 
                image: null,
                runningTimeHours: '',
                runningTimeMinutes: '',
                cast: '',
                synopsis: '',
                trailer: '',
                director: '',
                genre: '',
                spokenLanguage: '',
                subtitles: [],
                classification: '',
                releaseDate: '' 
            }
            dispatch(setMovie(setMovie))
            navigate('/movie')
        }            
    }        
    const fields = [
        {
            name: "title",
            type: "text",
            label: "Title*",
            value: movie.title,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            minLength: 5,
            maxLength: 20,
            required: true,
            errorMessage: validationErrors.title,
            lengthLimit: 20,
            extraContent: <p>{movie.title.trim().length} / 20</p>,
        },
        {
            name: "image",
            type: "file",
            label: "Image*",
            accept: 'image/jpeg, image/png, image.gif',
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            required: true,
            errorMessage: validationErrors.image,
        },
        {
            name: "runningTimeHours",
            type: "number",
            label: "Running Time*",
            value: movie.runningTimeHours,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            min: 1,
            max: 23,
            required: true,
            placeholder: 'Hours',
            errorMessage: validationErrors.runningTimeHours,
        },
        {
            name: "runningTimeMinutes",
            type: "number",
            label: "",
            value: movie.runningTimeMinutes,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            min: 0,
            max: 59,
            required: false,
            defaultValue: 0,
            placeholder: 'Minutes',
        },
        {
            name: "cast",
            type: "textarea",
            label: "Cast*",
            value: movie.cast,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            minLength: 10,
            maxLength: 200,
            required: true,
            errorMessage: validationErrors.cast,
            lengthLimit: 200,
            extraContent: <p>{movie.cast.trim().length} / 200</p>,
        },
        {
            name: "synopsis",
            type: "textarea",
            label: "Synopsis*",
            value: movie.synopsis,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            minLength: 30,
            maxLength: 1000,
            required: true,
            errorMessage: validationErrors.synopsis,
            lengthLimit: 1000,
            extraContent: <p>{movie.synopsis.trim().length} / 1000</p>,
        },
        {
            name: "trailer",
            type: "text",
            label: "Trailer*",
            value: movie.trailer,
            onChange: validateWebsite,
            maxLength: 50,
            required: true,
            errorMessage: validationErrors.trailer,
            lengthLimit: 50,
            extraContent: <p>{movie.trailer.trim().length} / 50</p>,
        },
        {
            name: "director",
            type: "text",
            label: "Director*",
            value: movie.director,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            minLength: 5,
            maxLength: 20,
            required: true,
            errorMessage: validationErrors.director,
            lengthLimit: 20,
            extraContent: <p>{movie.director.trim().length} / 20</p>,
        },
        {
            name: "genre",
            type: "text",
            label: "Genre*",
            value: movie.genre,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            minLength: 5,
            maxLength: 20,
            required: true,
            errorMessage: validationErrors.genre,
            lengthLimit: 20,
            extraContent: <p>{movie.genre.trim().length} / 20</p>,
        },
        {
            name: "spokenLanguage",
            type: "select",
            label: "Spoken Language*",
            value: movie.spokenLanguage,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            required: true,
            options: [
                ...(movie.spokenLanguage === "" ? [{ value: "", label: "Select a language", disabled: true }] : []),
                { value: "CN", label: "Chinese (CN)" },
                { value: "ENG", label: "English (ENG)" },
                { value: "ESP", label: "Spanish (ESP)" },
                { value: "FRA", label: "French (FRA)" },
                { value: "GER", label: "German (GER)" },
            ],
            errorMessage: validationErrors.spokenLanguage,
        },
        {
            name: "subtitles",
            type: "checkbox",
            label: "Subtitles*",
            options: [
                { value: "CN", label: "Chinese (CN)" },
                { value: "ENG", label: "English (ENG)" },
            ],
            onChange: handleCheckboxChange,
            value: movie.subtitles,
            errorMessage: validationErrors.subtitles,
        },
        {
            name: "classification",
            type: "select",
            label: "Classification*",
            value: movie.classification,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            required: true,
            options: [
                ...(movie.classification === "" ? [{ value: "", label: "Select a classification", disabled: true }] : []),
                { value: "P3", label: "All Ages (P3)" },
                { value: "P12", label: "Parental Guidance (P12)" },
                { value: "P13", label: "Teens (P13)" },
                { value: "P18", label: "Restricted Viewing (P18)" },
            ],
            errorMessage: validationErrors.classification,
        },
        {
            name: "releaseDate",
            type: "date",
            label: "Release Date*",
            value: movie.releaseDate,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => handleBlur(e),
            min: new Date().toISOString().split("T")[0],
            required: true,
            errorMessage: validationErrors.releaseDate,
        },
    ];

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='title'>
                    <h2>
                        <DisplayBreadcrumb path = {breadcrumbPath} />
                    </h2>
                </div>
                <Form fields={fields} onSubmit={handleSubmit} submitBtnLabel="Upload"/>
            </div>
        </div>
    )
}

export default CreateMovie