import Head from 'next/head';
import Navbar from '@components/Navbar/Navbar';
import IndexContainer from '@components/IndexContainer';

import styles from '@styles/Index.module.scss';

export default function Index() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Max T. Kristiansen</title>
            </Head>

            <Navbar />

            <IndexContainer />
        </div>
    )
}