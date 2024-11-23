import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { deleteUser } from '@/db/user';
import { deletePersonByDocumentNumber } from '@/db/person';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "../pages/employees/driver.css";


import Search from '@/components/Search';
import ButtonHelp from '@/components/buttons/ButtonHelp';
import PopMessage from '@/components/PopMessage';
import ModalDisableUsers from "@/components/ModalDisableUsers";
import Pagination from '@/components/Pagination';
import { FaRegUserCircle, FaIdCard, FaRegTrashAlt, FaFilter, FaCheckCircle } from "react-icons/fa";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(initEstudiantes.length / 7));
    const itemsPerPage = 7;
    const router = useRouter();
    const { user } = useUser();
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageColor, setMessageColor] = useState('');
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteUser = async (id, numberDocument) => {
        try {
            // Espera a que las operaciones de eliminación se completen
            // await deleteUser(id);
            // await deletePersonByDocumentNumber(numberDocument);
            setMessage('El usuario fue deshabilitado exitosamente');
            setShowMessage(true);
            setMessageColor('bg-green-500');
            setEstudiantes(prevEstudiantes => prevEstudiantes.filter(est => est.idUser !== id));

        } catch (error) {
            console.error("Error inhabilitando el usuario:", error);
            setMessage('Error inhabilitando el usuario');
            setShowMessage(true);
            setMessageColor('bg-red-500');
        }
    }

    useEffect(() => {
        if (search === '') {
            setEstudiantes(initEstudiantes);
            setCurrentPage(1);
            setTotalPages(Math.ceil(initEstudiantes.length / itemsPerPage));
            setShowNoResultsMessage(false);
        } else {
            const filteredEstudiantes = initEstudiantes.filter(estudiante => {
                const firstName = estudiante.person.firstNamePerson.toLowerCase();
                const lastName = estudiante.person.lastNamePerson.toLowerCase();
                const studentCode = estudiante.inscriptionDetails[0]?.studentCode?.toLowerCase() || '';
                return (
                    firstName.startsWith(search.toLowerCase()) ||
                    lastName.startsWith(search.toLowerCase()) ||
                    studentCode.startsWith(search.toLowerCase())
                );
            });
            setEstudiantes(filteredEstudiantes);
            setCurrentPage(filteredEstudiantes.length > 0 ? 1 : 0);
            setTotalPages(filteredEstudiantes.length > 0 ? Math.ceil(filteredEstudiantes.length / itemsPerPage) : 0);
            setShowNoResultsMessage(filteredEstudiantes.length === 0);
        }
    }, [search, initEstudiantes]);

    const handleFilterChange = (value) => {
        setFilter(value);
        setShowFilter(false);
        setCurrentPage(1);
        const filteredData = initEstudiantes.filter(user => user.historyUserStatus[0]?.idUserStatus.includes(value));
        setEstudiantes(filteredData);
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    };

    const filteredData = estudiantes.filter(user => user.historyUserStatus[0]?.idUserStatus.includes(filter));

    const mostrarDetalles = (id) => {
        setIsLoading(true);
        router.push(`/employees/users/${id}`);
    };

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const offset = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(offset, offset + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDisableUser = (reason) => {
        if (selectedUser) {
            handleDeleteUser(selectedUser.id, selectedUser.documentNumber, reason);
        }
    };


    return (
        <div className="min-h-screen bg-neutral-gray-light p-6" onClick={() => setShowFilter(false)}>
            <div className="max-w-7xl mx-auto">
                <div className="bg-neutral-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                            Lista de Estudiantes
                        </h1>

                        <div id="search-bar-and-filter" className='flex gap-4'>
                            <div id="search-bar">
                                <Search
                                    search={search}
                                    setSearch={setSearch}
                                />
                            </div>
                            <div id='filter' className="relative" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === 'Enter') e.stopPropagation(); }} tabIndex={0}>
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
                    <div className="absolute top-0 right-12 m-20 ">
                        {showNoResultsMessage && (
                            <div className="flex pop-message bg-red-500 text-white p-2 rounded-lg mb-4 w-90 items-center relative gap-2">
                                <TiWarning />  No se encontraron coincidencias, verifica tu búsqueda e intenta de nuevo.
                            </div>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-primary text-neutral-black ">
                                    <th id='column_fullname' className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center justify-center">
                                            Nombre
                                            <FaRegUserCircle className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th id='column' className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center justify-center">
                                            Código
                                            <FaIdCard className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th id='column_email' className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center justify-center">
                                            Correo
                                            <IoMdMailOpen className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th id='column_phoneNumber' className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center justify-center">
                                            Teléfono
                                            <FaPhoneVolume className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th id='column_status' className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center justify-center">
                                            Estado
                                            <GrStatusInfo className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                    <th id='column_actions' className="px-6 py-4 font-montserrat">
                                        <span className="flex items-center justify-center">
                                            Acciones
                                            <GoPencil className='w-5 h-5 ml-2' />
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map(estudiante => (
                                    <tr
                                        id='details'
                                        key={estudiante.historyUserStatus[0]?.idUser}
                                        href={`/employees/users/${estudiante.historyUserStatus[0]?.idUser}`}
                                        onClick={() => mostrarDetalles(estudiante.idUser)}
                                        className="border-b border-neutral-gray-light hover:bg-primary-light cursor-pointer transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 font-montserrat">
                                            {capitalize(estudiante.person.firstNamePerson)} {capitalize(estudiante.person.lastNamePerson)}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat flex justify-center">
                                            {estudiante.inscriptionDetails[0]?.studentCode || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-montserrat">
                                            {estudiante.emailUser}
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
                                                    {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? 'Activo' :
                                                        estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? 'Pendiente' :
                                                            estudiante.historyUserStatus[0]?.idUserStatus || 'Desconocido'}
                                                    {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? <FaCheckCircle className="inline-block ml-1 text-xl" /> :
                                                        estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? <TiWarning className="inline-block ml-1 text-xl" /> :
                                                            <TiWarning className="inline-block ml-2" />}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-montserrat flex justify-center space-x-2">
                                            <button id='button_modify' className="text-blue-600 hover:text-blue-800">
                                                <GoPencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                id='button_delete'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedUser({
                                                        id: estudiante.historyUserStatus[0]?.idUser,
                                                        documentNumber: estudiante.person.documentNumberPerson,
                                                        name: `${capitalize(estudiante.person.firstNamePerson)} ${capitalize(estudiante.person.lastNamePerson)}`
                                                    });
                                                    setIsModalOpen(true);
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    {showMessage && (
                        <PopMessage
                            text={message}
                            duration={3000}
                            onClose={() => setShowMessage(false)}
                            color={messageColor}
                        />
                    )}
                    <ModalDisableUsers
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAccept={handleDisableUser}
                        nameUser={selectedUser?.name}
                    />
                </div>
            </div>
        </div>
    );
}