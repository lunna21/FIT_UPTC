import { useRef, useState, useEffect } from "react";

import TurnModal from "@/components/modals/TurnModal";
import TurnCard from "@/components/cards/TurnCard";

import { getTurns, deleteTurn } from "@/db/turn";

import { FaRegTrashAlt } from "react-icons/fa";

const TableConfigTurns = () => {
    const containerRef = useRef(null);
    const HOURS_GYM_ATTENTION = 15;
    const START_TIME = 5;
    const [containerHeight, setContainerHeight] = useState(0);
    const [turns, setTurns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTurnModal, setShowTurnModal] = useState(false);
    const [actionMessage, setActionMessage] = useState('');

    useEffect(() => {
        const fetchTurns = async () => {
            setIsLoading(true);
            try {
                const turns = await getTurns();
                setTurns(turns);
            } catch (error) {
                console.error('Failed to fetch turns:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTurns();
    }, []);


    useEffect(() => {
        if (containerRef.current) {
            const containerHeightRef = containerRef.current.offsetHeight;
            setContainerHeight(containerHeightRef);
        }
    }, [turns]);

    const calculateTopPosition = (startTime, containerHeight) => {
        // Suponiendo que startTime es un string en formato "HH:MM"
        const [hours, minutes] = startTime.split(':').map(Number);
        const adjust = (hours - START_TIME) * 3;
        const totalMinutes = (hours - START_TIME) * 60 + minutes;
        const top = (totalMinutes / (HOURS_GYM_ATTENTION * 60)) * containerHeight;
        return top - adjust;
    };

    const calculateHeightCard = (startTime, endTime, containerHeight) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        const adjust = (endHours - START_TIME) * 0.5;

        const startTotalMinutes = (startHours * 60) + startMinutes;
        const endTotalMinutes = (endHours * 60) + endMinutes;

        const durationMinutes = endTotalMinutes - startTotalMinutes;
        const height = (durationMinutes / (HOURS_GYM_ATTENTION * 60)) * containerHeight;

        return height - adjust;
    }

    const handleDeleteTurn = async (turnId) => {
        try {
            setIsLoading(true);
            const response = await deleteTurn(turnId);
            setTurns(prev => {
                const newTurns = { ...prev };
                Object.keys(newTurns).forEach(day => {
                    newTurns[day] = newTurns[day].filter(turn => turn.idTurn !== turnId);
                });
                return newTurns;
            })
            showMessagePopUp(response.message, 'success');
        } catch (error) {
            console.error('Failed to delete turn:', error);
            showMessagePopUp(response.message, 'success');
        } finally {
            setIsLoading(false);
        }
    };

    const showMessagePopUp = (message, color) => {
        alert(message);
    }

    return (
        <div className="flex" onClick={() => setTurns(prev => {
            const newTurns = { ...prev };
            Object.keys(newTurns).forEach(day => {
                newTurns[day] = newTurns[day].map(turn => ({ ...turn, showMenu: turn.showMenu ? false : turn.showMenu }));
            });
            return newTurns;
        })}>
            <div>
                <h2 className="text-sm font-semibold text-center px-4 py-4">
                    Horario
                </h2>
                {Array.from({ length: 16 }, (_, i) => (
                    <div key={i} className="flex flex-col w-auto">
                        {/* Horas (6 AM - 8 PM) */}
                        <div className="flex items-center py-2 justify-center font-medium">
                            {5 + i}:00
                        </div>
                        {/* Celdas de la cuadrícula */}
                        {Array.from({ length: 2 }, (_, j) => (
                            <div
                                key={j}
                                className="border border-primary relative"
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="w-full grid grid-rows-[auto,1fr] grid-cols-6 border border-gray-200 rounded-md">
                {/* Cabecera de los días */}
                <div className="col-start-1 col-end-7 grid grid-cols-6 text-center bg-primary rounded-t-sm text-black text-lg font-bold py-2">
                    <div>Lunes</div>
                    <div>Martes</div>
                    <div>Miércoles</div>
                    <div>Jueves</div>
                    <div>Viernes</div>
                    <div>Sábado</div>
                </div>

                {/* Cuadros para los turnos */}
                {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].map((day, index) => (
                    <div key={index} className="border border-gray-300 flex items-center justify-center relative" ref={containerRef}>
                        {
                            isLoading ? (
                                <div className="w-full grid grid-cols-1 gap-4 px-4">
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <div key={index} className="animate-pulse flex space-x-4">
                                            <div className="flex-1 space-y-16 py-1">
                                                <div className="h-[100px] bg-gray-400 rounded w-full p-2 flex flex-col gap-2 justify-center items-center">
                                                    <div className="h-3 bg-gray-500 rounded w-2/4"></div>
                                                    <div className="h-3 bg-gray-500 rounded w-3/4"></div>
                                                </div>
                                                <div className="space-y-10">
                                                    <div className="h-[100px] bg-gray-400 rounded w-full flex flex-col gap-2 justify-center items-center">
                                                        <div className="h-3 bg-gray-500 rounded w-2/4"></div>
                                                        <div className="h-3 bg-gray-500 rounded w-3/4"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                turns[day] && (
                                    turns[day].map((turn, i) => (
                                        <div
                                            className="absolute px-2"
                                            style={{ top: `${calculateTopPosition(turn.startTime, containerHeight)}px` }}
                                            key={turn.idTurn}
                                        >
                                            <TurnCard
                                                turnName={`Turno ${i + 1}`}
                                                startTime={turn.startTime}
                                                endTime={turn.endTime}
                                                height={calculateHeightCard(turn.startTime, turn.endTime, containerHeight)}
                                                color={turn.colorTurn}
                                                isActive={turn.status === 'ACTIVE'}
                                            />
                                            <button
                                                onClick={e => {
                                                    setTurns(prev => ({
                                                        ...prev,
                                                        [day]: prev[day].map((t, j) => (i === j ? { ...t, showMenu: !t.showMenu } : t))
                                                    }))
                                                    e.stopPropagation();
                                                }}
                                                className="flex justify-center items-center cursor-pointer absolute z-10 text-black font-bold right-[8px] top-[1px] h-6 w-8 rounded-lg hover:bg-gray-200 hover:bg-opacity-30 transition ease-in-out duration-200"
                                            >
                                                ...
                                            </button>

                                            <ul
                                                className={`flex items-center justify-center w-auto py-1 rounded-md bg-yellow-100 absolute top-5 shadow-lg ${day === "sabado" ? "right-[24px]" : "right-[-96px]"} z-20 ${!turn.showMenu && "hidden"} flex-row`}
                                            >
                                                <li
                                                    className="px-4 py-1 cursor-pointer transition ease-in-out duration-200 hover:bg-primary w-auto h-full flex items-center"
                                                    onClick={() => handleDeleteTurn(turn.idTurn)}
                                                >
                                                    Eliminar
                                                    <FaRegTrashAlt className="inline ml-2 text-neutral-gray-dark" />
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                )
                            )
                        }
                    </div>
                ))}
            </div>
            <div className="w-auto fixed inset-x-0 bottom-0 flex justify-end items-center p-2 z-20">
                <div>
                    <div className="mr-4 mt-2 font-bold text-3xl">
                        <button className="Btn" onClick={() => setShowTurnModal(prev => !prev)}>
                            <div className="sign text-white">
                                +
                            </div>
                            <div className="text">Crear</div>
                        </button>
                    </div>
                </div>
            </div>
            <TurnModal
                onClose={() => setShowTurnModal(false)}
                isOpen={showTurnModal}
                setActionMessage={setActionMessage}
                setTurns={setTurns}
                setIsLoading={setIsLoading}
            />

            <style jsx>{`
.Btn {
display: flex;
align-items: center;
justify-content: flex-start;
width: 50px;
height: 50px;
border: none;
border-radius: 50%;
cursor: pointer;
position: relative;
overflow: hidden;
transition-duration: .3s;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
background-color: #373634;
}

.sign {
width: 100%;
transition-duration: .3s;
display: flex;
align-items: center;
justify-content: center;
}

.sign svg {
width: 17px;
}

.sign svg path {
fill: white;
}

.text {
position: absolute;
right: 0%;
width: 0%;
opacity: 0;
color: white;
font-size: 16px;
font-weight: 600;
transition-duration: .3s;
}

.Btn:hover {
width: 125px;
border-radius: 40px;
transition-duration: .3s;
}

.Btn:hover .sign {
width: 30%;
transition-duration: .3s;
padding-left: 20px;
}

.Btn:hover .text {
opacity: 1;
width: 70%;
transition-duration: .3s;
padding-right: 10px;
}

.Btn:active {
transform: translate(2px ,2px);
}
`}</style>
        </div>

    )
}

export default TableConfigTurns;