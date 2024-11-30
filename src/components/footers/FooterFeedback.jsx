import { useState, useEffect } from "react";
import { useUser } from '@clerk/nextjs';
import useShowPopUp from '@/hooks/useShowPopUp'

import PopMessage from "@/components/PopMessage";
import StartsRating from "@/components/inputs/StartsRating"
import ModalFeedback from "../modals/ModalFeedbback";

import { getUserByUsername } from "@/db/user";
import { createFeedback, getLastFeedBackByUser } from "@/db/feedback";
import LoaderPoints from "@/components/loaders/LoaderPoints";

const FooterFeedback = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [userDb, setUserDb] = useState(null);
    const [feedbackDb, setFeedbackDb] = useState(null);

    const {
        status,
        text,
        duration,
        onClose: onClosePopUp,
        isShow,
        showPopUp
    } = useShowPopUp();
    const { user } = useUser();

    useEffect(() => {
        const fetchUser = async (username) => {
            setIsLoading(true);
            try {
                const user = await getUserByUsername(username);
                const feedback = await getLastFeedBackByUser(user.id_user);

                setFeedbackDb(feedback);
                setUserDb(user);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (user) {
            fetchUser(user.username);
        }
    }, [user])

    useEffect(() => {
        if (feedbackDb) {
            setRating(feedbackDb.rating);
        }
    }, [feedbackDb])

    const onClose = (e) => {
        e.stopPropagation();
        setIsOpen(false);
    }

    const onAccept = async (e, comment) => {
        e.stopPropagation();
        setIsOpen(false);

        try {
            const newFeedback = await createFeedback({ id_user: userDb.id_user, rating, comment });
            setFeedbackDb(newFeedback);
            showPopUp({ text: 'Gracias por tu calificación 🙂‍↕️', status: 'success' });
        } catch (error) {
            showPopUp({ text: error, status: 'error'});
        }
    }

    if (isLoading) return (
        <div className="p-4 flex flex-col justify-center items-center">
            <div>
                <LoaderPoints />
            </div>
        </div>
    );

    return (
        <div className="p-4 flex flex-col justify-center items-center" onClick={() => setIsOpen(true)}>
            <div className="w-[94%] bg-neutral-gray-medium py-2 px-4 rounded-md">
                <StartsRating
                    rating={rating}
                    setRating={setRating}
                />
                <p className="text-neutral-white text-sm my-1 text-center">
                    Califica tu experiencia
                </p>
            </div>


            <ModalFeedback
                isOpen={isOpen}
                onClose={onClose}
                onAccept={onAccept}
                setRating={setRating}
                rating={rating}
            />

            {
                isShow && (
                    <PopMessage
                        status={status}
                        text={text}
                        duration={duration}
                        onClose={onClosePopUp}
                    />
                )
            }
        </div>
    )
}

export default FooterFeedback;