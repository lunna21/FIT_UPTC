import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Button from '@/components/buttons/Button'
import Loader from '@/components/Loader'
import Input from '@/components/inputs/Input'
import PopMessage from '@/components/PopMessage'

import { calculateAge, convertToKB, getToday } from '@/utils'

import { getUserById } from '@/db/user'

import logo from '@/assets/logo.png'
import './register.css'


//Import Icons
import { MdOutlinePermIdentity, MdEmail, MdVerified, MdDriveFileRenameOutline, MdBloodtype, MdFamilyRestroom } from "react-icons/md";
import { RiFileAddFill } from "react-icons/ri";
import { TbFileSmile } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineSwapRight } from "react-icons/ai";
import { LiaAllergiesSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { FaAddressCard, FaFileArrowUp, FaHouseChimneyMedical, FaDownload } from "react-icons/fa6";
import { MdOutlineRealEstateAgent } from "react-icons/md";

const Register = () => {
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
    const [isLoading, setIsLoading] = useState(false);
    const [age, setAge] = useState(0);
    const [error, setError] = useState('');
    const [countFillObligatory, setCountFillObligatory] = useState(1);
    const [lineWidth, setLineWidth] = useState(0);
    const containerRef = useRef(null);


    const [errorMessage, setErrorMessage] = useState("");
    const maxFileSize = 3 * 1024 * 1024; // Tamaño máximo 5 MB
    const today = getToday();
    const obligatoryFields = ['numberDocument', 'firstName', 'lastName', 'email'];

    const obligatoryFieldsCheck = obligatoryFields.some(field => !formData[field]);

    useEffect(() => {
        setCountFillObligatory(obligatoryFields.filter(field => formData[field]).length);
    }, [formData]);

    useEffect(() => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.clientWidth - 20; // Obtiene el ancho del contenedor
          const newWidth = (containerWidth / obligatoryFields.length) * countFillObligatory; // Calcula el nuevo ancho de la línea
          setLineWidth(newWidth); // Actualiza el ancho de la línea
        }
      }, [countFillObligatory, obligatoryFields.length]); // Actualiza el ancho de la línea cuando cambia el contador o el número de pasos


    //Verification userexistence 
    const checkUserExists = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const user = await getUserById(formData.numberDocument);

            if (user?.id === formData?.numberDocument) {
                setIsValidated(false);
                setError("El usuario ya existe, no es necesario registrarse");
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setIsValidated(true);
                setError('');
                return null;
            }

        } catch (error) {
            setIsLoading(false);
            setError('Error al verificar el usuario');
            setIsValidated(false);
            console.error("Error al verificar el usuario", error);
            alert("Error al verificar el usuario: " + error);
            return null;
        }

    };

    console.log(formData)

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

        if (section === 'emergencyContact') {
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
    };

    const addMedication = () => {
        if (!formData.medication.nameMedication) {
            return;
        }

        setFormData({
            ...formData,
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


    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
    }

    return (
        <div className="register-registerPage register-flex">
            <div className="register-containerR register-flex">
                <div ref={containerRef} className="register-formDiv register-flex relative">
                    <div
                        className={`bg-primary-dark h-2 transition-all duration-500 ease-in-out sticky top-0 left-0`}
                        style={{ width: `${lineWidth}px` }} // Cambia el ancho según el contador
                    ></div>
                    <div className="register-headerDiv">
                        <Image priority src={logo} alt="Logo" className='register-image' />
                        <h3 className='hidden-responsive'>¡Dejános conocerte!</h3>
                        <div className="register-footerDiv register-flex">

                            <Link href='/login' className='register-a'>
                                <span className="text-gray-dark">¿Ya tienes una cuenta?</span>
                                <Button
                                    buttonText="Ingresar"
                                    Icon={AiOutlineSwapRight}
                                    sizeHeight='h-10'
                                    justify='between'
                                />
                            </Link>
                        </div>
                    </div>
                    <p className="register-obligatorioText">
                        Los campos con (*) son campos obligatorios.
                    </p>

                    <form className="register-formR register-grid" onSubmit={handleSubmit}>

                        <div className="register-inputDiv" style={{ padding: '0.5rem' }}>
                            <label htmlFor="typeDocument">Tipo de Documento (*)</label>
                            <div className="register-input register-flex">
                                <FaAddressCard className="register-icon" />
                                <select id="typeDocument" name='typeDocument' required value={formData.typeDocument} onChange={handleChange} className={`select-input ${formData.typeDocument ? 'filled' : ''}`}  >
                                    <option value="">Selecciona un tipo de documento</option>
                                    <option value="CC">Cédula de Ciudadanía</option>
                                    <option value="TI">Tarjeta de Identidad</option>
                                    <option value="CE">Cédula de Extranjería</option>
                                </select>
                            </div>
                        </div>
                        <div className="register-inputDiv">
                            <label htmlFor="numdoc">Número de documento (*)</label>
                            <div className="register-input register-flex">
                                <MdOutlinePermIdentity className="register-icon" />
                                <input type="number" name="numberDocument" placeholder="Ingresa tu número de documento" value={formData.numberDocument} onChange={handleChange} required maxLength={10} />
                            </div>
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <Button
                                buttonText="Siguiente"
                                colSpan={2}
                                onClick={checkUserExists}
                                Icon={MdVerified}
                                disabled={!formData.typeDocument || !formData.numberDocument}
                            />
                        </div>

                        {isLoading && (
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
                                />

                                <Input
                                    label="Eps (*)"
                                    placeholder="Ingresa el nombre de tu Eps"
                                    required
                                    value={formData.eps}
                                    onChange={handleChange}
                                    Icon={FaHouseChimneyMedical}
                                    id="eps"
                                    name="eps"
                                />

                                <div className="register-inputDiv">
                                    <label htmlFor="blood">Tipo de Sangre (*)</label>
                                    <div className="register-input register-flex">
                                        <MdBloodtype className="register-icon" />
                                        <select name="bloodType" value={formData.bloodType} onChange={handleChange} required >
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
                                        <select className={`${formData.programType && "text-primary-medium font-semibold"}`} name="programType" value={formData.programType} onChange={handleChange} required >
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
                                />

                                <div className="register-medication-container relative">
                                    <label htmlFor="emergencyFullName">Contacto en Caso de Emergencia (*)</label>
                                    <div className="register-inputDiv">
                                        <div className="register-input register-flex">
                                            <MdDriveFileRenameOutline className="register-icon" />
                                            <input type="text" name="emergencyfullName" placeholder="Nombre Completo" value={formData.emergencyContact.emergencyfullName} onChange={(e) => handleChange(e, 'emergencyContact')} />
                                        </div>
                                    </div>
                                    <div className="register-inputDiv">
                                        <div className="register-input register-flex">
                                            <MdFamilyRestroom className="register-icon" />
                                            <input type="text" name="relationship" placeholder="Parentesco" value={formData.emergencyContact.relationship} onChange={(e) => handleChange(e, 'emergencyContact')} />
                                        </div>
                                    </div>
                                    <div className="register-inputDiv">
                                        <div className="register-input register-flex">
                                            <BsFillTelephoneFill className="register-icon" />
                                            <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.emergencyContact.contactNumber} onChange={(e) => handleChange(e, 'emergencyContact')} />
                                        </div>
                                    </div>
                                </div>

                                <div className="register-medication-container">
                                    <label htmlFor="Medicamentos">Medicamentos Prescritos </label>
                                    <div className="register-inputDiv">
                                        <div className="register-input register-flex">
                                            <MdDriveFileRenameOutline className="register-icon" />
                                            <input type="text" name="nameMedication" placeholder="Nombre del medicamento" value={formData.medication.nameMedication} onChange={(e) => handleMedicationChange(e, 'medication')} />
                                        </div>
                                    </div>
                                    <div className="register-inputDiv">
                                        <div className="register-input register-flex">
                                            <GiMedicines className="register-icon" />
                                            <input type="text" name="dosage" placeholder="Dosis del medicamento" value={formData.medication.dosage} onChange={(e) => handleMedicationChange(e, 'medication')} />
                                        </div>
                                    </div>
                                    <div className="register-inputDiv">
                                        <div className="register-input register-flex">
                                            <RiFileAddFill className="register-icon" />
                                            <input type="text" name="reason" placeholder="Razón de la prescripción" value={formData.medication.reason} onChange={(e) => handleMedicationChange(e, 'medication')} />
                                        </div>
                                    </div>

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

                                {
                                    age !== 0 && (
                                        age < 18 ? (
                                            <div className="col-span-full">
                                                <label htmlFor="parental-authorization" className="flex items-center space-x-2">
                                                    Autorización de padre o madre (para menores de 18 años)
                                                    <TbFileSmile className="h-8 w-8 text-neutral-gray-dark" />
                                                </label>

                                                <label htmlFor="parentalAuthorization" className="group cursor-pointer hover:text-yellow-600 mt-2 register-flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank" >
                                                    <div className="text-center">
                                                        <div className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                                            <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500 group-hover:text-yellow-600 transition-all ease-in-out duration-255" />
                                                            <span className='group-hover:text-yellow-600 transition-all ease-in-out duration-255'>
                                                                {formData.parentalAuthorization ? formData.parentalAuthorization.name : 'Sube la autorización de tus padres'}
                                                            </span>
                                                            <input id="parentalAuthorization" type="file" name="parentalAuthorization" onChange={handleFileChange} className="sr-only" accept="application/pdf" />
                                                        </div>
                                                        {/* <p className="pl-1">o arrastra el archivo</p> */}
                                                        <p className="text-xs leading-5 text-gray-600">
                                                            {formData.parentalAuthorization ? (
                                                                `Tamaño PDF: ${parseInt(convertToKB(formData.parentalAuthorization.size))} KB`
                                                            ) : 'PDF hasta 3 MB'}
                                                        </p>
                                                        {errorMessage && <p className="text-red-500 text-sm mt-2 register-message">{errorMessage}</p>}
                                                    </div>
                                                </label>
                                            </div>
                                        ) : (
                                            <>
                                                <div className='w-full flex justify-center' style={{ gridColumn: "span 2" }}>
                                                    <Link target='_blanck' href="https://drive.google.com/file/d/1vY3vnB_I79746xxRKkvVGl2rzcKigdoo/view?usp=sharing" className="group flex items-center justify-center space-x-2 relative px-4 py-2 border border-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary-medium hover:after:w-full after:transition-all after:duration-300" >
                                                        <p className="text-neutral-gray-dark font-montserrat font-semibold">Descarga Consentimiento</p>
                                                        <FaDownload className="h-6 w-6 text-primary group-hover:text-primary-medium" />
                                                    </Link>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="informedConsent" className="group cursor-pointer hover:text-yellow-600 mt-2 register-flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank" >
                                                        <div className="text-center">
                                                            <div className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                                                <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500 group-hover:text-yellow-600 transition-all ease-in-out duration-255" />
                                                                <span className='group-hover:text-yellow-600 transition-all ease-in-out duration-255'>
                                                                    {formData.informedConsent ? formData.informedConsent.name : 'Sube tu consentimiento informado'}
                                                                </span>
                                                                <input id="informedConsent" type="file" name="informedConsent" onChange={handleFileChange} className="sr-only" accept="application/pdf" />
                                                            </div>
                                                            {/* <p className="pl-1">o arrastra el archivo</p> */}
                                                            <p className="text-xs leading-5 text-gray-600">
                                                                {formData.informedConsent ? (
                                                                    `Tamaño PDF: ${parseInt(convertToKB(formData.informedConsent.size))} KB`
                                                                ) : 'PDF hasta 3 MB'}
                                                            </p>
                                                            {errorMessage && <p className="text-red-500 text-sm mt-2 register-message">{errorMessage}</p>}
                                                        </div>
                                                    </label>
                                                </div>
                                            </>
                                        )
                                    )
                                }

                                {/* CHECKBOX pediendole que si hacepta las cumplir las condiciones medicas y politicas de privacidad */}
                                <div className="flex gap-2 items-center">
                                    <input type="checkbox" id="terms" name="terms" className='text-primary' onChange={handleChange} required value={formData.terms} />
                                    <label htmlFor="terms" className="register-checkboxLabel">
                                        Acepto los términos y condiciones
                                    </label>
                                </div>

                                <div className='mt-4' style={{ gridColumn: "span 2" }}>
                                    <Button
                                        buttonText='Registrate'
                                        Icon={IoPersonAddSharp}
                                        disabled={obligatoryFieldsCheck}
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