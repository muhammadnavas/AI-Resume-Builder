import { config } from "dotenv";
import app from "./app.js";
config();

const startServer = () => {
  const PORT = process.env.PORT || 8000;
  
  app.listen(PORT, () => {
    console.log(`🚀 AI Resume Builder Server running on http://localhost:${PORT}`);
    console.log("✨ Prompt-to-Resume Generator ready!");
    console.log("📝 No authentication required - just generate resumes from prompts!");
  });
};

startServer();
