import { SignOutButton } from '@clerk/nextjs';


const Dashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
            <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}/>
        </div>
    );
};

export default Dashboard;