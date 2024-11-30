import { useState } from 'react'
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";

import ValidationInput from '../inputs/InputValidation'
import ColorChooser from '../inputs/ColorChooser'
import Button from '@/components/buttons/Button'
import ButtonClose from '@/components/buttons/ButtonClose'
import TurnCard from '@/components/cards/TurnCard'

import { createTurn } from '@/db/turn'

import { FaSave } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const TurnModal = ({ isOpen, onClose, setTurns, setIsLoading, showMessagePopUp }) => {
    const [turn, setTurn] = useState({
        startTime: '',
        endTime: '',
        day: '',
        maxCapacity: 0,
        status: '',
        colorTurn: 'default',
    });
    const [dismissable, setDismissable] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            onClose();
            const newTurn = await createTurn(turn);
            setTurns(prev => {
                const newTurns = { ...prev };
                newTurns[turn.day.toLowerCase()].push(newTurn);
                return newTurns;
            });
            setTurn({
                startTime: '',
                endTime: '',
                day: '',
                maxCapacity: 0,
                status: '',
                colorTurn: 'default',
            })
            showMessagePopUp("Turno creado exitosamente.", 'success');
        } catch (error) {
            showMessagePopUp(error, 'error')
        } finally {
            setIsLoading(false);
        }
    }

    const onChange = (e) => {
        if (turn.startTime.length > 0 || turn.endTime.length > 0 || turn.day.length > 0 || turn.maxCapacity > 0) {
            setDismissable(false);
        }

        setTurn({
            ...turn,
            [e.target.name]: e.target.value,
        });
    }

    const setColor = (color) => {
        setTurn({
            ...turn,
            colorTurn: color,
        });
    }

    return (
        <Modal
            isDismissable={dismissable}
            backdrop="opaque"
            isOpen={isOpen}
            onClose={onClose}
            radius="lg"
            scrollBehavior='inside'
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-neutral-gray-light dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hidden",
            }}
            size="lg"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <header className='sticky bg-transparent w-full flex justify-end px-4 py-1'>
                            <ButtonClose onClick={onClose} />
                        </header>
                        <ModalBody className="h-full w-full flex flex-col justify-between">
                            <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between gap-6'>
                                <h1 className='text-3xl font-poppins font-bold text-neutral-gray-dark mb-1'>
                                    ¡Crea un nuevo turno!
                                </h1>
                                <div className='flex flex-col justify-start h-full'>
                                    <div className='flex gap-1'>
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="day" className="text-gray-700 font-medium mb-2">Día de la semana (*)</label>
                                            <div className="h-12 flex items-center border rounded-lg p-2 relative bg-gray-100">
                                                <FaCalendarDay className="text-gray-500 mr-2" />
                                                <select
                                                    id="day"
                                                    name="day"
                                                    required
                                                    value={turn.day}
                                                    onChange={onChange}
                                                    className={`flex-1 bg-transparent outline-none ${turn.day ? 'text-black' : 'text-gray-500'}`}
                                                >
                                                    <option value="">Selecciona</option>
                                                    <option value="LUNES">Lunes</option>
                                                    <option value="MARTES">Martes</option>
                                                    <option value="MIERCOLES">Miércoles</option>
                                                    <option value="JUEVES">Jueves</option>
                                                    <option value="VIERNES">Viernes</option>
                                                    <option value="SABADO">Sábado</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="status" className="text-gray-700 font-medium mb-2">Estado del turno (*)</label>
                                            <div className="h-12 flex items-center border rounded-lg p-2 relative bg-gray-100">
                                                <TbWorld className="text-gray-500 mr-2" />
                                                <select
                                                    id="status"
                                                    name="status"
                                                    required
                                                    value={turn.status}
                                                    onChange={onChange}
                                                    className={`flex-1 bg-transparent outline-none ${turn.status ? 'text-black' : 'text-gray-500'}`}
                                                >
                                                    <option value="">Selecciona</option>
                                                    <option value="ACTIVE">Activo</option>
                                                    <option value="BLOCK">Bloqueado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <ValidationInput
                                            label="Hora de inicio (*)"
                                            type='time'
                                            name='startTime'
                                            required
                                            value={turn.startTime}
                                            onChange={onChange}
                                            className="w-1/2"
                                        />
                                        <ValidationInput
                                            label="Hora de finalización (*)"
                                            type='time'
                                            name='endTime'
                                            value={turn.endTime}
                                            onChange={onChange}
                                            required
                                            className="w-1/2"
                                        />
                                    </div>

                                    <div className='flex'>
                                        <ValidationInput
                                            label="Capacidad máxima (*)"
                                            type='number'
                                            name='maxCapacity'
                                            value={turn.maxCapacity}
                                            onChange={onChange}
                                            required
                                            placeholder="Ej. 10"
                                            className="w-1/2"
                                        />
                                        <ColorChooser
                                            setColor={setColor}
                                            color={turn.colorTurn}
                                            colors={[
                                                { name: 'blue', code: 'bg-blue-500' },
                                                { name: 'purple', code: 'bg-purple-500' },
                                                { name: 'orange', code: 'bg-orange-500' },
                                            ]}
                                            label='Color de la tarjeta'
                                        />
                                    </div>
                                </div>

                                {/* preview card */}
                                <div className='flex flex-col justify-around w-full h-full bg-gray-100 rounded-lg'>
                                    <div className='flex justify-center'>
                                        <div className='w-[40%] text-black pointer-events-none'>
                                            <TurnCard
                                                turnName='Turno 0'
                                                startTime={turn.startTime ? turn.startTime : '00:00'}
                                                endTime={turn.endTime ? turn.endTime : '00:00'}
                                                color={turn.colorTurn ? turn.colorTurn : 'default'}
                                                height='120px'
                                                isActive={turn.status === 'ACTIVE'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    buttonText='Crear Turno'
                                    type='submit'
                                    Icon={FaSave}
                                />
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default TurnModal;
