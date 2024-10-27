import { useState } from 'react'

import '../../global.css'
// import image from "../../../assets/LOGO UPTC.png";
import './register.css'


//Import Icons
import { MdOutlinePermIdentity } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp } from "react-icons/io5";
import { AiOutlineSwapLeft } from "react-icons/ai";
import { LiaAllergiesSolid } from "react-icons/lia";
import { GiMedicines } from "react-icons/gi";
import { FaFilePdf } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { FaFileArrowUp } from "react-icons/fa6";



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
            const response = await Axios.post("http://localhost:3002/check-user", {
                typeDocument: formData.typeDocument,
                numberDocument: formData.numberDocument
            });
            if (!response.data.exists) {
                alert("Usuario no registrado. Completa los demás campos.");
            } else {
                alert("Usuario ya registrado. Por favor digita un nuevo documento.");
            }
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
        <div className="registerPage flex">
             <div className="containerR flex">
                <div className="formDiv flex">
                    <div className="headerDiv">
                            {/* <img src={logo} alt="Logo" /> */}
                            <h3>¡Dejános conocerte!</h3>
                            <div className="footerDiv flex">
                            
                            <a href='/login'>
                            <span className="text">¿Ya tienes una cuenta?</span>
                                <button className="btn">
                                <span>Ingresar</span>
                                <AiOutlineSwapLeft className="icon" />
                                </button>
                            </a>
                            </div>
                    </div>
                    <p className="obligatorioText">
                        Los campos con (*) son campos obligatorios.
                    </p>
            
                    <form className="formR grid registerForm" onSubmit={handleSubmit}>

                        <div className="inputDiv">
                            <label htmlFor="tipo_documento">Tipo de Documento (*)</label>
                            <div className="input flex">
                                <FaAddressCard className="icon" />
                                <select id="tipo_documento" required value={formData.tipo_documento} onChange={handleChange}   >
                                    <option value="">Selecciona un tipo de documento</option>
                                    <option value="CC">Cédula de Ciudadanía</option>
                                    <option value="TI">Tarjeta de Identidad</option>
                                    <option value="CE">Cédula de Extranjería</option>
                                </select>
                            </div>
                        </div>    
                        <div className="inputDiv">
                            <label htmlFor="numdoc">Número de documento (*)</label>
                            <div className="input flex"> 
                                <MdOutlinePermIdentity className="icon" />
                               <input type="number" name="numberDocument" placeholder="Ingresa tu número de documento" value={formData.numberDocument} onChange={handleChange} required  maxLength={50}/>
                            </div>
                        </div>
                        
                        <button type="button" className="btn flex" onClick={checkUserExists}>Verificar Existencia</button> 


                        {/*Other information */}
                        <div className="inputDiv">
                            <label htmlFor="nombre">Nombre Completo *</label>
                            <div className="input flex">
                            <IoInformationCircleSharp className="icon" />   
                             <input type="text" name="fullName" placeholder="Ingresa tu nombre completo" value={formData.fullName} onChange={handleChange} required/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Código Estudiantil (*)</label>
                            <div className="input flex">
                                <MdOutlinePermIdentity className="icon" /> 
                                <input type="number" name="studentCode" placeholder="Ingresa tu código estudiantil" value={formData.studentCode} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Número de telefono (*)</label>
                            <div className="input flex">
                                <BsFillTelephoneFill className="icon" />    
                                <input type="tel" name="phoneNumber" placeholder="Ingresa tu número de teléfono" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Email (*)</label>
                            <div className="input flex">
                                <MdEmail className="icon" />
                                <input type="email" name="email" placeholder="Ingresa tu dirección de email"value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Fecha de Nacimiento (*)</label>
                            <div className="input flex">
                            <input type="date" name="birthDate" placeholder="Ingresa tu fecha de nacimiento" value={formData.birthDate} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Eps (*)</label>
                            <div className="input flex">
                                <input type="text" name="eps"  placeholder="Ingresa el nombre de tu Eps" value={formData.eps} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Tipo de Sangre (*)</label>
                            <div className="input flex">
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

                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Alergías</label>
                            <div className="input flex" >
                            <LiaAllergiesSolid className="icon"/>
                            <input type="text" name="allergies" placeholder="Ingresa tus alegías si aplica" value={formData.allergies} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                            </div>
                        </div>

                        <div className="inputDiv">
                        <div className="mb-4">
                       
                            <label htmlFor="block text-gray-700">Medicamentos Preescritos</label>
                            <div className="input" >
                            {formData.medications.map((medication, index) => (
                                <div key={index} className="mb-2">
                                    <input type="text" name="name" placeholder="Nombre del medicamento" value={medication.name} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded mb-2" />
                                    <input type="text" name="dosage" placeholder="Dosis del medicamento" value={medication.dosage} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded mb-2" />
                                    <input type="text" name="reason" placeholder="Razón de la prenscripción del medicamento" value={medication.reason} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded" />
                                </div>
                            ))}
                            </div>
                            </div>
                            <button type="button" onClick={addMedication} className="btn flex"> Agregar Medicamento
                            <GiMedicines className="icon" color='#ffff'/>
                            </button>
                            
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="block text-gray-700">Contacto en Caso de Emergencia (*)</label>
                                <div className="input flex">
                                    <input type="text" name="fullName" placeholder="Nombre Completo" value={formData.emergencyContact.fullName} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded mb-2" />
                                </div>
                                <div className="input flex">
                                    <input type="text" name="relationship" placeholder="Parentesco" value={formData.emergencyContact.relationship} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded mb-2" />
                                </div>
                                <div className="input flex">
                                    <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.emergencyContact.contactNumber} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded" />
                                </div>
                        </div>
                        
                        {/* Consentimiento Informado */}
                        <div className="col-span-full">
                            <label htmlFor="consentimiento-informado" className="text-gray-700 flex items-center space-x-2">
                                <a target="_blank" className ="hover:text-yellow-600" href="../../../assets/CONSENTIMIENTOINFORMADO.pdf">Consentimiento informado</a>
                                <a href="../../../assets/CONSENTIMIENTOINFORMADO.pdf"><FaFilePdf className="h-8 w-8 text-yellow-500 hover:text-yellow-600" /></a>
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank">
                                <div className="text-center">
                                    <label htmlFor="informedConsent" className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                        <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500" />
                                        <span>Sube tu Consentimiento informado debidamente diligenciado</span>
                                        <input id="informedConsent" type="file" name="informedConsent" onChange={handleFileChange} className="sr-only" />
                                    </label>
                                    {/* <p className="pl-1">o arrastra el archivo</p> */}
                                    <p className="text-xs leading-5 text-gray-600">PDF hasta 5 MB</p>
                                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Attach Parental Authorization (for minors)</label>
                            <input type="file" name="parentalAuthorization" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
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