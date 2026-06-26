import puppeteer from "puppeteer";

const isLinux = process.platform === "linux";

const BROWSER_ARGS = isLinux
    ? [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--no-zygote",
    ]
    : [];

export async function generatePdf(html) {
    console.log("1 - Entrando a generatePdf");

    const executablePath =
        process.env.PUPPETEER_EXECUTABLE_PATH || await puppeteer.executablePath(); // ← fix principal

    console.log("Chrome:", executablePath);
    console.log("Platform:", process.platform);

    const browser = await puppeteer.launch({
        executablePath,
        headless: true,
        args: BROWSER_ARGS,
    });

    try {  // ← fix secundario: try/finally para cerrar siempre el browser
        console.log("2 - Browser iniciado");

        const page = await browser.newPage();
        console.log("3 - Nueva página");

        await page.setContent(html, { waitUntil: "load" });
        console.log("4 - HTML cargado");

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true
        });

        const pdfBuffer = Buffer.from(pdf);
        console.log("5 - PDF generado, tamaño:", pdfBuffer.length, "bytes");

        if (pdfBuffer.length === 0) {
            throw new Error("page.pdf() devolvió un buffer vacío.");
        }

        if (pdfBuffer.slice(0, 4).toString("ascii") !== "%PDF") {
            throw new Error(`Buffer no es un PDF válido. Header: ${pdfBuffer.slice(0, 10).toString("hex")}`);
        }

        return pdfBuffer;

    } finally {
        await browser.close(); // ← se ejecuta siempre, haya error o no
        console.log("6 - Browser cerrado");
    }
}