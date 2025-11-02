import { Router } from "express";
import {
  analyzeJobDescription,
  generateFromPrompt,
  generatePDF,
  start,
} from "../controller/resume.controller.js";

const router = Router();

router.get("/", start);
// Prompt-to-Resume Generator routes
router.post("/generate-from-prompt", generateFromPrompt);
router.post("/analyze-job", analyzeJobDescription);
router.post("/generate-pdf", generatePDF);

export default router;
