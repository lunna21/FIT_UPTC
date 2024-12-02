import Link from 'next/link'

import { CgProfile } from "react-icons/cg";

import { toCapitalize } from "@/utils/utils"

const CardComment = ({ firstName, lastName, profileUrl, comment, rating = 0 }) => {
    console.log(profileUrl)
    return (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden max-w-lg'>
            <div className="flex w-full border-b border-neutral-gray-medium p-4">
                <Link href={profileUrl} className='flex gap-2 items-center font-semibold'>
                    <CgProfile className='text-2xl' />
                    <p>{toCapitalize(firstName + " " + lastName)}</p>
                </Link>
                <div className='ml-auto flex items-center'>
                    <p className='mr-2'>Puntuación:</p> 
                    <span className='font-bold text-yellow-500'>{rating}</span>
                </div>
            </div>
            {
                comment && (
                    <div className='p-6'>
                        <p className='text-gray-700'>
                            { comment }
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default CardComment;