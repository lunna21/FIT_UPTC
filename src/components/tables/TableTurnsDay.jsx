import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';

import PopMessage from '@/components/PopMessage'
import useShowPopUp from '@/hooks/useShowPopUp';
import TurnCard from '@/components/cards/TurnCard'
import ModalSchedule from '@/components/modals/ModalSchedule'

import { getTurnByDay } from '@/db/turn'
import { getSchedules, createSchedule, updateSchedule } from '@/db/schedule'
import { getUserByUsername } from '@/db/user';

import { toCapitalize, getToday } from '@/utils/utils'
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
    const {user} = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const [turns, setTurns] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [userDB, setUserDB] = useState(null);
    const [selectedTurn, setSelectedTurn] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (turns.length > 0) {
            setTurns(prevTurns => prevTurns.map(turn => ({
                ...turn,
                top: calculateTopPosition({ turn, containerHeight, timeAttention: HOURS_GYM_ATTENTION, startTimeAttention: START_TIME })
            })));
        }
    }, [isLoading]);

    useEffect(() => {
        if (containerRef.current) {
            const containerHeightRef = containerRef.current.offsetHeight;
            setContainerHeight(containerHeightRef);
        }
    }, [turns]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const dateToday = getToday();
                const turns = await getTurnByDay(day);
                const schedule = await getSchedules(dateToday);
                const userDb = await getUserByUsername(user.username);
                const updatedTurns = turns.map(turn => ({
                    ...turn,
                    numSchedules: schedule.filter(s => s.idTurn === turn.idTurn && s.stateSchedule === 'PENDING').length,
                }));

                setUserDB(userDb);
                setTurns(updatedTurns);
                setSchedules(schedule);
            } catch (error) {
                showPopUp({ text: error, status: "error" })
            } finally {
                setIsLoading(false);
            }
        };

        if(user) {
            fetch();
        }

    }, [day, user]);

    const handleTurnClick = (turn, isReserved = false) => {
        const turnReserved = {
            ...turn,
            isReserved
        }
        setSelectedSchedule(schedules.find(schedule => schedule.user.name_user === user.username  && schedule.stateSchedule === 'PENDING'));
        setSelectedTurn(turnReserved);
        setIsModalOpen(true);
    }

    const onAccept = async (turn) => {
        const dateToday = getToday();

        setIsLoading(true);
        try {
            const schedule = {
                dateSchedule: dateToday,
                idStudent: userDB.id_user,
                idTurn: turn.idTurn,
                stateSchedule: 'PENDING'
            }
            const newSchedule = await createSchedule(schedule);
            setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
            setTurns(prevTurns => prevTurns.map(t => t.idTurn === turn.idTurn ? { ...t, numSchedules: t.numSchedules + 1 } : t));
            showPopUp({ text: 'Se agendo tu turno satisfactoriamente ☺️', status: "success" })
        } catch (error) {
            showPopUp({ text: error, status: "error" })
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    }

    const handleCancelTurn = async (schedule) => {
        setIsLoading(true);
        try {
            const updatedSchedule = await updateSchedule({ idSchedule: schedule.id_schedule, stateSchedule: 'CANCELLED' });
            setSchedules(prevSchedules => prevSchedules.map(s => s.id_schedule === updatedSchedule.id_schedule ? updatedSchedule : s));
            setTurns(prevTurns => prevTurns.map(t => t.idTurn === updatedSchedule.idTurn ? { ...t, numSchedules: t.numSchedules - 1 } : t));
            showPopUp({ text: 'Reserva cancelada con éxito 😵‍💫', status: "success" })
        } catch (error) {
            showPopUp({ text: error, status: "error" })
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    }

    let userSchedule;
    if(user && schedules.length > 0) {
        userSchedule = schedules.find(schedule => schedule.user.name_user === user.username && schedule.stateSchedule === 'PENDING');
    }

    if (userSchedule) {
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
                        <div className='border border-gray-300 flex items-center justify-center relative' ref={containerRef}>
                            {
                                turns.map((turn, i) => {
                                    const isUserTurn = turn.idTurn === userSchedule.idTurn;
                                    return (
                                        <div
                                            className={`absolute px-2 w-[80%] cursor-pointer ${!isUserTurn ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            style={{ top: `${calculateTopPosition({ turn, containerHeight, timeAttention: HOURS_GYM_ATTENTION, startTimeAttention: START_TIME })}px` }}
                                            key={turn.idTurn}
                                            onClick={() => isUserTurn && handleTurnClick(turn, true)}
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
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <ModalSchedule
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    turn={selectedTurn}
                    schedule={selectedSchedule}
                    onAccept={onAccept}
                    handleCancelTurn={handleCancelTurn}
                />
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
    }

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
                                        turns.map((turn, i) => {
                                            const isDisabled = turn.numSchedules >= turn.maxCapacity;
                                            return (
                                                <div
                                                    className={`absolute px-2 w-[80%] cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    style={{ top: `${calculateTopPosition({ turn, containerHeight, timeAttention: HOURS_GYM_ATTENTION, startTimeAttention: START_TIME })}px` }}
                                                    key={turn.idTurn}
                                                    onClick={() => !isDisabled && handleTurnClick(turn)}
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
                                            );
                                        })
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <ModalSchedule
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                turn={selectedTurn}
                schedule={selectedSchedule}
                onAccept={onAccept}
                handleCancelTurn={handleCancelTurn}
            />
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