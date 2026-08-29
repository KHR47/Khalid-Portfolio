'use client';

import { Reveal, StaggerGroup, StaggerItem } from './animations';

const educationData = [
  {
    period: '2022 — 2026',
    degree: 'B.Sc. in Computer Science and Engineering',
    institution: 'American International University - Bangladesh (AIUB)',
    location: 'Dhaka, Bangladesh',
    description:
      'Final-semester engineering student focusing on scalable backend architecture, distributed systems, RESTful API design, and modern full-stack web applications.',
    courses: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java, C++)',
      'Database Management Systems (SQL)',
      'Web Technologies (Next.js, Node.js, PHP)',
      'Software Engineering & Design Patterns',
      'Operating Systems & Networking',
      'Computer Graphics (OpenGL & GLUT)',
      'NLP & Transformer Models (BERT, RoBERTa)',
    ],
    milestones: [
      'Developed end-to-end full-stack platforms using Next.js, NestJS, and PostgreSQL.',
      'Engineered machine learning systems with transformer models for text classification and detection.',
      'Active developer across web, desktop, database, and system-level applications.',
    ],
  },
  {
    period: '2020',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Rajshahi New Govt. Degree College',
    location: 'Rajshahi, Bangladesh',
    description:
      'Completed higher secondary education in Science with advanced focus on Mathematics, Physics, Chemistry, and Information Technology.',
    courses: ['Mathematics', 'Physics', 'Chemistry', 'Information & Communication Technology'],
    milestones: ['Strong academic excellence and foundation in logical reasoning and problem-solving.'],
  },
  {
    period: '2018',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Rajshahi Collegiate School',
    location: 'Rajshahi, Bangladesh',
    description:
      'Secondary education in Science at one of the country’s premier historic institutions, building strong analytical and analytical fundamentals.',
    courses: ['General Science', 'Higher Mathematics', 'Computer Studies'],
    milestones: ['Graduated with highest academic standing and active participation in school co-curricular activities.'],
  },
];

export function EducationTimeline() {
  return (
    <div className="education-timeline">
      {educationData.map((item, index) => (
        <Reveal key={index} delay={index * 0.08}>
          <div className="education-card">
            <div className="education-card-header">
              <div>
                <span className="education-period">{item.period}</span>
                <h3 className="education-degree">{item.degree}</h3>
                <p className="education-institution">
                  <strong>{item.institution}</strong> • <span className="education-location">{item.location}</span>
                </p>
              </div>
            </div>

            <p className="education-description">{item.description}</p>

            {item.courses && item.courses.length > 0 && (
              <div className="education-highlights-block">
                <h4>Key Coursework & Competencies</h4>
                <StaggerGroup className="tag-list concise" delay={0.04} stagger={0.03}>
                  {item.courses.map((course) => (
                    <StaggerItem key={course} className="pill subtle">
                      {course}
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            )}

            {item.milestones && item.milestones.length > 0 && (
              <div className="education-milestones-block">
                <h4>Highlights & Key Focus</h4>
                <ul className="timeline-bullets">
                  {item.milestones.map((milestone, mIdx) => (
                    <li key={mIdx}>{milestone}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
