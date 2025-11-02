# AI Resume Builder - Prompt to Resume Generator

> **Your Prompt. Your Resume. Recruiter Ready.**

An AI-powered resume builder that converts a single text prompt into a professional, ATS-compliant, recruiter-ready resume. Built for the UnsaidTalks Hackathon.

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
- ✅ **Prompt-to-Resume Generation**: Convert natural language descriptions into structured resumes
- ✅ **Real-time Preview**: See your resume as you generate it
- ✅ **PDF Export**: Download professional PDF resumes
- ✅ **ATS Scoring**: Get feedback on resume quality (0-100 score)
- ✅ **Professional Templates**: Clean, recruiter-preferred formatting

### Bonus Features
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
- **MongoDB** - Database
- **Google Gemini AI** - Prompt processing
- **Puppeteer** - PDF generation

### AI & Processing
- **Google Gemini Pro** - Natural language processing
- **Custom algorithms** - ATS scoring and optimization

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/sahidrajaansari/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Setup Backend
```bash
cd Backend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env and add your Gemini API key and MongoDB URI

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
ai-resume-builder/
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
│   │   ├── services/               # AI processing services
│   │   ├── routes/                 # API routes
│   │   ├── models/                 # Database models
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

1. **Prompt Analysis**: Gemini AI parses natural language input
2. **Data Extraction**: Structured data extraction (education, experience, skills, projects)
3. **Content Enhancement**: Action-verb optimization and quantification
4. **ATS Optimization**: Keyword optimization and formatting
5. **Quality Scoring**: Algorithmic ATS score calculation (0-100)
6. **PDF Generation**: Professional formatting and export

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
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
ALLOWED_SITE=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend (.env)
```bash
VITE_APP_URL=http://localhost:8000/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ by the AI Resume Builder Team for the UnsaidTalks Hackathon.

## 🙏 Acknowledgments

- **Ms. Gifty Mehra** - Expert guidance on recruiter preferences and ATS optimization
- **UnsaidTalks** - For organizing this amazing hackathon
- **Google** - For the powerful Gemini AI API
- **Open Source Community** - For the incredible tools and libraries

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/sahidrajaansari/ai-resume-builder/issues) section
2. Create a new issue with detailed information
3. Join our community discussions

---

**Ready to create your perfect resume? Let's get started! 🚀**

> *"Most resumes don't fail because of skills - they fail because they're not structured the way recruiters or ATS read them."* - Gifty Mehra