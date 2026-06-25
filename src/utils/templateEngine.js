import fs from "fs/promises";
import path from "path";

/**
 * Carga una plantilla HTML y reemplaza los placeholders {{campo}}
 */
export async function renderTemplate(templateName, data) {

    // Ruta del archivo HTML
    const templatePath = path.join(
        process.cwd(),
        "src",
        "templates",
        `${templateName}.html`
    );

    // Leer el HTML
    let html = await fs.readFile(templatePath, "utf8");

    // Reemplazar {{variable}}
    for (const [key, value] of Object.entries(data)) {

        const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");

        html = html.replace(regex, value ?? "");
    }

    return html;
}