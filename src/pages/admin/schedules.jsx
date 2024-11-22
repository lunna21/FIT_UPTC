import AdminHeader from "@/components/headers/AdminHeader"
import TableConfigTurns from "@/components/TableConfigTurns"

const Schedules = () => {
    return (
        <div>
            <AdminHeader />
            <div className="w-full flex justify-center bg-neutral-gray-light">
                <div className="mt-8 w-[96%] px-8 py-6 bg-neutral-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark mb-6">
                        Configuración de turnos
                    </h1>
                    <TableConfigTurns />
                </div>
            </div>
        </div>
    )
}

export default Schedules