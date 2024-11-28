import HeaderMenu from './HeaderMenu';
import { FaBookmark, FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const StudentHeader = () => {
    const menu = [
        { name: 'Inicio', href: '/student', icon: FaHome },
        { name: 'Reserva', href: '/student/reserve', icon: FaBookmark },
        { name: 'Perfil', href: '/student/profile', icon:  CgProfile},
    ]

    return (
        <>
            <HeaderMenu 
                menu={menu}
            />
        </>
    );
}

export default StudentHeader;