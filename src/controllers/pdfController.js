import { renderTemplate } from "../utils/templateEngine.js";
import { generatePdf } from "../services/pdfGenerator.js";

export async function generatePdfController(req, res) {

    try {

        const { template, data } = req.body;

        console.log("Data recibida de n8n:", JSON.stringify(data, null, 2));

        const html = await renderTemplate(template, data);

        const pdf = await generatePdf(html);

        console.log("PDF listo para enviar — tamaño:", pdf.length, "bytes");

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${template}.pdf"`);

        res.send(pdf);

    } catch (error) {

        console.error("Error generando PDF:", error.message);

        res.status(500).json({ error: error.message });

    }

export async function generatePdfFromHtml(req, res) {
    try {
        const { html } = req.body;
        const pdf = await generatePdf(html);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="documento.pdf"`);
        res.send(pdf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}
