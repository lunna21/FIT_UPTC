import HeaderMenu from "@/components/HeaderMenu";

const Users = () => {
    const menu = [
        { name: 'Crear usuario', href: '/admin/create-user' },
    ]

    return (
        <div>
            <HeaderMenu 
                menu={menu}
            />
            <main>
                <h2>Users</h2>
            </main>
        </div>
    );
}

export default Users;