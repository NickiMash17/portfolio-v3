/**
 * Terminal Data Utility
 * Converts portfolioData.ts format to terminal-friendly format
 */

import { portfolioData } from './portfolioData';

export const getTerminalData = () => {
  return {
    about: {
      name: portfolioData.personal.name,
      title: portfolioData.personal.title[0],
      location: portfolioData.personal.location,
      email: portfolioData.personal.social.email || 'nene171408@gmail.com',
      bio: portfolioData.personal.bio,
    },
    skills: {
      languages: portfolioData.skills
        .filter(s => s.category === 'Languages')
        .map(s => s.name),
      frontend: portfolioData.skills
        .filter(s => s.category === 'Frontend')
        .map(s => s.name),
      backend: portfolioData.skills
        .filter(s => s.category === 'Backend')
        .map(s => s.name),
      cloud: portfolioData.skills
        .filter(s => s.category === 'Cloud')
        .map(s => s.name),
      mobile: portfolioData.skills
        .filter(s => s.category === 'Mobile')
        .map(s => s.name),
      database: portfolioData.skills
        .filter(s => s.category === 'Database')
        .map(s => s.name),
      devops: portfolioData.skills
        .filter(s => s.category === 'DevOps')
        .map(s => s.name),
    },
    projects: portfolioData.projects.map(p => ({
      name: p.title,
      tech: p.tech.join(', '),
      status: p.demo ? '🟢 Live' : '🟡 In Progress',
    })),
    experience: portfolioData.experience
      .filter(e => e.type === 'work')
      .map(e => ({
        role: e.title,
        company: e.company,
        period: e.period,
      })),
    social: portfolioData.personal.social,
  };
};
