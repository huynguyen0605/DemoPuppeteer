const puppeteer = require('puppeteer');

module.exports = {
    inputs: {

    },
    exits: require('../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        var browser = await puppeteer.launch({
            headless: true
        });
        var page = await browser.newPage();
        await page.goto('https://kenh14.vn');
        const articles = await page.evaluate(() => {
            let titleLinks = document.querySelectorAll('h4.klwfnswn-title > a'); 
            titleLinks = [...titleLinks];
            let articles = titleLinks.map(link => ({
                title: link.getAttribute('title'),
                url: link.getAttribute('href')
            }));
            return articles
        });
        console.log('huynvq::=====================>articles', articles);
        exits.success(articles);
    }
}