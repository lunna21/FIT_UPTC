import { useRef, useState, useEffect } from "react";

import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/modal";
import TurnModal from "./TurnModal";
import TurnCard from "@/components/cards/TurnCard";

import { getTurns } from "@/db/turn";

const ConfigTurnsModal = ({
    isOpen,
    onClose,
}) => {
    const containerRef = useRef(null);
    const HOURS_GYM_ATTENTION = 15;
    const START_TIME = 5;
    const [containerHeight, setContainerHeight] = useState(0);
    const [turns, setTurns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTurnModal, setShowTurnModal] = useState(false);

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

        if (isOpen)
            fetchTurns();
    }, [isOpen]);


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

    return (
        <>
            <Modal
                size="5xl"
                isOpen={isOpen}
                onClose={onClose}
                className="bg-white"
                classNames={{
                    closeButton: "top-[8px] text-xl hover:bg-red-500 active:bg-red-700 text-white rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110",
                }}
            >
                {
                    isLoading ? (
                        <ModalContent>
                            <div>Esta cargando...</div>
                        </ModalContent>
                    ) : (
                        <>
                            <ModalContent>
                                {
                                    () => (
                                        <>
                                            <ModalHeader className="flex items-center justify-between gap-1 text-white bg-neutral-gray-dark">
                                                <h1>
                                                    Configuración de turnos UPTC FIT
                                                </h1>
                                            </ModalHeader >
                                            <ModalBody className="overflow-y-auto overflow-x-hidden p-4">
                                                {/* Calendario semanal */}
                                                <div className="flex">
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
                                                                                />
                                                                                <button
                                                                                    className="flex justify-center items-center cursor-pointer absolute z-10 text-black font-bold right-[8px] top-[1px] h-6 w-8 rounded-lg hover:bg-gray-200 hover:bg-opacity-30 transition ease-in-out duration-200"
                                                                                >
                                                                                    ...
                                                                                </button>
                                                                            </div>
                                                                        ))
                                                                    )
                                                                }
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="w-full h-20 text-transparent">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam aut exercitationem ipsum? Harum eius iusto blanditiis veritatis inventore quidem voluptas nam officia, modi perspiciatis aspernatur iure natus facilis vitae labore.
                                                </div>
                                            </ModalBody>
                                            <div className="w-auto fixed inset-x-0 bottom-0 flex justify-end items-center p-2">
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
                                        </>
                                    )}
                            </ModalContent >
                        </>
                    )
                }
            </Modal >

            <TurnModal
                onClose={() => setShowTurnModal(false)}
                isOpen={showTurnModal}
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
        </>
    );
};

export default ConfigTurnsModal;
