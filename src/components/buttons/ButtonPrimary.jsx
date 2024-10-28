import React from 'react';
import PropTypes from 'prop-types';

const ButtonPrimary = ({ onClick, buttonText, IconButton, reverse=false }) => {
    if(reverse) {
        return (
            <button
                type="button"
                {...(onClick ? { onClick } : {})}
                className="flex items-center justify-center gap-20 w-full p-3 bg-primary-medium hover:bg-primary-light text-neutral-gray-dark hover:text-neutral-black text-base rounded-lg transition-colors duration-300 h-11"
            >
                {
                    IconButton && <IconButton className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
                }
                <span>{buttonText}</span>
            </button>
        )
    }
    return (
        <button
            type="button"
            {...(onClick ? { onClick } : {})}
            className="flex items-center justify-center gap-20 w-full p-3 bg-primary-medium hover:bg-primary-light text-neutral-white hover:text-neutral-black text-base rounded-lg transition-colors duration-300 h-11"
        >
            <span>{buttonText}</span>
            {
                IconButton && <IconButton className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
            }
        </button>
    );
};

ButtonPrimary.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    IconButton: PropTypes.elementType,
    reverse: PropTypes.bool,
};

export default ButtonPrimary;