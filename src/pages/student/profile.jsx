import StudentHeader from '@/components/headers/StudentHeader'
import Footer from '@/components/footers/Footer';

const Profile = () => {
    return (
        <div>
            <StudentHeader />

            <main className='min-h-screen'>
                <h1>Profile</h1>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Profile