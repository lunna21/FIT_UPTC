import HeaderMenu from './HeaderMenu';
import { FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const StudentHeader = () => {
    const menu = [
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