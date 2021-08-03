const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices['iPhone 6'];

module.exports = async function (context, req) {
    const url = req.query.url || "https://www.timeanddate.com/worldclock/south-africa/cape-town";
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.emulate(iPhone)
    await page.goto(url)
    const screenshotBuffer = await page.screenshot({ fullPage: true })
    await browser.close();

    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/png"
        }
    };
}; 