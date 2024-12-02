import StudentHeader from '@/components/headers/StudentHeader'
import Footer from '@/components/footers/Footer';

const Dashboard = () => {

    const videos = [
        { id: 'Bx8R3iP9y8g', title: 'Sentadilla con Barra Libre' },
        { id: 'KeFmDaZPCqw', title: 'Bíceps y Tríceps' },
        { id: 'H5nfqLmYe94', title: 'Bíceps y Tríceps con polea' },
        { id: 'VDJqLbSxEK0', title: 'Carrera Atletica 5K y 21K' },
        { id: '5jJ3CxVTAas', title: 'Gluteos en polea baja' },
        { id: 'dWV4uWd2GvM', title: 'Press Banca' },
        { id: 'jWnGhz1f5D4', title: 'Press de pecho con mancuernas' },
        { id: '3uiWjik2yEQ', title: 'Hacer remo con barra' },
        { id: 'Pkr1WW3p05A', title: 'Remo con mancuerda a una mano' },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-neutral-gray-light">
            <StudentHeader />
            <main className='flex-grow p-4'>
                <h1 className="text-3xl font-poppins font-bold text-neutral-gray-dark my-6">
                    Galeria de videos
                </h1>

                <section className='w-4/5 m-auto'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div key={video.id} className="flex flex-col gap-2 justify-center items-center p-2 bg-white rounded-lg shadow-md transform transition-transform hover:scale-105">
                                <iframe
                                    width="90%"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded grayscale hover:grayscale-0"
                                ></iframe>
                                <p className="text-center mt-2 text-sm font-medium">{video.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <footer className="mt-4">
                <Footer />
            </footer>
        </div>
    );
}

export default Dashboard;