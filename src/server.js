import express from "express";
import pdfRoutes from "./routes/pdf.js";

const app = express();

const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("PDF Service funcionando 🚀");
});

app.use("/", pdfRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});