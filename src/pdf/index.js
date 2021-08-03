const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://www.timeanddate.com/worldclock/south-africa/cape-town";
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    context.res = {
        body: pdfBuffer,
        headers: {
            "content-type": "application/pdf"
        }
    };
}; 