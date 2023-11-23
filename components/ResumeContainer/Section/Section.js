import styles from './Section.module.scss';

export default function Section({ title, children }) {
    return (
        <div className={styles.section}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}