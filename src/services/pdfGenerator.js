import puppeteer from "puppeteer";

const isLinux = process.platform === "linux";

const BROWSER_ARGS = isLinux
    ? [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",      // usa /tmp en lugar de /dev/shm (64 MB en contenedores)
        "--disable-gpu",                // evita fallos de aceleración gráfica en Linux sin GPU
        "--no-first-run",
        "--no-default-browser-check",
    ]
    : [];

export async function generatePdf(html) {

    console.log("1 - Entrando a generatePdf");

    const executablePath =
        process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath();

    console.log("Chrome:", executablePath);
    console.log("Platform:", process.platform);

    const browser = await puppeteer.launch({
        executablePath,
        headless: true,
        args: BROWSER_ARGS,
    });

    console.log("2 - Browser iniciado");

    const page = await browser.newPage();

    console.log("3 - Nueva página");

    await page.setContent(html, {
        waitUntil: "load"
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