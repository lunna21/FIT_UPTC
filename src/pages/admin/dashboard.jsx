import AdminHeader from '@/components/headers/AdminHeader';
import estudiantes from '@/fakeData/estudiantes';
import TableUser from '@/components/TableUser';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';

const Dashboard = () => {
    return (
        <div>
            <AdminHeader />

            <TableUser
                estudiantes={estudiantes}
            />
        </div>
    );
};

export default Dashboard;