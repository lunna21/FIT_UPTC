import React, { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import useShowPopUp from '@/hooks/useShowPopUp'
import Link from 'next/link'

import Button from '@/components/buttons/Button'
import Input from '@/components/inputs/InputValidation'
import PopMessage from "@/components/PopMessage";

import styled from 'styled-components'

import { IoIosSend } from "react-icons/io";
import { FaUnlock } from 'react-icons/fa';
import { MdEmail, MdVerified } from 'react-icons/md'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { IoIosArrowBack } from "react-icons/io";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const [error, setError] = useState('')
    const {
        status,
        text,
        duration,
        onClose,
        isShow,
        showPopUp
    } = useShowPopUp();

    const router = useRouter()
    const { isLoaded, signIn } = useSignIn()

    if (!isLoaded) {
        return null
    }

    // Enviar el código de restablecimiento al correo
    async function create(e) {
        e.preventDefault()
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            .then((_) => {
                setSuccessfulCreation(true)
                showPopUp({ text: 'Se ha enviado un código de restablecimiento a tu correo electrónico' })
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                showPopUp({ text: 'No se encontró tu cuenta.', status: 'error' });
            })
    }

    // Restablecer la contraseña del usuario
    async function reset(e) {
        e.preventDefault()

        // Validar el código de restablecimiento y actualizar la contraseña
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then((result) => {
                if (result.status === 'complete') {
                    // Redirigir al usuario a la página de inicio después del restablecimiento
                    showPopUp({ text: 'Contraseña restablecida correctamente 💪', status: 'success' });
                    setTimeout(() => {
                        router.push('/login')
                    }, 1500)
                } else {
                    console.log(result)
                }
            })
            .catch((err) => {
                console.error('error', err.errors[0].longMessage)
                if (err.errors[0].longMessage == 'Incorrect code') {
                    showPopUp({ text: 'El código de restablecimiento es incorrecto.', status: 'error' });
                } else
                    showPopUp({ text: 'No se pudo restablecer la contraseña, intentalo nuevamente.', status: 'error' });
            })
    }

    return (
        <ContainerStyled className="w-screen h-screen flex justify-center items-center">
            <div className="relative mx-auto max-w-md p-8 rounded-lg shadow-lg bg-neutral-gray-light text-center">
                <Link href="/login" className="group absolute top-0 left-0 w-[40px] h-[40px] flex justify-center items-center bg-primary-medium rounded-l-lg rounded-b-none">
                    <IoIosArrowBack className="text-neutral-gray-dark text-lg transition-all duration-200 group-hover:-translate-x-1" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">¿Olvidaste tu contraseña?</h1>
                <form onSubmit={!successfulCreation ? create : reset} className="space-y-4">
                    {!successfulCreation && (
                        <>
                            <Input
                                label="Por favor, proporciona tu dirección de correo electrónico"
                                type="email"
                                placeholder="ej. juan@perez.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                Icon={MdEmail}
                            />
                            <Button
                                buttonText="Enviar código"
                                onClick={create}
                                type='submit'
                                Icon={IoIosSend}
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </>
                    )}

                    {successfulCreation && (
                        <>
                            <Input
                                label="Ingresa tu nueva contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                Icon={BsFillShieldLockFill}
                            />
                            <Input
                                label="Ingresa el código de restablecimiento de contraseña"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                Icon={MdVerified}
                            />
                            <Button
                                buttonText="Restablecer"
                                type="submit"
                                Icon={FaUnlock}
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </>
                    )}
                </form>
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
        </ContainerStyled>
    )
}

export default ForgotPasswordPage

const ContainerStyled = styled.div`
    @media (max-width: 768px) {
        background-color: hsl(0, 0%, 91%);
    }
`