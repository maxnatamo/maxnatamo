import _ from '@libs/i18n';

import { config } from '@fortawesome/fontawesome-svg-core';

import '@styles/globals.scss';

function MyApp({ Component, pageProps }) {
    config.autoAddCss = false;

    return (
        <Component {...pageProps} />
    )
}

export default MyApp;