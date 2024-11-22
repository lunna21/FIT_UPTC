import HeaderMenu from './HeaderMenu';

const EmployeeHeader = () => {
    const menu = [
        { href: '/employees', name: 'Estudiantes' },
        { href: '/employees/turns', name: "Turnos" }
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