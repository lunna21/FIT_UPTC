import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, type, name, id, placeholder, value, onChange, required, Icon, max }) => {
    return (
        <div className="w-full box-border">
            <label className='text-black font-normal text-sm py-2 block' htmlFor={id}>{label}</label>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                {Icon && <Icon className="text-gray-400 w-5 h-5" />}
                <input
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className='bg-transparent outline-none border-none w-full p-1'
                    {...max && { maxLength: max }}
                />
            </div>
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    icon: PropTypes.elementType,
};

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    required: false,
    icon: null,
};

export default Input;