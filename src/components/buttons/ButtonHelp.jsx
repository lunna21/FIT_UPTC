import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import "..//../pages/employees/driver.css";
import { useUser } from '@clerk/nextjs';

const ButtonHelp = () => {
    const { user } = useUser();
    const router = useRouter();
    const [steps, setSteps] = useState([]);
    const driverObj = driver('null');
    useEffect(() => {
        switch (router.pathname) {
            case '/employees':
                setSteps([
                    {element: '#demo-theme',popover: {title: '¡Bienvenido ' + user.username + '!',description: 'Esta es la lista de estudiantes inscritos en el CAF de la Universidad Pedagógica y Tecnológica de Colombia, Sede Central.',side: "bottom", align: 'start'}},
                    { element: '#search-bar', popover: { title: 'Barra de Búsqueda', description: 'Acá podrás introducir el nombre del estudiante o el código estudiantil para encontrarlo.', side: "bottom", align: 'start' } },
                    { element: '#filter', popover: { title: 'Filtro', description: 'Acá podrás filtrar los estudiantes por el estado de su inscripción: si se encuentra pendiente, o si el estudiante es activo o inactivo.', side: "left", align: 'start' } },
                    { element: '#column_fullname', popover: { title: 'Nombre completo', description: 'En esta columna encontrarás el nombre completo de cada estudiante.', side: "top", align: 'start' } },
                    { element: '#column', popover: { title: 'Código estudiantil', description: 'En esta columna encontrarás el código estudiantil de cada estudiante.', side: "top", align: 'start' } },
                    { element: '#column_email', popover: { title: 'Correo electrónico', description: 'En esta columna encontrarás el correo electrónico de cada estudiante.', side: "top", align: 'start' } },
                    { element: '#column_phoneNumber', popover: { title: 'Número de teléfono', description: 'En esta columna encontrarás el número de teléfono de cada estudiante.', side: "top", align: 'start' } },
                    { element: '#column_status', popover: { title: 'Estado', description: 'En esta columna encontrarás el estado de inscripción de cada estudiante, si se encuentra pendiente, o si la inscripción del estudiantes está activa o inactiva.', side: "top", align: 'start' } },
                    { element: '#column_actions', popover: { title: 'Acciones', description: 'En esta columna encontrarás las acciones disponibles, como modificar o deshabilitar.', side: "top", align: 'start' } },
                    { element: '#details', popover: { title: 'Ver Detalles', description: 'Haz clic sobre cualquier fila de estudiantes para poder ver los detalles de inscripción por estudiante.', side: "top", align: 'start' } },
                    { element: '#button_modify', popover: { title: 'Modificar', description: 'Haz clic aquí para modificar la información del estudiante.', side: "top", align: 'start' } },
                    { element: '#button_delete', popover: { title: 'Eliminar', description: 'Haz clic aquí para deshabilitar un estudiante.', side: "top", align: 'start' } }
                ]);
                break;
            default:
                setSteps([]);
                break;
        }
    }, []);

    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            popoverClass: 'driverjs-theme',
            nextBtnText: 'Siguiente »',
            prevBtnText: '« Anterior',
            doneBtnText: 'Listo ✓',
            progressText: "{{current}} de {{total}}",
            steps: steps
        });

        driverObj.drive();
        driverObj.highlight({
            element: '#demo-theme',
            popover: {
                title: '¡Bienvenido ' + user.username + '!',
                description: 'Esta es la lista de estudiantes inscritos en el CAF de la Universidad Pedagógica y Tecnológica de Colombia, Sede Central.',
                side: "bottom", align: 'start'
            }
        });
    };

    return (
        <button onClick={startTour} className="bg-neutral-gray-dark text-primary-light p-4 rounded text-4xl">
            <TbHelpSquareRoundedFilled />
        </button>
    );
};

export default ButtonHelp;