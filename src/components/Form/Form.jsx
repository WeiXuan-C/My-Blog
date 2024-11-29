import InputField from './InputField';
import PropTypes from 'prop-types';
import SubmitBtn from './SubmitBtn';
import './Form.scss';

const Form = ({ fields, onSubmit, submitBtnLabel }) => {
    return (
        <form onSubmit={onSubmit}>
            {fields.map(({ name, label, type, value, onChange, defaultValue, min, max, onBlur,minLength, maxLength, extraContent, options, errorMessage, required, placeholder }) => (
                <InputField
                    key={name}
                    name={name}
                    label={label}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    options={options}
                    errorMessage={errorMessage}
                    required={required}
                    extraContent={extraContent}
                    minLength={minLength}
                    maxLength={maxLength}
                    min={min}
                    max={max}
                    defaultValue={defaultValue}
                />
            ))}
            <div className='modal-actions'>
                <SubmitBtn label={submitBtnLabel || 'Submit'} />
            </div>
        </form>
    );
};

Form.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            label: PropTypes.string,
            type: PropTypes.oneOf(['text', 'file', 'number', 'date', 'select', 'textarea', 'checkbox']).isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
            onChange: PropTypes.func.isRequired,
            onBlur: PropTypes.func,
            extraContent: PropTypes.node,
            options: PropTypes.arrayOf(
                PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                })])
            ),
            errorMessage: PropTypes.string,
            required: PropTypes.bool,
            placeholder: PropTypes.string,
            minLength: PropTypes.number,
            maxLength: PropTypes.number,
            min: PropTypes.number,
            max: PropTypes.number,
            defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        })
    ), // Ensure fields is an array of objects
    onSubmit: PropTypes.func.isRequired,
    submitBtnLabel: PropTypes.string, // Optional label for the submit button
};

export default Form;
