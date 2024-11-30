import StudentHeader from '@/components/headers/StudentHeader'
import Footer from '@/components/footers/Footer';

const Dashboard = () => {
    return (
        <div>
            <StudentHeader />
            <main className='min-h-screen'>
                <h1>Student Dashboard</h1>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Dashboard;