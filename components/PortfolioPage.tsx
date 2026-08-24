'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  MagneticButton,
  Reveal,
  StaggerGroup,
  StaggerItem,
  useScrollProgress,
} from './animations';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const techPills = ['Next.js', 'NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Python'];

const skillGroups = [
  { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'JavaScript'] },
  { label: 'Backend', items: ['NestJS', 'Node.js', 'ASP.NET Core', 'PHP'] },
  { label: 'Database', items: ['MySQL', 'SQL Server', 'PostgreSQL'] },
  { label: 'Languages', items: ['Python', 'Java', 'C++', 'C#'] },
  { label: 'Tools', items: ['Git', 'Postman', 'VS Code', 'GitHub'] },
];

const projects = [
  {
    title: 'SmartCity_Ecosystem',
    description:
      'A smart-city platform connecting public services, operational data, and user workflows into a unified dashboard for efficient urban management.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
    link: 'https://github.com/KHR47/SmartCity_Ecosystem',
    linkLabel: 'GitHub',
  },
  {
    title: 'The Markentile',
    description:
      'Desktop e-commerce application for groceries, food, and skincare products with a Java Swing interface and structured product workflow.',
    tags: ['Java', 'Swing', 'OOP'],
  },
  {
    title: 'TourEase',
    description:
      'Tourism management database project covering customer management, bookings, hotel operations, and payment tracking.',
    tags: ['MySQL', 'SQL', 'JDBC'],
  },
  {
    title: 'NikunjaScape',
    description:
      'Computer graphics simulation of Nikunja 1 & 2 featuring roads, buildings, vehicles, and animated environment changes.',
    tags: ['C++', 'OpenGL', 'GLUT'],
  },
  {
    title: 'FinTrack',
    description:
      'Personal finance tracker designed to monitor income, expenses, and monthly budgets through a simple web dashboard.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    link: 'https://github.com/KHR47/FinTrack',
    linkLabel: 'GitHub',
  },
  {
    title: 'AirSense',
    description:
      'Air-quality monitoring web app for visualizing AQI data, locations, and patterns across multiple cities.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    link: 'https://github.com/KHR47/AirSense',
    linkLabel: 'GitHub',
  },
  {
    title: 'ShopCore',
    description:
      'RESTful backend API for e-commerce operations with secure product management and order-processing endpoints.',
    tags: ['ASP.NET Core Web API', 'Postman'],
  },
  {
    title: 'PyCart',
    description:
      'Python-based shopping workflow powered by FastAPI for product inventory and order operations.',
    tags: ['Python', 'FastAPI'],
    link: 'https://github.com/KHR47/PyCart',
    linkLabel: 'GitHub',
  },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

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
        message: 'Your message was sent successfully. I will get back to you soon.',
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

  return (
    <div
      className="page-shell"
      style={{
        width: 'calc(100% - 72px)',
        maxWidth: '1360px',
        margin: '0 auto',
      }}
    >
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
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

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
      </header>

      <main id="home">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Available for internship / developer roles</p>

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
            </div>
          </div>

          <div className="hero-card" aria-label="Profile summary card">
            <div className="mini-badge">Open to work</div>
            <div className="profile-ornament">
              <Image src={profileImage} alt="Md. Khalid Hasan portrait" width={800} height={960} priority />
            </div>
            <div className="stat-grid">
              <div>
                <strong>3.83</strong>
                <span>CGPA</span>
              </div>
              <div>
                <strong>3+</strong>
                <span>Years learning</span>
              </div>
              <div>
                <strong>8</strong>
                <span>Projects</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Driven</span>
              </div>
            </div>
          </div>
        </section>

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
                Detail-oriented Computer Science student at American International University-Bangladesh (AIUB) with a 3.83 CGPA and hands-on experience in software development, machine learning, and data analysis. I specialize in building scalable web applications with Next.js, NestJS, and PostgreSQL while staying curious about research, learning, and product thinking. I am currently seeking a Software Developer, Web Developer, or Full-Stack Intern role where I can contribute, learn fast, and build real impact.
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

        <section id="skills" className="section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Skills</p>
              <h2>Core tools and technologies.</h2>
            </div>
          </Reveal>
          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <Reveal key={group.label} delay={index * 0.08}>
                <div className="skill-group">
                  <h3>{group.label}</h3>
                  <StaggerGroup className="tag-list" delay={0.05} stagger={0.05}>
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

        <section id="projects" className="section">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Projects</p>
              <h2>Selected work and product experiments.</h2>
            </div>
          </Reveal>
          <StaggerGroup className="project-grid" delay={0.05} stagger={0.08}>
            {projects.map((project) => (
              <StaggerItem key={project.title} className="project-card">
                <article>
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer">
                        {project.linkLabel ?? 'Visit'}
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
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>

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
                    placeholder="Tell me about your project..."
                    required
                  />
                </label>
                <button type="submit" className="button primary submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send'}
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
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Md. Khalid Hasan. Crafted with Next.js.</p>
      </footer>
    </div>
  );
}
