import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ls from 'localstorage-slim';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import Link from '@components/Link';

import styles from './Navbar.module.scss';

const LanguageSwitch = () => {
    const { i18n } = useTranslation("common");
    const [lang, setLang] = useState(i18n.language);

    useEffect(() => {
        const storedLang = ls.get('lang');

        if(storedLang !== null) {
            setLang(storedLang);
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    const changeLanguage = () => {
        const newLang = lang === 'en' ? 'dk' : 'en';

        setLang(newLang);
        ls.set('lang', newLang);
    };

    return (
        <button
            className={styles.switch}
            onClick={() => changeLanguage()}
        >
            <FontAwesomeIcon icon={faLanguage} />
            {lang === 'en' ? 'dk' : 'en'}
        </button>
    );
};

export default function Navbar() {
    const { t } = useTranslation("common");

    return (
        <div className={styles.navbar}>
            <Link text={t("navbar.homepage")} href="/" />
            <Link text={t("navbar.resume")} href="/resume" />
            <Link text={t("navbar.blog")} href="/blog" />

            <LanguageSwitch />
        </div>
    );
}