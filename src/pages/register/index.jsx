import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import ButtonPrimary from '@/components/buttons/ButtonPrimary'

import logo from '@/assets/logo.png'
import './register.css'


//Import Icons
import { MdOutlinePermIdentity, MdEmail, MdVerified, MdDriveFileRenameOutline, MdBloodtype, MdFamilyRestroom } from "react-icons/md";
import { RiFileAddFill } from "react-icons/ri";
import { TbFileSmile } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineSwapLeft } from "react-icons/ai";
import { LiaAllergiesSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { FaFilePdf, FaAddressCard, FaFileArrowUp, FaHouseChimneyMedical } from "react-icons/fa6";

const Register = () => {
    const [formData, setFormData] = useState({
        typeDocument: '',
        numberDocument: '',
        fullName: '',
        studentCode: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        eps: '',
        bloodType: '',
        allergies: '',
        medication: {
            nameMedication: '',
            dosage: '',
            reason: '',
        },
        emergencyContact: {
            emergencyfullName: '',
            relationship: '',
            contactNumber: ''
        },
        informedConsent: null,
        parentalAuthorization: null
    })


    const [errorMessage, setErrorMessage] = useState("");
    const maxFileSize = 5 * 1024 * 1024; // Tamaño máximo 5 MB

    //Verification userexistence 
    const checkUserExists = async (e) => {
        e.preventDefault();
        try {
            // Aquí deberías hacer la llamada a tu API para verificar si el usuario existe
            // const response = await fetch('/api/check-user', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         tipo_documento: formData.tipo_documento,
            //         numberDocument: formData.numberDocument
            //     })
            // });
            // const data = await response.json();
            // if (!data.exists) {
            //     setIsValidated(true);
            // } else {
            //     alert('Usuario ya registrado');
            // }

            // Por ahora, simulamos la validación:
            setIsValidated(true);
        } catch (error) {
            console.error("Error al verificar el usuario", error);
            alert("Error al verificar el usuario: " + error);
        }
    };


    const handleChange = (e, section) => {
        const { name, value } = e.target
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
        if (section === 'medication') {
            setFormData({
                ...formData,
                medication: {
                    ...formData.medication,
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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setErrorMessage("Solo se permiten archivos PDF.");
                return;
            }
            if (file.size > maxFileSize) {
                setErrorMessage("El archivo no debe superar los 5 MB.");
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
        setFormData({
            ...formData,
            medications: [...formData.medications, { name: '', dosage: '', reason: '' }]
        })
    }

    // const selects = document.querySelectorAll('#typeDocument, #bloodType');

    // selects.forEach(select => {
    //     select.addEventListener('change', () => {
    //         if (select.value) {
    //             select.classList.add('filled');
    //         } else {
    //             select.classList.remove('filled');
    //         }
    //     });
    // });
    // Add 'filled' class to select elements when they have a value
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
                <div className="register-formDiv register-flex">
                    <div className="register-headerDiv">
                        <Image priority src={logo} alt="Logo" className='register-image' />
                        <h3>¡Dejános conocerte!</h3>
                        <div className="register-footerDiv register-flex">

                            <Link href='/login' className='register-a'>
                                <span className="text-gray-dark">¿Ya tienes una cuenta?</span>
                                <ButtonPrimary
                                    buttonText="Ingresar"
                                    IconButton={AiOutlineSwapLeft}
                                    reverse
                                />
                            </Link>
                        </div>
                    </div>
                    <p className="register-obligatorioText">
                        Los campos con (*) son campos obligatorios.
                    </p>

                    <form className="register-formR register-grid register-registerForm" onSubmit={handleSubmit}>

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

                        <button type="button" className="register-btn flex" onClick={checkUserExists}
                            disabled={!formData.tipo_documento || !formData.numberDocument}
                        >Verificar Existencia
                            <MdVerified className="register-icon" />
                        </button>


                        {/*Other information */}
                        <div className="register-inputDiv">
                            <label htmlFor="nombre">Nombre Completo *</label>
                            <div className="register-input register-flex">
                                <IoInformationCircleSharp className="register-icon" />
                                <input type="text" name="fullName" placeholder="Ingresa tu nombre completo" value={formData.fullName} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Código Estudiantil (*)</label>
                            <div className="register-input register-flex">
                                <MdOutlinePermIdentity className="register-icon" />
                                <input type="number" name="studentCode" placeholder="Ingresa tu código estudiantil" value={formData.studentCode} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Número de telefono (*)</label>
                            <div className="register-input register-flex">
                                <BsFillTelephoneFill className="register-icon" />
                                <input type="tel" name="phoneNumber" placeholder="Ingresa tu número de teléfono" value={formData.phoneNumber} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Email (*)</label>
                            <div className="register-input register-flex">
                                <MdEmail className="register-icon" />
                                <input type="email" name="email" placeholder="Ingresa tu dirección de email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="birthDate" className="block text-neutral-grey">Fecha de Nacimiento (*)</label>
                            <div className="register-input register-flex">
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    placeholder="Ingresa tu fecha de nacimiento"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded bg-inputColor text-neutral-gray-medium"
                                />
                            </div>
                        </div>


                        <div className="register-inputDiv">
                            <label htmlFor="eps">Eps (*)</label>

                            <div className="register-input register-flex">
                                <FaHouseChimneyMedical className="register-icon" />
                                <input type="text" name="eps" placeholder="Ingresa el nombre de tu Eps" value={formData.eps} onChange={handleChange} required />
                            </div>
                        </div>

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
                            <label htmlFor="alergías">Alergías</label>
                            <div className="register-input register-flex">
                                <LiaAllergiesSolid className="register-icon" />
                                <input type="text" name="allergies" placeholder="Ingresa tus alegías" value={formData.allergies} onChange={handleChange} />
                            </div>
                        </div>


                        <div className="register-medication-container">
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
                        </div>

                        {/* Consentimiento Informado */}
                        <div className="col-span-full">
                            <label htmlFor="consentimiento-informado" className="flex items-center space-x-2">
                                <a target="_blank" className="hover:text-yellow-600" href="../../../assets/CONSENTIMIENTOINFORMADO.pdf">Consentimiento informado</a>
                                <a href="../../../assets/CONSENTIMIENTOINFORMADO.pdf"><FaFilePdf className="h-8 w-8 text-yellow-500 hover:text-yellow-600" /></a>
                            </label>
                            <div className="mt-2 register-flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank">
                                <div className="text-center">
                                    <label htmlFor="informedConsent" className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                        <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500 hover:text-yellow-600" />
                                        <span>Sube tu Consentimiento informado debidamente diligenciado</span>
                                        <input id="informedConsent" type="file" name="informedConsent" onChange={handleFileChange} className="sr-only" />
                                    </label>
                                    {/* <p className="pl-1">o arrastra el archivo</p> */}
                                    <p className="text-xs leading-5 text-gray-600">PDF hasta 5 MB</p>
                                    {errorMessage && <p className="text-red-500 text-sm mt-2 register-message">{errorMessage}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="parental-authorization" className="flex items-center space-x-2">
                                Autorización de padre o madre (para menores de 18 años)
                                <TbFileSmile className="h-8 w-8 text-neutral-gray-dark" />
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank">
                                <div className="text-center">
                                    <label htmlFor="parentalAuthorization" className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                        <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500 hover:text-yellow-600" />
                                        <span>Sube la Autorización debidamente diligenciada</span>
                                        <input id="parentalAuthorization" type="file" name="parentalAuthorization" onChange={handleFileChange} className="sr-only" />
                                    </label>
                                    <p className="text-xs leading-5 text-gray-600">PDF hasta 5 MB</p>
                                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="register-btn register-flex">Registrate
                            <IoPersonAddSharp className="register-icon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register