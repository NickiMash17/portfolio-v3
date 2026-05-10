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
  linkedin?: string;
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
    location: 'South Africa',
    status: 'Open to Opportunities',
    bio: `I'm a Junior AI Software Engineer with a unique journey from the South African Navy to the world of technology. My naval background taught me precision, problem-solving, and strategic thinking — skills I now apply daily building AI-powered and full-stack web applications. Currently contracting remotely from Johannesburg for Rapid Transformational Therapy® (RTT), a Dubai-based company — integrating OpenAI APIs, engineering prompt workflows, and shipping production-grade AI features. Passionate about clean, maintainable code and real-world impact.`,
    background: 'Former Junior Navigation Officer with South African Navy (2015-2021)',
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
      title: 'Junior AI Software Engineer',
      company: 'Rapid Transformational Therapy® (RTT)',
      period: 'Apr 2026 - Present',
      location: 'South Africa · Remote (Dubai-based client)',
      type: 'work',
      description: [
        'Build and integrate AI-driven features using Python and modern LLM frameworks, including OpenAI APIs, prompt engineering, and response optimisation',
        'Develop and maintain backend services and RESTful APIs supporting AI workflows and data processing pipelines',
        'Improve AI response quality through iterative prompt refinement and structured output handling',
        'Apply best practices in data privacy, security, and compliance including GDPR awareness within a regulated client environment',
        'Support internal tools and automation systems to enhance operational efficiency and end-user experience',
      ],
    },
    {
      title: 'Technical Trainer (Volunteer)',
      company: 'TechBridle Foundation',
      period: '2026 - Present',
      location: 'South Africa · Remote',
      type: 'work',
      description: [
        'Mentor learners in web development, JavaScript, React, and backend engineering concepts',
        'Lead code review sessions and guide Git workflows, secure project setup, and debugging practices for junior developers',
      ],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Coast IT (Pty) Ltd',
      period: 'Nov 2025 - Dec 2025',
      location: 'South Africa',
      type: 'work',
      description: [
        'Contributed to feature development within an Agile/Scrum team, participating in sprint planning, daily standups, and retrospectives',
        'Performed API testing using Postman, resolved bugs, and participated in peer code reviews to improve application stability',
        'Collaborated with senior engineers to implement and test new application modules, gaining exposure to production-level codebases',
      ],
    },
    {
      title: 'AI Model Trainer',
      company: 'Outlier AI',
      period: '2024',
      location: 'Remote',
      type: 'work',
      description: [
        'Evaluated AI-generated outputs and improved response quality through structured, documented feedback aligned with model guidelines',
        'Conducted prompt testing and model behaviour analysis, identifying patterns that improved response clarity, accuracy, and reliability',
      ],
      achievements: ['Improved model accuracy by 25%'],
    },
    {
      title: 'Junior Navigation Officer',
      company: 'South African Navy',
      period: 'Jan 2015 - Jul 2021',
      location: "Simon's Town",
      type: 'work',
      description: [
        'Operated in mission-critical environments demanding precision decision-making, high ownership, and strict adherence to protocol',
        'Developed cross-functional team coordination and communication skills under high-pressure, time-sensitive conditions',
        'Mentored 5+ junior officers, fostering a culture of safety and continuous learning',
      ],
      achievements: ['Mentored 5+ junior officers'],
    },
  ],

  education: [
    {
      title: 'Software Engineering (NQF Level 6)',
      institution: 'CTU Training Solutions',
      period: 'Graduated 2026',
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
      title: 'EmpowaAI',
      subtitle: 'AI-Powered Career & Economic Guidance Platform',
      description:
        'AI-powered career and economic guidance platform that builds a Digital Economic Twin to help youth make smarter career decisions.',
      tech: [
        'AI/ML',
        'NLP',
        'Career Analytics',
        'Digital Twin',
        'Simulation',
        'Interview Coaching',
      ],
      highlights: [
        'Creates a Digital Economic Twin to model skills, strengths, and potential',
        'Analyzes CVs, identifies strongest skills, and matches users to suited industries',
        'Simulates 3, 6, and 12-month career paths with actionable guidance',
        'Provides interview prep with AI coaching and pathways for employment, learnership, or entrepreneurship',
        'Designed to evolve into a talent and opportunity ecosystem',
      ],
      demo: 'https://www.empowa.org',
      linkedin: 'https://www.linkedin.com/company/empowaai',
    },
    {
      title: 'AI Compliance Interrogator',
      subtitle: 'AIMS Hackathon 2025 Winner • Team Firefly • Featured on International Tech Podcast',
      description:
        'Hackathon-winning AI compliance tool that analyses structured inputs to automatically flag risks. Won 1st place and was featured on an Australian technology podcast.',
      tech: [
        'Python',
        'FastAPI',
        'OpenAI API',
        'Microsoft Azure',
        'Prompt Engineering',
        'React',
        'TypeScript',
      ],
      highlights: [
        '🏆 1st Place at AIMS Hackathon 2025 - Best Team award',
        'Designed controlled LLM prompt workflows ensuring consistent, auditable, and explainable outputs',
        'Enforced backend-only AI calls with secure environment configuration for sensitive compliance data',
        'Deployed full-stack application on Microsoft Azure; featured on an Australian technology podcast',
      ],
      github: 'https://github.com/NickiMash17/AIMS-Firefly',
      demo: null,
      award: 'Best Team - AIMS Hackathon 2025 · Featured on International Tech Podcast',
    },
    {
      title: 'LoanLife EDGE',
      subtitle: 'AI-Powered Loan Risk & Compliance Platform',
      description:
        'Fintech platform that turns each loan into a digital twin, monitored by AI with early covenant and ESG risk warnings.',
      tech: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Electron',
        'Python',
        'FastAPI',
        'AI/ML',
        'Hardhat',
        'Solidity',
      ],
      highlights: [
        'Backend & AI Integration Lead for ingestion, digital twin, prediction, ESG and audit services in FastAPI.',
        'Predicts covenant breaches and ESG issues 30–90 days ahead for proactive risk management.',
        'Uses blockchain-style audit trails and smart-contract logic for transparent governance.',
      ],
      github: 'https://github.com/Lunga-Mashaba/LoanLife_Edge',
      demo: 'https://loan-life-edge.vercel.app/',
    },
    {
      title: 'RealHomes',
      subtitle: 'South African Luxury Real Estate Platform',
      description:
        'A modern, responsive real estate platform showcasing premium properties across South Africa, with rich search and filtering.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
      highlights: [
        'Built end-to-end MERN stack application for property listing and discovery',
        'Responsive UI optimized for both mobile and desktop viewing',
        'Secure authentication and role-based access using JWT',
        'Designed to scale with growing property inventory and traffic',
      ],
      github: 'https://github.com/NickiMash17/RealHomes',
      demo: 'https://real-homes.vercel.app/',
    },
    {
      title: 'BookReviewApp',
      subtitle: 'Advanced Book Review Application',
      description:
        'Full-featured book review platform built with ASP.NET Core and Entity Framework Core, focused on clean architecture and performance.',
      tech: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'SQL Server'],
      highlights: [
        'Implements clean architecture with separation of concerns',
        'Supports rich review features and user interactions',
        'Uses EF Core for efficient data access and persistence',
        'Built to demonstrate strong backend and .NET skills',
      ],
      github: 'https://github.com/NickiMash17/BookReviewApp',
      demo: 'https://bookreviewapp-1755367448.azurewebsites.net/',
    },
    {
      title: 'FitQuest',
      subtitle: 'Gamified Wellness Companion',
      description:
        'A gamified wellness application with an evolving plant companion. Track activities, earn XP, and watch your companion grow.',
      tech: ['Flutter', 'Dart', 'Firebase'],
      highlights: [
        'Built with Flutter for smooth cross-platform mobile experiences',
        'Gamified system that rewards healthy habits with XP and growth',
        'Real-time data sync and auth powered by Firebase',
        'Shows strong mobile UI/UX and state management skills',
      ],
      github: 'https://github.com/NickiMash17/fitquest-app',
      demo: 'https://youtu.be/Ist1QrlhFIg?si=lv-JSEcLseUJj4h0',
    },
    {
      title: 'Interview Replay',
      subtitle: 'AI-Powered Mock Interview Tool · Live Production',
      description:
        'AI-driven mock interview tool delivering structured, actionable feedback on candidate strengths and areas for improvement. Deployed and maintained in live production.',
      tech: ['JavaScript', 'OpenAI API', 'Netlify', 'Prompt Engineering'],
      highlights: [
        'Developed AI-driven mock interview tool delivering structured feedback on candidate strengths and improvement areas',
        'Iteratively improved AI response quality through prompt engineering and refinement',
        'Deployed and maintained in production using clean Git practices and secure environment configuration',
      ],
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
      name: 'Azure DevOps Engineer Expert (AZ-400) — In Progress',
      issuer: 'Microsoft',
      type: 'certification',
    },
    {
      name: 'J.P. Morgan Software Engineering Virtual Experience',
      issuer: 'J.P. Morgan',
      type: 'certification',
    },
    {
      name: 'Winner, AIMS Hackathon 2025 - Best Team · Featured on International Tech Podcast',
      issuer: 'AIMS',
      year: '2025',
      type: 'award',
    },
    {
      name: 'Programming Foundation Top Performer - CTU Training Solutions',
      issuer: 'CTU Training Solutions',
      type: 'award',
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
  return `You are Nicolette Mashaba's AI assistant, an intelligent chatbot representing a Software Engineer Graduate and developer. Your role is to provide accurate, helpful, and engaging information about Nicolette's skills, experience, projects, and background.

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

What makes her unique is the transition from Naval Officer to Software Engineer, bringing leadership, problem-solving, and strategic thinking from military service to tech. She's a Software Engineer Graduate excelling in full-stack development, cloud computing, and AI technologies.`;
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
