import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { disable } from '@/db/user';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "../pages/employees/driver.css";

import useUpdateStatusUser from '@/hooks/useUpdateStatusUser';
import useShowPopUp from '@/hooks/useShowPopUp';

import Search from '@/components/Search';
import ButtonHelp from '@/components/buttons/ButtonHelp';
import PopMessage from '@/components/PopMessage';
import ModalChangeStatusUser from "@/components/ModalChangeStatusUser";
import Pagination from '@/components/Pagination';
import { FaRegUserCircle, FaIdCard, FaFilter, FaCheckCircle, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FaPhoneVolume, FaUserSlash } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";
import { GrStatusInfo } from "react-icons/gr";
import { GoPencil } from "react-icons/go";
import { TiWarning } from "react-icons/ti";

export default function TableUser({ estudiantes: initEstudiantes, setIsLoading, setInitStudents }) {
    const { updateStatus } = useUpdateStatusUser();
    const {
        status,
        text,
        duration,
        onClose,
        isShow,
        showPopUp
    } = useShowPopUp();

    const [estudiantes, setEstudiantes] = useState(initEstudiantes);
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(initEstudiantes.length / 7));
    const itemsPerPage = 7;
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageColor, setMessageColor] = useState('');
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusUserChange, setStatusUserChange] = useState('');
    const [showSkeleton, setShowSkeleton] = useState(false);

    const getEstudianteById = (id) => {
        return estudiantes.find(estudiante => estudiante.idUser === id);
    }

    useEffect(() => {
        if (search === '') {
            setEstudiantes(initEstudiantes.map(estudiante => ({
                ...estudiante,
                showMenuStatus: false,
            })));
            setCurrentPage(1);
            setTotalPages(Math.ceil(initEstudiantes.length / itemsPerPage));
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
            setEstudiantes(filteredEstudiantes.map(estudiante => ({
                ...estudiante,
                showMenuStatus: false
            })));
            setCurrentPage(filteredEstudiantes.length > 0 ? 1 : 0);
            setTotalPages(filteredEstudiantes.length > 0 ? Math.ceil(filteredEstudiantes.length / itemsPerPage) : 0);
            if (filteredEstudiantes.length === 0) {
                showPopUp({ text: 'No se encontraron coincidencias, verifica tu búsqueda e intenta de nuevo.', status: "error" });
            }
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
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const offset = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(offset, offset + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    console.log("show modal ", isShow)

    const handleStatus = async (reason) => {
        setShowSkeleton(true)
        try {
            const response = await updateStatus({
                idUser: selectedUser.idUser,
                status: statusUserChange,
                reason: reason,
                username: selectedUser.nameUser
            })

            setInitStudents(initEstudiantes.map(estu => {
                if (estu.idUser === selectedUser.idUser) {
                    return ({
                        ...estu,
                        historyUserStatus: [response.historyUserStatus]
                    })
                }
                return estu
            }))

            console.log(response.message)
            showPopUp({ text: response.message, status: "success" })
        } catch (error) {
            console.error('Error updating user status:', error);
            setEstudiantes(prev => prev.map(estu => estu.idUser === selectedUser.idUser ? selectedUser : estu))
            showPopUp({ text: error.message, status: "error" })
        } finally {
            setIsModalOpen(false);
            setShowSkeleton(false)
        }
    }

    const handleAdminStatusUser = (e, status) => {
        e.stopPropagation();
        setStatusUserChange(status);
        setIsModalOpen(true);
    }

    const handleMenuStatus = (e, id) => {
        e.stopPropagation();
        setEstudiantes(prev => prev.map(estu => estu.idUser === id ? { ...estu, showMenuStatus: !estu.showMenuStatus } : estu));
        setSelectedUser(getEstudianteById(id));
    }

    return (
        <div className="min-h-screen bg-neutral-gray-light p-6" onClick={() => { setShowFilter(false); setEstudiantes(prev => prev.map(estu => ({ ...estu, showMenuStatus: false }))) }}>
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
                                    onSearch={setSearch}
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
                                        <li onClick={() => handleFilterChange('INA')} className="p-2 cursor-pointer hover:bg-primary-medium">Inactivo</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-12 m-20 ">
                        {showNoResultsMessage && (
                            <div className="flex pop-message bg-red-500 text-white p-2 rounded-lg mb-4 w-90 items-center relative gap-2">
                                <TiWarning />
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
                                {
                                    showSkeleton ? (
                                        <>
                                            {[...Array(6)].map((_, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4">
                                                        <div className="animate-pulse bg-gray-400 h-6 w-24 mx-auto rounded"></div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="animate-pulse bg-gray-400 h-6 w-16 mx-auto rounded"></div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="animate-pulse bg-gray-400 h-6 w-32 mx-auto rounded"></div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="animate-pulse bg-gray-400 h-6 w-20 mx-auto rounded"></div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="animate-pulse bg-gray-400 h-6 w-20 mx-auto rounded"></div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="animate-pulse bg-gray-400 h-6 w-20 mx-auto rounded"></div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        currentData.map(estudiante => (
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
                                                <td className="px-6 py-4 font-montserrat relative">
                                                    <button className='w-full flex justify-center' onClick={(e) => handleMenuStatus(e, estudiante.idUser)}>
                                                        <span className={`px-2 py-1 rounded-full flex items-center font-semibold transition ease-in-out duration-200 hover:opacity-60 shadow-md ${estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? 'bg-green-500 text-white' :
                                                            estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? 'bg-red-500 text-white' :
                                                                'bg-gray-500 text-white'
                                                            }`}>
                                                            {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? 'Activo' :
                                                                estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? 'Pendiente' :
                                                                    estudiante.historyUserStatus[0]?.idUserStatus === 'INA' ? 'Inactivo' :
                                                                        estudiante.historyUserStatus[0]?.idUserStatus || 'Desconocido'}
                                                            {estudiante.historyUserStatus[0]?.idUserStatus === 'ACT' ? <FaCheckCircle className="inline-block ml-1 text-xl" /> :
                                                                estudiante.historyUserStatus[0]?.idUserStatus === 'PEN' ? <TiWarning className="inline-block ml-1 text-xl" /> :
                                                                    <TiWarning className="inline-block ml-2" />}
                                                        </span>
                                                    </button>
                                                    {
                                                        getEstudianteById(estudiante.idUser).showMenuStatus && (
                                                            <ul className='absolute bottom-[-36px] right-[-60px] min-w-[120px] bg-white rounded-md z-50 shadow-lg'>
                                                                {
                                                                    [
                                                                        {
                                                                            name: 'Pendiente',
                                                                            status: 'PEN'
                                                                        },
                                                                        {
                                                                            name: 'Activo',
                                                                            status: 'ACT'
                                                                        },
                                                                        {
                                                                            name: 'Inactivo',
                                                                            status: 'INA'
                                                                        }
                                                                    ].map((item, index) => {
                                                                        if (estudiante.historyUserStatus[0].idUserStatus === item.status) {
                                                                            return null;
                                                                        }

                                                                        return (
                                                                            <li
                                                                                key={index}
                                                                                className='hover:bg-primary-light px-4 py-1 rounded-md cursor-pointer'
                                                                                onClick={(e) => handleAdminStatusUser(e, item.status)}
                                                                            >
                                                                                {item.name}
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        )
                                                    }
                                                </td>
                                                <td className="px-6 py-4 font-montserrat flex justify-center space-x-2">
                                                    <button id='button_modify' className="text-blue-600 hover:text-blue-800">
                                                        <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full hover:bg-blue-400">
                                                            <FaUserEdit className="w-6 h-6" />
                                                        </div>
                                                    </button>
                                                    <button
                                                        id='button_delete'
                                                        onClick={(e) => {
                                                            setSelectedUser(estudiante)
                                                            handleAdminStatusUser(e, "INA")
                                                        }}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <div className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full  hover:bg-red-400">
                                                            <FaUserSlash className='w-5 h-5' />
                                                        </div>
                                                    </button>
                                                </td>
                                            </tr>
                                        )))
                                }
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
                    <ModalChangeStatusUser
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAccept={handleStatus}
                        nameUser={capitalize(selectedUser?.person?.firstNamePerson) + ' ' + capitalize(selectedUser?.person?.lastNamePerson)}
                        status={statusUserChange === 'ACT' ? 'Activar' : statusUserChange === 'INA' ? 'Inactivar' : 'Dejar pendiente'}
                    />
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
        </div>
    );
}