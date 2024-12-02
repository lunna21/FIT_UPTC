import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { IoIosCheckmarkCircle, IoIosSave } from 'react-icons/io';
import { RiFileAddFill, RiCloseCircleFill } from "react-icons/ri";


const handleAccept = () => {
    // Lógica para aceptar
    setShowModal(false);
};

const handleDeny = () => {
    // Lógica para denegar
    setShowModal(false);
};

const ModalViewConsents = ({ show, handleClose, pdfPath, handleAccept, handleDeny }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>View PDF</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfPath} />
                </Worker>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeny}>
                    Deny
                </Button>
                <Button variant="primary" onClick={handleAccept}>
                    Accept
                </Button>
            </Modal.Footer>
            <div className="flex justify-center w-full gap-4 mt-4">
                        <div className="items-center">
                            <Button
                                buttonText="Aceptar Solicitud"
                                Icon={IoIosCheckmarkCircle}
                                onClick={() => {
                                    // onAccept();
                                    // onClose();
                                }}
                                sizeHeight="py-3"
                                sizeWidth="px-6"
                                color='green'
                            />
                        </div>
                        <div className="items-center">
                            <Button
                                color='red'
                                buttonText="Denegar Solicitud"
                                Icon={RiCloseCircleFill}
                                // onClick={onClose}
                                sizeHeight="py-3"
                                sizeWidth="px-6"
                            />
                        </div>
                    </div>
        </Modal>
    );
};

export default ModalViewConsents;