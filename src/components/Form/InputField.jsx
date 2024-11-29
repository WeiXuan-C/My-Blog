import PropTypes from "prop-types";

const InputField = ({
    label,
    type,
    name,
    value,
    onChange,
    onBlur,
    options,
    errorMessage,
    placeholder,
    required,
    minLength,
    maxLength,
    extraContent,
    defaultValue,
    min,
    max,
    ...rest
}) => {  
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            {type === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                >
                    {placeholder && (
                        <option value='' disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option, index) => {
                        const optionValue = typeof option === 'object' ? option.value : option;
                        const optionLabel = typeof option === 'object' ? option.label : option;
                        return (
                            <option key={index} value={optionValue}>
                                {optionLabel}
                            </option>
                        );
                    })}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                />
            ) : type === 'checkbox' ? (
                <div className="checkbox-group">
                    {options.map((option) => (
                        <label key={option.value}>
                            <input
                                type="checkbox"
                                name={name}
                                value={option.value}
                                checked={Array.isArray(value) && value.includes(option.value)} 
                                onChange={(e) => onChange(e, option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            ) : type === 'date' ? (  // Handle date input type
                <input
                    type="date"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
                    {...rest}
                />
            ) : type === 'number' ? (  
                <input
                    type="number"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    defaultValue={defaultValue}
                    {...rest}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    {...rest}
                />
            )}
            <div className="input-wrapper">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p></p>
                {extraContent && <div className="extra-content">{extraContent}</div>}
            </div>
        </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'file', 'number', 'select', 'date', 'textarea', 'checkbox']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })])
    ),
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    extraContent: PropTypes.node,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

// Default props for optional values
InputField.defaultProps = {
    options: [],
    errorMessage: '',
    required: false,
    placeholder: '',
    extraContent: null,
    defaultValue: 0,
};

export default InputField;
