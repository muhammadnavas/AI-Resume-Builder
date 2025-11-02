import { FileDown, Loader2, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              AI Resume Builder
            </h1>
          </div>
          <p className="text-gray-600 mt-1">
            Your Prompt. Your Resume. Recruiter Ready.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  Tell us about yourself
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Describe your education, experience, skills, projects, and achievements in natural language. Our AI will create a professional resume from your description.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Hi, my name is John Doe and I'm currently pursuing a B.Tech in Computer Science from XYZ University. I'm in my final year with a CGPA of 8.5. I'm passionate about software development and looking for a Software Engineering role...

Describe your:
- Education details
- Technical skills
- Work experience/internships
- Projects you've built
- Achievements and certifications
- Target role you're applying for"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
                
                <Button
                  onClick={handleGenerateResume}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Resume
                    </>
                  )}
                </Button>

                {resumeData && (
                  <Button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    variant="outline"
                    className="w-full"
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
                )}
              </CardContent>
            </Card>

            {/* Example Prompt */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800 text-sm">
                  💡 Example Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700 leading-relaxed">
                  "Hi, my name is Riya Sharma and I'm currently pursuing a B.Tech in Computer Science from Manipal Institute of Technology. I'm in my pre-final year with a CGPA of 8.7. I'm passionate about software development and looking for a Software Engineering Internship...
                  
                  I have experience with Python, Java, React.js, Node.js, and have built projects like SkillTrack and Smart Resume Parser. I won 1st place at MIT Hackathon 2024 and rank in top 5% of LeetCode contests..."
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <p className="text-sm text-gray-600">
                  Real-time preview of your generated resume
                </p>
              </CardHeader>
              <CardContent>
                {resumeData ? (
                  <ResumePreview data={resumeData} />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Enter your prompt and generate a resume to see the preview
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptToResume;