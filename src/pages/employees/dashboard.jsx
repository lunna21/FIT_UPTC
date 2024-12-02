import Loader from '@/components/Loader'
import { useRouter } from "next/router";
import { useEffect } from 'react'

const DashBoard = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/employees")
    }, [])

    return (
        <div className="w-screen min-h-screen flex justify-center items-center">
            <div>
                <Loader />
            </div>
        </div>
    );
}

export default DashBoard;