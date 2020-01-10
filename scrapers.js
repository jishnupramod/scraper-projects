const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imageURL = await src.jsonValue();

    const [el2] = await page.$x('/html/body/div[2]/div[1]/div[6]/div[5]/div[3]/div[1]/div/h1/span');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/div[1]/div[6]/div[5]/div[3]/div[10]/div/div/table/tbody/tr[2]/td[2]/span[1]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imageURL, title, price});

    browser.close();
}

scrapeProduct('https://www.amazon.in/Funskool-Chess-Classic/dp/B0089INY1M/ref=sr_1_5?crid=THD26PEU95A8&keywords=chess+board+set&qid=1578659436&sprefix=chess%2Caps%2C342&sr=8-5');
