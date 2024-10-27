import { FaUserShield } from "react-icons/fa";


const InputAuth = ({ label = "", placeholder = "", required = false, type = "text", id = "", onChange = () => {}, IconAuth = FaUserShield}) => {
    return (
        <>
            {label && (
                <label htmlFor={id} className="block text-sm text-neutral-black font-normal">
                    {label}
                </label>
            )}
            <div className="flex items-center gap-2 p-4 bg-white rounded-lg h-1/2">
                <IconAuth className="text-neutral-gray-medium text-xl cursor-pointer" />
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    className="bg-transparent outline-none border-none w-full"
                />
            </div>
        </>
    );
};

export default InputAuth;