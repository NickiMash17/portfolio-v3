/**
 * Comprehensive Portfolio Knowledge Base
 * This file contains all information about Nicolette Mashaba's portfolio
 * Used by the AI assistant to provide accurate, contextual responses
 */

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  achievements: Achievement[];
}

export interface PersonalInfo {
  name: string;
  title: string[];
  location: string;
  status: string;
  bio: string;
  background: string;
  highlights: string[];
  social: {
    github: string;
    linkedin: string;
    email?: string;
  };
}

export interface Skill {
  name: string;
  category: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  type: 'work' | 'education';
  description: string[];
  achievements?: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  award?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  type: 'certification' | 'award';
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  location: string;
  achievements?: string[];
}

export interface Achievement {
  title: string;
  description: string;
  year?: string;
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Nicolette Mashaba',
    title: [
      'Software Engineer',
      'AI/ML Enthusiast',
      'Azure Cloud Expert',
      'Hackathon Winner',
      'Full-Stack Developer',
    ],
    location: 'Johannesburg, South Africa',
    status: 'Open to Opportunities',
    bio: `I'm a Software Engineering student with a unique journey from the Navy to the world of technology. My experience as a Naval Officer taught me precision, problem-solving, and strategic thinking which are skills I now apply to building innovative software solutions. Currently excelling in full-stack development, cloud computing, and AI technologies. I'm passionate about creating clean, maintainable code and scalable applications that make a real-world impact.`,
    background: 'Former Navigation Officer with South African Navy (2015-2021)',
    highlights: [
      'Full-Stack Developer - Building scalable applications with React, Node.js, .NET, and Flutter',
      'Azure Certified - Microsoft Azure Developer Associate & Data Fundamentals certified',
      'Naval Background - Former Navigation Officer with South African Navy',
      'Award Winner - Winner at AIMS Hackathon 2025 - AI Compliance Interrogator',
    ],
    social: {
      github: 'https://github.com/NickiMash17',
      linkedin: 'https://linkedin.com/in/nicolette-mashaba',
    },
  },

  skills: [
    { name: 'React.js', category: 'Frontend', level: 'advanced' },
    { name: 'TypeScript', category: 'Languages', level: 'advanced' },
    { name: 'Node.js', category: 'Backend', level: 'advanced' },
    { name: '.NET / C#', category: 'Backend', level: 'intermediate' },
    { name: 'Flutter', category: 'Mobile', level: 'intermediate' },
    { name: 'Microsoft Azure', category: 'Cloud', level: 'advanced' },
    { name: 'MongoDB', category: 'Database', level: 'intermediate' },
    { name: 'SQL', category: 'Database', level: 'intermediate' },
    { name: 'Python', category: 'Languages', level: 'intermediate' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'advanced' },
    { name: 'Docker', category: 'DevOps', level: 'intermediate' },
    { name: 'Git', category: 'DevOps', level: 'advanced' },
    { name: 'JavaScript', category: 'Languages', level: 'advanced' },
  ],

  experience: [
    {
      title: 'Software Engineering Intern',
      company: 'Coast IT (PTY) Ltd',
      period: 'Nov 2025 - Dec 2025',
      location: 'Remote',
      type: 'work',
      description: [
        'Developing mobile applications using Flutter for cross-platform deployment',
        'Collaborating on full-stack development projects with Agile methodologies',
        'Enhancing skills in coding, testing, and project delivery under mentorship',
      ],
    },
    {
      title: 'Web Developer Intern',
      company: 'CodeCatalyst',
      period: 'Jun 2025 - Jul 2025',
      location: 'Remote',
      type: 'work',
      description: [
        'Built full-stack applications with React, Node.js, and MongoDB',
        'Implemented JWT authentication, reducing report generation time by 20%',
        'Delivered responsive UIs using Tailwind CSS',
      ],
      achievements: ['Reduced report generation time by 20%'],
    },
    {
      title: 'AI Model Trainer',
      company: 'Outlier',
      period: 'Oct 2024 - Dec 2024',
      location: 'Remote',
      type: 'work',
      description: [
        'Refined 100+ AI prompts, improving model accuracy by 25%',
        'Streamlined debugging, saving developers 10 hours/week',
      ],
      achievements: ['Improved model accuracy by 25%', 'Saved developers 10 hours/week'],
    },
    {
      title: 'Navigation Officer',
      company: 'South African Navy',
      period: 'Jan 2015 - Jul 2021',
      location: "Simon's Town",
      type: 'work',
      description: [
        'Optimized voyage plans, reducing fuel consumption by 10%',
        'Conducted weekly navigational equipment audits, reducing downtime by 15%',
        'Mentored 5+ junior officers, fostering safety and learning culture',
      ],
      achievements: ['Reduced fuel consumption by 10%', 'Reduced downtime by 15%', 'Mentored 5+ junior officers'],
    },
  ],

  education: [
    {
      title: 'Software Engineering (NQF Level 6)',
      institution: 'CTU Training Solutions',
      period: 'Graduating 2026',
      location: 'Polokwane',
      achievements: ['Occupational Certificate in Software Engineering'],
    },
    {
      title: 'IT Programming Foundation (NQF Level 4)',
      institution: 'CTU Training Solutions',
      period: 'Graduated 2024',
      location: 'Polokwane',
      achievements: ['Top Performer Award'],
    },
  ],

  projects: [
    {
      title: 'AI Compliance Interrogator',
      subtitle: 'AIMS Hackathon 2025 Winner',
      description:
        'AI-powered tool to help organizations identify and prevent human trafficking through automated data analysis and NLP.',
      tech: ['React', 'TypeScript', '.NET', 'SQL', 'Python', 'OpenAI API', 'Azure'],
      highlights: [
        'Won "Best Team" at AIMS Hackathon 2025',
        'Automated data analysis with NLP using OpenAI API',
        'Interactive React dashboard with real-time notifications',
        'Scalable backend with .NET and SQL hosted on Azure',
      ],
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/ai-compliance',
      award: 'Best Team - AIMS Hackathon 2025',
    },
    {
      title: 'Full-Stack Web Applications',
      subtitle: 'CodeCatalyst Internship',
      description:
        'Built multiple full-stack applications with JWT authentication, responsive UIs, and efficient backend systems.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
      highlights: [
        'Implemented JWT authentication system',
        'Reduced report generation time by 20%',
        'Delivered responsive UIs with Tailwind CSS',
        'RESTful API design and implementation',
      ],
      github: 'https://github.com/NickiMash17',
    },
    {
      title: 'Mobile Applications',
      subtitle: 'Flutter Development',
      description:
        'Cross-platform mobile applications using Flutter, focusing on performance and user experience.',
      tech: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
      highlights: [
        'Cross-platform deployment (iOS & Android)',
        'Clean architecture and state management',
        'Integration with backend APIs',
        'Focus on performance optimization',
      ],
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/mobile-app',
    },
    {
      title: 'Smart Task Manager',
      subtitle: 'Demo Project - AI-Powered Productivity',
      description:
        'Intelligent task management system with AI-powered suggestions and priority optimization.',
      tech: ['React', 'TypeScript', 'Lovable AI', 'Tailwind CSS'],
      highlights: [
        'AI-powered task suggestions and categorization',
        'Smart priority detection and scheduling',
        'Beautiful, responsive interface',
        'Real-time updates and notifications',
      ],
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/task-manager',
    },
    {
      title: 'Portfolio Analytics Dashboard',
      subtitle: 'Demo Project - Data Visualization',
      description:
        'Interactive analytics dashboard showcasing data visualization and real-time metrics.',
      tech: ['React', 'TypeScript', 'Recharts', 'Lovable Cloud'],
      highlights: [
        'Real-time data updates and visualizations',
        'Interactive charts and graphs',
        'Responsive design for all devices',
        'Performance-optimized rendering',
      ],
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/analytics',
    },
  ],

  certifications: [
    {
      name: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
      issuer: 'Microsoft',
      type: 'certification',
    },
    {
      name: 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
      issuer: 'Microsoft',
      type: 'certification',
    },
    {
      name: 'SheCodes: Basics, Plus, Responsive Web Development',
      issuer: 'SheCodes',
      type: 'certification',
    },
    {
      name: 'Winner, AIMS Hackathon 2025 - Best Team',
      issuer: 'AIMS',
      year: '2025',
      type: 'award',
    },
    {
      name: 'Programming Foundation Top Performer - CTU Training Solutions',
      issuer: 'CTU Training Solutions',
      type: 'award',
    },
    {
      name: 'J.P. Morgan Midas Core Software Engineering Simulation',
      issuer: 'J.P. Morgan',
      type: 'certification',
    },
  ],

  achievements: [
    {
      title: 'AIMS Hackathon 2025 Winner',
      description: 'Won "Best Team" award for AI Compliance Interrogator project',
      year: '2025',
    },
    {
      title: 'Top Performer Award',
      description: 'Achieved top performance in IT Programming Foundation course',
      year: '2024',
    },
    {
      title: 'Navy Leadership',
      description: 'Mentored 5+ junior officers during Naval service',
    },
    {
      title: 'Performance Optimization',
      description: 'Reduced report generation time by 20% at CodeCatalyst',
      year: '2025',
    },
    {
      title: 'AI Model Training',
      description: 'Improved AI model accuracy by 25% at Outlier',
      year: '2024',
    },
  ],
};

/**
 * Get system prompt for AI assistant
 */
export const getSystemPrompt = (): string => {
  return `You are Nicolette Mashaba's AI assistant, an intelligent chatbot representing a Software Engineering student and developer. Your role is to provide accurate, helpful, and engaging information about Nicolette's skills, experience, projects, and background.

PERSONALITY & TONE:
- Professional yet friendly and approachable
- Enthusiastic about technology and software development
- Clear and concise in explanations
- Use emojis sparingly and appropriately (⚡ 🚀 💻 🎯)
- Be conversational but maintain professionalism

KEY INFORMATION ABOUT NICOLETTE:

BACKGROUND:
- Name: ${portfolioData.personal.name}
- Location: ${portfolioData.personal.location}
- Status: ${portfolioData.personal.status}
- Unique background: ${portfolioData.personal.background}
- Bio: ${portfolioData.personal.bio}

CURRENT ROLES/TITLES:
${portfolioData.personal.title.map((t) => `- ${t}`).join('\n')}

TECHNICAL SKILLS:
${portfolioData.skills
  .map((s) => `- ${s.name} (${s.category})`)
  .join('\n')}

KEY PROJECTS:
${portfolioData.projects
  .map(
    (p) => `- ${p.title}: ${p.description} | Tech: ${p.tech.join(', ')}${p.award ? ` | Award: ${p.award}` : ''}`
  )
  .join('\n')}

WORK EXPERIENCE:
${portfolioData.experience
  .filter((e) => e.type === 'work')
  .map(
    (e) => `- ${e.title} at ${e.company} (${e.period}): ${e.description.join('; ')}`
  )
  .join('\n')}

EDUCATION:
${portfolioData.education
  .map((e) => `- ${e.title} at ${e.institution} (${e.period})`)
  .join('\n')}

CERTIFICATIONS & AWARDS:
${portfolioData.certifications.map((c) => `- ${c.name}`).join('\n')}

GUIDELINES:
1. Always base your responses on the information provided above
2. If asked about something not in the knowledge base, politely say you don't have that information but can help with what you know
3. Highlight unique aspects like the Navy background and hackathon win
4. Be specific about technologies, projects, and achievements
5. When discussing projects, mention key technologies and achievements
6. Keep responses concise but informative
7. If asked about contact, mention LinkedIn and GitHub profiles
8. Show enthusiasm about technical topics and achievements

Remember: You represent Nicolette professionally, so be accurate, helpful, and showcase her skills and experience effectively.`;
};

/**
 * Generate a local fallback response based on the query
 */
export const generateLocalResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();

  // Skills queries
  if (lowerQuery.includes('skill') || lowerQuery.includes('technolog') || lowerQuery.includes('tech stack')) {
    const frontend = portfolioData.skills.filter((s) => s.category === 'Frontend').map((s) => s.name);
    const backend = portfolioData.skills.filter((s) => s.category === 'Backend').map((s) => s.name);
    const languages = portfolioData.skills.filter((s) => s.category === 'Languages').map((s) => s.name);
    const cloud = portfolioData.skills.filter((s) => s.category === 'Cloud').map((s) => s.name);
    
    return `🚀 **Technical Skills Overview:**

**Frontend:** ${frontend.join(', ')}
**Backend:** ${backend.join(', ')}
**Languages:** ${languages.join(', ')}
**Cloud & DevOps:** ${cloud.join(', ')}

Nicolette specializes in full-stack development with strong expertise in React, TypeScript, and Node.js. She's also Azure certified and experienced with mobile development using Flutter. Her skill set spans from frontend UI/UX to backend APIs, cloud infrastructure, and DevOps practices.`;
  }

  // Projects queries
  if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('build')) {
    const featuredProject = portfolioData.projects[0];
    return `💻 **Featured Projects:**

**${featuredProject.title}** - ${featuredProject.subtitle}
${featuredProject.description}
${featuredProject.award ? `🏆 ${featuredProject.award}` : ''}
Tech Stack: ${featuredProject.tech.join(', ')}

**Other Notable Projects:**
${portfolioData.projects.slice(1, 3).map((p) => `• ${p.title} - ${p.description}`).join('\n')}

All projects showcase full-stack capabilities, modern tech stacks, and real-world problem-solving. Check out the Projects section for more details!`;
  }

  // Experience queries
  if (lowerQuery.includes('experience') || lowerQuery.includes('work history') || lowerQuery.includes('internship')) {
    const recentExp = portfolioData.experience.filter((e) => e.type === 'work').slice(0, 2);
    return `💼 **Recent Work Experience:**

${recentExp.map((e) => `**${e.title}** at ${e.company} (${e.period})
${e.description.join('\n')}
${e.achievements ? `\nKey Achievements: ${e.achievements.join(', ')}` : ''}`).join('\n\n')}

Nicolette has diverse experience from internships at tech companies to her unique background as a Navigation Officer in the South African Navy, bringing strategic thinking and precision to software development.`;
  }

  // About/Bio queries
  if (lowerQuery.includes('about') || lowerQuery.includes('who') || lowerQuery.includes('background')) {
    return `👋 **About Nicolette:**

${portfolioData.personal.bio}

**Key Highlights:**
${portfolioData.personal.highlights.map((h) => `• ${h}`).join('\n')}

What makes her unique is the transition from Naval Officer to Software Engineer, bringing leadership, problem-solving, and strategic thinking from military service to tech. She's currently a Software Engineering student excelling in full-stack development, cloud computing, and AI technologies.`;
  }

  // Contact queries
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('linkedin') || lowerQuery.includes('github')) {
    return `📧 **Get in Touch:**

🔗 **LinkedIn:** ${portfolioData.personal.social.linkedin}
💻 **GitHub:** ${portfolioData.personal.social.github}
📍 **Location:** ${portfolioData.personal.location}
✨ **Status:** ${portfolioData.personal.status}

Feel free to connect on LinkedIn or check out her projects on GitHub!`;
  }

  // Certifications queries
  if (lowerQuery.includes('certif') || lowerQuery.includes('award') || lowerQuery.includes('achievement')) {
    return `🏆 **Certifications & Awards:**

${portfolioData.certifications.map((c) => `• ${c.name}${c.year ? ` (${c.year})` : ''}`).join('\n')}

Nicolette is Microsoft Azure certified (Developer Associate & Data Fundamentals) and has won awards including the AIMS Hackathon 2025 "Best Team" award.`;
  }

  // Default response
  return `⚡ I'm Nicolette's AI assistant! I can help you learn about:

• **Skills & Technologies** - Her technical expertise
• **Projects** - Featured work and achievements  
• **Experience** - Work history and internships
• **About** - Background and journey
• **Contact** - How to connect

What would you like to know? Try asking about her skills, best projects, or work experience!`;
};

