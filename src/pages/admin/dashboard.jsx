import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';


const Dashboard = () => {
    return (
        <div>
            <header className="bg-neutral-black text-neutral-white p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </header>
            <main className="p-5">
                <p className="mb-4">Welcome to the admin dashboard!</p>
                {/* Link to manage users page */}
                <Link href="/admin/users" className="text-neutral-gray-dark bold hover:underline">
                    Gestionar Usuarios
                </Link>
                <div className="mt-5">
                    <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}/>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;