import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EmployeeHeader from '@/components/headers/EmployeeHeader';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import Button from '@/components/buttons/Button';

import { getUserDetailById } from '@/db/user';
import Loder from '@/components/Loader';
import InputValidation from '@/components/inputs/InputValidation';

//icons
import { MdOutlinePermIdentity, MdEmail, MdDriveFileRenameOutline, MdBloodtype, MdFamilyRestroom, MdOutlineRealEstateAgent, MdVerified, MdError } from "react-icons/md";
import { RiFileAddFill, RiCloseCircleFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { LiaAllergiesSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FaAddressCard } from 'react-icons/fa';

function Details() {
    const router = useRouter();
    const { id_user } = router.query;
    const [estudiante, setEstudiante] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isValidated, setIsValidated] = useState("no");
    const [visibleTI, setVisibleTI] = useState(true);
    const [errors, setErrors] = useState({ typeDocument: '', numberDocument: '' });
    const [formData, setFormData] = useState({
        typeDocument: '',
        numberDocument: '',
        firstName: '',
        lastName: '',
        studentCode: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        eps: '',
        bloodType: '',
        programType: '',
        allergies: '',
        medications: [],
        medication: {
            nameMedication: '',
            dosage: '',
            reason: ''
        },
        emergencyContact: {
            emergencyfullName: '',
            relationship: '',
            contactNumber: ''
        },
        informedConsent: null,
        parentalAuthorization: null,
        terms: false
    })

    const handleChange = (e, section) => {
        const { name, value } = e.target

        if (name === 'numberDocument')
            setError('');
        if (name === 'birthDate') {
            setAge(calculateAge(value));
        }

        if (name === 'typeDocument' || name === 'numberDocument') {
            setIsValidated("no");
        }

        if (name == 'terms') {
            setFormData({
                ...formData,
                [name]: e.target.checked
            });
        } else if (section === 'emergencyContact') {
            setFormData({
                ...formData,
                emergencyContact: {
                    ...formData.emergencyContact,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleTypeDocumentChange = (e) => {
        handleChange(e);
        setErrors((prevErrors) => ({
            ...prevErrors,
            typeDocument: e.target.value ? '' : 'Debe seleccionar un tipo de documento.'
        }));
    };


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

    const inscriptionDetail = estudiante.inscriptionDetails[0];

    return (
        <>
            <EmployeeHeader />
            <div className="min-h-screen bg-neutral-gray-light p-6">
                <div className="max-w-7xl mx-auto bg-neutral-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                        Detalles del Estudiante
                    </h1>
                    <label htmlFor="typeDocument">Tipo de Documento (*)</label>
                    <div className="register-input register-flex" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <FaAddressCard className="register-icon" />
                        <select
                            id="typeDocument"
                            name="typeDocument"
                            required
                            value={formData.typeDocument}
                            onChange={handleTypeDocumentChange}
                            className={`select-input ${formData.typeDocument ? 'filled' : ''}`}
                        >
                            <option value="">Selecciona un tipo de documento</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            {visibleTI && <option value="TI">Tarjeta de Identidad</option>}
                            <option value="CE">Cédula de Extranjería</option>
                        </select>
                        {errors.typeDocument && <MdError style={{ position: 'absolute', right: '10px', fontSize: '1.5rem', color: '#FF1302' }} />}
                    </div>
                    {errors.typeDocument && (
                        <p className="error-message">
                            {errors.typeDocument}
                        </p>
                    )}

                    <InputValidation
                        label="Nombre completo"
                        type='text'
                        placeholder={`${estudiante.person.firstNamePerson} ${estudiante.person.lastNamePerson}`}
                        value={formData.firstName}
                        name="firstName"
                        Icon={IoInformationCircleSharp}
                        onChange={handleChange}

                    />
                    <InputValidation
                        label="Código Estudiantil"
                        type='number'
                        placeholder={inscriptionDetail?.studentCode || 'N/A'}
                        value={estudiante.nombre || ''}
                        Icon={IoInformationCircleSharp}
                        onChange={(e) => setEstudiante({ ...estudiante, nombre: e.target.value })}
                    />
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Código Estudiantil:</strong> {inscriptionDetail?.studentCode || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>Correo Electrónico:</strong> {estudiante.emailUser}
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
                        <strong>Medicamentos:</strong>
                        {inscriptionDetail?.medications?.map((medication, index) => (
                            <div key={index} className="mb-2">
                                <p className="text-xl font-montserrat mb-1">
                                    <strong>Nombre:</strong> {medication.namePrescriptionMedication}
                                </p>
                                <p className="text-xl font-montserrat mb-1">
                                    <strong>Dosis:</strong> {medication.dosePrescriptionMedication}
                                </p>
                                <p className="text-xl font-montserrat mb-1">
                                    <strong>Razón de la Receta:</strong> {medication.recipeReason}
                                </p>
                            </div>
                        )) || 'N/A'}
                    </p>
                    <p className="text-xl font-montserrat mb-4">
                        <strong>URL Consentimiento:</strong> {inscriptionDetail?.urlConsent ? <a href={inscriptionDetail.urlConsent} target="_blank" rel="noopener noreferrer">Ver PDF</a> : 'N/A'}
                    </p>
                    {inscriptionDetail?.urlConsent && (
                        <div className="mt-8">
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
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