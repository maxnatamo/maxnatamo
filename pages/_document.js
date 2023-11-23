import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.ico" />

                <meta name="description" content="Jack of all trades, lawful-good developer" />
                <meta name="keyword" content="portfolio, backend, dev, developer, student" />

                <meta property="og:title" content="Max T. Kristiansen | Backend Developer"/>
                <meta property="og:description" content="Jack of all trades, lawful good developer" />
                <meta property="og:image" content="/favicon.ico"/>
                <meta property="og:url" content="https://maxtrier.dk" />
                <meta property="og:type" content="website" />

                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&display=swap" rel="stylesheet" />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}