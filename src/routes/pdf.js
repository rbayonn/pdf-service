import express from "express";
import { generatePdfController } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/generate-pdf", generatePdfController);

export default router;