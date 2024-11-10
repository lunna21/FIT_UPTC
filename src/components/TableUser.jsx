import { useState } from 'react'

import Search from '@/components/Search';
import { FaRegUserCircle, FaIdCard } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";
import { GrStatusInfo } from "react-icons/gr";
import { GoPencil } from "react-icons/go";

export default function TableUser({ estudiantes: initEstudiantes }) {
    const [estudiantes, setEstudiantes] = useState(initEstudiantes)
    const [detalles, setDetalles] = useState(null);
    const eliminarEstudiante = (id) => {
        // Logic to remove the student from the list
        setEstudiantes(estudiantes.filter(est => est.id !== id));
    };

    const mostrarDetalles = (id) => {
        const estudiante = estudiantes.find(est => est.id === id);
        setDetalles(estudiante);
    };

    return (
        <div className="min-h-screen bg-neutral-gray-light p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-neutral-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                            Lista de Estudiantes
                        </h1>
                        <Search />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-primary text-neutral-black">
                                    <th className="px-6 py-4 font-montserrat font-semibold text-left">
                                        <span className="flex items-center">
                                            Nombre Completo
                                            <FaRegUserCircle className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat font-semibold text-left">
                                        <span className="flex items-center">
                                            Código Estudiantil
                                            <FaIdCard className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat font-semibold text-left">
                                        <span className="flex items-center">
                                            Correo Electrónico
                                            <IoMdMailOpen className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat font-semibold text-left">
                                        <span className="flex items-center">
                                            Número de Teléfono
                                            <FaPhoneVolume className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat font-semibold text-left">
                                        <span className="flex items-center">
                                            Estado
                                            <GrStatusInfo className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat font-semibold text-left">
                                        <span className="flex items-center">
                                            Acciones
                                            <GoPencil className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {estudiantes.map((estudiante) => (
                                    <tr
                                        key={estudiante.id}
                                        onClick={() => mostrarDetalles(estudiante.id)}
                                        className="border-b border-neutral-gray-light hover:bg-primary-light cursor-pointer transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 font-montserrat">
                                            {estudiante.nombreCompleto}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat">
                                            {estudiante.codigoEstudiantil}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat">
                                            {estudiante.correoElectronico}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat">
                                            {estudiante.telefono}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat">
                                            <span className={`px-2 py-1 rounded-full ${estudiante.estado === 'Activo'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {estudiante.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-montserrat">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <GoPencil className="w-5 h-5" />

                                            </button>
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => mostrarDetalles(estudiante.id)}
                                            >
                                                Visualizar
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => eliminarEstudiante(estudiante.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {detalles && (
                        <div className="mt-8 bg-primary-light rounded-lg p-6">
                            <h2 className="text-2xl font-poppins font-bold text-neutral-gray-dark mb-4">
                                Detalles del Estudiante
                            </h2>
                            <div className="grid grid-cols-2 gap-4 font-montserrat">
                                <div className="space-y-2">
                                    <p className="flex items-center">
                                        <span className="font-semibold mr-2">Nombre Completo:</span>
                                        {detalles.nombreCompleto}
                                    </p>
                                    <p className="flex items-center">
                                        <span className="font-semibold mr-2">Código Estudiantil:</span>
                                        {detalles.codigoEstudiantil}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="flex items-center">
                                        <span className="font-semibold mr-2">Correo Electrónico:</span>
                                        {detalles.correoElectronico}
                                    </p>
                                    <p className="flex items-center">
                                        <span className="font-semibold mr-2">Número de Teléfono:</span>
                                        {detalles.telefono}
                                    </p>
                                    <p className="flex items-center">
                                        <span className="font-semibold mr-2">Estado:</span>
                                        <span className={`px-2 py-1 rounded-full ${detalles.estado === 'Activo'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {detalles.estado}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}