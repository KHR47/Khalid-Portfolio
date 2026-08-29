'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import {
  MagneticButton,
  Reveal,
  StaggerGroup,
  StaggerItem,
  Starfield,
  useScrollProgress,
} from './animations';
import { ProjectModal, type ProjectData } from './ProjectModal';
import { EducationTimeline } from './EducationTimeline';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const techPills = ['Next.js', 'NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Python', 'Docker', 'FastAPI'];

const skillGroups = [
  { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
  { label: 'Backend', items: ['NestJS', 'Node.js', 'ASP.NET Core', 'FastAPI', 'PHP', 'Express'] },
  { label: 'Database', items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'JDBC'] },
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'C#', 'SQL'] },
  { label: 'Tools & DevOps', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Docker', 'Vercel'] },
];

const projects: ProjectData[] = [
  {
    title: 'SmartCity_Ecosystem',
    category: 'Full-Stack',
    description:
      'A smart-city platform connecting public services, operational data, and user workflows into a unified dashboard for efficient urban management.',
    longDescription:
      'A modern smart-city governance platform architected to aggregate public service workflows, operational metrics, and citizen service requests into a unified reactive dashboard. Features real-time state synchronization, modular API endpoints, and clean role-based management.',
    highlights: [
      'Full-stack architecture leveraging Next.js App Router on the client and NestJS microservices on the backend.',
      'Optimized relational data schemas in PostgreSQL with indexes for high-frequency queries.',
      'Role-based access control (RBAC) with JWT auth and end-to-end TypeScript type contracts.',
    ],
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
    link: 'https://github.com/KHR47/SmartCity_Ecosystem',
    linkLabel: 'GitHub',
  },
  {
    title: 'FinTrack',
    category: 'Full-Stack',
    description:
      'Personal finance tracker designed to monitor income, expenses, and monthly budgets through a clean, intuitive web dashboard.',
    longDescription:
      'Personal finance management application enabling users to log multi-category transactions, set customizable monthly budget limits, and inspect monthly cash-flow trends through dynamic summary charts.',
    highlights: [
      'Interactive visual dashboard breaking down discretionary spending vs. essential utility expenses.',
      'Secure session-based authentication and sanitized SQL operations.',
      'Responsive design with fast server-side query processing.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    link: 'https://github.com/KHR47/FinTrack',
    linkLabel: 'GitHub',
  },
  {
    title: 'AirSense',
    category: 'Full-Stack',
    description:
      'Air-quality monitoring web app for visualizing AQI data, locations, and environmental patterns across multiple cities.',
    longDescription:
      'Environmental monitoring platform designed to visualize regional Air Quality Index (AQI) parameters in real time. Provides advisory alerts, particulate matter metrics, and cross-city comparisons.',
    highlights: [
      'Dynamic AQI visual scales alerting users to hazardous environmental levels.',
      'Multi-city search filters and structured relational tables for historical recording.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    link: 'https://github.com/KHR47/AirSense',
    linkLabel: 'GitHub',
  },
  {
    title: 'ShopCore',
    category: 'Backend / API',
    description:
      'RESTful backend API for e-commerce operations with secure product management and order-processing endpoints.',
    longDescription:
      'Enterprise-oriented backend API created with ASP.NET Core Web API. Implements structured controllers, DTO validation, and transaction pipelines for e-commerce stores.',
    highlights: [
      'Clean Repository and Unit of Work patterns for decoupled data persistence.',
      'Comprehensive validation and structured HTTP error responses.',
      'Fully documented endpoints and Postman integration test suites.',
    ],
    tags: ['ASP.NET Core', 'C#', 'Web API', 'Postman', 'SQL Server'],
  },
  {
    title: 'PyCart',
    category: 'Backend / API',
    description:
      'Python-based shopping workflow powered by FastAPI for product inventory and high-concurrency order operations.',
    longDescription:
      'Asynchronous REST API engine designed with FastAPI and Pydantic for high-throughput product catalog retrieval, shopping cart persistence, and order dispatching.',
    highlights: [
      'Asynchronous request handling with non-blocking I/O.',
      'Automated interactive OpenAPI / Swagger documentation out of the box.',
      'Strict schema validation using Pydantic models.',
    ],
    tags: ['Python', 'FastAPI', 'Pydantic', 'Uvicorn'],
    link: 'https://github.com/KHR47/PyCart',
    linkLabel: 'GitHub',
  },
  {
    title: 'The Markentile',
    category: 'Desktop & Simulation',
    description:
      'Desktop e-commerce application for groceries, food, and skincare products with a Java Swing interface and structured workflow.',
    longDescription:
      'Rich desktop application engineered with Java Swing featuring multi-category retail inventory, shopping cart state management, checkout billing calculations, and local data persistence.',
    highlights: [
      'Strict Object-Oriented Design (OOP) architecture separating UI views from business domain logic.',
      'Custom Swing component styling, layout managers, and robust input validation.',
    ],
    tags: ['Java', 'Swing GUI', 'OOP', 'Desktop App'],
  },
  {
    title: 'TourEase',
    category: 'Desktop & Simulation',
    description:
      'Tourism management database project covering customer management, bookings, hotel operations, and payment tracking.',
    longDescription:
      'Comprehensive database-driven application built to manage travel agency operations including tour packages, hotel reservations, client profiles, and payment histories.',
    highlights: [
      'Normalized relational database structure (3NF) ensuring relational consistency.',
      'JDBC implementation for executing parameterized queries and transactional updates.',
    ],
    tags: ['MySQL', 'SQL', 'JDBC', 'Java'],
  },
  {
    title: 'NikunjaScape',
    category: 'Desktop & Simulation',
    description:
      'Computer graphics simulation of Nikunja 1 & 2 featuring roads, buildings, vehicles, and animated environment changes.',
    longDescription:
      'Interactive 3D graphical urban simulation recreating the roads, architectures, and traffic flows of Nikunja 1 & 2 using low-level graphics rendering primitives.',
    highlights: [
      'Implemented custom lighting models, camera projection transforms, and animation loops.',
      'Built in C++ utilizing OpenGL and GLUT graphical libraries.',
    ],
    tags: ['C++', 'OpenGL', 'GLUT', 'Computer Graphics'],
  },
];

const categories = ['All', 'Full-Stack', 'Backend / API', 'Desktop & Simulation'] as const;
type CategoryType = (typeof categories)[number];

const inquiryPresets = [
  { label: '💼 Full-Stack Role', text: 'Hi Khalid, I came across your portfolio and would like to discuss a Full-Stack Developer opportunity with our team.' },
  { label: '🚀 Internship Opportunity', text: 'Hi Khalid, we have an opening for a Software Engineering / Web Development Intern that aligns with your profile.' },
  { label: '🤝 Project Collaboration', text: 'Hi Khalid, I have an interesting software project and would love to collaborate with you.' },
  { label: '☕ Quick Networking', text: 'Hi Khalid, I saw your projects and would love to connect and chat about tech.' },
];

const socials = [
  {
    label: 'Email',
    href: 'mailto:hasankhalid16648@gmail.com',
    value: 'hasankhalid16648@gmail.com',
    icon: '✉',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/khr47',
    value: 'linkedin.com/in/khr47',
    icon: 'in',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/KHR47',
    value: 'github.com/KHR47',
    icon: 'GH',
  },
];

const profileImage = '/profile-khalid.jpg';

const initialFormState = {
  name: '',
  email: '',
  message: '',
};

export function PortfolioPage() {
  const { progress } = useScrollProgress();
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dhakaTime, setDhakaTime] = useState('');
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  // Live Dhaka Time Clock
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setDhakaTime(formatter.format(new Date()));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Scrollspy Active Section Tracker
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hasankhalid16648@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Fallback
      setCopiedEmail(false);
    }
  };

  const handleApplyPreset = (presetText: string) => {
    setFormData((prev) => ({
      ...prev,
      message: presetText,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to send your message right now.');
      }

      setFormData(initialFormState);
      setStatus({
        type: 'success',
        message: 'Your message was sent successfully! I will respond as soon as possible.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Something went wrong while sending your message.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="page-shell">
      {/* Background Starfield Canvas */}
      <Starfield />

      {/* Reading Progress Indicator */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleX: progress,
          transformOrigin: 'left',
        }}
      />

      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark" aria-label="Khalid Hasan initial mark">
            KH
          </div>
          <div>
            <p className="brand-name">Khalid Hasan</p>
          </div>
        </div>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={isActive ? 'active' : ''}
                onClick={() => {
                  setActiveSection(sectionId);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="topbar-actions">
          <button
            type="button"
            className="copy-email-btn"
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            <span>{copiedEmail ? '✓ Copied!' : 'Copy Email'}</span>
          </button>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="home">
        {/* HERO SECTION */}
        <section className="hero section">
          <div className="hero-copy">
            <div className="hero-status-row">
              <p className="eyebrow">Available for internship / developer roles</p>
              {dhakaTime && (
                <div className="live-clock-badge" title="Local Time in Dhaka, Bangladesh">
                  <span className="live-dot" />
                  <span>{dhakaTime} (Dhaka, GMT+6)</span>
                </div>
              )}
            </div>

            <h1 className="hero-title">
              <span className="hero-name-line hero-name-light">Md. Khalid</span>
              <span className="hero-name-line hero-name-strong">Hasan</span>
            </h1>

            <div className="hero-quote">
              <blockquote>
                “I design and build responsive digital products that blend solid engineering with thoughtful user experience.”
              </blockquote>
            </div>

            <div className="button-row">
              <MagneticButton href="#projects" className="button primary">
                View Projects
              </MagneticButton>
              <MagneticButton href="#contact" className="button secondary">
                Contact Me
              </MagneticButton>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="button outline cv-button"
              >
                <span className="cv-icon" aria-hidden="true">📄</span>
                <span>Download CV</span>
              </a>
            </div>
          </div>

          <div className="hero-card" aria-label="Profile summary card">
            <div className="mini-badge">Open to work</div>
            <div className="profile-ornament">
              <Image src={profileImage} alt="Md. Khalid Hasan portrait" width={800} height={960} priority />
            </div>
            <div className="stat-grid">
              <div>
                <strong>Full-Stack</strong>
                <span>Developer</span>
              </div>
              <div>
                <strong>AIUB</strong>
                <span>CS Major</span>
              </div>
              <div>
                <strong>8+</strong>
                <span>Projects</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Driven</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">About</p>
              <h2>Building thoughtful, scalable digital experiences.</h2>
            </div>
          </Reveal>
          <div className="about-layout">
            <Reveal>
              <p className="bio">
                Detail-oriented Computer Science student at American International University-Bangladesh (AIUB) with hands-on experience in software development, machine learning, and data analysis. I specialize in building scalable web applications with Next.js, NestJS, and PostgreSQL while staying curious about research, learning, and product thinking. I am currently seeking a Software Developer, Web Developer, or Full-Stack Intern role where I can contribute, learn fast, and build real impact.
              </p>
            </Reveal>
            <StaggerGroup className="tag-list" delay={0.08} stagger={0.06} aria-label="Currently using technologies">
              {techPills.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* EDUCATION & JOURNEY SECTION */}
        <section id="education" className="section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Education & Background</p>
              <h2>Academic foundation and technical trajectory.</h2>
            </div>
          </Reveal>
          <EducationTimeline />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Skills</p>
              <h2>Core tools, frameworks, and technologies.</h2>
            </div>
          </Reveal>
          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <Reveal key={group.label} delay={index * 0.08}>
                <div className="skill-group">
                  <h3>{group.label}</h3>
                  <StaggerGroup className="tag-list" delay={0.05} stagger={0.04}>
                    {group.items.map((item) => (
                      <span key={item} className="pill subtle">
                        {item}
                      </span>
                    ))}
                  </StaggerGroup>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION WITH FILTER TABS */}
        <section id="projects" className="section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Projects</p>
              <h2>Selected work and engineering experiments.</h2>
            </div>
          </Reveal>

          {/* Filter Tabs */}
          <div className="filter-tab-bar" role="tablist" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span className="tab-count">
                  {category === 'All'
                    ? projects.length
                    : projects.filter((p) => p.category === category).length}
                </span>
              </button>
            ))}
          </div>

          <StaggerGroup className="project-grid" delay={0.05} stagger={0.06}>
            {filteredProjects.map((project) => (
              <StaggerItem key={project.title} className="project-card">
                <article>
                  <div className="project-card-header">
                    <div>
                      <span className="category-tag">{project.category}</span>
                      <h3>{project.title}</h3>
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="project-github-link"
                        title="View GitHub Repository"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        GitHub ↗
                      </a>
                    ) : null}
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-list concise">
                    {project.tags.map((tag) => (
                      <span key={`${project.title}-${tag}`} className="pill small">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-card-actions">
                    <button
                      type="button"
                      className="case-study-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>Explore Case Study</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s build something meaningful.</h2>
            </div>
          </Reveal>
          <div className="contact-wrap">
            <Reveal>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="inquiry-presets">
                  <span className="preset-label">Quick topics:</span>
                  <div className="preset-pill-list">
                    {inquiryPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="preset-pill"
                        onClick={() => handleApplyPreset(preset.text)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    required
                  />
                </label>
                <button type="submit" className="button primary submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {status.message ? (
                  <p className={`form-status ${status.type}`} role="status" aria-live="polite">
                    {status.message}
                  </p>
                ) : null}
              </form>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="social-panel">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label === 'Email' ? undefined : '_blank'}
                    rel={social.label === 'Email' ? undefined : 'noreferrer'}
                    className="social-link"
                  >
                    <span className="social-icon">{social.icon}</span>
                    <div>
                      <span className="social-label">{social.label}</span>
                      <strong>{social.value}</strong>
                    </div>
                  </a>
                ))}

                <div className="recruiter-quick-card">
                  <h4>Recruiting & Opportunities</h4>
                  <p>
                    Open to <strong>Internship</strong> and <strong>Junior Software Developer</strong> roles (Full-Stack / Backend / Web).
                  </p>
                  <button
                    type="button"
                    className="button secondary copy-full-btn"
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? '✓ Copied Email to Clipboard!' : '📋 Copy Email Address'}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Md. Khalid Hasan. Built with Next.js, React 19, and Motion.</p>
      </footer>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
