import { useState, useEffect, useRef } from 'react';

import Button from '@/components/buttons/Button';
import Loader from '@/components/Loader';
import ValidationInput from '@/components/inputs/InputValidation';
import AdminHeader from '@/components/headers/AdminHeader';
import ProgressLine from '@/components/ProgressLine';
import CheckUserRegister from '@/components/CheckUserRegister';

import useCustomSignUp from '@/hooks/useCustomSignUp';

import { calculateAge, getToday } from '@/utils/utils';
import { validateEmailInput, validateTextInput, validatePhoneNumberInput, validateDateInput } from '@/utils/inputValidation';

import styles from './admin.module.css';

// Import Icons
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonAddSharp } from "react-icons/io5";

const CreateUser = () => {
    const { signUp, isLoading, isLoaded, error: singUpError } = useCustomSignUp();

    const [formData, setFormData] = useState({
        typeDocument: '',
        numberDocument: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        birthDate: ''
    });
    const [isValidated, setIsValidated] = useState("no");
    const [age, setAge] = useState(0);
    const [error, setError] = useState('');
    const [countFillObligatory, setCountFillObligatory] = useState(1);
    const [obligatoryFields, setObligatoryFields] = useState(['numberDocument', 'typeDocument', 'firstName', 'lastName', 'email', 'phoneNumber', 'birthDate']);
    const [obligatoryFieldsCheck, setObligatoryFieldsCheck] = useState(false);
    const containerRef = useRef(null);
    const today = getToday(14);

    console.log(formData)

    useEffect(() => {
        const countFilledFields = obligatoryFields.filter(field => formData[field]).length;
        setCountFillObligatory(countFilledFields);
        setObligatoryFieldsCheck(obligatoryFields.some(field => !formData[field]));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'numberDocument')
            setError('');
        if (name === 'birthDate') {
            setAge(calculateAge(value));
        }

        if (name === 'typeDocument' || name === 'numberDocument') {
            setIsValidated("no");
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp({ formData });
        } catch (err) {
            setError(err);
            console.error(err);
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
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            {
                singUpError && (
                    <div className="z-50 bg-white w-full h-20 bg-transparent flex justify-center items-center px-8 py-4 absolute bottom-0">
                        <p className="text-red-500">{singUpError}</p>
                    </div>
                )
            }
        </>
    );
};

export default CreateUser;