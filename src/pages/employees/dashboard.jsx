import HeaderMenu from "@/components/headers/HeaderMenu"; 

const Dashboard = () => {
    return (
        <div>
            <HeaderMenu
                menu={
                    [
                        { href: '/employees', name: 'Estudiantes' },
                        { href: '#', name: "Gestión Turnos"}
                    ]
                }
            />
        </div>
    );
}

export default Dashboard;