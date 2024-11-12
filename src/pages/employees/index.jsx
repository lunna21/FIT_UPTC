import estudiantes from '@/fakeData/estudiantes';
import HeaderMenu from '@/components/headers/HeaderMenu';
import TableUser from '@/components/TableUser';


function Estudiantes() {


    //   if (loading) {
    //       return <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
    //           <p className="text-xl font-montserrat">Cargando estudiantes...</p>
    //       </div>;
    //   }

    //   if (error) {
    //       return <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
    //           <p className="text-xl font-montserrat text-red-600">Error: {error}</p>
    //       </div>;
    //   }

    return (
        <>
            <HeaderMenu
                menu={
                    [
                        { href: 'employees', name: 'Estudiantes' },
                        { href: '#', name: "Gestión Turnos"}
                    ]
                }
            />
            <TableUser
                estudiantes={estudiantes}
            />
        </>
    );
}

export default Estudiantes;


// import { useEffect, useState } from 'react';
// import { getUserByUsername } from '@/db/user';
// import { getUserDetail } from '@/db/userDetail';
// import HeaderMenu from '@/components/headers/HeaderMenu';
// import TableUser from '@/components/TableUser';

// function Estudiantes() {
//     const [estudiantes, setEstudiantes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchUserDetails() {
//             try {
//                 const user = await getUserByUsername('username'); // Reemplaza 'username' con el nombre de usuario real
//                 const userDetails = await getUserDetail(user.id);

//                 const formattedData = userDetails.map(detail => ({
//                     id: detail.idUser,
//                     nombreCompleto: `${detail.person.firstNamePerson} ${detail.person.lastNamePerson}`,
//                     codigoEstudiantil: detail.inscriptionDetails[0]?.studentCode || 'N/A',
//                     correoElectronico: detail.emailUser,
//                     telefono: detail.person.phoneNumberPerson,
//                     estado: detail.historyUserStatus[0]?.idUserStatus === 'ACTIVE' ? 'Activo' : 'Inactivo',
//                 }));

//                 setEstudiantes(formattedData);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchUserDetails();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
//                 <p className="text-xl font-montserrat">Cargando estudiantes...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-neutral-gray-light p-6 flex items-center justify-center">
//                 <p className="text-xl font-montserrat text-red-600">Error: {error}</p>
//             </div>
//         );
//     }

//     return (
//         <>
//             <HeaderMenu
//                 menu={[
//                     { href: 'employees', name: 'Estudiantes' },
//                     { href: '#', name: "Gestión Turnos" }
//                 ]}
//             />
//             <TableUser estudiantes={estudiantes} />
//         </>
//     );
// }

// export default Estudiantes;