// _app.jsx
import Head from 'next/head';
import { Montserrat, Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { esMX } from '@clerk/localizations'

import Layout from '@/components/Layout';
import '../global.css';

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
            <ClerkProvider localization={esMX}>
                <main className={`${montserrat.className} ${poppins.className}`}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </main>
            </ClerkProvider>
        </>
    );
}

export default MyApp;
