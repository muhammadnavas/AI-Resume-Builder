import PDFGenerator from "../services/pdfGenerator.js";
import PromptProcessor from "../services/promptProcessor.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const start = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Welcome to AI Resume Builder API - Prompt to Resume Generator"));
};

const generateFromPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json(new ApiError(400, "Prompt is required."));
    }

    const promptProcessor = new PromptProcessor();
    const result = await promptProcessor.processPrompt(prompt);

    if (result.success) {
      return res
        .status(200)
        .json(new ApiResponse(200, result.data, result.message));
    } else {
      return res
        .status(400)
        .json(new ApiError(400, result.message));
    }
  } catch (error) {
    console.error("Error generating resume from prompt:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error", [error.message], error.stack)
      );
  }
};

const analyzeJobDescription = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res
        .status(400)
        .json(new ApiError(400, "Job description is required."));
    }

    const promptProcessor = new PromptProcessor();
    const analysis = await promptProcessor.analyzeJobDescription(jobDescription);

    return res
      .status(200)
      .json(new ApiResponse(200, analysis, "Job description analyzed successfully"));
  } catch (error) {
    console.error("Error analyzing job description:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error", [error.message], error.stack)
      );
  }
};

const generatePDF = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res
        .status(400)
        .json(new ApiError(400, "Resume data is required."));
    }

    const pdfGenerator = new PDFGenerator();
    const pdfBuffer = await pdfGenerator.generatePDF(resumeData);
    const fileName = pdfGenerator.generateFileName(resumeData);
    
    await pdfGenerator.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    return res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error", [error.message], error.stack)
      );
  }
};

export {
  analyzeJobDescription, generateFromPrompt, generatePDF, start
};

