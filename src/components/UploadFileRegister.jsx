import {useState} from "react";
import Link from 'next/link';

import { convertToKB } from '@/utils/utils';

import { FaDownload, FaFileArrowUp } from 'react-icons/fa6';
import { TbFileSmile } from 'react-icons/tb';

function UploadFileRegister({ age = 0, parentalAuthorization, informedConsent, handleFileChange, errorMessage }) {
    return (
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
                                    {parentalAuthorization ? parentalAuthorization.name : 'Sube la autorización de tus padres'}
                                </span>
                                <input id="parentalAuthorization" type="file" name="parentalAuthorization"onChange={handleFileChange} className="sr-only" accept="application/pdf" />
                            </div>
                            {/* <p className="pl-1">o arrastra el archivo</p> */}
                            <p className="text-xs leading-5 text-gray-600">
                                {parentalAuthorization ? (
                                    `Tamaño PDF: ${parseInt(convertToKB(parentalAuthorization.size))} KB`
                                ) : 'PDF hasta 1 MB'}
                            </p>
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                        </div>
                    </label>
                </div>
            ) : (
                <>
                    <div className='w-full flex justify-start' style={{ gridColumn: "span 2" }}>
                        <Link target='_blanck' href="https://drive.google.com/file/d/1vY3vnB_I79746xxRKkvVGl2rzcKigdoo/view?usp=sharing" className="group flex items-center justify-start space-x-2 relative px-4 py-2 border-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary-medium hover:after:w-full after:transition-all after:duration-300" >
                            <p className="text-neutral-gray-dark font-montserrat font-semibold">Descarga el Consentimiento</p>
                            <FaDownload className="h-6 w-6 text-primary group-hover:text-primary-medium" />
                        </Link>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="informedConsent" className="group cursor-pointer hover:text-yellow-600 mt-2 register-flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-blank" >
                            <div className="text-center">
                                <div className="relative cursor-pointer rounded-md bg-gray font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-600">
                                    <FaFileArrowUp className="mx-auto h-12 w-12 text-gray-500 group-hover:text-yellow-600 transition-all ease-in-out duration-255" />
                                    <span className='group-hover:text-yellow-600 transition-all ease-in-out duration-255'>
                                        {informedConsent ? informedConsent.name : 'Sube tu consentimiento informado'}
                                    </span>
                                    <input id="informedConsent" type="file" name="informedConsent" onChange={handleFileChange} className="sr-only" accept="application/pdf" />
                                </div>
                                {/* <p className="pl-1">o arrastra el archivo</p> */}
                                <p className="text-xs leading-5 text-gray-600">
                                    {informedConsent ? (
                                        `Tamaño PDF: ${parseInt(convertToKB(informedConsent.size))} KB`
                                    ) : 'PDF hasta 1 MB'}
                                </p>
                                {errorMessage && <p className="text-red-500 font-bold text-2xl mt-2 ">{errorMessage}</p>}
                            </div>
                        </label>
                    </div>
                </>
            )
        )
    )
}

export default UploadFileRegister;