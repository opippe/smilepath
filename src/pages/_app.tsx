import '../app/styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../app/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
