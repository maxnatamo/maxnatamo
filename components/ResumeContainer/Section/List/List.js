import styles from './List.module.scss';

export function ListElement({ title, subtitle, time }) {
    return (
        <div className={styles.element}>
            <div className={styles.text}>
                <h5>{title}</h5>
                <h6>{subtitle}</h6>
            </div>

            <div className={styles.time}>
                <h6>{time}</h6>
            </div>
        </div>
    );
}

export default function List({ children }) {
    return (
        <div className={styles.list}>
            {children}
        </div>
    );
}