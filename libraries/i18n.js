import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 *  Translations
 */
import common_dk from '@translations/dk/common.json';
import common_en from '@translations/en/common.json';

import index_dk from '@translations/dk/index.json';
import index_en from '@translations/en/index.json';

import resume_dk from '@translations/dk/resume.json';
import resume_en from '@translations/en/resume.json';

import blog_dk from '@translations/dk/blog.json';
import blog_en from '@translations/en/blog.json';

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                common: common_en,
                index: index_en,
                resume: resume_en,
                blog: blog_en
            },
            dk: {
                common: common_dk,
                index: index_dk,
                resume: resume_dk,
                blog: blog_dk
            }
        },
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;