import { Globe, Mail, MapPin, Phone } from 'lucide-react';

function ResumePreview({ data }) {
  if (!data) return null;

  return (
    <div 
      id="resume-preview"
      className="bg-white p-8 rounded-lg shadow-sm border max-h-[600px] overflow-y-auto"
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: '1.4' }}
    >
      {/* Header Section */}
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : (data.personalInfo?.name || 'Your Name')}
        </h1>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600 flex-wrap">
          {(data.email || data.personalInfo?.email) && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {data.email || data.personalInfo?.email}
            </div>
          )}
          {(data.phone || data.personalInfo?.phone) && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {data.phone || data.personalInfo?.phone}
            </div>
          )}
          {(data.address || data.personalInfo?.location) && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {data.address || data.personalInfo?.location}
            </div>
          )}
          {data.personalInfo?.linkedin && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {data.personalInfo.linkedin}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">
            EDUCATION
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.major}</h3>
                  <p className="text-gray-700">{edu.universityName || edu.institution}</p>
                  {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.startDate} - {edu.endDate}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{skill.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full mr-1 ${
                        i < skill.rating ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">
            EXPERIENCE
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.title || exp.position}</h3>
                  <p className="text-gray-700">{exp.companyName || exp.company}</p>
                  {exp.city && exp.state && (
                    <p className="text-sm text-gray-600">{exp.city}, {exp.state}</p>
                  )}
                </div>
                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              </div>
              {exp.workSummary && (
                <div className="text-sm text-gray-700 mt-2">
                  {exp.workSummary.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-1">{line}</p>
                  ))}
                </div>
              )}
              {exp.responsibilities && (
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">
            PROJECTS
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{project.title || project.name}</h3>
                {(project.startDate && project.endDate) ? (
                  <p className="text-sm text-gray-600">{project.startDate} - {project.endDate}</p>
                ) : project.duration && (
                  <p className="text-sm text-gray-600">{project.duration}</p>
                )}
              </div>
              {project.technologies && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Technologies:</span> {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                </p>
              )}
              {project.description && (
                <div className="text-sm text-gray-700">
                  {Array.isArray(project.description) 
                    ? (
                        <ul className="list-disc list-inside space-y-1">
                          {project.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                      )
                    : <p>{project.description}</p>
                  }
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 mb-2">
            ACHIEVEMENTS
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {data.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ATS Score */}
      {data.atsScore && (
        <div className="mt-6 pt-4 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">ATS Score:</span>
            <span className={`font-bold ${
              data.atsScore >= 80 ? 'text-green-600' : 
              data.atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {data.atsScore}/100
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;