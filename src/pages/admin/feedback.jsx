import { useState, useEffect } from 'react'

import AdminHeader from '@/components/headers/AdminHeader';
import CardComment from '@/components/cards/CardComment'

import { getFeedbacks } from '@/db/feedback'

const Feedback = () => {
    const [feedbacks, setFeedbaks] = useState(null);

    useEffect(() => {
        const getAllFeedbacks = async () => {
            try {
                const feedbacks = await getFeedbacks()
                setFeedbaks(feedbacks)
            } catch (error) {
                console.log(error)
            }
        }

        getAllFeedbacks()
    }, [])

    return (
        <div className="min-h-screen bg-neutral-gray-light">
            <AdminHeader />
            <div className="container mx-auto py-8">
                <h2 className="text-center text-2xl font-bold mb-4">Comentarios del Sistema</h2>
                {
                    feedbacks ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {feedbacks.map(feedback => (
                                <div key={feedback.id_feedback} className="bg-neutral-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardComment
                                        firstName={feedback.user_feedback_id_userTouser.person_user_id_personToperson.first_name_person}
                                        lastName={feedback.user_feedback_id_userTouser.person_user_id_personToperson.last_name_person}
                                        profileUrl={`/admin/users/${feedback.user_feedback_id_userTouser.id_user}`}
                                        comment={feedback.comment}
                                        rating={feedback.rating}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            No hay comentarios aún del sistema
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Feedback