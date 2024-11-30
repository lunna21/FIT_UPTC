import { useState, useEffect } from 'react';
import AdminHeader from '@/components/headers/AdminHeader';
import TableUser from '@/components/tables/TableUser';
import { getUserByRole } from '@/db/user';
import Loder from '@/components/Loader';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const students = await getUserByRole('STU');
                const employees = await getUserByRole('EMP');
                const allUsers = students.concat(employees);
                setUsers(allUsers);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    console.log(users);


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
            <TableUser 
                users={users} 
                setIsLoading={setLoading} 
                setInitUsers={setUsers}
                detailsUrl="#"
                title="Usuarios"
            />
        </div>
    );
}

export default Users;