import puppeteer from 'puppeteer';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://maxtrier.dk/resume/', { waitUntil: 'networkidle2' });

    await page.pdf({
        path: 'CV.pdf',
        scale: 0.6,
        margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    await browser.close();
})();