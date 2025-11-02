# AI Resume Builder - Prompt to Resume Generator

> **Your Prompt. Your Resume. Recruiter Ready.**

An AI-powered resume builder that converts a single text prompt into a professional, ATS-compliant, recruiter-ready resume. Features multiple AI providers (OpenAI, Gemini, Grok) for reliable processing and intelligent data extraction. Built for hackathons and quick deployment.

## 🎯 Problem Statement

Resumes are crucial for job applications, yet most fail to create a strong impact due to:
- Poor formatting and structure
- Weak, non-action-oriented descriptions
- Missing key skills and keywords
- Non-ATS compliant formatting
- Lack of quantifiable achievements

## ✨ Solution

This AI-powered tool takes a single descriptive prompt about a candidate's background and automatically generates a professional, one-page, ATS-friendly resume with:

- **Smart parsing** of education, skills, experience, and projects
- **Action-oriented language** with quantifiable impact
- **ATS-compliant formatting** 
- **Professional structure** in reverse chronological order
- **Real-time preview** before download
- **PDF export** functionality
- **ATS scoring system** to rate resume quality

## 🚀 Features

### Core Features
- ✅ **Multi-AI Provider Support**: OpenAI, Gemini, and Grok APIs with intelligent fallback
- ✅ **Prompt-to-Resume Generation**: Convert natural language descriptions into structured resumes
- ✅ **Advanced Name Extraction**: Smart parsing of names from various formats
- ✅ **Real-time Preview**: See your resume as you generate it
- ✅ **PDF Export**: Download professional PDF resumes
- ✅ **ATS Scoring**: Get feedback on resume quality (0-100 score)
- ✅ **Professional Templates**: Clean, recruiter-preferred formatting

### Bonus Features
- ✅ **Intelligent Data Extraction**: Advanced regex patterns and AI processing
- ✅ **No Authentication Required**: Simple, hackathon-ready deployment
- ✅ **Robust Error Handling**: Comprehensive logging and fallback systems
- ✅ **ATS Score Calculation**: Algorithmic scoring based on completeness and structure
- ✅ **Keyword Optimization**: AI-powered content enhancement
- ✅ **One-Click Download**: Instant PDF generation
- ✅ **Mobile Responsive**: Works on all devices

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - API calls

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **OpenAI GPT-3.5** - Primary AI processing
- **Google Gemini AI** - Backup AI provider
- **Grok AI** - Alternative AI provider
- **Puppeteer** - PDF generation

### AI & Processing
- **Multi-Provider AI Support** - OpenAI, Gemini, and Grok APIs
- **Intelligent Prompt Processing** - Advanced text extraction and formatting
- **Custom algorithms** - ATS scoring and optimization

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **AI API Keys** (at least one of the following):
  - **OpenAI API Key** ([Get it here](https://platform.openai.com/api-keys)) - Recommended
  - **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey)) - Backup
  - **Grok API Key** ([Get it here](https://console.groq.com/)) - Alternative

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/muhammadnavas/AI-Resume-Builder.git
cd AI-Resume-Builder
```

### 2. Setup Backend
```bash
cd Backend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env and add your AI API keys (OpenAI recommended, Gemini/Grok as alternatives)

# Start the backend server
npm run dev
```

### 3. Setup Frontend
```bash
cd ../Frontend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env if needed (default backend URL should work)

# Start the frontend
npm run dev
```

### 4. Open Your Browser
Navigate to `http://localhost:5173` and start generating resumes!

## 📖 How to Use

1. **Enter Your Prompt**: Describe your education, experience, skills, and projects in natural language
2. **Generate Resume**: Click "Generate Resume" to process your prompt with AI
3. **Review Preview**: Check the real-time preview of your generated resume
4. **Download PDF**: Click "Download PDF" to get your professional resume

### Example Prompt
```
Hi, my name is Riya Sharma and I'm currently pursuing a B.Tech in Computer Science 
from Manipal Institute of Technology. I'm in my pre-final year with a CGPA of 8.7. 
I'm passionate about software development and looking for a Software Engineering Internship.

I have experience with Python, Java, React.js, Node.js, and MySQL. I completed a summer 
internship at InnovateTech Solutions where I built REST APIs supporting 10,000+ daily users 
and optimized backend performance by 25%.

I've built projects like SkillTrack (a React/Node.js learning tracker) and Smart Resume 
Parser (Python/NLP tool with 92% accuracy). I won 1st place at MIT Hackathon 2024 among 
250+ participants and rank in top 5% of LeetCode contests.
```

## 🏗️ Project Structure

```
AI-Resume-Builder/
├── Frontend/
│   ├── src/
│   │   ├── components/ui/          # Reusable UI components
│   │   ├── pages/prompt-to-resume/ # Main application page
│   │   ├── Services/               # API integration
│   │   └── config/                 # Configuration
│   ├── package.json
│   └── .env.example
├── Backend/
│   ├── src/
│   │   ├── controller/             # API controllers
│   │   ├── services/               # AI processing & PDF generation
│   │   ├── routes/                 # API routes
│   │   └── utils/                  # Utilities
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🔧 API Endpoints

### Resume Generation
- `POST /api/resumes/generate-from-prompt`
  - Body: `{ "prompt": "your description here" }`
  - Response: Structured resume data with ATS score

### PDF Generation
- `POST /api/resumes/generate-pdf`
  - Body: `{ "resumeData": {...} }`
  - Response: PDF file download

### Job Analysis (Bonus)
- `POST /api/resumes/analyze-job`
  - Body: `{ "jobDescription": "job posting text" }`
  - Response: Extracted keywords and requirements

## 🧠 AI Processing Pipeline

1. **Multi-Provider Processing**: OpenAI (primary), Gemini & Grok (fallbacks) parse natural language input
2. **Intelligent Data Extraction**: Advanced regex and AI-powered structured data extraction (name, education, experience, skills, projects)
3. **Content Enhancement**: Action-verb optimization and quantification
4. **ATS Optimization**: Keyword optimization and formatting
5. **Quality Scoring**: Algorithmic ATS score calculation (0-100)
6. **PDF Generation**: Professional formatting and export with Puppeteer

## 🎯 ATS Scoring Algorithm

The system calculates ATS scores based on:

- **Personal Information** (20 points): Complete contact details
- **Professional Summary** (15 points): Compelling 2-3 line summary
- **Education** (15 points): Clear educational background
- **Skills** (20 points): Technical and soft skills coverage
- **Experience** (20 points): Detailed work experience with achievements
- **Projects** (10 points): Technical projects with impact

**Score Ranges:**
- 🟢 80-100: Excellent (ATS-optimized)
- 🟡 60-79: Good (Minor improvements needed)
- 🔴 0-59: Needs Work (Major improvements required)

## 🎨 Design Principles

- **ATS-First**: Optimized for Applicant Tracking Systems
- **Recruiter-Friendly**: Clean, scannable layout
- **Action-Oriented**: Strong action verbs and quantified results
- **Professional**: Industry-standard formatting
- **Concise**: One-page format for maximum impact

## 🚦 Environment Variables

### Backend (.env)
```bash
PORT=8000
ALLOWED_SITE=http://localhost:5173

# AI API Keys (add at least one, OpenAI recommended)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
GROK_API_KEY=your_grok_api_key_here
```

### Frontend (.env)
```bash
VITE_APP_URL=http://localhost:8000/
```

## 🚀 Deployment

### Quick Deployment Options

**Local Development:**
- Follow the Quick Start guide above
- Perfect for hackathons and local testing

**Production Deployment:**
- **Backend**: Deploy to Railway, Heroku, or Vercel
- **Frontend**: Deploy to Netlify, Vercel, or GitHub Pages
- **Environment**: Set production URLs and API keys
- **Database**: Not required (simplified architecture)

### Deployment Tips
- Set `ALLOWED_SITE` to your frontend URL
- Ensure all API keys are properly configured
- Test PDF generation on your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 🔧 Troubleshooting

### Common Issues

**Backend not starting?**
- Check if Node.js is installed: `node --version`
- Ensure you have at least one AI API key configured
- Verify port 8000 is not in use

**Frontend not connecting to backend?**
- Ensure backend is running on port 8000
- Check VITE_APP_URL in frontend/.env
- Verify CORS settings in backend

**AI not generating resumes?**
- Check your API keys are valid and have credits
- Try different AI providers (OpenAI → Gemini → Grok)
- Check backend console logs for detailed error messages

**PDF download not working?**
- Ensure Puppeteer dependencies are installed
- Check if backend has write permissions
- Try refreshing the page and generating again

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Check the [Issues](https://github.com/muhammadnavas/AI-Resume-Builder/issues) section
3. Create a new issue with detailed information
4. Star the repository if you find it helpful! ⭐

## 👥 Author

Built with ❤️ by [Muhammad Navas](https://github.com/muhammadnavas)

## 🙏 Acknowledgments

- **OpenAI** - For the powerful GPT API
- **Google** - For the Gemini AI API
- **Grok** - For the alternative AI processing capabilities
- **Open Source Community** - For the incredible tools and libraries

---

**Ready to create your perfect resume? Let's get started! 🚀**

> *"Most resumes don't fail because of skills - they fail because they're not structured the way recruiters or ATS read them."*