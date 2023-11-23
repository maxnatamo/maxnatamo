import { Trans, useTranslation } from 'react-i18next';

import styles from './Intro.module.scss';

export default function Intro() {
    const { t } = useTranslation("index");

    return (
        <div className={styles.intro}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    <Trans
                        t={t}
                        i18nKey="intro.title"
                        components={{
                            br: <br />,
                            bold: <b />
                        }}
                    />
                </h1>

                <p className={styles.description}>
                    <Trans
                        t={t}
                        i18nKey="intro.description"
                        components={{
                            br: <br />,
                            bold: <b />
                        }}
                    />
                </p>
            </div>
        </div>
    );
}