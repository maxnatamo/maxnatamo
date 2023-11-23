import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './Header.module.scss';

const Contact = ({ icon, text, link }) => {
    return (
        <a href={link}>
            <FontAwesomeIcon icon={icon} />
            {text}
        </a>
    );
};

export default function Header({}) {
    const { t } = useTranslation("resume");

    return (
        <div className={styles.header}>
            <div className={styles.name}>
                <h1 className={styles.title}>Max T. Kristiansen</h1>
                <h2 className={styles.subtitle}>{t("title")}</h2>
            </div>

            <div className={styles.contact}>
                <Contact
                    text="madstk1"
                    link="https://github.com/maxnatamo"
                    icon={faGithub}
                />

                <Contact
                    text="madstk1@pm.me"
                    link="mailto:madstk1@pm.me"
                    icon={faEnvelope}
                />

                <Contact
                    text="+45 60714502"
                    link="#"
                    icon={faPhone}
                />
            </div>
        </div>
    );
}