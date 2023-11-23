import { getAllPosts } from "@libs/blog";
import { Trans, useTranslation } from 'react-i18next';

import Head from "next/head";
import Navbar from "@components/Navbar";

import styles from '@styles/Blog.module.scss';

function Post({ id, title, date }) {
    return (
        <a href={`/blog/${id}`}>
            <div className={styles.post}>
                <h2 className={styles.title}>{title}</h2>
                <h4 className={styles.date}>{date}</h4>
            </div>
        </a>
    );
};

export default function Blog({ posts }) {
    const { t } = useTranslation("blog");

    return (
        <div className={styles.container}>
            <Head>
                <title>Blog - Max T. Kristiansen</title>
            </Head>

            <Navbar />

            <div className={styles.content}>
                <div className={styles.description}>
                    <p>
                        <Trans
                            t={t}
                            i18nKey="description"
                            components={{
                                br: <br />,
                                bold: <b />
                            }}
                        />
                    </p>
                </div>

                <hr />

                <div className={styles.posts}>
                    {posts.map(v => <Post key={v.id} {...v} />)}
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    return {
        props: {
            posts: getAllPosts()
        }
    };
}