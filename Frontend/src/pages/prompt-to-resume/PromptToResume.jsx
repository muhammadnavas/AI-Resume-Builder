import { Brain, CheckCircle, FileDown, Loader2, Sparkles, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { downloadResumePDF, generateResumeFromPrompt } from '../../Services/resumeAPI';
import ResumePreview from './components/ResumePreview';

function PromptToResume() {
  const [prompt, setPrompt] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerateResume = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate your resume');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await generateResumeFromPrompt(prompt);
      if (response.success) {
        console.log('Resume Data:', response.data);
        console.log('ATS Score:', response.data.atsScore);
        setResumeData(response.data);
        toast.success('Resume generated successfully!');
      } else {
        toast.error(response.message || 'Failed to generate resume');
      }
    } catch (error) {
      toast.error('Error generating resume. Please try again.');
      console.error('Resume generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!resumeData) {
      toast.error('No resume to download');
      return;
    }

    setIsDownloading(true);
    try {
      const pdfBlob = await downloadResumePDF(resumeData);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename
      const name = resumeData.personalInfo?.name || 'Resume';
      const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `${sanitizedName}_Resume_${timestamp}.pdf`;
      
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Error downloading PDF');
      console.error('PDF download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Resume Builder
              </h1>
              <p className="text-gray-600 mt-1">
                Your Prompt. Your Resume. Recruiter Ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-full mx-auto px-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  Tell us your story
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Describe your education, experience, skills, and achievements in natural language. 
                  Our AI will transform it into a professional, recruiter-ready resume.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Textarea
                    placeholder="Hi, my name is John Doe and I'm currently pursuing a B.Tech in Computer Science from XYZ University. I'm in my final year with a CGPA of 8.5. I'm passionate about software development and looking for a Software Engineering role...

✨ What to include:
• Personal details & education
• Technical skills & programming languages  
• Work experience & internships
• Projects you've built with technologies used
• Achievements, certifications & awards
• Target role or career objective"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[500px] resize-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm leading-relaxed"
                  />
                  {prompt.length > 0 && (
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
                      {prompt.length} characters
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleGenerateResume}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        AI is crafting your resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Professional Resume
                      </>
                    )}
                  </Button>

                  {resumeData && (
                    <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-2 px-4 rounded-lg border border-emerald-200">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Resume generated successfully!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Example Prompt */}
            <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
                  <div className="h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">💡</span>
                  </div>
                  Example Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-white/60 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "Hi, my name is Riya Sharma and I'm currently pursuing a B.Tech in Computer Science from Manipal Institute of Technology. I'm in my pre-final year with a CGPA of 8.7. I'm passionate about software development and looking for a Software Engineering Internship.
                    <br /><br />
                    I have experience with Python, Java, React.js, Node.js, and MySQL. I completed a summer internship at InnovateTech Solutions where I built REST APIs supporting 10,000+ daily users and optimized backend performance by 25%.
                    <br /><br />
                    I've built projects like SkillTrack (a React/Node.js learning tracker) and Smart Resume Parser (Python/NLP tool with 92% accuracy). I won 1st place at MIT Hackathon 2024 among 250+ participants and rank in top 5% of LeetCode contests."
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                    onClick={() => setPrompt("Hi, my name is Riya Sharma and I'm currently pursuing a B.Tech in Computer Science from Manipal Institute of Technology. I'm in my pre-final year with a CGPA of 8.7. I'm passionate about software development and looking for a Software Engineering Internship.\n\nI have experience with Python, Java, React.js, Node.js, and MySQL. I completed a summer internship at InnovateTech Solutions where I built REST APIs supporting 10,000+ daily users and optimized backend performance by 25%.\n\nI've built projects like SkillTrack (a React/Node.js learning tracker) and Smart Resume Parser (Python/NLP tool with 92% accuracy). I won 1st place at MIT Hackathon 2024 among 250+ participants and rank in top 5% of LeetCode contests.")}
                  >
                    Use Example
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {/* ATS Score and Download Section */}
            {resumeData && (
              <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">ATS Score</p>
                          <p className={`text-2xl font-bold ${
                            (resumeData.atsScore || 0) >= 80 ? 'text-emerald-600' : 
                            (resumeData.atsScore || 0) >= 60 ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {resumeData.atsScore !== undefined && resumeData.atsScore !== null ? resumeData.atsScore : 'N/A'}/100
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {(resumeData.atsScore || 0) >= 80 && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                            <CheckCircle className="h-3 w-3" />
                            Excellent
                          </span>
                        )}
                        {(resumeData.atsScore || 0) >= 60 && (resumeData.atsScore || 0) < 80 && (
                          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                            Good
                          </span>
                        )}
                        {(resumeData.atsScore || 0) < 60 && (
                          <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-full">
                            Needs Work
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <FileDown className="h-4 w-4 mr-2" />
                          Download PDF
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <FileDown className="h-4 w-4 text-white" />
                  </div>
                  Live Preview
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  See your resume come to life in real-time as our AI processes your information
                </p>
              </CardHeader>
              <CardContent>
                {resumeData ? (
                  <div className="relative">
                    <div className="absolute top-2 right-2 z-10">
                      <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                        ✨ Live
                      </div>
                    </div>
                    <ResumePreview data={resumeData} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="h-16 w-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-indigo-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium mb-1">
                          Ready to create something amazing?
                        </p>
                        <p className="text-gray-500 text-sm">
                          Enter your details and watch the magic happen
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Our AI Resume Builder?</h2>
            <p className="text-gray-600">Powered by advanced AI to give you the competitive edge</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart AI Processing</h3>
                <p className="text-sm text-gray-600">Multiple AI providers ensure reliable resume generation with intelligent fallback systems</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">ATS Optimized</h3>
                <p className="text-sm text-gray-600">Get past Applicant Tracking Systems with professionally formatted, keyword-rich resumes</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Generation</h3>
                <p className="text-sm text-gray-600">From prompt to professional resume in seconds. Download PDF immediately after generation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptToResume;