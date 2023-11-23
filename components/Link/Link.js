import NextLink from 'next/link';

import styles from './Link.module.scss';

export default function Link({ text, href }) {
    return (
        <NextLink href={href}>
            <a className={styles.link} href={href}>{text}</a>
        </NextLink>
    );
}