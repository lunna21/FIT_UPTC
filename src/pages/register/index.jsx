import { useState, useEffect, useRef } from 'react'
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link'

import Button from '@/components/buttons/Button'
import Loader from '@/components/Loader'
import Input from '@/components/inputs/Input'
import HeaderRegister from '@/components/HeaderRegister'
import ProgressLine from '@/components/ProgressLine'
import CheckUserRegister from '@/components/CheckUserRegister'
import UploadFileRegister from '@/components/UploadFileRegister'

import { calculateAge, getToday, generatePassword, generateUsername } from '@/utils/utils'
import { validateEmailInput, validateNumberInput, validateTextInput, validatePhoneNumberInput, validateDateInput } from '@/utils/inputValidation'

import { getUserById } from '@/db/user'

import './register.css'

//Import Icons
import { MdOutlinePermIdentity, MdEmail, MdDriveFileRenameOutline, MdBloodtype, MdFamilyRestroom } from "react-icons/md";
import { RiFileAddFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { LiaAllergiesSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { MdOutlineRealEstateAgent } from "react-icons/md";

const Register = () => {
    const clerk = useClerk();
    const { signUp } = clerk;

    console.log(clerk);
    console.log(signUp)

    const router = useRouter();
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
    const [isValidated, setIsValidated] = useState(false);
    const [isLoadingVerification, setIsLoadingVerification] = useState(false);
    const [age, setAge] = useState(0);
    const [error, setError] = useState('');
    const [countFillObligatory, setCountFillObligatory] = useState(1);
    const [obligatoryFields, setObligatoryFields] = useState(['numberDocument', 'typeDocument', 'firstName', 'lastName', 'email', 'studentCode', 'phoneNumber', 'birthDate', 'eps', 'bloodType', 'programType', 'emergencyfullName', 'relationship', 'contactNumber', 'terms'])
    const [obligatoryFieldsCheck, setObligatoryFieldsCheck] = useState(false);
    const containerRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const maxFileSize = 3 * 1024 * 1024; // Tamaño máximo 5 MB
    const today = getToday(14);

    useEffect(() => {
        if (!age) {
            setObligatoryFields(obligatoryFields.filter(field => field !== 'informedConsent' && field !== 'parentalAuthorization'))
        } else {
            if (age < 18) {
                if (obligatoryFields.includes('informedConsent'))
                    setObligatoryFields(obligatoryFields.filter(field => field !== 'informedConsent'))
                if (!obligatoryFields.includes('parentalAuthorization'))
                    setObligatoryFields([...obligatoryFields, 'parentalAuthorization'])
            }
            else {
                if (obligatoryFields.includes('parentalAuthorization'))
                    setObligatoryFields(obligatoryFields.filter(field => field !== 'parentalAuthorization'))
                if (!obligatoryFields.includes('informedConsent'))
                    setObligatoryFields([...obligatoryFields, 'informedConsent'])
            }
        }
    }, [age])

    useEffect(() => {
        const countFilledFields = obligatoryFields.filter(field => {
            if (field === 'emergencyfullName' || field === 'relationship' || field === 'contactNumber') {
                return formData.emergencyContact[field];
            }
            if (field == 'parentalAuthorization' || field == 'informedConsent') {
                if (formData[field]) {
                    return true
                }
            }
            return formData[field];
        }).length;
        setCountFillObligatory(countFilledFields);
    }, [formData, obligatoryFields]);

    useEffect(() => {
        setObligatoryFieldsCheck(obligatoryFields.some(field => {
            if (field === 'emergencyfullName' || field === 'relationship' || field === 'contactNumber') {
                return !formData.emergencyContact[field];
            }
            return !formData[field];
        }))
    }, [countFillObligatory, obligatoryFields.length]); // Actualiza el ancho de la línea cuando cambia el contador o el número de pasos

    //Verification userexistence 
    const checkUserExists = async (e) => {
        e.preventDefault();

        setIsLoadingVerification(true);

        try {
            const user = await getUserById(formData.numberDocument, '/register');

            if (user?.id === formData?.numberDocument) {
                setIsValidated(false);
                setError("El usuario ya existe, no es necesario registrarse");
                setIsLoadingVerification(false);
            } else {
                setIsLoadingVerification(false);
                setIsValidated(true);
                setError('');
                return null;
            }

        } catch (error) {
            setIsLoadingVerification(false);
            setError('Error al verificar el usuario');
            setIsValidated(false);
            console.error("Error al verificar el usuario", error);
            alert("Error al verificar el usuario: " + error);
            return null;
        }
    };

    const handleChange = (e, section) => {
        const { name, value } = e.target

        if (name === 'numberDocument')
            setError('');
        if (name === 'birthDate') {
            setAge(calculateAge(value));
        }

        if (name === 'typeDocument' || name === 'numberDocument') {
            setIsValidated(false);
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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            if (file.type !== "application/pdf") {
                setErrorMessage("Solo se permiten archivos PDF.");
                return;
            }
            if (file.size > maxFileSize) {
                setErrorMessage("El archivo no debe superar los 3 MB.");
                return;
            }
            setErrorMessage("");
            setFormData({
                ...formData,
                [name]: file
            });
        }
    }

    const addMedication = () => {
        if (!formData.medication.nameMedication) {
            return;
        }

        setFormData({
            ...formData,
            medication: {
                nameMedication: '',
                dosage: '',
                reason: ''
            },
            medications: [
                ...formData.medications,
                {
                    nameMedication: formData.medication.nameMedication,
                    dosage: formData.medication.dosage,
                    reason: formData.medication.reason
                }
            ]
        })
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

    // Attach event listeners to select elements
    useEffect(() => {
        const selects = document.querySelectorAll('#typeDocument, #bloodType');
        selects.forEach(select => {
            select.addEventListener('change', handleSelectChange);
        });

        // Cleanup event listeners on component unmount
        return () => {
            selects.forEach(select => {
                select.removeEventListener('change', handleSelectChange);
            });
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Creación del usuario con Clerk, incluyendo el nombre de usuario
            const newUser = await signUp.create({
                emailAddress: formData.email,
                password: generatePassword(),
                username: generateUsername(formData.firstName, formData.lastName),
                publicMetadata: {
                    role: 'student',
                },
            })

            console.log(newUser)

            // Envío del código de confirmación
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            router.push('/verify');
        } catch (err) {
            setError(String(err));
            console.log(String(err))
        }
    }

    return (
        <div className="register-registerPage register-flex">
            <div className="register-containerR register-flex">
                <div ref={containerRef} className="register-formDiv register-flex relative">
                    <ProgressLine
                        lineColor="primary"
                        step={countFillObligatory}
                        maxSteps={obligatoryFields.length}
                        widthContainer={containerRef.current?.clientWidth}
                    />
                    <HeaderRegister />
                    <p className="register-obligatorioText">
                        Los campos con (*) son campos obligatorios.
                    </p>

                    <form className="register-formR register-grid" onSubmit={handleSubmit}>

                        <CheckUserRegister
                            valueTypeDocument={formData.typeDocument}
                            valueNumberDocument={formData.numberDocument}
                            handleChange={handleChange}
                            checkUserExists={checkUserExists}
                        />

                        {isLoadingVerification && (
                            <div
                                className='w-full h-80px bg-transparent flex justify-center'
                                style={{ gridColumn: 'span 2' }}
                            >
                                <Loader />

                            </div>
                        )}
                        {
                            error && (
                                <Link href="/login" style={{ gridColumn: "span 2" }} className='w-auto m-auto px-6 py-2 bg-accent-red rounded-lg text-white'>
                                    {error}
                                </Link>
                            )
                        }

                        {isValidated && (
                            <>
                                {/*Other information */}
                                <Input
                                    label="Nombres (*)"
                                    placeholder="Ingresa tus nombres"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    Icon={IoInformationCircleSharp}
                                    id="firstName"
                                    name="firstName"
                                    onKeyDown={validateTextInput}
                                />

                                <Input
                                    label="Apellidos (*)"
                                    placeholder="Ingresa tus apellidos"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    Icon={IoInformationCircleSharp}
                                    id="lastName"
                                    name="lastName"
                                    onKeyDown={validateTextInput}
                                />

                                <Input
                                    label="Código Estudiantil (*)"
                                    type='number'
                                    placeholder="Ingresa tu código estudiantil"
                                    required
                                    value={formData.studentCode}
                                    onChange={handleChange}
                                    Icon={MdOutlinePermIdentity}
                                    id="studentCode"
                                    name="studentCode"
                                    max={10}
                                    min={10}
                                    onKeyDown={validateNumberInput}
                                />

                                <Input
                                    label="Número de telefono (*)"
                                    type='number'
                                    placeholder="Ingresa tu número de teléfono"
                                    required
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    Icon={BsFillTelephoneFill}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    max={10}
                                    min={10}
                                    onKeyDown={validatePhoneNumberInput}
                                />

                                <Input
                                    label="Email (*)"
                                    type="email"
                                    placeholder="Ingresa tu dirección de email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    Icon={MdEmail}
                                    id="email"
                                    name="email"
                                    onKeyDown={validateEmailInput}
                                />

                                <Input
                                    label="Fecha de Nacimiento (*)"
                                    type="date"
                                    max={today}
                                    placeholder="Ingresa tu fecha de nacimiento"
                                    required
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    id="birthDate"
                                    name="birthDate"
                                    onKeyDown={validateDateInput}
                                />

                                <Input
                                    label="Eps (*)"
                                    placeholder="Ingresa el nombre de tu Eps"
                                    required
                                    value={formData.eps}
                                    onChange={handleChange}
                                    Icon={FaHouseChimneyMedical}
                                    // onkeydown="return /[a-z]/i.test(event.key)"
                                    onKeyDown={validateTextInput}
                                    type="text"
                                    id="eps"
                                    name="eps"
                                />

                                <div className="register-inputDiv">
                                    <label htmlFor="blood">Tipo de Sangre (*)</label>
                                    <div className="register-input register-flex">
                                        <MdBloodtype className="register-icon" />
                                        <select className='w-full' name="bloodType" value={formData.bloodType} onChange={handleChange} required >
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

                                <div className="register-inputDiv">
                                    <label htmlFor="programType">Tipo de programa (*)</label>
                                    <div className="register-input register-flex">
                                        <MdOutlineRealEstateAgent className="register-icon" />
                                        <select className={`w-full ${formData.programType && "text-primary-medium font-semibold "}`} name="programType" value={formData.programType} onChange={handleChange} required >
                                            <option value="">Selecciona tu estamento</option>
                                            <option value="Pregrado">Pregrado</option>
                                            <option value="Prosgrado">Posgrado</option>
                                            <option value="Fesad">Fesad</option>
                                        </select>
                                    </div>
                                </div>

                                <Input
                                    label="Alergías"
                                    placeholder="Ingresa tus alegías"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    Icon={LiaAllergiesSolid}
                                    id="allergies"
                                    name="allergies"
                                    onKeyDown={validateTextInput}
                                />

                                <div className="register-medication-container relative h-full">
                                    <label htmlFor="emergencyFullName">Contacto en Caso de Emergencia (*)</label>
                                    <Input
                                        placeholder="Nombre completo del contacto"
                                        required
                                        onChange={handleEmergencyContactChange}
                                        value={formData.emergencyContact.emergencyfullName}
                                        Icon={MdDriveFileRenameOutline}
                                        id="emergencyFullName"
                                        name="emergencyfullName"
                                        onKeyDown={validateTextInput}
                                    />
                                    <Input
                                        type='number'
                                        placeholder="Número del contacto"
                                        Icon={BsFillTelephoneFill}
                                        required
                                        value={formData.emergencyContact.contactNumber}
                                        onChange={handleEmergencyContactChange}
                                        id="contactNumber"
                                        name="contactNumber"
                                        max={10}
                                        onKeyDown={validatePhoneNumberInput}
                                    />
                                    <Input
                                        placeholder="Ingresa tu parentesco"
                                        Icon={MdFamilyRestroom}
                                        required
                                        onChange={handleEmergencyContactChange}
                                        value={formData.emergencyContact.relationship}
                                        id="relationship"
                                        name="relationship"
                                        onKeyDown={validateTextInput}
                                    />
                                </div>

                                <div className="register-medication-container">
                                    <label htmlFor="Medicamentos">Medicamentos Prescritos </label>
                                    <Input
                                        placeholder="Ingresa la dosis del medicamento"
                                        value={formData.medication.dosage}
                                        onChange={handleMedicationChange}
                                        id="dosage"
                                        name="dosage"
                                        onKeyDown={validateTextInput}
                                        Icon={MdDriveFileRenameOutline}
                                    />

                                    <Input
                                        placeholder="Ingresa la razón de la prescripción"
                                        value={formData.medication.reason}
                                        onChange={handleMedicationChange}
                                        id="reason"
                                        name="reason"
                                        onKeyDown={validateTextInput}
                                        Icon={GiMedicines}
                                    />
                                    <Input
                                        placeholder="Ingresa el nombre del medicamento"
                                        value={formData.medication.nameMedication}
                                        onChange={handleMedicationChange}
                                        id="nameMedication"
                                        name="nameMedication"
                                        onKeyDown={validateTextInput}
                                        Icon={RiFileAddFill}
                                    />

                                    <div className='flex gap-2 items-center'>
                                        <Button
                                            buttonText="Agregar"
                                            Icon={GiMedicines}
                                            onClick={addMedication}
                                            sizeHeight='h-10'
                                        />
                                        <div className='flex items-center justify-center right-1 bottom-1 w-[32px] h-[32px] bg-neutral-gray-dark text-white rounded-full'>
                                            {formData.medications.length}
                                        </div>
                                    </div>
                                </div>

                                <UploadFileRegister
                                    age={age}
                                    parentalAuthorization={formData.parentalAuthorization}
                                    informedConsent={formData.informedConsent}
                                    handleFileChange={handleFileChange}
                                    errorMessage={errorMessage}
                                />

                                {/* CHECKBOX pediendole que si hacepta las cumplir las condiciones medicas y politicas de privacidad */}
                                <div className="flex gap-2 items-center" style={{ gridColumn: "span 2" }}>
                                    <input type="checkbox" id="terms" name="terms" className='text-primary' onChange={handleChange} required value={formData.terms} />
                                    <label htmlFor="terms" className="register-checkboxLabel">
                                        He leido y aceptado los terminos y condiciones
                                    </label>
                                    <Link href="/terms" className='text-sm font-light border-b-2 border-b-primary hover:text-primary-medium transition ease-in-out duration-255'>
                                        TERMINOS Y CONDICIONES
                                    </Link>
                                </div>

                                <div className='mt-4' style={{ gridColumn: "span 2" }}>
                                    <Button
                                        buttonText='Registrate'
                                        Icon={IoPersonAddSharp}
                                        disabled={obligatoryFieldsCheck}
                                        onClick={handleSubmit}
                                        type='submit'
                                    />
                                    {!obligatoryFieldsCheck && (
                                        // Hay datos obligatorios aún sin diligenciar
                                        <p className='text-red-500 text-sm mt-2 register-message'>Por favor, completa todos los campos obligatorios.</p>
                                    )}
                                </div>

                            </>
                        )}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register