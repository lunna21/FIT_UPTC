import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';

import HeaderMenu from '@/components/HeaderMenu';


const Dashboard = () => {
    const menu = [
        { name: 'Usuarios', href: '/admin/users' },
        { name: 'Crear usuario', href: '/admin/create-user' },
    ]

    return (
        <div>
            <HeaderMenu 
                menu={menu}
            />

        </div>
    );
};

export default Dashboard;