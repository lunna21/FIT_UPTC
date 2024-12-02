import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EmployeeHeader from '@/components/headers/EmployeeHeader';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Button from '@/components/buttons/Button';
import PopMessage from "@/components/PopMessage";
import useShowPopUp from '@/hooks/useShowPopUp'

import { getUserDetailById } from '@/db/user';
import Loder from '@/components/Loader';
import InputValidation from '@/components/inputs/InputValidation';
import '../../register/register.css';
import ModalViewConsents from '@/components/modals/ModalViewConsents';
//icons
import { MdOutlinePermIdentity, MdEmail, MdDriveFileRenameOutline, MdBloodtype, MdFamilyRestroom, MdOutlineRealEstateAgent, MdVerified, MdError } from "react-icons/md";
import { RiFileAddFill, RiCloseCircleFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { LiaAllergiesSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { IoIosCheckmarkCircle, IoIosSave } from 'react-icons/io';
import { validateEmailInput, validateNumberInput, validateTextInput, validatePhoneNumberInput, validateDateInput, validateAlphanumericInput } from '@/utils/inputValidation'
import { FaAddressCard, FaIdBadge } from "react-icons/fa";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { TiWarning } from "react-icons/ti";

import { calculateAge, getToday } from '@/utils/utils'

const capitalizeFirstLetter = (string) => {
    return string.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatName = (name) => {
    return name.split(' ').map(capitalizeFirstLetter).join(' ');
};

function Details() {
    const router = useRouter();
    const { id_user } = router.query;
    const [estudiante, setEstudiante] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readOnlyMessage, setReadOnlyMessage] = useState('');
    const [readOnly, setReadOnly] = useState(true);
    const [showMedications, setShowMedications] = useState(false);
    const [showMedicationInputs, setShowMedicationInputs] = useState(false); // Nuevo estado
    const today = getToday(14);
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
        }
    });

    const [showModal, setShowModal] = useState(false);
    const {
        status,
        text,
        duration,
        onClose,
        isShow,
        showPopUp
    } = useShowPopUp();

    const handleChange = (e, section) => {
        const { name, value } = e.target

        if (name === 'numberDocument')
            setError('');
        if (name === 'birthDate') {

        }

        if (name === 'typeDocument' || name === 'numberDocument') {

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
    const handleNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            handleChange(e);
            setErrors((prevErrors) => ({
                ...prevErrors,
                numberDocument: value.length < 8 ? 'El número de documento debe tener al menos 8 dígitos.' : ''
            }));
        }
    };
    const handleMedicationChange = (e, section) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            medication: {
                ...formData.medication,
                [name]: value
            }
        });
    }
    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        const selectElement = document.getElementById(id);
        if (value) {
            selectElement.classList.add('filled');
        } else {
            selectElement.classList.remove('filled');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí puedes agregar la lógica para enviar los datos al servidor
            // Por ejemplo, usando fetch o axios para hacer una solicitud POST o PUT
            // const response = await fetch('/api/updateUser', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //     throw new Error('Error al actualizar los datos');
            // }
            showPopUp({ text: 'Usuario modificado con éxito 🙂', status: 'success' });
        } catch (err) {
            showPopUp({ text: err.message, status: 'error' });
        }
    };

    const handleClick = () => {
        if (readOnly) {
            setReadOnlyMessage('Este campo no es modificable.');
            setTimeout(() => setReadOnlyMessage(''), 2000);
        }
    };

    const handleEmergencyContactChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            emergencyContact: {
                ...formData.emergencyContact,
                [name]: value
            }
        });
    }
    const toggleMedications = () => {
        setShowMedications(!showMedications);
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
                showPopUp({ text: err, status: 'error' });
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

    const addMedication = () => {
        const { nameMedication, dosage, reason } = formData.medication;

        // Validar que todos los campos estén llenos
        if (!nameMedication || !dosage || !reason) {
            showPopUp({ text: 'Por favor, completa todos los campos del medicamento.', status: 'error' });
            return;
        }

        const newMedication = {
            nameMedication,
            dosage,
            reason
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            medications: [...prevFormData.medications, newMedication],
            medication: {
                nameMedication: '',
                dosage: '',
                reason: ''
            }
        }));

        setShowMedicationInputs(false); // Ocultar los inputs después de agregar
    };

    const handleRemoveMedication = (index) => {
        const updatedMedications = [...formData.medications];
        updatedMedications.splice(index, 1);
        setFormData({ ...formData, medications: updatedMedications });
    };
    const inscriptionDetail = estudiante.inscriptionDetails[0];

    return (
        <>
            <EmployeeHeader />
            <div className="w-full mx-auto rounded-lg overflow-hidden flex flex-col items-start mt-4">
                <div className="flex flex-col w-[65vw] mx-auto justify-between rounded-lg bg-neutral-gray-light">
                    <div className>
                        <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-0 my-4 text-center">
                            Detalles del Estudiante
                        </h1>
                        <div className='flex justify-center my-2'>
                            <span className={`px-2 py-1 rounded-full flex items-center font-semibold ${estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? 'bg-green-500 text-white' :
                                estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? 'bg-red-500 text-white' :
                                    'bg-gray-500 text-white'
                                }`}>
                                {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? 'Activo' :
                                    estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? 'Pendiente' :
                                        estudiante.historyUserStatus[0]?.idUserStatus === 'INA' ? 'Inactivo' :
                                            estudiante.historyUserStatus[0]?.idUserStatus || 'Desconocido'}
                                {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? <FaCheckCircle className="inline-block ml-1 text-xl" /> :
                                    estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? <TiWarning className="inline-block ml-1 text-xl" /> :
                                        <TiWarning className="inline-block ml-2" />}
                            </span>
                        </div>
                    </div>
                    <form className="grid grid-cols-2 gap-2.5 p-4" onSubmit={handleSubmit}>
                        <div className='w-full bg-gray-700 bg-opacity-25 rounded-xl p-4 max-w-xl mx-auto'>
                            <h2 className="text-xl font-bold mb-4 ">1. Datos Personales</h2>
                            <div className="flex flex-col mb-4">
                                <label className="block text-blackColor font-medium text-sm py-1" htmlFor="typeDocument">Tipo de Documento (*)</label>
                                <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{ background: "hsl(330, 12%, 97%)" }}>
                                    <FaAddressCard className="register-icon text-greyText text-h2FontSize cursor-pointer text-gray-500" />
                                    <select className={`w-full ${(formData.typeDocument || inscriptionDetail?.estatement?.idEstatement) && "text-primary-medium font-semibold "}`} name="typeDocument"
                                        value={formData.typeDocument || estudiante?.person?.idDocumentType}
                                        onChange={handleTypeDocumentChange} required >
                                        <option value="">Selecciona un tipo de documento</option>
                                        <option value="CC">Cédula de Ciudadanía</option>
                                        <option value="TI">Tarjeta de Identidad</option>
                                        <option value="CE">Cédula de Extranjería</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="numdoc" className="text-neutral-black font-medium text-sm  mb-2">Número de documento (*)</label>
                                <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{ background: "hsl(330, 12%, 97%)" }}>
                                    <MdOutlinePermIdentity className="text-gray-500 mr-2" />

                                    <input
                                        type="text"
                                        name="numberDocument"
                                        placeholder="Ingresa tu número de documento"
                                        value={formData.numberDocument || '' || estudiante.person.documentNumberPerson || ' '}
                                        onChange={handleNumberChange}
                                        required
                                        maxLength={10}
                                        readOnly
                                        onClick={handleClick}
                                        className="flex-1 bg-transparent outline-none" />
                                    {errors.numberDocument && <MdError className="absolute right-2 text-red-500" />}
                                    {readOnlyMessage && (
                                        <div className="text-red-500 font-bold text-sm mt-1">
                                            {readOnlyMessage}
                                        </div>
                                    )}
                                </div>
                                {errors.numberDocument && (
                                    <p className="text-red-500 text-sm font-bold mt-1 flex items-center">
                                        {errors.numberDocument}
                                    </p>
                                )}
                            </div>

                            <InputValidation
                                label="Nombres (*)"
                                placeholder="Ingresa tus nombres"
                                required
                                value={formData.firstName || formatName(estudiante.person.firstNamePerson) || ' '}
                                Icon={IoInformationCircleSharp}
                                name="firstName"
                                onChange={handleChange}
                                type="text"
                            />
                            < InputValidation
                                label="Apellidos (*)"
                                placeholder="Ingresa tus apellidos"
                                required
                                value={formData.lastName || formatName(estudiante.person.lastNamePerson) || ' '}
                                onChange={handleChange}
                                Icon={IoInformationCircleSharp}
                                id="lastName"
                                name="lastName"
                                onKeyDown={validateTextInput}
                                type="text"
                            />
                            <InputValidation
                                label="Código Estudiantil (*)"
                                type='number'
                                placeholder="Ingresa tu código estudiantil"
                                required
                                value={formData.studentCode || '' || inscriptionDetail?.studentCode}
                                Icon={FaIdBadge}
                                id="studentCode"
                                name="studentCode"
                                min={9}
                                onKeyDown={validateNumberInput}
                                onChange={handleChange}
                            />
                            < InputValidation
                                label="Alergías"
                                placeholder="Ingresa tus alegías"
                                value={formData.allergies || inscriptionDetail?.allergy?.name_allergy || ''}
                                onChange={handleChange}
                                Icon={LiaAllergiesSolid}
                                id="allergies"
                                type='text'
                                name="allergies"
                                onKeyDown={validateTextInput}
                            />

                            <InputValidation
                                label="Fecha de Nacimiento"
                                type="date"
                                max={today}
                                placeholder="Ingresa tu fecha de nacimiento"
                                required
                                value={formData.birthDate || estudiante?.person?.birthdatePerson?.split('T')[0] || ''}
                                onChange={handleChange}
                                id="birthDate"
                                name="birthDate"
                                onKeyDown={validateDateInput}
                            />
                            <InputValidation
                                label="EPS"
                                placeholder="Ingresa el nombre de tu EPS"
                                required
                                value={formData.eps || inscriptionDetail?.eps?.nameEps}
                                onChange={handleChange}
                                Icon={FaHouseChimneyMedical}
                                id="eps"
                                name="eps"
                                type="text"
                            />
                            <div className="flex flex-col mb-4">
                                <label htmlFor="blood" className="block text-blackColor font-medium text-sm py-2">Tipo de Sangre (*)</label>
                                <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{ background: "hsl(330, 12%, 97%)" }}>
                                    <MdBloodtype className="register-icon text-greyText text-h2FontSize cursor-pointer text-gray-500" />
                                    <select className={`w-full ${formData.bloodType && "text-primary-medium font-semibold "}`}
                                        name="bloodType"
                                        value={formData.bloodType || inscriptionDetail?.bloodType}
                                        onChange={handleChange} required>
                                        <option value="">Selecciona tu tipo de sangre</option>
                                        <option value="A+">A+</option>
                                        <option value="B+">B+</option>
                                        <option value="AB+">AB+</option>
                                        <option value="O+">O+</option>
                                        <option value="A-">A-</option>
                                        <option value="B-">B-</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>
                            <InputValidation
                                label="Email (*)"
                                type="email"
                                placeholder="Ingresa tu dirección de email"
                                required
                                value={formData.email || estudiante.emailUser}
                                onChange={handleChange}
                                Icon={MdEmail}
                                id="email"
                                name="email"
                                onKeyDown={validateEmailInput}
                            />
                            <InputValidation
                                label="Número de telefono (*)"
                                type='phoneNumber'
                                placeholder="Ingresa tu número de teléfono"
                                required
                                value={formData.phoneNumber || estudiante.person.phoneNumberPerson}
                                onChange={handleChange}
                                Icon={BsFillTelephoneFill}
                                id="phoneNumber"
                                name="phoneNumber"
                                max={10}
                                min={10}
                                onKeyDown={validatePhoneNumberInput}
                            />
                            <div className="flex flex-col mb-4">
                                <label className="block text-blackColor font-medium text-sm py-2" htmlFor="programType">Tipo de programa (*)</label>
                                <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{ background: "hsl(330, 12%, 97%)" }}>
                                    <MdOutlineRealEstateAgent className="register-icon text-greyText text-h2FontSize cursor-pointer text-gray-500" />
                                    <select className={`w-full ${(formData.programType || inscriptionDetail?.estatement?.idEstatement) && "text-primary-medium font-semibold "}`}
                                        name="programType"
                                        value={formData.programType || inscriptionDetail?.estatement?.idEstatement}
                                        onChange={handleChange} required >
                                        <option value="">Selecciona tu estamento</option>
                                        <option value="PREGR">Pregrado</option>
                                        <option value="POSTG">Posgrado</option>
                                        <option value="FESAD">Fesad</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className='w-full flex flex-col gap-8'>
                            <div className="bg-gray-700 bg-opacity-25 rounded-xl p-4 w-96 max-w-xl mx-auto">
                                <h2 className="text-xl font-bold mb-4">2. Información de Contacto de Emergencia</h2>
                                < InputValidation
                                    placeholder="Nombre completo del contacto"
                                    label='Nombre del contacto de emergencia (*)'
                                    required
                                    onChange={handleEmergencyContactChange}
                                    value={formData.emergencyContact.emergencyfullName || inscriptionDetail?.emergencyContact?.fullNameEmergencyContact}
                                    Icon={MdDriveFileRenameOutline}
                                    id="emergencyFullName"
                                    name="emergencyfullName"
                                    onKeyDown={validateTextInput}
                                />
                                < InputValidation
                                    type='phoneNumber'
                                    label='Número del contacto de emergencia (*)'
                                    placeholder="Número del contacto"
                                    Icon={BsFillTelephoneFill}
                                    required
                                    value={formData.emergencyContact.contactNumber || inscriptionDetail?.emergencyContact?.phoneNumberEmergencyContact}
                                    onChange={handleEmergencyContactChange}
                                    id="contactNumber"
                                    name="contactNumber"
                                    max={10}
                                    min={10}
                                    onKeyDown={validatePhoneNumberInput}
                                />
                                <div className="flex flex-col mb-4">
                                    <label className="block text-blackColor font-medium text-sm py-2" htmlFor="programType">Tipo de relación (*)</label>
                                    <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{ background: "hsl(330, 12%, 97%)" }}>
                                        <MdFamilyRestroom className="register-icon text-greyText text-h2FontSize cursor-pointer text-gray-500" />
                                        <select className={`w-full ${(formData.programType || inscriptionDetail?.estatement?.idEstatement) && "text-primary-medium font-semibold "}`}
                                            name="relationship"
                                            value={formData.emergencyContact.relationship || inscriptionDetail?.emergencyContact?.relationshipEmergencyContact}
                                            onChange={handleEmergencyContactChange} required >
                                            <option value="">Selecciona el parentesco</option>
                                            <option value="PADRE">Padre</option>
                                            <option value="MADRE">Madre</option>
                                            <option value="HERMANO">Hermano</option>
                                            <option value="HERMANA">Hermana</option>
                                            <option value="ESPOSO">Esposo</option>
                                            <option value="ESPOSA">Esposa</option>
                                            <option value="HIJO">Hijo</option>
                                            <option value="HIJA">Hija</option>
                                            <option value="ABUELO">Abuelo</option>
                                            <option value="ABUELA">Abuela</option>
                                            <option value="TIO">Tío</option>
                                            <option value="TIA">Tía</option>
                                            <option value="PRIMO">Primo</option>
                                            <option value="PRIMA">Prima</option>
                                            <option value="TUTOR">Tutor</option>
                                            <option value="AMIGO">Amigo</option>
                                            <option value="COLEGA">Colega</option>
                                            <option value="VECINO">Vecino</option>
                                            <option value="OTRO">Otro</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-700 bg-opacity-25 rounded-xl p-4 w-96 max-w-xl mx-auto">
                                <h2 className="text-xl font-bold mb-4">3. Medicamentos Preescritos</h2>
                                <div className="mt-2 w-full bg-gray-100 p-4 rounded">
                                    <div className="overflow-x-auto">
                                        <table className="w-full table-auto">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2">Nombre</th>
                                                    <th className="px-4 py-2">Dosis</th>
                                                    <th className="px-4 py-2">Razón</th>
                                                    <th className="px-2 py-2 w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[...formData.medications, ...inscriptionDetail?.medications || []].map((medication, index) => (
                                                    <tr key={index}>
                                                        <td className="border px-4 py-2">{medication.nameMedication || medication.namePrescriptionMedication}</td>
                                                        <td className="border px-4 py-2">{medication.dosage || medication.dosePrescriptionMedication}</td>
                                                        <td className="border px-4 py-2">{medication.reason || medication.recipeReason}</td>
                                                        <td className=" px-2 py-2 w-10 flex justify-center items-center">
                                                            <button
                                                                onClick={() => handleRemoveMedication(index)}
                                                                className="text-red-500 h-8 w-8 flex justify-center items-center"
                                                            >
                                                                <RiCloseCircleFill className="text-2xl" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {showMedicationInputs && (
                                    <>
                                        <InputValidation
                                            label='Nombre del Medicamento'
                                            placeholder="Ingresa el nombre del medicamento"
                                            value={formData.medication.nameMedication}
                                            onChange={handleMedicationChange}
                                            id="nameMedication"
                                            name="nameMedication"
                                            Icon={MdDriveFileRenameOutline}
                                        />
                                        <InputValidation
                                            label='Dosis del Medicamento'
                                            placeholder="Ingresa la dosis del medicamento"
                                            value={formData.medication.dosage}
                                            onChange={handleMedicationChange}
                                            id="dosage"
                                            name="dosage"
                                            onKeyDown={validateAlphanumericInput}
                                            Icon={GiMedicines}
                                            type="alphaNumeric"
                                        />
                                        <InputValidation
                                            label='Razón de la Prescripción'
                                            placeholder="Ingresa la razón de la prescripción"
                                            value={formData.medication.reason}
                                            onChange={handleMedicationChange}
                                            id="reason"
                                            name="reason"
                                            onKeyDown={validateTextInput}
                                            Icon={RiFileAddFill}
                                            type='alphaNumeric'
                                        />
                                    </>
                                )}
                                <div className='flex flex-col gap-2 items-center'>
                                    <Button
                                        buttonText="Agregar"
                                        Icon={GiMedicines}
                                        onClick={() => setShowMedicationInputs(true)}
                                        sizeHeight='h-10'
                                    />
                                    <Button
                                        buttonText="Guardar Medicamento"
                                        Icon={IoIosSave}
                                        onClick={addMedication}
                                        sizeHeight='h-10'
                                    />
                                    <div className='flex items-center justify-center right-1 bottom-1 w-[32px] h-[32px] bg-neutral-gray-dark text-white rounded-full'>
                                        {formData.medications.length}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <p className="text-xl font-montserrat mb-4">
                            <strong>URL Consentimiento:</strong> {inscriptionDetail?.urlConsent ? <a href={inscriptionDetail.urlConsent} target="_blank" rel="noopener noreferrer">Ver PDF</a> : 'N/A'}
                        </p>
                    </form>

                    <Button
                        buttonText="Modificar Datos"
                        Icon={GoPencil}
                        onClick={handleSubmit}
                        sizeHeight="py-3"
                        sizeWidth="px-6"
                        color='blue'
                        type='submit'
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
                    {/* {inscriptionDetail?.urlConsent && (
                        <ModalViewConsents
                            pdfPath='/consents/202213014_20241125.pdf'
                            show={true}
                            handleClose={() => setShowModal(false)}
                            handleAccept={handleAccept}
                            handleDeny={handleDeny}
                        />
                    )}
                    {inscriptionDetail?.urlConsent && (
                        <div className="mt-8">
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                <Viewer fileUrl={inscriptionDetail.urlConsent} />
                            </Worker>
                        </div>
                    )}  */}

                </div >
            </div >
        </>
    );
}

export default Details;