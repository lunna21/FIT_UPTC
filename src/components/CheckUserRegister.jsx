import React, { useState } from 'react';

import Loader from '@/components/Loader';

import useCheckUserExist from '@/hooks/useCheckUserExist';

import Button from '@/components/buttons/Button';
import { FaAddressCard } from 'react-icons/fa';
import { MdOutlinePermIdentity, MdVerified, MdError } from 'react-icons/md';

function CheckUserRegister({ valueTypeDocument, valueNumberDocument, handleChange, setIsValidated, visibleTI = true, visibleInRegister = true }) {
    const { isLoadingVerification, errorCheck, checkPersonByDocument } = useCheckUserExist();
    const [errors, setErrors] = useState({ typeDocument: '', numberDocument: '' });

    const checkUserExists = async (e) => {
        e.preventDefault();

        try {
            console.log(valueNumberDocument);
            await checkPersonByDocument({
                documentNumber: valueNumberDocument,
                setIsValidated: setIsValidated
            })
        } catch (error) {
            console.error('Error al verificar el usuario', error);
        }

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

    const handleTypeDocumentChange = (e) => {
        handleChange(e);
        setErrors((prevErrors) => ({
            ...prevErrors,
            typeDocument: e.target.value ? '' : 'Debe seleccionar un tipo de documento.'
        }));
    };

    const errorStyle = {
        color: '#FF1302',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        marginTop: '0.5rem',
        display: 'flex',
        alignItems: 'center'
    };

    const inputContainerStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    };

    const errorIconStyle = {
        position: 'absolute',
        right: '10px',
        fontSize: '1.5rem',
        color: '#FF1302'
    };

    return (
        <>
            {
                visibleInRegister ? (
                    <><div className="register-inputDiv">
                        <label htmlFor="typeDocument">Tipo de Documento (*)</label>
                        <div className="register-input register-flex" style={inputContainerStyle}>
                            <FaAddressCard className="register-icon" />
                            <select
                                id="typeDocument"
                                name="typeDocument"
                                required
                                value={valueTypeDocument}
                                onChange={handleTypeDocumentChange}
                                className={`select-input ${valueTypeDocument ? 'filled' : ''}`}
                            >
                                <option value="">Selecciona un tipo de documento</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                {visibleTI && <option value="TI">Tarjeta de Identidad</option>}
                                <option value="CE">Cédula de Extranjería</option>
                            </select>
                            {errors.typeDocument && <MdError style={errorIconStyle} />}
                        </div>
                        {errors.typeDocument && (
                            <p className="error-message">
                                {errors.typeDocument}
                            </p>
                        )}
                    </div><div className="register-inputDiv">
                            <label htmlFor="numdoc">Número de documento (*)</label>
                            <div className="register-input register-flex" style={inputContainerStyle}>
                                <MdOutlinePermIdentity className="register-icon" />
                                <input
                                    type="text"
                                    name="numberDocument"
                                    placeholder="Ingresa tu número de documento"
                                    value={valueNumberDocument}
                                    onChange={handleNumberChange}
                                    required
                                    maxLength={10} />
                                {errors.numberDocument && <MdError style={errorIconStyle} />}
                            </div>
                            {errors.numberDocument && (
                                <p className="error-message">
                                    {errors.numberDocument}
                                </p>
                            )}
                        </div></>

                ) : (
                    <><div className="flex flex-col mb-4">
                        <label htmlFor="typeDocument" className="text-gray-700 font-medium mb-2">Tipo de Documento (*)</label>
                        <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{background: "hsl(330, 12%, 97%)"}}>
                            <FaAddressCard className="text-gray-500 mr-2" />
                            <select
                                id="typeDocument"
                                name="typeDocument"
                                required
                                value={valueTypeDocument}
                                onChange={handleTypeDocumentChange}
                                className={`flex-1 bg-transparent outline-none ${valueTypeDocument ? 'text-black' : 'text-gray-500'}`}
                            >
                                <option value="">Selecciona un tipo de documento</option>
                                <option value="CC">Cédula de Ciudadanía</option>
                                {visibleTI && <option value="TI">Tarjeta de Identidad</option>}
                                <option value="CE">Cédula de Extranjería</option>
                            </select>
                            {errors.typeDocument && <MdError className="absolute right-2 text-red-500" />}
                        </div>
                        {errors.typeDocument && (
                            <p className="text-red-500 text-sm font-bold mt-1 flex items-center">
                                {errors.typeDocument}
                            </p>
                        )}
                    </div><div className="flex flex-col mb-4">
                            <label htmlFor="numdoc" className="text-gray-700 font-medium mb-2">Número de documento (*)</label>
                            <div className="h-12 flex items-center border rounded-lg p-2 relative" style={{background: "hsl(330, 12%, 97%)"}}>
                                <MdOutlinePermIdentity className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    name="numberDocument"
                                    placeholder="Ingresa tu número de documento"
                                    value={valueNumberDocument}
                                    onChange={handleNumberChange}
                                    required
                                    maxLength={10}
                                    className="flex-1 bg-transparent outline-none" />
                                {errors.numberDocument && <MdError className="absolute right-2 text-red-500" />}
                            </div>
                            {errors.numberDocument && (
                                <p className="text-red-500 text-sm font-bold mt-1 flex items-center">
                                    {errors.numberDocument}
                                </p>
                            )}
                        </div></>
                )
            }
            <div style={{ gridColumn: 'span 2' }}>
                <Button
                    buttonText="Siguiente"
                    colSpan={2}
                    onClick={checkUserExists}
                    Icon={MdVerified}
                    disabled={!valueTypeDocument || valueNumberDocument.length < 8}
                />
            </div>

            {isLoadingVerification && (
                <div
                    className='w-full h-80px bg-transparent flex justify-center'
                    style={{ gridColumn: 'span 2' }}
                >
                    <Loader />

                </div>
            )}
            {
                errorCheck && (
                    <p style={{ gridColumn: "span 2" }} className='w-auto m-auto px-6 py-2 bg-accent-red rounded-lg text-white'>
                        {errorCheck}
                    </p>
                )
            }
        </>
    );
}

export default CheckUserRegister;