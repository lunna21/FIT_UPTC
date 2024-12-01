import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs"
import useShowPopUp from "@/hooks/useShowPopUp";

import PopMessage from "@/components/PopMessage";
import EmployeeHeader from "@/components/headers/EmployeeHeader";
import ConfigTurnsModal from "@/components/modals/ConfigTurnsModal";
import Footer from '@/components/footers/Footer';
import Loader from "@/components/Loader";

import { updateReservationDate } from "@/db/reservationDate";
import { getTurnsByHourOfDay } from "@/db/turn";
import { getUserByUsername, getUserByCode } from "@/db/user";
import { attendSchedule } from "@/db/schedule";

import { getToday, getTime, getDayOfWeek, comparateTimes, getFormatHour, toCapitalize } from "@/utils/utils";

// icons
import { IoSettingsSharp } from "react-icons/io5";
import { GrSchedule } from "react-icons/gr";
import { FaHourglassEnd } from "react-icons/fa6";
import ButtonSearch from "@/components/buttons/ButtonSearch";
import InputAnimated from "@/components/inputs/InputAnimated";

const Turns = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenuConfig, setShowMenuConfig] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [oneLoad, setOneLoad] = useState(true);
    const [day, setDay] = useState(null);
    const [turn, setTurn] = useState(null);
    const [nextTurn, setNextTurn] = useState(null);
    const [userDb, setUserDb] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentTime, setCurrentTime] = useState("");
    const [code, setCode] = useState("");

    const { user } = useUser();
    const {
        status,
        text,
        duration,
        onClose,
        isShow,
        showPopUp
    } = useShowPopUp();

    useEffect(() => {
        setDay(getDayOfWeek(getToday()));
        // esto es solamente para pruebas, para que funcione como deberia se debe descomentar la linea de arriba y borrar la de abajo
        // setDay("LUNES");

        setCurrentTime(getTime());
        //setCurrentTime("10:00:00");

        if (user) {
            handleUser();
        }

        const intervalId = setInterval(() => {
            setCurrentTime(getTime());
            //setCurrentTime("10:00:00");
        }, 5000);

        return () => clearInterval(intervalId);

    }, []);

    useEffect(() => {
        if (turn) {
            if (comparateTimes(currentTime, turn.endTime)) {
                showPopUp({ status: "success", text: "El turno ha finalizado" });
                setTurn(null);
                if (comparateTimes(nextTurn.startTime, currentTime)) {
                    handleTurnByHour(currentTime);
                }
            }
        } else if (currentTime && oneLoad) {
            handleTurnByHour(currentTime);
        }
    }, [currentTime]);

    const handleTurnByHour = async (hour) => {
        try {
            setOneLoad(false);
            setIsLoading(true);
            const turns = await getTurnsByHourOfDay(day, hour);
            let actualTurn = null;
            let nextTurn = null;

            if(turns) {
                actualTurn = turns.actualTurn;
                nextTurn = turns.nextTurn;
            }
            setTurn(actualTurn);
            setNextTurn(nextTurn);
        } catch (error) {
            showPopUp({ status: "error", text: typeof error === "string" ? error : "Error en la optención de los turnos" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleUser = async () => {
        try {
            setIsLoading(true);
            const userdb = await getUserByUsername(user.username);
            setUserDb(userdb);
        } catch (error) {
            showPopUp({ status: "error", text: typeof error === "string" ? error : "Error obteniendo el usuario" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleShowMenuConfig = (e) => {
        e.stopPropagation();
        setShowMenuConfig(!showMenuConfig);
    }

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    const handleClickSearch = async () => {
        try {
            setIsLoading(true);
            const user = await getUserByCode(code);
            await attendSchedule({
                idStudent: user.idUser,
                // date: "2024-12-02",
                date: getToday(),
                idTurn: turn.idTurn
            });

            setSelectedStudent(user);
            showPopUp({ status: "success", text: "El estudiante si reservó 💪" });
        } catch (error) {
            showPopUp({ status: "error", text: typeof error === "string" ? error : "Error encontrando el user" });
        } finally {
            setIsLoading(false);
        }
    }

    const enableTomorrowTurns = async (e) => {
        try {
            if (userDb) {
                if (turn.day === "SABADO") {
                    await updateReservationDate(userDb.id_user, 2);
                } else {
                    await updateReservationDate(userDb.id_user);
                }
            }

            showPopUp({ status: "success", text: "Turnos de para la proxima fecha publicados" });
        } catch (error) {
            showPopUp({ status: "error", text: typeof error === "string" ? error : "Error al activar los turnos de mañana" });
        }
    }

    return (
        <div onClick={() => setShowMenuConfig(false)} className="flex flex-col min-h-screen bg-neutral-gray-light">
            <EmployeeHeader />
            <ConfigTurnsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <div className="relative right-0 flex justify-end items-center bg-transparent">
                <button
                    className="flex items-center gap-2 text-white bg-neutral-gray-medium px-4 py-2 rounded-b-md transition-all duration-[255ms] hover:text-primary-medium z-50"
                    onClick={handleShowMenuConfig}
                >
                    <IoSettingsSharp />
                    <span>Configurar turnos</span>
                </button>

                {showMenuConfig && (
                    <ul className="absolute min-w-80 mt-2 right-32 top-8 bg-white border rounded shadow-lg z-50">
                        <li
                            className="py-2 px-4 cursor-pointer hover:bg-primary-medium flex items-center gap-4"
                            onClick={() => setIsOpen(true)}
                        >
                            Ver disponibilidad de turnos
                            <GrSchedule className="text-lg text-gray-950" />
                        </li>
                        <li
                            className="py-2 px-4 cursor-pointer hover:bg-primary-medium flex items-center gap-4"
                            onClick={enableTomorrowTurns}
                        >
                            Habilitar próximo día de turnos
                            <FaHourglassEnd className="text-lg text-gray-950" />
                        </li>
                    </ul>
                )}
            </div>

            <main className="flex-grow flex flex-col bg-neutral-gray-light py-8">
                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader />
                        </div>
                    ) : (
                        <div className="bg-neutral-white rounded-lg shadow-lg py-6 px-24 mx-auto max-w-4xl">
                            {
                                turn ? (
                                    <>
                                        <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                                            Turno {turn.countTurn} ({getFormatHour(turn.startTime)} - {getFormatHour(turn.endTime)})
                                        </h1>
                                        <div className="w-full flex flex-col justify-center gap-4 mt-6">
                                            <div className="bg-white py-1 px-24 rounded-full flex gap-4 items-center justify-center border border-neutral-black border-dashed">
                                                <InputAnimated
                                                    onChange={handleChangeCode}
                                                />
                                                <ButtonSearch
                                                    onClick={handleClickSearch}
                                                />
                                            </div>
                                            {
                                                selectedStudent && (
                                                    <div className="bg-white py-4 px-6 rounded-lg shadow-md mt-4">
                                                        <h2 className="text-2xl font-semibold text-neutral-gray-dark mb-2">Información del Estudiante</h2>
                                                        <p className="text-lg text-neutral-gray-dark"><span className="font-bold">Número de Documento:</span> {selectedStudent.person.idDocumentType} {selectedStudent.documentNumberPerson}</p>
                                                        <p className="text-lg text-neutral-gray-dark"><span className="font-bold">Nombre:</span> {toCapitalize(selectedStudent.person.firstNamePerson)}</p>
                                                        <p className="text-lg text-neutral-gray-dark"><span className="font-bold">Apellido:</span> {toCapitalize(selectedStudent.person.lastNamePerson)}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                                            No hay turno en esta hora 😵‍💫
                                        </h1>
                                        {
                                            nextTurn && (
                                                <div>
                                                    <h2 className="text-xl font-semibold text-neutral-black mb-4">
                                                        Próximo turno: {getFormatHour(nextTurn.startTime)} - {getFormatHour(nextTurn.endTime)}
                                                    </h2>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </main>

            <footer className="mt-auto">
                <Footer />
            </footer>

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
        </div>
    )
}

export default Turns;