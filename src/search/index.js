const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://www.timeanddate.com/worldclock/south-africa/cape-town";
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    // await page.click('#search > div > div > input')
    await page.type('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input','time now in Cape Town');
    await page.click('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b')
    await page.waitForNavigation();
    const screenshotBuffer = await page.screenshot();
    await browser.close();

    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/png"
        }
    };
}; 