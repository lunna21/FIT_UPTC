
import StudentHeader from '@/components/headers/StudentHeader'
import TableTurnsDay from '@/components/tables/TableTurnsDay';

const Reserve = () => {
    return (
        <div>
            <StudentHeader />
                <h1 className='ml-4 mt-4 text-2xl font-poppins font-bold text-neutral-gray-dark mb-4'>
                    Reserva tu turno
                </h1>

                <TableTurnsDay day={"MIERCOLES"}/>
        </div>
    )
}

export default Reserve;