import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteUser } from '@/db/user';
import { deletePersonByDocumentNumber } from '@/db/person';


import Search from '@/components/Search';
import { FaRegUserCircle, FaIdCard, FaRegTrashAlt, FaFilter,FaCheckCircle } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";
import { GrStatusInfo } from "react-icons/gr";
import { GoPencil } from "react-icons/go";
import { TiWarning } from "react-icons/ti";


export default function TableUser({ estudiantes: initEstudiantes, setIsLoading }) {
    const [estudiantes, setEstudiantes] = useState(initEstudiantes);
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const router = useRouter();

    const handleDeleteUser = async (id, numberDocument) => {
        try {
            // Espera a que las operaciones de eliminación se completen
            await deleteUser(id);
            await deletePersonByDocumentNumber(numberDocument);

            // Luego, actualiza el estado usando el valor previo
            setEstudiantes(prevEstudiantes => prevEstudiantes.filter(est => est.idUser !== id));
        } catch (error) {
            console.error("Error eliminando el usuario:", error);
        }
    }

    useEffect(() => {
        if (search === '') {
            setEstudiantes(initEstudiantes);
        } else {
            setEstudiantes(prevEstudiantes => {
                return initEstudiantes.filter(estudiante => {
                    const fullName = `${estudiante.person.firstNamePerson} ${estudiante.person.lastNamePerson}`.toLowerCase();
                    const studentCode = estudiante.inscriptionDetails[0]?.studentCode?.toLowerCase() || '';
                    const userStatus = estudiante.historyUserStatus[0]?.idUserStatus?.toLowerCase() || '';
                    return (
                        fullName.startsWith(search.toLowerCase()) ||
                        studentCode.startsWith(search.toLowerCase()) ||
                        userStatus.startsWith(search.toLowerCase())
                    );
                });
            });
        }
    }, [search, initEstudiantes]);

    const handleFilterChange = (value) => {
        setFilter(value);
        setShowFilter(false);
    };

    const filteredData = estudiantes.filter(user => user.historyUserStatus[0]?.idUserStatus.includes(filter));

    const mostrarDetalles = (id) => {
        setIsLoading(true); // Muestra el loader mientras se cargan los detalles del estudiante
        router.push(`/employees/users/${id}`); // Redirige a la página de detalles del estudiante
    };

    return (
        <div className="min-h-screen bg-neutral-gray-light p-6" onClick={() => setShowFilter(false)}>
            <div className="max-w-7xl mx-auto">
                <div className="bg-neutral-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                            Lista de Estudiantes
                        </h1>
                        <div className='flex gap-4'>
                            <Search
                                search={search}
                                setSearch={setSearch}
                            />
                            <div className="relative" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === 'Enter') e.stopPropagation(); }} tabIndex={0}>
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="flex items-center p-2"
                                >
                                    <FaFilter className='w-5 h-5 text-neutral-gray-medium transition-all duration-120 hover:text-primary-medium' />
                                </button>
                                {showFilter && (
                                    <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                                        <li onClick={() => handleFilterChange("")} className="p-2 cursor-pointer hover:bg-primary-medium">Todos</li>
                                        <li onClick={() => handleFilterChange('ACT')} className="p-2 cursor-pointer hover:bg-primary-medium">Activo</li>
                                        <li onClick={() => handleFilterChange('PEN')} className="p-2 cursor-pointer hover:bg-primary-medium">Pendiente</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-primary text-neutral-black ">
                                    <th className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center space-x-2">
                                            Nombre
                                            <FaRegUserCircle className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center">
                                            Código
                                            <FaIdCard className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center justify-center">
                                            Correo
                                            <IoMdMailOpen className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center">
                                            Teléfono
                                            <FaPhoneVolume className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center">
                                            Estado
                                            <GrStatusInfo className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center">
                                            Acciones
                                            <GoPencil className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(estudiante => (

                                    <tr
                                        key={estudiante.historyUserStatus[0]?.idUser}
                                        href={`/employees/users/${estudiante.historyUserStatus[0]?.idUser}`}
                                        onClick={() => mostrarDetalles(estudiante.idUser)}
                                        className="border-b border-neutral-gray-light hover:bg-primary-light cursor-pointer transition-colors duration-200"
                                    >

                                        <td className="px-6 py-4 font-montserrat">
                                            {estudiante.person.firstNamePerson} {estudiante.person.lastNamePerson}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat flex justify-center">
                                            {estudiante.inscriptionDetails[0]?.studentCode || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat">
                                            {estudiante.person.emailPerson}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat flex justify-center">
                                            {estudiante.person.phoneNumberPerson}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat ">
                                            <div className='w-full flex justify-center'>
                                                <span className={`px-2 py-1 rounded-full flex items-center font-semibold  ${estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? 'bg-green-100 text-green-800' :
                                                    estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-500 text-white'
                                                    }`}>
                                                    {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? 'Activo'  :
                                                        estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? 'Pendiente' :
                                                            estudiante.historyUserStatus[0]?.idUserStatus || 'Desconocido'}
                                                {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? <FaCheckCircle className="inline-block ml-1 text-xl" /> :
                                                 estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? <TiWarning  className="inline-block ml-1 text-xl" /> :
                                                 <FaRegTrashAlt className="inline-block ml-2" />}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-montserrat flex justify-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <GoPencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteUser(estudiante.historyUserStatus[0]?.idUser, estudiante.person.documentNumberPerson);
                                                }}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaRegTrashAlt className='w-5 h-5' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
