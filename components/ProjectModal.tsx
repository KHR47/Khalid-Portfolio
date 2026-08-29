'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ProjectData {
  title: string;
  category: 'Full-Stack' | 'Backend / API' | 'Desktop & Simulation';
  description: string;
  longDescription?: string;
  highlights?: string[];
  tags: string[];
  link?: string;
  linkLabel?: string;
  demoLink?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <motion.div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="modal-header">
              <div className="modal-header-info">
                <span className="pill small category-badge">{project.category}</span>
                <h3 id="modal-title" className="modal-title">
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-button"
                onClick={onClose}
                aria-label="Close project details"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h4>Overview</h4>
                <p className="modal-text">{project.longDescription || project.description}</p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className="modal-section">
                  <h4>Key Architectural Highlights & Features</h4>
                  <ul className="modal-highlights">
                    {project.highlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-section">
                <h4>Technologies & Tools</h4>
                <div className="tag-list concise">
                  {project.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="button primary modal-action-btn"
                >
                  <span>View Repository on GitHub</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="button secondary modal-action-btn"
                >
                  <span>Live Preview</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              <button type="button" className="button secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
