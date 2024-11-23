import React, { useState } from 'react';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiCloseCircleFill } from "react-icons/ri";
import { Form } from 'react-bootstrap';
import Button from '@/components/buttons/Button';

const ModalDisableUsers = ({ isOpen, onClose, onAccept, nameUser }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const handleAccept = () => {
        if (reason.trim() === '') {
            setError('La razón para la deshabilitación no puede estar vacía.');
            return;
        }
        onAccept(reason);
        setReason(''); // Limpiar el textarea
        setError(''); // Limpiar el mensaje de error
        onClose();
    };

    const handleClose = () => {
        onClose();
        setReason(''); // Limpiar el textarea
        setError(''); // Limpiar el mensaje de error
        onClose();
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-[60vh] overflow-y-auto mt-8 relative z-50">
                {/* Close Button */}
                <div className='w-full flex justify-end sticky top-0 transparent'>
                    <button
                        className="text-gray-500 hover:text-accent-red z-50"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <RiCloseCircleFill size={40} />
                    </button>
                </div>
                <h1 className="text-primary text-center text-3xl font-bold mb-4">Deshabilitar Usuario {nameUser}</h1>
                <div className="mb-4 text-neutral-gray-dark leading-relaxed space-y-4">
                    <h2 className="text-primary text-2xl font-semibold mb-4 text-center">¿Está seguro de que desea deshabilitar al usuario {nameUser}?</h2>
                    <Form.Group controlId="formBasicReason" className="text-center m-2 gap-2">
                        <Form.Label className="block text-center mb-2">Ingresa la razón para la deshabilitación del usuario</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Ingrese la razón para deshabilitar al usuario"
                            className="mx-auto w-3/4"
                            style={{ resize: 'none', border: '4px solid #ffcc00', margin: 0, boxShadow: 'none' }}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        {error && <p className="text-red-500 mt-2 font-bold">{error}</p>}
                    </Form.Group>
                    <div className="flex justify-center w-full gap-4 mt-4">
                        <div className="items-center">
                            <Button
                                buttonText="Aceptar"
                                Icon={IoIosCheckmarkCircle}
                                onClick={handleAccept}
                                sizeHeight="py-3"
                                sizeWidth="px-6"
                                color='green'
                            />
                        </div>
                        <div className="items-center">
                            <Button
                                color='red'
                                buttonText="Cerrar"
                                Icon={RiCloseCircleFill}
                                onClick={handleClose}
                                sizeHeight="py-3"
                                sizeWidth="px-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDisableUsers;
