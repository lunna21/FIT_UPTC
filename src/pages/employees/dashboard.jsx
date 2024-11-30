import EmployeeHeader from '@/components/headers/EmployeeHeader';
import Footer from '@/components/footers/Footer';

const Dashboard = () => {
    return (
        <div>
            <EmployeeHeader />
            <main className='min-h-screen'>
                <h1>Dashboard</h1>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Dashboard;