import { useState, useEffect } from 'react'

import StudentHeader from '@/components/headers/StudentHeader'
import TableTurnsDay from '@/components/tables/TableTurnsDay';
import FooterMobile from '@/components/footers/Footer';

import { getReservationDate } from '@/db/reservationDate';

import styled from 'styled-components';

const Reserve = () => {
    const [reservationDate, setReservationDate] = useState(null);

    useEffect(() => {
        async function fetchReservationDate() {
            try {
                const data = await getReservationDate();
                setReservationDate(data.reservation_date.split('T')[0]);
            } catch (error) {
                console.error('Failed to fetch reservation date:', error);
            }
        }

        if(reservationDate) {
            fetchReservationDate();
        }
    }, []);

    return (
        <ReserveContainerStyled className="min-h-screen flex flex-col">
            <StudentHeader />
            <main className='reserve-main flex-grow'>
                <section className='reserve-main_section'>
                    <h1 className='ml-4 mt-4 text-2xl font-poppins font-bold text-neutral-gray-dark mb-4'>
                        Reserva tu turno
                    </h1>

                    {
                        reservationDate ? (
                            <div className="reserve-main_container-table">
                                <TableTurnsDay
                                    dateToSchedule={reservationDate || ''}
                                />
                            </div>
                        ) : (
                            <div className='flex justify-center items-center'>
                                <p className='text-lg font-poppins font-bold text-neutral-gray-dark'>
                                    No hay fecha de reserva disponible
                                </p>
                            </div>
                        )
                    }
                </section>
            </main>

            <footer className='mt-auto'>
                <FooterMobile />
            </footer>
        </ReserveContainerStyled>
    )
}

export default Reserve;

const ReserveContainerStyled = styled.div`
    background-color: hsl(0, 0%, 91%);

    @media (min-width: 768px) {
        .reserve-main {
            width: 100%;
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }

        .reserve-main_section {
            width: 92%;
            padding: 12px 32px;
            background-color: #f1f1f1;
            border-radius: 12px;
        }

        .reserve-main_container-table {
            margin: 0 32px;
        }
    }
`