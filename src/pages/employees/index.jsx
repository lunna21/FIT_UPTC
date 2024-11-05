//   useEffect(() => {
//       fetch('/api/students-inscription')
//           .then(response => response.json())
//           .then(data => {
//                 //Asumiendo que 'data' es un array de estudiantes
//               setEstudiantes(data);
//           })
//           .catch(error => {
//               console.error('Error al obtener los datos:', error);
//           });
//   }, []);

import React, { useState, useEffect } from 'react';
import Search from '@/components/Search';
import { FaRegUserCircle, FaIdCard } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";
import { GrStatusInfo } from "react-icons/gr";
import { GoPencil } from "react-icons/go";

function MensajeCargando({ mensaje }) {
    return (
        <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
            <p className="text-xl font-montserrat">{mensaje}</p>
        </div>
    );
}

function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([
        {
            "id": "1",
            "nombreCompleto": "Juan Pérez González",
            "codigoEstudiantil": "EST2024001",
            "correoElectronico": "juan.perez@ejemplo.com",
            "telefono": "+34 123 456 789",
            "estado": "Activo"
          },
          {
            "id": "2",
            "nombreCompleto": "María Rodríguez López",
            "codigoEstudiantil": "EST2024002",
            "correoElectronico": "maria.rodriguez@ejemplo.com",
            "telefono": "+34 987 654 321",
            "estado": "Activo"
          },
          {
            "id": "3",
            "nombreCompleto": "Carlos García Martínez",
            "codigoEstudiantil": "EST2024003",
            "correoElectronico": "carlos.garcia@ejemplo.com",
            "telefono": "+34 456 789 123",
            "estado": "Inactivo"
          },
          {
            "id": "4",
            "nombreCompleto": "Ana Fernández Ruiz",
            "codigoEstudiantil": "EST2024004",
            "correoElectronico": "ana.fernandez@ejemplo.com",
            "telefono": "+34 321 654 987",
            "estado": "Activo"
        },
        {
            "id": "5",
            "nombreCompleto": "Luis Martínez Gómez",
            "codigoEstudiantil": "EST2024005",
            "correoElectronico": "luis.martinez@ejemplo.com",
            "telefono": "+34 654 321 987",
            "estado": "Inactivo"
        }
    ]);
    const [detalles, setDetalles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const eliminarEstudiante = (id) => {
        // Logic to remove the student from the list
        setEstudiantes(estudiantes.filter(est => est.id !== id));
    };

    //   useEffect(() => {
    //       const fetchEstudiantes = async () => {
    //           try {
    //               const response = await fetch('/estudiantes.json');
    //               if (!response.ok) {
    //                   if (response.status === 404) {
    //                       throw new Error('Archivo no encontrado');
    //                   } else {
    //                       throw new Error('Error al cargar los datos');
    //                   }
    //               }
    //               const data = await response.json();
    //               setEstudiantes(data.estudiantes);

    //           } catch (error) {
    //             console.error('There was a problem with the fetch operation:', error);
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //       };

    //       fetchEstudiantes();
    //   }, []);

      const mostrarDetalles = (id) => {
           const estudiante = estudiantes.find(est => est.id === id);
          setDetalles(estudiante);
      };

    //   if (loading) {
    //       return <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
    //           <p className="text-xl font-montserrat">Cargando estudiantes...</p>
    //       </div>;
    //   }

    //   if (error) {
    //       return <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
    //           <p className="text-xl font-montserrat text-red-600">Error: {error}</p>
    //       </div>;
    //   }

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
    );
}

export default Estudiantes;