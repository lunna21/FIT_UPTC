import PropTypes from 'prop-types';


const Button = ({ 
    buttonText,
    onClick = () => { },
    Icon,
    disabled = false,
    justify = "center",
    sizeHeight = "h-12", // tailwindcss class
    sizeWidth = "w-full", // tailwindcss class
}) => {

    const tailwindClassIcon = "text-2xl transition ease-in-out duration-255 group-hover:translate-x-1"
    const tailwindClassButton = `my-2 justify-${justify} items-center gap-2 ${sizeHeight} ${sizeWidth} overflow-hidden bg-primary-medium text-neutral-gray-dark flex disabled:opacity-50 disabled:cursor-not-allowed text-gray-dark py-1 px-16 rounded-lg font-normal transition ease-in-out duration-255 overflow-auto hover:bg-primary-light`

    return (
        <div className={`group w-full `}>
            <button
                type="button"
                className={tailwindClassButton}
                {...(onClick ? { onClick } : {})}
                disabled={disabled}
            >
                {buttonText}
                {
                    Icon && <Icon className={tailwindClassIcon} />
                }
            </button>
        </div>
    );
};

Button.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    Icon: PropTypes.elementType,
    disabled: PropTypes.bool,
    sizeHeight: PropTypes.string,
};

export default Button;