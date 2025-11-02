import cors from "cors";
import { config } from "dotenv";
import express from "express";
import resumeRouter from "./routes/resume.routes.js";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: [process.env.ALLOWED_SITE, "http://localhost:5173", "http://localhost:5174"],
    credentials: true
};

app.use(cors(corsOptions));

app.use("/api/resumes", resumeRouter);

export default app;
