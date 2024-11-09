
import '../global.css'
import ButtonLogOut from '@/components/buttons/ButtonLogOut'
import Search from '@/components/Search'
const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to Home Page</h1>
             <ButtonLogOut />
            <Search/>
        </div>
    );
};

export default Home;