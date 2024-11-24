import { useState, useEffect, useRef } from 'react';

import Button from '@/components/buttons/Button';
import Loader from '@/components/Loader';
import ValidationInput from '@/components/inputs/InputValidation';
import AdminHeader from '@/components/headers/AdminHeader';
import ProgressLine from '@/components/ProgressLine';
import CheckUserRegister from '@/components/CheckUserRegister';
import PopMessage from '@/components/PopMessage';

import useCustomSignUp from '@/hooks/useCustomSignUp';
import useShowPopUp from '@/hooks/useShowPopUp';

import { getToday } from '@/utils/utils';
import { validateEmailInput, validateTextInput, validatePhoneNumberInput, validateDateInput } from '@/utils/inputValidation';

// Import Icons
import { MdEmail, MdError } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { FaAddressCard } from 'react-icons/fa';

const CreateUser = () => {
    const { registerUser, isLoading, isLoaded, error: singUpError } = useCustomSignUp();
    const [formData, setFormData] = useState({
        typeDocument: '',
        numberDocument: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        role: '',
    });
    const [isValidated, setIsValidated] = useState("");
    const [error, setError] = useState('');
    const [errorRole, setErrorRole] = useState('');
    const [countFillObligatory, setCountFillObligatory] = useState(1);
    const [obligatoryFields, setObligatoryFields] = useState(['numberDocument', 'typeDocument']);
    const [obligatoryFieldsCheck, setObligatoryFieldsCheck] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const containerRef = useRef(null);
    const today = getToday(14);
    const {
        status,
        text,
        duration,
        onClose,
        isShow,
        showPopUp
    } = useShowPopUp();

    useEffect(() => {
        const countFilledFields = obligatoryFields.filter(field => formData[field]).length;
        setCountFillObligatory(countFilledFields);
        setObligatoryFieldsCheck(obligatoryFields.some(field => !formData[field]));
    }, [formData, obligatoryFields]);

    useEffect(() => {
        if (isValidated === 'yes') {
            setObligatoryFields(['numberDocument', 'typeDocument', 'firstName', 'lastName', 'email', 'phoneNumber', 'birthDate', 'role']);
        } else if (isValidated === 'no') {
            setObligatoryFields(['numberDocument', 'typeDocument', 'email', 'role']);
        } else if (isValidated === '') {
            setObligatoryFields(['numberDocument', 'typeDocument']);
        }
    }, [isValidated]);

    const handleTypeRole = (e) => {
        handleChange(e);
        setErrorRole(e.target.value ? '' : 'Debe seleccionar un tipo de rol.');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'numberDocument')
            setError('');

        if (name === 'typeDocument' || name === 'numberDocument') {
            setIsValidated("");
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            if (formData.role) {
                await registerUser({ formData });
                showPopUp({ status: 'success', text: 'Usuario creado exitosamente. ☺️' });
            }
        } catch (err) {
            console.error(err);
            showPopUp({ status: 'error', text: err });
        }
    };

    if (isLoading || !isLoaded) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className="sticky top-0 z-50">
                <AdminHeader />
            </div>
            <div className="sticky top-[72px] w-[65vw] m-auto flex items-center justify-start">
                <ProgressLine
                    step={countFillObligatory}
                    maxSteps={obligatoryFields.length}
                    widthContainer={containerRef.current?.clientWidth}
                />
            </div>
            <div className="w-full mx-auto rounded-lg overflow-hidden flex flex-col items-start mt-4">
                <div className="flex flex-col w-[65vw] mx-auto justify-between rounded-lg bg-neutral-gray-light">
                    <div ref={containerRef} className="flex-basis-1/2 gap-6 p-3 justify-between">
                        <p className="text-sm text-red-500 mt-4 ml-8 text-left">
                            Los campos con (*) son campos obligatorios.
                        </p>

                        <form className="grid grid-cols-2 gap-2.5 p-4" onSubmit={handleSubmit}>

                            <CheckUserRegister
                                valueTypeDocument={formData.typeDocument}
                                valueNumberDocument={formData.numberDocument}
                                handleChange={handleChange}
                                setIsValidated={setIsValidated}
                                visibleTI={false}
                                visibleInRegister={false}
                            />
                            {(isValidated === 'no') && (
                                <>
                                    <ValidationInput
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

                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="role" className="text-gray-700 font-medium mb-2">Tipo de Rol (*)</label>
                                        <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{ background: "hsl(330, 12%, 97%)" }}>
                                            <FaAddressCard className="text-gray-500 mr-2" />
                                            <select
                                                id="role"
                                                name="role"
                                                required
                                                value={formData.role}
                                                onChange={handleTypeRole}
                                                className={`flex-1 bg-transparent outline-none ${formData.role ? 'text-black' : 'text-gray-500'}`}
                                            >
                                                <option value="">Selecciona un tipo de role</option>
                                                <option value="ADM">Administrador</option>
                                                <option value="EMP">Empleado</option>
                                            </select>
                                            {errorRole && <MdError className="absolute right-2 text-red-500" />}
                                        </div>
                                        {errorRole && (
                                            <p className="text-red-500 text-sm font-bold mt-1 flex items-center">
                                                {errorRole}
                                            </p>
                                        )}
                                    </div>
                                    <div className='mt-4 col-span-2'>
                                        <Button
                                            buttonText='Crear Usuario'
                                            Icon={IoPersonAddSharp}
                                            disabled={obligatoryFieldsCheck}
                                            onClick={handleSubmit}
                                            type='submit'
                                        />
                                        {obligatoryFieldsCheck && (
                                            <p className='text-red-500 text-sm mt-2'>Por favor, completa todos los campos obligatorios.</p>
                                        )}
                                        {error && (
                                            <p className='text-red-500 text-sm mt-2'>{error}</p>
                                        )}
                                        {successMessage && (
                                            <p className='text-green-500 text-sm mt-2'>{successMessage}</p>
                                        )}
                                    </div>
                                </>
                            )}

                            {(isValidated === 'yes') && (
                                <>
                                    <ValidationInput
                                        label="Nombres (*)"
                                        placeholder="Ingresa tus nombres"
                                        required
                                        value={formData.firstName}
                                        Icon={IoInformationCircleSharp}
                                        name="firstName"
                                        onChange={handleChange}
                                        type="text"
                                    />

                                    <ValidationInput
                                        label="Apellidos (*)"
                                        placeholder="Ingresa tus apellidos"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        Icon={IoInformationCircleSharp}
                                        id="lastName"
                                        name="lastName"
                                        onKeyDown={validateTextInput}
                                        type="text"
                                    />

                                    <ValidationInput
                                        label="Número de telefono (*)"
                                        type='phoneNumber'
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

                                    <ValidationInput
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

                                    <ValidationInput
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

                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="role" className="text-gray-700 font-medium mb-2">Tipo de Rol (*)</label>
                                        <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{ background: "hsl(330, 12%, 97%)" }}>
                                            <FaAddressCard className="text-gray-500 mr-2" />
                                            <select
                                                id="role"
                                                name="role"
                                                required
                                                value={formData.role}
                                                onChange={handleTypeRole}
                                                className={`flex-1 bg-transparent outline-none ${formData.role ? 'text-black' : 'text-gray-500'}`}
                                            >
                                                <option value="">Selecciona un tipo de role</option>
                                                <option value="ADM">Administrador</option>
                                                <option value="EMP">Empleado</option>
                                            </select>
                                            {errorRole && <MdError className="absolute right-2 text-red-500" />}
                                        </div>
                                        {errorRole && (
                                            <p className="text-red-500 text-sm font-bold mt-1 flex items-center">
                                                {errorRole}
                                            </p>
                                        )}
                                    </div>
                                    <div className='mt-4 col-span-2'>
                                        <Button
                                            buttonText='Crear Usuario'
                                            Icon={IoPersonAddSharp}
                                            disabled={obligatoryFieldsCheck}
                                            onClick={handleSubmit}
                                            type='submit'
                                        />
                                        {obligatoryFieldsCheck && (
                                            <p className='text-red-500 text-sm mt-2'>Por favor, completa todos los campos obligatorios.</p>
                                        )}
                                        {error && (
                                            <p className='text-red-500 text-sm mt-2'>{error}</p>
                                        )}
                                        {successMessage && (
                                            <p className='text-green-500 text-sm mt-2'>{successMessage}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
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
        </>
    );
};

export default CreateUser;