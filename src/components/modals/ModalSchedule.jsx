import ButtonClose from '@/components/buttons/ButtonClose'

import { getFormatHour } from '@/utils/utils'

const ModalCreateSchedule = ({ isOpen, onClose, turn, schedule, onAccept, handleCancelTurn }) => {

    if (!isOpen || !turn) return null;

    const handleClick = () => {
        onAccept(turn);
        onClose();
    }

    const handleCancel = (schedule) => {
        handleCancelTurn(schedule);
        onClose();
    }

    return (
        <div className="fixed bg-neutral-gray-medium text-neutral-gray-dark top-0 right-0 h-screen w-screen flex flex-col items-center justify-center z-[200]">
            <div className='w-[96%] max-w-[460px] h-[60%] bg-neutral-gray-light rounded-lg flex flex-col justify-between'>
                <header className='w-full flex justify-end px-2 py-1'>
                    <ButtonClose onClick={onClose} />
                </header>

                <>
                    <main className='px-2 mt-2 w-full flex flex-col items-center'>
                        <h2 className='text-lg font-semibold mb-4 text-center'>
                            {turn?.isReserved ? (
                                <div>
                                    Ya tienes una reserva en el <span className='text-primary-dark'>Turno {turn.countTurn}</span>
                                </div>
                            ) : (
                                <div>
                                    ¿Deseas reservar en el <span className='text-primary-dark'>Turno {turn.countTurn}</span> ?
                                </div>
                            )}
                        </h2>
                        <div className='flex justify-center items-center gap-4'>
                            <div className='flex flex-col items-center gap-2'>
                                <p className='text-sm font-semibold'>Hora de inicio</p>
                                <p className='text-lg font-semibold'>{getFormatHour(turn.startTime)}</p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <p className='text-sm font-semibold'>Hora de fin</p>
                                <p className='text-lg font-semibold'>{getFormatHour(turn.endTime)}</p>
                            </div>
                        </div>
                        <p className='mt-4'>
                            Cupos disponibles:
                            <span className='font-bold'> {turn?.maxCapacity - turn?.numSchedules}</span> de
                            <span className='font-bold'> {turn?.maxCapacity}</span>
                        </p>
                    </main>
                    <footer className='w-full flex justify-around gap-1 mb-4 px-4'>

                        {
                            turn?.isReserved ? (
                                <>
                                    <button 
                                        className='bg-primary-medium hover:bg-primary-light w-[80%] h-12 text-neutral-gray-dark disabled:opacity-50 font-semibold rounded-lg transition ease-in-out duration-255'
                                        onClick={() => handleCancel(schedule)}
                                    >
                                        Cancelar Turno
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className='bg-primary-medium hover:bg-primary-light w-1/2 h-12 text-neutral-gray-dark disabled:opacity-50 font-semibold rounded-lg transition ease-in-out duration-255'
                                        onClick={() => handleClick()}
                                    >
                                        Reservar
                                    </button>
                                    <button
                                        className='bg-accent-red hover:bg-accent-redLight w-1/2 h-12 text-white disabled:opacity-50 font-semibold rounded-lg transition ease-in-out duration-255'
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )
                        }

                    </footer>
                </>

            </div >
        </div >
    )
}

export default ModalCreateSchedule;