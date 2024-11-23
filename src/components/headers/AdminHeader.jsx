import HeaderMenu from './HeaderMenu';

const AdminHeader = () => {
    const menu = [
        { name: 'Usuarios', href: '/admin/users' },
        { name: 'Crear usuario', href: '/admin/create-user' },
    ]

    return (
        <>
            <HeaderMenu 
                menu={menu}
            />
        </>
    );
}

export default AdminHeader;