import PropTypes from 'prop-types';

const PopMessage = ({ bgColor = 'yellow', textColor='black', children, left, right, top, bottom }) => {

    const positionClasses = `${left !== undefined ? `left-${left}` : ''} ${right !== undefined ? `right-${right}` : ''} ${top !== undefined ? `top-${top}` : ''} ${bottom !== undefined ? `bottom-${bottom}` : ''}`;

    return (
        <div className={`absolute ${positionClasses}  bg-${bgColor} text-${textColor} p-2 rounded`}>
            {children}
        </div>
    );
};

PopMessage.propTypes = {
    bgColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    left: PropTypes.string,
    right: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
};

export default PopMessage;