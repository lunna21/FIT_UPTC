import { RiCloseCircleFill } from 'react-icons/ri'

const ButtonClose = ({ onClick }) => {
    return (
        <button
            className="text-gray-500 hover:text-accent-red z-50 transition ease-in-out duration-200"
            onClick={onClick}
            aria-label="Close"
        >
            <RiCloseCircleFill size={40} />
        </button>
    )
}

export default ButtonClose;