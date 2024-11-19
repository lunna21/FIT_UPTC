import HeaderMenu from './HeaderMenu';

const EmployeeHeader = () => {
    const menu = [
        { href: '/employees', name: 'Estudiantes' },
        { href: '/employees/turns', name: "Gestión Turnos" }
    ]

    return (
        <>
            <HeaderMenu 
                menu={menu}
            />
        </>
    );
}

export default EmployeeHeader;