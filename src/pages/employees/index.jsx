import { useState, useEffect } from 'react';
<<<<<<< Updated upstream

import EmployeeHeader from '@/components/headers/EmployeeHeader';
import TableUser from '@/components/tables/TableUser';
=======
import estudiantes from '@/fakeData/estudiantes';
import HeaderMenu from '@/components/headers/HeaderMenu';
import TableUser from '@/components/TableUser';
import { getUserByRole } from '@/db/user';
>>>>>>> Stashed changes
import Loder from '@/components/Loader';
import Footer from '@/components/footers/Footer';

import { getUserByRole } from '@/db/user';


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
            <main className='min-h-screen'>
                <TableUser
                    users={estudiantes}
                    setIsLoading={setLoading}
                    setInitUsers={setEstudiantes}
                    detailsUrl="/employees/users"
                    title={"Estudiantes"}
                />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Estudiantes;

