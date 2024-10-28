import React from 'react';
import PropTypes from 'prop-types';

const ButtonPrimary = ({ onClick, buttonText, IconButton, reverse=false, type="button" }) => {
    const buttonTailwindClass = "flex items-center justify-center gap-20 w-full p-3 bg-primary-medium hover:bg-primary-light text-neutral-gray-dark hover:text-neutral-black text-base rounded-lg transition-colors duration-300 h-11"
    const iconTailwindClass = "text-2xl transition-transform duration-300 group-hover:translate-x-1"

    if(reverse) {
        return (
            <button
                type={type}
                {...(onClick ? { onClick } : {})}
                className={buttonTailwindClass}
            >
                {
                    IconButton && <IconButton className={iconTailwindClass} />
                }
                <span>{buttonText}</span>
            </button>
        )
    }
    return (
        <button
            type="button"
            {...(onClick ? { onClick } : {})}
            className={buttonTailwindClass}
        >
            <span>{buttonText}</span>
            {
                IconButton && <IconButton className={iconTailwindClass} />
            }
        </button>
    );
};

ButtonPrimary.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    IconButton: PropTypes.elementType,
    reverse: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default ButtonPrimary;