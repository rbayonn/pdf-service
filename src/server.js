import express from "express";
import pdfRoutes from "./routes/pdf.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/ping", (req, res) => {
  console.log("PING recibido");
  res.json({
    ok: true,
    body: req.body
  });
});

app.get("/", (req, res) => {
    res.send("PDF Service funcionando 🚀");
});

app.use("/", pdfRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});