import { useState, useEffect } from 'react';
import EmployeeHeader from '@/components/headers/EmployeeHeader';
import TableUser from '@/components/TableUser';
import { getUserByRole } from '@/db/user';
import Loder from '@/components/Loader';

function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEstudiantes = async () => {
            const role = 'STU';
            try {
                const students = await getUserByRole(role);
                setEstudiantes(students);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchEstudiantes();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
                <p className="text-xl font-montserrat text-red-600">Error: {error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
                <Loder />
            </div>
        );
    }

    return (
        <div>
            <EmployeeHeader />
            <TableUser 
                users={estudiantes} 
                setIsLoading={setLoading} 
                setInitUsers={setEstudiantes}
                detailsUrl="/employees/users"
                title={"Estudiantes"}
            />
        </div>
    );
}

export default Estudiantes;

