import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const isLinux = process.platform === "linux";

export async function generatePdf(html) {
    console.log("1 - Entrando a generatePdf");

    const executablePath = isLinux
        ? await chromium.executablePath()
        : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"; // tu chrome local

    console.log("Chrome:", executablePath);
    console.log("Platform:", process.platform);

    const browser = await puppeteer.launch({
        executablePath,
        headless: chromium.headless,
        args: isLinux ? chromium.args : [],
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "load" });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true
        });

        const pdfBuffer = Buffer.from(pdf);

        if (pdfBuffer.length === 0) {
            throw new Error("page.pdf() devolvió un buffer vacío.");
        }

        if (pdfBuffer.slice(0, 4).toString("ascii") !== "%PDF") {
            throw new Error(`Buffer no es un PDF válido. Header: ${pdfBuffer.slice(0, 10).toString("hex")}`);
        }

        return pdfBuffer;

    } finally {
        await browser.close();
        console.log("Browser cerrado");
    }
}