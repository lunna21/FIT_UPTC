import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProgressLine({ lineColor, step, maxSteps, widthContainer }) {
    const [lineWidth, setLineWidth] = useState(0);

    useEffect(() => {
        const containerWidth = widthContainer - 12
            const newWidth = (containerWidth / maxSteps) * step; // Calcula el nuevo ancho de la línea
            setLineWidth(newWidth);
    }, [step, maxSteps]);

    return (
        <div
            className={`bg-${lineColor} h-2 rounded-sm transition-all duration-500 ease-in-out sticky top-0 left-0 z-50`}
            style={{ width: `${lineWidth}px` }} // Cambia el ancho según el contador
        ></div>
    )
}

export default ProgressLine;

ProgressLine.propTypes = {
    lineColor: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    maxSteps: PropTypes.number.isRequired,
    widthContainer: PropTypes.number.isRequired,
}

ProgressLine.defaultProps = {
    lineColor: 'primary',
    step: 0,
    maxSteps: 0,
    widthContainer: 0,
}