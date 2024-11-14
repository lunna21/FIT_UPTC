import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import HeaderMenu from '@/components/HeaderMenu';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Button from '@/components/buttons/Button';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { RiCloseCircleFill } from 'react-icons/ri';
import { getUserDetailById } from '@/db/user';
import Loder from '@/components/Loader';

function Details() {
    const router = useRouter();
    const { id_user } = router.query;
    const [estudiante, setEstudiante] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(id_user)

    console.log(estudiante)

    useEffect(() => {
        if (id_user) {
            try {
                const fetchEstudiante = async () => {
                    try {
                        const student = await getUserDetailById(id_user);
                        setEstudiante(student);
                    } catch (error) {
                        setError(error);
                    } finally {
                        setLoading(false);
                    }
                }

                fetchEstudiante();
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError(error);
            }
        }
    }, [id_user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
                <Loder />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
                <p className="text-xl font-montserrat text-red-600">Error: {error}</p>
            </div>
        );
    }

    if (!estudiante) {
        return (
            <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
                <p className="text-xl font-montserrat">Estudiante no encontrado</p>
            </div>
        );
    }

    const inscriptionDetail = estudiante.inscriptionDetails[0];

    return (
        <>
            <HeaderMenu
                menu={[
                    { href: '/employees', name: 'Estudiantes' },
                    { href: '#', name: "Gestión Turnos" }
                ]}
            />
            <div className="min-h-screen bg-neutral-gray-light p-6">
                <div className="max-w-7xl mx-auto bg-neutral-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                        Detalles del Estudiante
                    </h1>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Nombre:</strong> {estudiante.person.firstNamePerson} {estudiante.person.lastNamePerson}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Código Estudiantil:</strong> {inscriptionDetail?.studentCode || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Correo Electrónico:</strong> {estudiante.person.emailPerson}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Teléfono:</strong> {estudiante.person.phoneNumberPerson}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Estado:</strong> {estudiante.historyUserStatus[0]?.idUserStatus || 'Desconocido'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Tipo de Sangre:</strong> {inscriptionDetail?.bloodType || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Contacto de Emergencia:</strong> {inscriptionDetail?.emergencyContact?.fullNameEmergencyContact || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Relación del Contacto de Emergencia:</strong> {inscriptionDetail?.emergencyContact?.relationshipEmergencyContact || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Teléfono del Contacto de Emergencia:</strong> {inscriptionDetail?.emergencyContact?.phoneNumberEmergencyContact || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>EPS:</strong> {inscriptionDetail?.eps?.nameEps || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Alergias:</strong> {inscriptionDetail?.allergy?.nameAllergy || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>URL Consentimiento:</strong> {inscriptionDetail?.urlConsent ? <a href={inscriptionDetail.urlConsent} target="_blank" rel="noopener noreferrer">Ver PDF</a> : 'N/A'}
                    </p>
                    {inscriptionDetail?.urlConsent && (
                        <div className="mt-8">
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                                <Viewer fileUrl={inscriptionDetail.urlConsent} />
                            </Worker>
                        </div>
                    )}
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
                </div>
            </div>
        </>
    );
}

export default Details;