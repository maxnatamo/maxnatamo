import { getAllPosts, getPost } from "@libs/blog";

import Head from "next/head";
import Navbar from "@components/Navbar";

import styles from '@styles/Blog.module.scss';

export default function Post({ header, content }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{header.title} - Max T. Kristiansen</title>
            </Head>

            <Navbar />

            <div className={styles.content}>
                <div className={styles.post}>
                    <h1 className={styles.title}>
                        {header.title}
                    </h1>
                    <h6 className={styles.date}>
                        {header.date}
                    </h6>

                    <div className={styles.body} dangerouslySetInnerHTML={{ __html: content }}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const posts = getAllPosts();

    const paths = posts.map(v => ({
        params: { id: v.id }
    }));

    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps(ctx) {
    const { id } = ctx.params;
    const post = getPost(id);

    return {
        props: {
            id: id,
            header: post.header,
            content: post.content
        }
    };
}