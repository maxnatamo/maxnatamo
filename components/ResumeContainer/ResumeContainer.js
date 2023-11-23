import { Trans, useTranslation } from 'react-i18next';

import Header from '@components/ResumeContainer/Header';
import Section from '@components/ResumeContainer/Section';
import Grid, { Column } from '@components/ResumeContainer/Section/Grid';
import List, { ListElement } from '@components/ResumeContainer/Section/List';

import styles from './ResumeContainer.module.scss';

export default function ResumeContainer({}) {
    const { t } = useTranslation("resume");

    return (
        <div className={styles.resume}>
            <Header />

            <Section title="Profile">
                <p>
                    <Trans
                        t={t}
                        i18nKey="profile"
                        components={{
                            br: <br />,
                            bold: <b />
                        }}
                    />
                </p>
            </Section>

            <Section title={t("skills.title")}>
                <Grid>
                    <Column title={t("skills.methods.title")}>
                        {t("skills.methods.content")}
                    </Column>

                    <Column title={t("skills.design.title")}>
                        {t("skills.design.content")}
                    </Column>

                    <Column title={t("skills.curiosity.title")}>
                        {t("skills.curiosity.content")}
                    </Column>
                </Grid>
            </Section>

            <Section title={t("knowledge.title")}>
                <Grid>
                    <Column title={t("knowledge.systems.title")}>
                        {t("knowledge.systems.content")} 
                    </Column>

                    <Column title={t("knowledge.programming.title")}>
                        {t("knowledge.programming.content")}  
                    </Column>

                    <Column title={t("knowledge.devops.title")}>
                        {t("knowledge.devops.content")}
                    </Column>
                </Grid>
            </Section>

            <Section title={t("jobs.title")}>
                <List>
                    <ListElement
                        title={t("jobs.diviso.company")}
                        subtitle={t("jobs.diviso.title")}
                        time={t("jobs.diviso.time")}
                    />

                    <ListElement
                        title={t("jobs.hella.company")}
                        subtitle={t("jobs.hella.title")}
                        time={t("jobs.hella.time")}
                    />

                    <ListElement
                        title={t("jobs.ly.company")}
                        subtitle={t("jobs.ly.title")}
                        time={t("jobs.ly.time")}
                    />

                    <ListElement
                        title={t("jobs.bilka.company")}
                        subtitle={t("jobs.bilka.title")}
                        time={t("jobs.bilka.time")}
                    />
                </List>
            </Section>

            <Section title={t("education.title")}>
                <List>
                    <ListElement
                        title={t("education.dania.school")}
                        subtitle={t("education.dania.title")}
                        time={t("education.dania.time")}
                    />

                    <ListElement
                        title={t("education.mercantec.school")}
                        subtitle={t("education.mercantec.title")}
                        time={t("education.mercantec.time")}
                    />

                    <ListElement
                        title={t("education.primary.school")}
                        subtitle={t("education.primary.title")}
                        time={t("education.primary.time")}
                    />
                </List>
            </Section>
        </div>
    );
}