import { useState } from 'react';

import ButtonClose from '@/components/buttons/ButtonClose'
import StartsRating from '@/components/inputs/StartsRating'

import { Form } from 'react-bootstrap';

const ModalFeedback = ({ isOpen, onClose, onAccept, setRating, rating }) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleClick = () => {
        onAccept(reason);
        onClose();
    }

    return (
        <div className="fixed bg-neutral-gray-medium text-neutral-gray-dark top-0 right-0 h-screen w-screen flex flex-col items-center justify-center z-[200]">
            <div className='w-[96%] max-w-[460px] h-[60%] bg-neutral-gray-light rounded-lg flex flex-col justify-between'>
                <header className='w-full flex justify-end px-2 py-1'>
                    <ButtonClose onClick={onClose} />
                </header>

                <>
                    <main className='mt-2 w-full flex flex-col items-center'>
                        <h2 className='text-lg font-semibold mb-4 text-center'>
                            Califica el servicio:
                            <StartsRating rating={rating} setRating={setRating} />
                        </h2>

                        <Form.Group controlId="formBasicReason" className="m-2 gap-2">
                            <Form.Label className="block mb-2 font-semibold">Ingresa un comentario:</Form.Label>
                            <div className='text-center'>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder={`Ingrese su comentario aquí`}
                                    className="mx-auto w-full min-w-[320px] p-2 rounded-md focus:outline-dashed focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
                                    style={{ resize: 'none', border: '2px solid #ffcc00', margin: 0, boxShadow: 'none' }}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                    </main>

                    <footer className='w-full flex justify-around gap-1 mb-4 px-4'>
                        <>
                            <button
                                className='bg-primary-medium hover:bg-primary-light w-1/2 h-12 text-neutral-gray-dark disabled:opacity-50 font-semibold rounded-lg transition ease-in-out duration-255'
                                onClick={handleClick}
                            >
                                Enviar
                            </button>
                            <button
                                className='bg-accent-red hover:bg-accent-redLight w-1/2 h-12 text-white disabled:opacity-50 font-semibold rounded-lg transition ease-in-out duration-255'
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                        </>
                    </footer>
                </>

            </div >
        </div >
    )
}

export default ModalFeedback;