import { useState, useEffect } from 'react';
import AdminHeader from '@/components/headers/AdminHeader';
import TableUser from '@/components/TableUser';
import { getUserByRole } from '@/db/user';
import Loder from '@/components/Loader';

function Users() {
    const [Users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const role = 'STU';
            try {
                const students = await getUserByRole(role);
                setUsers(students);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    console.log(Users);


    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
                <Loder />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
                <p className="text-xl font-montserrat text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader />
            <TableUser estudiantes={Users} setIsLoading={setLoading} />
        </div>
    );
}

export default Users;