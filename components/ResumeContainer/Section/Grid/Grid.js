import styles from './Grid.module.scss';

export function Column({ title, children }) {
    return (
        <div className={styles.column}>
            <h6 className={styles.title}>{title}</h6>
            <p className={styles.text}>{children}</p>
        </div>
    );
}

export default function Grid({ children }) {
    return (
        <div className={styles.grid}>
            {children}
        </div>
    );
}