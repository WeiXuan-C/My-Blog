import PropTypes from "prop-types";

const SubmitBtn = ({ label, isFormValid, handleSubmit }) => {
    return (
        <button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!isFormValid}
        >
            {label}
        </button>
    )
};

SubmitBtn.propTypes = {
    label: PropTypes.string.isRequired,    // Validate that label is a required string
    isFormValid: PropTypes.func, // Validate that isFormValid is a required function
    handleSubmit: PropTypes.func, // Validate that handleSubmit is a required function
};

SubmitBtn.defaultProps = {
    label: "Submit"
}

export default SubmitBtn;
