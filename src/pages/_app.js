import Head from 'next/head';
import { Montserrat, Poppins } from 'next/font/google';
import '../global.css'

const montserrat = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
});

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>FIT UPTC</title>
                <meta name="description" content="FIT UPTC" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${montserrat.className} ${poppins.className}`}>
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
