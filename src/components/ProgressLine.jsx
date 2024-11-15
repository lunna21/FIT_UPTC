import { useEffect, useState } from 'react';

function ProgressLine({ step = 0, maxSteps = 0, widthContainer = 0 }) {
    const [lineWidth, setLineWidth] = useState(0);

    useEffect(() => {
        const containerWidth = widthContainer - 12
            const newWidth = (containerWidth / maxSteps) * step; // Calcula el nuevo ancho de la línea
            setLineWidth(newWidth);
    }, [step, maxSteps]);

    return (
        <div
            className={`bg-primary h-2 rounded-sm transition-all duration-500 ease-in-out sticky top-0 left-0 z-20`}
            style={{ width: `${lineWidth}px` }} // Cambia el ancho según el contador
        ></div>
    )
}

export default ProgressLine;