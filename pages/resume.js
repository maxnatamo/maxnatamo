import Head from 'next/head';
import Navbar from '@components/Navbar';
import ResumeContainer from '@components/ResumeContainer';

import styles from '@styles/Resume.module.scss';

export default function Resume() {
    return (
        <div className={styles.container} style={{ marginTop: "3rem", marginBottom: "3rem" }}>
            <Head>
                <title>Resumé - Max T. Kristiansen</title>
            </Head>

            <Navbar />

            <ResumeContainer />
        </div>
    )
}
