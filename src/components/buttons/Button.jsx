import PropTypes from 'prop-types';

const Button = ({ 
    buttonText,
    onClick = () => { },
    Icon,
    type = "button",
    disabled = false,
    justify = "center",
    sizeHeight = "h-12", // tailwindcss class
    sizeWidth = "w-full", // tailwindcss class
    color = 'primary-medium' // default color
}) => {

    const tailwindClassIcon = "text-2xl transition ease-in-out duration-255 group-hover:translate-x-1";

    // Define las clases de Tailwind CSS para diferentes colores
    const colorClasses = {
        'primary-medium': 'bg-primary-medium hover:bg-primary-light text-neutral-gray-dark',
        'red': 'bg-accent-red hover:bg-accent-redLight text-white', // Clases para el color rojo
        'green': 'bg-accent-green hover:bg-accent-greenLight text-white' // Clases para el color verde
    };

    // Usa las clases de color basadas en la propiedad `color`
    const tailwindClassButton = `my-2 justify-${justify} items-center gap-2 ${sizeHeight} ${sizeWidth} overflow-hidden ${colorClasses[color]} flex disabled:opacity-50 disabled:cursor-not-allowed text-gray-dark py-1 px-16 font-semibold rounded-lg transition ease-in-out duration-255 overflow-auto`;

    return (
        <div className={`group w-full`}>
            <button
                type={type}
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