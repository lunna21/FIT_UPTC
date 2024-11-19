import { useState } from "react";

import EmployeeHeader from "@/components/headers/EmployeeHeader";
import ConfigTurnsModal from "@/components/modals/ConfigTurnsModal";

// icons
import { IoSettingsSharp } from "react-icons/io5";

const Turns = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <EmployeeHeader />
            <ConfigTurnsModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="sticky flex justify-end items-center">
                <button 
                    className="flex items-center gap-2 text-white bg-neutral-gray-medium px-4 py-2 rounded-b-md transition-all duration-[255ms] hover:text-primary-medium"
                    onClick={() => setIsOpen(true)}    
                >
                    <IoSettingsSharp />
                    <span>Configurar turnos</span>
                </button>
            </div>
        </div>
    )
}

export default Turns;