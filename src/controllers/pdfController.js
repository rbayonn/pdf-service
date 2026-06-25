import { renderTemplate } from "../utils/templateEngine.js";
import { generatePdf } from "../services/pdfGenerator.js";

export async function generatePdfController(req, res) {

    try {

        const { template, data } = req.body;

        const html = await renderTemplate(
            template,
            data
        );

        const pdfBytes = await generatePdf(html);

        const pdf = Buffer.from(pdfBytes);

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename="${template}.pdf"`
        );

        res.send(pdf);

        console.log("Constructor:", pdf.constructor.name);
        console.log("Es Buffer:", Buffer.isBuffer(pdf));
        console.log("Tamaño:", pdf.length);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }
}
