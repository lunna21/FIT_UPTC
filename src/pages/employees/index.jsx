//   useEffect(() => {
//       fetch('/api/students-inscription')
//           .then(response => response.json())
//           .then(data => {
//                 //Asumiendo que 'data' es un array de estudiantes
//               setEstudiantes(data);
//           })
//           .catch(error => {
//               console.error('Error al obtener los datos:', error);
//           });
//   }, []);

import estudiantes from '@/fakeData/estudiantes';
import HeaderMenu from '@/components/HeaderMenu';
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