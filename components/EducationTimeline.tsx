'use client';

import { Reveal, StaggerGroup, StaggerItem } from './animations';

const educationData = [
  {
    period: '2022 — Present',
    degree: 'B.Sc. in Computer Science and Engineering',
    institution: 'American International University-Bangladesh (AIUB)',
    location: 'Dhaka, Bangladesh',
    description:
      'Pursuing an engineering degree with a strong emphasis on core computing fundamentals, scalable software design, distributed systems, and modern web application development.',
    courses: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java/C++)',
      'Database Management Systems',
      'Web Technologies (Full-Stack)',
      'Software Engineering & Design Patterns',
      'Operating Systems & Networking',
      'Computer Graphics (OpenGL)',
      'Machine Learning & Data Analysis',
    ],
    milestones: [
      'Built multi-tier full-stack applications integrating NestJS, Next.js, and PostgreSQL.',
      'Active participant in academic programming projects, system modeling, and algorithmic problem-solving.',
    ],
  },
];

export function EducationTimeline() {
  return (
    <div className="education-timeline">
      {educationData.map((item, index) => (
        <Reveal key={index} delay={0.06}>
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

            <div className="education-milestones-block">
              <h4>Academic & Practical Highlights</h4>
              <ul className="timeline-bullets">
                {item.milestones.map((milestone, mIdx) => (
                  <li key={mIdx}>{milestone}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
