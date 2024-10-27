import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import ButtonPrimary from '@/components/buttons/ButtonPrimary'

import logo from '@/assets/logo.png'
import './register.css'


//Import Icons
import { MdOutlinePermIdentity, MdEmail, MdVerified,MdDriveFileRenameOutline } from "react-icons/md";
import { TbFileSmile } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineSwapLeft } from "react-icons/ai";
import { LiaAllergiesSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { FaFilePdf, FaAddressCard, FaFileArrowUp } from "react-icons/fa6";

const Register = () => {
    const [formData, setFormData] = useState({
        typeDocument:'',
        numberDocument:'',
        fullName: '',
        studentCode: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        eps: '',
        bloodType: '',
        allergies: '',
        medications: [],
        emergencyContact: {
            fullName: '',
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

    const handleMedicationChange = (index, e) => {
        const { name, value } = e.target;
        const newMedications = [...formData.medications];
        newMedications[index] = {
            ...newMedications[index],
            [name]: value
        };
        setFormData({
            ...formData,
            medications: newMedications
        });
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

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
    }

    return (
        <div className="register-registerPage register-flex">
             <div className="register-containerR register-flex">
                <div className="register-formDiv register-flex">
                    <div className="register-headerDiv">
                            <Image priority src={logo} alt="Logo" className='register-image'/>
                            <h3>¡Dejános conocerte!</h3>
                            <div className="register-footerDiv register-flex">
                            
                            <Link href='/login' className='register-a'>
                                <span className="text">¿Ya tienes una cuenta?</span>
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

                        <div className="inputDiv">
                            <label htmlFor="tipo_Documento">Tipo de Documento (*)</label>
                            <div className="input flex">
                                <FaAddressCard className="icon" />
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
                            <div className="input flex"> 
                                <MdOutlinePermIdentity className="icon" />
                               <input type="number" name="studentCode" placeholder="Ingresa tu número de documento" value={formData.studentCode} onChange={handleChange} required  maxLength={10}/>
                            </div>
                        </div>
                        
                        <button type="button" className="btn flex" onClick={checkUserExists}
                        disabled={!formData.tipo_documento || !formData.numberDocument}
                        >Verificar Existencia
                        <MdVerified className="icon" />
                        </button> 


                        {/*Other information */}
                        <div className="register-inputDiv">
                            <label htmlFor="nombre">Nombre Completo *</label>
                            <div className="register-input register-flex">
                            <IoInformationCircleSharp className="register-icon" />   
                             <input type="text" name="fullName" placeholder="Ingresa tu nombre completo" value={formData.fullName} onChange={handleChange} required/>
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Código Estudiantil (*)</label>
                            <div className="register-input register-flex">
                                <MdOutlinePermIdentity className="register-icon" /> 
                                <input type="number" name="studentCode" placeholder="Ingresa tu código estudiantil" value={formData.studentCode} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Número de telefono (*)</label>
                            <div className="register-input register-flex">
                                <BsFillTelephoneFill className="register-icon" />    
                                <input type="tel" name="phoneNumber" placeholder="Ingresa tu número de teléfono" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Email (*)</label>
                            <div className="register-input register-flex">
                                <MdEmail className="register-icon" />
                                <input type="email" name="email" placeholder="Ingresa tu dirección de email"value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Fecha de Nacimiento (*)</label>
                            <div className="register-input register-flex">
                            <input type="date" name="birthDate" placeholder="Ingresa tu fecha de nacimiento" value={formData.birthDate} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Eps (*)</label>
                            <div className="register-input register-flex">
                                <input type="text" name="eps"  placeholder="Ingresa el nombre de tu Eps" value={formData.eps} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Tipo de Sangre (*)</label>
                            <div className="register-input register-flex">
                            <select name="bloodType" value={formData.bloodType} onChange={handleChange} required className="w-full px-3 py-2 border rounded">
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
                            <label htmlFor="block text-gray-700">Alergías</label>
                            <div className="register-input register-flex" >
                            <LiaAllergiesSolid className="register-icon"/>
                            <input type="text" name="allergies" placeholder="Ingresa tus alegías si aplica" value={formData.allergies} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="register-inputDiv">
                        <div className="mb-4">
                       
                            <label htmlFor="block text-gray-700">Medicamentos Preescritos</label>
                            
                            {formData.medications.map((medication, index) => (
                                <div key={index} className="mb-2">
                                    <div className="input">
                                    <input type="text" name="name" placeholder="Nombre del medicamento" value={medication.name} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded mb-2" />
                                    <input type="text" name="dosage" placeholder="Dosis del medicamento" value={medication.dosage} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded mb-2" />
                                    <input type="text" name="reason" placeholder="Razón de la prenscripción del medicamento" value={medication.reason} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded" />
                                    </div>
                                </div>
                            ))}
                            
                            </div>
                            <button type="button" onClick={addMedication} className="register-btn register-flex"> Agregar Medicamento
                            <GiMedicines className="register-icon" color='#ffff'/>
                            </button>
                            
                        </div>
                        <div className="register-inputDiv">
                            <label htmlFor="block text-gray-700">Contacto en Caso de Emergencia (*)</label>
                                <div className="input flex">
                                     <MdDriveFileRenameOutline className="icon"/> 
                                    <input type="text" name="fullName" placeholder="Nombre Completo" value={formData.emergencyContact.fullName} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded mb-2" />
                                   
                                </div>
                                <div className="input">
                                    <input type="text" name="relationship" placeholder="Parentesco" value={formData.emergencyContact.relationship} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded mb-2" />
                                </div>
                                <div className="input">
                                    <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.emergencyContact.contactNumber} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded" />
                                </div>
                        </div>
                        
                        {/* Consentimiento Informado */}
                        <div className="col-span-full">
                            <label htmlFor="consentimiento-informado" className="flex items-center space-x-2">
                                <a target="_blank" className ="hover:text-yellow-600" href="../../../assets/CONSENTIMIENTOINFORMADO.pdf">Consentimiento informado</a>
                                <a href="../../../assets/CONSENTIMIENTOINFORMADO.pdf"><FaFilePdf className="h-8 w-8 text-yellow-500 hover:text-yellow-600" /></a>
                            </label>
                            <div className="mt-2 register-flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank">
                                <div className="text-center">
                                    <label htmlFor="informedConsent" className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                        <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500" />
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
                                <TbFileSmile className="h-8 w-8 text-yellow-500 hover:text-yellow-600" />
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank">
                                <div className="text-center">
                                    <label htmlFor="parentalAuthorization" className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                        <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500" />
                                        <span>Sube la Autorización debidamente diligenciada</span>
                                        <input id="parentalAuthorization" type="file" name="parentalAuthorization" onChange={handleFileChange} className="sr-only" />
                                    </label>
                                    <p className="text-xs leading-5 text-gray-600">PDF hasta 5 MB</p>
                                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn flex">Register
                        <IoPersonAddSharp className="icon" />
                        </button>
                    </form>
        </div>
        </div>
        </div>
    )
}

export default Register