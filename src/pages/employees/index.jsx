import { useState, useEffect } from 'react';
import HeaderMenu from '@/components/headers/HeaderMenu';
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

    console.log(estudiantes);


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
            <HeaderMenu
                menu={
                    [
                        { href: 'employees', name: 'Estudiantes' },
                        { href: '#', name: "Gestión Turnos" }
                    ]
                }
            />
            <TableUser estudiantes={estudiantes} setIsLoading={setLoading} />
        </div>
    );
}

export default Estudiantes;

