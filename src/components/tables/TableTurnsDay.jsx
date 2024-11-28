import { useState, useEffect, useRef } from 'react';

import PopMessage from '@/components/PopMessage'
import useShowPopUp from '@/hooks/useShowPopUp';
import TurnCard from '@/components/cards/TurnCard'

import { getTurnByDay } from '@/db/turn'
import { toCapitalize } from '@/utils/utils'
import { calculateTopPosition, calculateHeightCard } from '@/utils/turn';

const TableTurnsDay = ({ day }) => {
    const START_TIME = 5;
    const HOURS_GYM_ATTENTION = 15;

    const {
        status,
        text,
        duration,
        onClose,
        isShow,
        showPopUp
    } = useShowPopUp();
    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(0);
    const [turns, setTurns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (turns.length > 0) {
            setTurns(prevTurns => {
                const updatedTurns = [...prevTurns];
                let countTurn = 0;

                // Calculamos los valores de `top` y ordenamos los turnos por `top`
                let sortedTurns = updatedTurns.map(turn => ({
                    ...turn,
                    top: calculateTopPosition({ turn, containerHeight, timeAttention: HOURS_GYM_ATTENTION, startTimeAttention: START_TIME }),
                })).sort((a, b) => a.top - b.top);

                // Actualizamos el `countTurn` basado en el orden por `top`
                sortedTurns = sortedTurns.map(turn => ({
                    ...turn,
                    countTurn: ++countTurn,
                }));

                return sortedTurns;
            });
        }
    }, [isLoading, containerHeight]);

    useEffect(() => {
        if (containerRef.current) {
            const containerHeightRef = containerRef.current.offsetHeight;
            setContainerHeight(containerHeightRef);
        }
    }, [turns]);

    useEffect(() => {
        const fetchTurns = async () => {
            setIsLoading(true);
            try {
                const turns = await getTurnByDay(day);
                setTurns(turns);
            } catch (error) {
                showPopUp({ text: error, status: "error" })
                console.error('Failed to fetch turns:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTurns();
    }, [day]);

    return (
        <>
            <div className='flex'>
                <div>
                    <h2 className="text-sm font-semibold text-center px-4 py-3">
                        Horario
                    </h2>
                    {Array.from({ length: 2 }, (_, j) => (
                        <div
                            key={j}
                            className="border border-primary relative"
                        ></div>
                    ))}
                    {Array.from({ length: HOURS_GYM_ATTENTION + 1 }, (_, i) => (
                        <div key={i} className="flex flex-col w-auto">
                            <div className="flex items-center py-2 justify-center font-medium">
                                {START_TIME + i}:00
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

                <div className="w-full grid grid-rows-[auto,1fr] grid-cols-1 border border-gray-200 rounded-md">
                    <div className="col-start-1 col-end-7 grid grid-cols-6 text-center bg-primary rounded-t-sm text-black text-lg font-bold p-2">
                        <h4>{toCapitalize(day)}</h4>
                    </div>
                    {
                        isLoading ? (
                            <div className="w-full grid grid-cols-1 gap-4 px-8 py-4">
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
                            <>
                                <div className='border border-gray-300 flex items-center justify-center relative' ref={containerRef}>
                                    {
                                        turns.map((turn, i) => (
                                            <div
                                                className="absolute px-2 w-[80%] cursor-pointer"
                                                style={{ top: `${calculateTopPosition({ turn, containerHeight, timeAttention: HOURS_GYM_ATTENTION, startTimeAttention: START_TIME })}px` }}
                                                key={turn.idTurn}
                                            >
                                                <TurnCard
                                                    turnName={`Turno ${i + 1}`}
                                                    startTime={turn.startTime}
                                                    endTime={turn.endTime}
                                                    height={calculateHeightCard({ startTime: turn.startTime, endTime: turn.endTime, containerHeight, timeAttention: HOURS_GYM_ATTENTION, startTimeAttention: START_TIME })}
                                                    color={turn.colorTurn}
                                                    isActive={turn.status === 'ACTIVE'}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            {
                isShow && (
                    <PopMessage
                        status={status}
                        text={text}
                        duration={duration}
                        onClose={onClose}
                    />
                )
            }
        </>
    );
};

export default TableTurnsDay;