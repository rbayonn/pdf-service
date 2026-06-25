import puppeteer from "puppeteer";

export async function generatePdf(html) {

    console.log("1 - Entrando a generatePdf");

    const browser = await puppeteer.launch({
        headless: true
    });

    console.log("2 - Browser iniciado");

    const page = await browser.newPage();

    console.log("3 - Nueva página");

    await page.setContent(html, {
        waitUntil: "networkidle0"
    });

    console.log("4 - HTML cargado");

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true
    });

    console.log("5 - PDF generado");

    await browser.close();

    console.log("6 - Browser cerrado");

    return pdf;
}