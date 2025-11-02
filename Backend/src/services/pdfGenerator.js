import fs from 'fs';
import puppeteer from 'puppeteer';

class PDFGenerator {
    constructor() {
        this.browser = null;
    }

    async initialize() {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }
    }

    // Helper function to check if date is valid (not placeholder)
    isValidDate(date) {
        if (!date) return false;
        if (date.includes('MM/YYYY')) return false;
        if (date === 'MM/YYYY') return false;
        if (date.toLowerCase().includes('present')) return true;
        if (date.toLowerCase().includes('current')) return true;
        return date.trim() !== '';
    }

    // Helper function to format date range
    formatDateRange(startDate, endDate) {
        const validStart = this.isValidDate(startDate);
        const validEnd = this.isValidDate(endDate);
        
        if (validStart && validEnd) {
            return `${startDate} - ${endDate}`;
        } else if (validStart && !validEnd) {
            return `${startDate} - Present`;
        } else if (!validStart && validEnd) {
            return endDate;
        }
        return '';
    }

    async generateResumeHTML(resumeData) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${resumeData.personalInfo?.name || 'Resume'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
            background: white;
            padding: 40px;
        }
        
        .resume-container {
            max-width: 8.5in;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
        }
        
        .name {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 8px;
            text-transform: uppercase;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            font-size: 13px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .section {
            margin-bottom: 16px;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #ccc;
            margin-bottom: 8px;
            padding-bottom: 2px;
        }
        
        .education-item, .experience-item, .project-item {
            margin-bottom: 12px;
        }
        
        .item-header {
            display: flex;
            justify-content: between;
            align-items: start;
            margin-bottom: 4px;
        }
        
        .item-title {
            font-weight: bold;
        }
        
        .item-subtitle {
            color: #666;
            font-size: 13px;
        }
        
        .item-date {
            font-size: 13px;
            color: #666;
            margin-left: auto;
        }
        
        .responsibilities {
            list-style: disc;
            margin-left: 18px;
            margin-top: 4px;
        }
        
        .responsibilities li {
            margin-bottom: 3px;
            font-size: 14px;
        }
        
        .skills-grid {
            display: grid;
            gap: 4px;
            font-size: 14px;
        }
        
        .skill-category {
            display: flex;
            gap: 8px;
        }
        
        .skill-label {
            font-weight: bold;
            min-width: 120px;
        }
        
        .achievements {
            list-style: disc;
            margin-left: 18px;
        }
        
        .achievements li {
            margin-bottom: 3px;
            font-size: 14px;
        }
        
        .summary {
            text-align: justify;
            line-height: 1.6;
            font-size: 14px;
        }
        
        .ats-score {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .score {
            font-weight: bold;
            font-size: 14px;
        }
        
        .score.high { color: #22c55e; }
        .score.medium { color: #eab308; }
        .score.low { color: #ef4444; }
        
        @media print {
            body { padding: 0; }
            .resume-container { margin: 0; }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- Header Section -->
        <div class="header">
            <h1 class="name">${resumeData.firstName && resumeData.lastName ? `${resumeData.firstName} ${resumeData.lastName}` : (resumeData.personalInfo?.name || 'Your Name')}</h1>
            <div class="contact-info">
                ${(resumeData.email || resumeData.personalInfo?.email) ? `<div class="contact-item">📧 ${resumeData.email || resumeData.personalInfo.email}</div>` : ''}
                ${(resumeData.phone || resumeData.personalInfo?.phone) ? `<div class="contact-item">📱 ${resumeData.phone || resumeData.personalInfo.phone}</div>` : ''}
                ${(resumeData.address || resumeData.personalInfo?.location) ? `<div class="contact-item">📍 ${resumeData.address || resumeData.personalInfo.location}</div>` : ''}
                ${resumeData.personalInfo?.linkedin ? `<div class="contact-item">🔗 ${resumeData.personalInfo.linkedin}</div>` : ''}
            </div>
        </div>

        ${resumeData.summary ? `
        <!-- Professional Summary -->
        <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <div class="summary">${resumeData.summary}</div>
        </div>
        ` : ''}

        ${resumeData.education && resumeData.education.length > 0 ? `
        <!-- Education -->
        <div class="section">
            <h2 class="section-title">Education</h2>
            ${resumeData.education.map(edu => `
                <div class="education-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${edu.degree}${edu.major ? ` in ${edu.major}` : ''}</div>
                            <div class="item-subtitle">${edu.universityName || edu.institution}</div>
                            ${edu.description ? `<div class="item-subtitle">${edu.description}</div>` : ''}
                        </div>
                        <div class="item-date">
                            ${this.formatDateRange(edu.startDate, edu.endDate) || (this.isValidDate(edu.duration) ? edu.duration : '')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.skills && resumeData.skills.length > 0 ? `
        <!-- Skills -->
        <div class="section">
            <h2 class="section-title">Technical Skills</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <span>${resumeData.skills.map(skill => skill.name).join(', ')}</span>
                </div>
            </div>
        </div>
        ` : (resumeData.skills ? `
        <!-- Skills (Old Format) -->
        <div class="section">
            <h2 class="section-title">Technical Skills</h2>
            <div class="skills-grid">
                ${resumeData.skills.technical ? `
                    <div class="skill-category">
                        <span class="skill-label">Technical:</span>
                        <span>${resumeData.skills.technical.join(', ')}</span>
                    </div>
                ` : ''}
                ${resumeData.skills.tools ? `
                    <div class="skill-category">
                        <span class="skill-label">Tools & Frameworks:</span>
                        <span>${resumeData.skills.tools.join(', ')}</span>
                    </div>
                ` : ''}
                ${resumeData.skills.other ? `
                    <div class="skill-category">
                        <span class="skill-label">Other:</span>
                        <span>${resumeData.skills.other.join(', ')}</span>
                    </div>
                ` : ''}
            </div>
        </div>
        ` : '')}

        ${resumeData.experience && resumeData.experience.length > 0 ? `
        <!-- Experience -->
        <div class="section">
            <h2 class="section-title">Experience</h2>
            ${resumeData.experience.map(exp => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${exp.title || exp.position}</div>
                            <div class="item-subtitle">${exp.companyName || exp.company}</div>
                            ${exp.city && exp.state ? `<div class="item-subtitle">${exp.city}, ${exp.state}</div>` : ''}
                        </div>
                        <div class="item-date">${this.formatDateRange(exp.startDate, exp.endDate) || (this.isValidDate(exp.duration) ? exp.duration : '')}</div>
                    </div>
                    ${exp.workSummary ? `
                        <ul class="responsibilities">
                            ${exp.workSummary.split('\n').map(line => line.trim() ? `<li>${line.replace(/^[•\-\*]\s*/, '')}</li>` : '').filter(Boolean).join('')}
                        </ul>
                    ` : ''}
                    ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                        <ul class="responsibilities">
                            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.projects && resumeData.projects.length > 0 ? `
        <!-- Projects -->
        <div class="section">
            <h2 class="section-title">Projects</h2>
            ${resumeData.projects.map(project => `
                <div class="project-item">
                    <div class="item-header">
                        <div class="item-title">${project.title || project.name}</div>
                        ${this.formatDateRange(project.startDate, project.endDate) ? `<div class="item-date">${this.formatDateRange(project.startDate, project.endDate)}</div>` : (this.isValidDate(project.duration) ? `<div class="item-date">${project.duration}</div>` : '')}
                    </div>
                    ${project.technologies ? `
                        <div class="item-subtitle">Technologies: ${Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}</div>
                    ` : ''}
                    ${project.description ? `
                        <ul class="responsibilities">
                            ${Array.isArray(project.description) 
                                ? project.description.map(desc => `<li>${desc}</li>`).join('')
                                : `<li>${project.description}</li>`
                            }
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.achievements && resumeData.achievements.length > 0 ? `
        <!-- Achievements -->
        <div class="section">
            <h2 class="section-title">Achievements</h2>
            <ul class="achievements">
                ${resumeData.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${resumeData.atsScore ? `
        <!-- ATS Score -->
        <div class="ats-score">
            <span>ATS Score:</span>
            <span class="score ${resumeData.atsScore >= 80 ? 'high' : resumeData.atsScore >= 60 ? 'medium' : 'low'}">
                ${resumeData.atsScore}/100
            </span>
        </div>
        ` : ''}
    </div>
</body>
</html>
        `;
    }

    async generatePDF(resumeData, outputPath = null) {
        try {
            await this.initialize();
            
            const html = await this.generateResumeHTML(resumeData);
            const page = await this.browser.newPage();
            
            await page.setContent(html, { waitUntil: 'networkidle0' });
            
            const pdfOptions = {
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '0.5in',
                    right: '0.5in',
                    bottom: '0.5in',
                    left: '0.5in'
                }
            };

            let pdfBuffer;
            if (outputPath) {
                await page.pdf({ ...pdfOptions, path: outputPath });
                pdfBuffer = fs.readFileSync(outputPath);
            } else {
                pdfBuffer = await page.pdf(pdfOptions);
            }
            
            await page.close();
            
            return pdfBuffer;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    // Generate filename based on resume data
    generateFileName(resumeData) {
        const name = resumeData.personalInfo?.name || 'Resume';
        const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
        const timestamp = new Date().toISOString().slice(0, 10);
        return `${sanitizedName}_Resume_${timestamp}.pdf`;
    }
}

export default PDFGenerator;