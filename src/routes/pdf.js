import express from "express";
import { generatePdfController, generatePdfFromHtml } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/generate-pdf", generatePdfController);
router.post("/generate-pdf-html", generatePdfFromHtml);

export default router;