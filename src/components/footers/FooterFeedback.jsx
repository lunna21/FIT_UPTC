import { useState } from "react";

import StartsRating from "@/components/inputs/StartsRating"
import ModalFeedback from "../modals/ModalFeedbback";

const FooterFeedback = () => {
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = (e) => {
        e.stopPropagation();
        setIsOpen(false);
    }

    const onAccept = (e) => {
        e.stopPropagation();
        setIsOpen(false);
    }

    return (
        <div className="p-4 flex flex-col justify-center" onClick={() => setIsOpen(true)}>
            <div className="w-[94%] bg-neutral-gray-medium py-2 rounded-md">
                <StartsRating
                    rating={rating}
                    setRating={setRating}
                />
                <p className="text-neutral-white text-sm my-1 text-center">
                    Nos importa tu opinión, por favor califica tu experiencia
                </p>
            </div>

            
            <ModalFeedback 
                isOpen={isOpen} 
                onClose={onClose} 
                onAccept={onAccept} 
                setRating={setRating} 
                rating={rating}
            />
        </div>
    )
}

export default FooterFeedback;