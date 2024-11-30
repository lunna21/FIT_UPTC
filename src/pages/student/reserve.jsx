import StudentHeader from '@/components/headers/StudentHeader'
import TableTurnsDay from '@/components/tables/TableTurnsDay';

import { getToday } from '@/utils/utils';

import styled from 'styled-components';

const Reserve = () => {

    return (
        <ReserveContainerStyled>
            <StudentHeader />
            <main className='reserve-main'>
                <section className='reserve-main_section'>
                    <h1 className='ml-4 mt-4 text-2xl font-poppins font-bold text-neutral-gray-dark mb-4'>
                        Reserva tu turno
                    </h1>

                    <div className="reserve-main_container-table">
                        <TableTurnsDay
                            dateToSchedule={"2024-12-01"}
                        />
                    </div>
                </section>
            </main>
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