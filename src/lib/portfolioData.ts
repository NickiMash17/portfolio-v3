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
      'AI Engineer',
      'LLM Applications',
      'Agent Orchestration',
      'RAG & Azure',
    ],
    location: 'South Africa',
    status: 'Open to Full-Time & Relocation (EU)',
    bio: `I'm an AI Engineer building and maintaining production LLM systems, RAG pipelines, and multi-agent architectures on Microsoft Azure. Currently engineering three live production AI systems at Always Enough LLC, applying GPT-4, Azure Durable Functions, LangGraph, LangChain, DSPy, and vector search to real business operations. Recognised in the Geekulcha Top 15 AI Innovators (South Africa 2026), AZ-204 renewed at 92%, and hackathon winner with Mila (Quebec AI Institute) and QUT applying NLP and Explainable AI to human rights compliance at scale. Sole developer and open source maintainer of EmpowaAI. My naval background taught me precision, leadership, and composure under pressure, which I apply daily to production engineering ownership. Open to relocation in Europe.`,
    background: 'Former Navigation Officer with South African Navy (2015-2021)',
    highlights: [
      'AI & Agent Engineering - Three live production AI systems at Always Enough LLC using LangGraph, DSPy, and RAG on Azure',
      'Recognition - Geekulcha Top 15 AI Innovator (South Africa 2026), AZ-204 renewed at 92%',
      'Hackathon Winner - AI Against Modern Slavery (AIMS), in partnership with Mila (Quebec AI Institute) and QUT',
      'Open Source - Sole developer and maintainer of EmpowaAI, an AI career platform',
      'Naval Background - Former Navigation Officer with South African Navy',
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
    { name: 'Azure VM', category: 'Cloud', level: 'intermediate' },
    { name: 'MongoDB', category: 'Database', level: 'intermediate' },
    { name: 'SQL', category: 'Database', level: 'intermediate' },
    { name: 'Python', category: 'Languages', level: 'intermediate' },
    { name: 'FastAPI', category: 'Backend', level: 'intermediate' },
    { name: 'OpenAI API', category: 'AI/ML', level: 'advanced' },
    { name: 'GPT-4', category: 'AI/ML', level: 'advanced' },
    { name: 'Prompt Engineering', category: 'AI/ML', level: 'advanced' },
    { name: 'RAG (Retrieval-Augmented Generation)', category: 'AI/ML', level: 'advanced' },
    { name: 'Agent Orchestration', category: 'AI/ML', level: 'advanced' },
    { name: 'LangGraph', category: 'AI/ML', level: 'advanced' },
    { name: 'DSPy', category: 'AI/ML', level: 'intermediate' },
    { name: 'Azure Durable Functions', category: 'Cloud', level: 'advanced' },
    { name: 'MCP (Model Context Protocol)', category: 'AI/ML', level: 'intermediate' },
    { name: 'Whisper', category: 'AI/ML', level: 'intermediate' },
    { name: 'ElevenLabs API', category: 'AI/ML', level: 'intermediate' },
    { name: 'Structured Outputs', category: 'AI/ML', level: 'advanced' },
    { name: 'Explainable AI', category: 'AI/ML', level: 'intermediate' },
    { name: 'LLM Evaluation', category: 'AI/ML', level: 'intermediate' },
    { name: 'ChromaDB', category: 'Database', level: 'intermediate' },
    { name: 'pgvector', category: 'Database', level: 'intermediate' },
    { name: 'PostgreSQL', category: 'Database', level: 'intermediate' },
    { name: 'Function Calling / Tools', category: 'AI/ML', level: 'intermediate' },
    { name: 'Embeddings & Semantic Search', category: 'AI/ML', level: 'intermediate' },
    { name: 'LangChain', category: 'AI/ML', level: 'intermediate' },
    { name: 'Flask', category: 'Backend', level: 'intermediate' },
    { name: '.NET 8', category: 'Backend', level: 'intermediate' },
    { name: 'Pydantic', category: 'Backend', level: 'intermediate' },
    { name: 'NumPy', category: 'AI/ML', level: 'intermediate' },
    { name: 'Pandas', category: 'AI/ML', level: 'intermediate' },
    { name: 'scikit-learn', category: 'AI/ML', level: 'beginner' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'advanced' },
    { name: 'Docker', category: 'DevOps', level: 'intermediate' },
    { name: 'Git', category: 'DevOps', level: 'advanced' },
    { name: 'JavaScript', category: 'Languages', level: 'advanced' },
  ],

  experience: [
    {
      title: 'AI Engineer',
      company: "Always Enough LLC (Marisa Peer's Rapid Transformational Therapy® brand)",
      period: 'May 2026 - Present',
      location: 'South Africa · Remote',
      type: 'work',
      description: [
        'Engineering and maintaining three live production AI systems across the full engineering lifecycle',
        'Maintains an Azure Durable Functions orchestration pipeline running GPT-4-powered compliance analysis with automated structured reporting',
        'Maintains an Azure Functions scheduling system monitoring live agent availability across global timezones in real time',
        'Maintains an executive AI productivity agent on Azure VM providing automated daily digests and task orchestration',
        'Renewed Microsoft AZ-204 Azure Developer Associate certification at 92%; recognised as a Geekulcha Top 15 AI Innovator (South Africa 2026)',
        'Applies GDPR-aware data handling, secure environment configuration, and responsible AI practices across all systems',
      ],
    },
    {
      title: 'Engineer',
      company: 'EmpowaAI (Open Source)',
      period: '2025 - Present',
      location: 'Remote · Open Source',
      type: 'work',
      description: [
        'Sole developer, architect, and open source maintainer of an AI career platform, owning the full stack from infrastructure and AI microservices through to user-facing product features',
        'Built multi-step LLM workflows and agentic orchestration patterns using LangGraph and LangChain, connecting user inputs to structured career outputs',
        'Deployed and maintained production systems on Vercel and Render serving real beta users, iterating on AI features via systematic prompt evaluation',
      ],
    },
    {
      title: 'Technical Trainer (Volunteer)',
      company: 'TechBridle Foundation',
      period: '2026 - Present',
      location: 'South Africa · Remote',
      type: 'work',
      description: [
        'Trains aspiring developers in JavaScript, React, HTML/CSS, backend engineering, and AI integration including embedding LLMs into real applications',
        'Leads code review sessions, guides Git workflows, and supports learners in building and deploying portfolio projects to production',
      ],
    },
    {
      title: 'Software Engineering Intern (Part-Time)',
      company: 'Coast IT (Pty) Ltd',
      period: 'Jan 2025 - Dec 2025',
      location: 'South Africa',
      type: 'work',
      description: [
        'Contributed to feature development within an Agile/Scrum team, shipping tested code across sprint cycles with structured stand-ups and retrospectives',
        'Tested APIs, resolved production bugs, and participated in peer code reviews improving application stability on live codebases',
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
        'Conducted systematic prompt testing and model behaviour analysis across multiple domains',
      ],
      achievements: ['Improved model accuracy by 25%'],
    },
    {
      title: 'Navigation Officer',
      company: 'South African Navy',
      period: '2015 - 2021',
      location: 'South Africa',
      type: 'work',
      description: [
        'Served as a commissioned Navigation Officer in mission-critical maritime environments, responsible for vessel navigation, safety, and operational execution under strict protocol and time pressure',
        'Developed cross-functional leadership, precision decision-making, and composure under pressure — disciplines applied directly to production engineering ownership and incident response',
      ],
      achievements: ['Mentored 5+ junior officers'],
    },
    {
      title: 'Naval Officer Cadet',
      company: 'South African Navy',
      period: '2012 - 2015',
      location: 'South Africa',
      type: 'work',
      description: [
        'Completed a three-year full military officer training programme covering leadership, navigation, maritime operations, engineering systems, and command under pressure',
      ],
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
      title: 'Audio Processing & Compliance Pipeline',
      subtitle: 'Production AI Compliance Automation · Always Enough LLC',
      description:
        'Maintains an Azure Durable Functions orchestration pipeline that ingests business data, runs GPT-4-powered compliance analysis against internal guidelines, and delivers automated structured reports on a scheduled basis.',
      tech: ['Azure Durable Functions', 'GPT-4', 'Azure AI', 'Python', 'PostgreSQL', 'Structured Outputs'],
      highlights: [
        'Designed and implemented Azure Durable Function timer triggers replacing a Next.js heartbeat scheduler, improving pipeline reliability for a production sales call analysis system.',
        'Built a compliance pipeline using GPT-4 and Azure AI to automatically score sales calls against regulatory guidelines, delivering structured JSON reports with violation flagging and mandatory statement verification.',
        'Shipped a compliance filtering feature improving analysis precision by restricting processing to qualifying records, reducing noise in daily compliance outputs.',
        'Diagnosed and resolved a UniqueViolation production bug in PostgreSQL by replacing plain INSERT logic with upsert operations, eliminating duplicate record crashes in the transcription pipeline.',
      ],
      github: null,
      demo: null,
    },
    {
      title: 'Flowly Funnel Agent',
      subtitle: 'LangGraph Agent for Marketing Funnels · Always Enough LLC',
      description:
        'An AI agent that builds interactive quiz-style marketing funnels from a plain-English brief, executing real tool calls against the live Flowly MCP server rather than just describing what it would do.',
      tech: ['LangGraph', 'MCP', 'FastAPI', 'Python'],
      highlights: [
        'Thin-harness/fat-skills architecture: a lightweight LangGraph orchestrator with zero embedded domain logic, routing to 8 self-contained markdown skill files that hold all the intelligence.',
        'Skills are auto-discovered at import time by scanning for `type: agent` frontmatter — no hardcoded registration, versus a comparable in-house project hardcoding 17 agent nodes in a TypedDict.',
        'Two-tier audit system (shallow pass before deep pass) and a forced monetization gate before any funnel build.',
        'Verified live: one instruction triggers 5 real sequential tool calls against the live MCP server.',
      ],
      github: null,
      demo: null,
    },
    {
      title: 'Executive AI Productivity Agent',
      subtitle: 'Agentic Productivity System · Always Enough LLC',
      description:
        'An AI agent running on Azure VM, integrated with communication and task management platforms, providing automated daily digests and intelligent task orchestration for executive use.',
      tech: ['Azure VM', 'Python', 'Communication Platform APIs', 'Task Management APIs'],
      highlights: [
        'Maintains and develops an AI agent running on Azure VM, integrated with communication and task management platforms, providing automated daily digests and intelligent task orchestration for executive use.',
        'Responsible for feature development, bug resolution, and uptime of a mission-critical agentic productivity system.',
      ],
      github: null,
      demo: null,
    },
    {
      title: 'Scheduling Automation System',
      subtitle: 'Real-Time Agent Availability · Always Enough LLC',
      description:
        'An Azure Functions application monitoring live agent availability across multiple global timezones in real time, automatically managing booking capacity based on availability thresholds.',
      tech: ['Azure Functions', 'Python', 'Azure DevOps', 'CI/CD'],
      highlights: [
        'Maintains an Azure Functions application monitoring live agent availability across multiple global timezones in real time, automatically managing booking capacity based on availability thresholds.',
        'Onboards new agents end-to-end including configuration, integration testing, and live deployment.',
      ],
      github: null,
      demo: null,
    },
    {
      title: 'Call Note Generator',
      subtitle: 'Automated Call Transcription & Notes · Always Enough LLC',
      description:
        "Transcribes sales call recordings, generates structured closer's-template call notes, and emails them to reps — replacing manual copy-pasting of recordings into personal AI accounts.",
      tech: ['Whisper', 'Azure AI Foundry', 'FastAPI', 'Python', 'Azure Communication Services'],
      highlights: [
        'Transcribes call recordings with speaker diarization (gpt-4o-transcribe-diarize) and generates structured notes via gpt-5.4.',
        'Zero-persistence architecture — no database or file storage, built for GDPR compliance in a mental-health/coaching context.',
        'Automatic fallback from Azure content-filter blocks to OpenAI, plus PII-scrubbed logging.',
      ],
      github: null,
      demo: null,
    },
    {
      title: 'EmpowaAI',
      subtitle: 'AI Career Platform · Sole Developer · Open Source · Active Development',
      description:
        'Open source AI platform helping South African youth navigate career paths through intelligent personalisation — sole developer and maintainer responsible for full architecture, shipping, and community.',
      tech: [
        'React',
        'TypeScript',
        'Node.js',
        'FastAPI',
        'MongoDB Atlas',
        'OpenAI API',
        'RAG',
        'LangChain',
        'Embeddings',
      ],
      highlights: [
        'Designed and deployed a full-stack RAG-powered platform integrating React (TypeScript), Node.js/Express, and FastAPI AI microservices, serving real beta users end-to-end.',
        'Engineered a Digital Economic Twin using user profile embeddings and LangChain to generate personalised career insights and income pathway simulations.',
        'Architected multi-step LLM workflows connecting user inputs to structured career outputs, applying agent orchestration patterns for reliable, multi-stage reasoning.',
        'Manages the open source community on GitHub, including documentation, issue tracking, and roadmap planning.',
      ],
      demo: 'https://www.empowa.org',
      linkedin: 'https://www.linkedin.com/company/empowaai',
    },
    {
      title: 'AI Against Modern Slavery (AIMS)',
      subtitle: 'Hackathon Winner · Mila–Quebec AI Institute & QUT · International Tech Podcast Feature',
      description:
        'Built AI-driven tools assessing corporate accountability and human rights compliance at scale, analysing large volumes of corporate modern slavery disclosures using NLP and LLMs — in partnership with Mila (Quebec AI Institute) and QUT Centre for Data Science.',
      tech: [
        '.NET 8',
        'React',
        'Python',
        'Flask',
        'pgvector',
        'PostgreSQL',
        'NLP',
        'Explainable AI',
      ],
      highlights: [
        'Shipped a semantic document analysis frontend enabling analysts to query AI-powered compliance outputs across thousands of corporate disclosures.',
        'Contributed to an NLP classification pipeline applying chunking, embeddings, and retrieval to surface compliance signals from unstructured corporate text at scale.',
        'Applied prompt engineering and structured output handling to improve consistency and explainability of LLM-generated compliance assessments.',
        'Worked within a multidisciplinary team applying Explainable AI and Responsible AI principles to a cross-jurisdiction regulatory problem affecting millions of people globally.',
      ],
      github: 'https://github.com/NickiMash17/AIMS-Firefly',
      demo: null,
      award: 'Hackathon Winner · Mila x QUT Partnership · Featured on International Tech Podcast',
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
      name: 'Microsoft Certified: Azure Developer Associate (AZ-204) — renewed 2026 at 92%',
      issuer: 'Microsoft',
      type: 'certification',
    },
    {
      name: 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
      issuer: 'Microsoft',
      type: 'certification',
    },
    {
      name: 'Geekulcha Top 15 AI Innovators - South Africa 2026',
      issuer: 'Geekulcha',
      year: '2026',
      type: 'award',
    },
    {
      name: 'AWS AI Practitioner Challenge',
      issuer: 'Udacity',
      year: '2026',
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
      name: 'Hackathon Winner, AI Against Modern Slavery (AIMS) - Mila x QUT · Featured on International Tech Podcast',
      issuer: 'Mila (Quebec AI Institute) & QUT Centre for Data Science',
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
      title: 'Geekulcha Top 15 AI Innovator',
      description: 'Recognised among South Africa\'s Top 15 AI Innovators, 2026',
      year: '2026',
    },
    {
      title: 'AI Against Modern Slavery (AIMS) Hackathon Winner',
      description: 'Won hackathon in partnership with Mila (Quebec AI Institute) and QUT, applying NLP and Explainable AI to human rights compliance',
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
  return `You are Nicolette Mashaba's AI assistant, an intelligent chatbot representing an AI Engineer specializing in production LLM systems and agentic architectures. Your role is to provide accurate, helpful, and engaging information about Nicolette's skills, experience, projects, and background.

PERSONALITY & TONE:
- Professional yet friendly and approachable
- Enthusiastic about technology and software development
- Clear and concise in explanations
- Do not use emojis — keep formatting clean and professional
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
    const ai = portfolioData.skills.filter((s) => s.category === 'AI/ML').map((s) => s.name);
    
    return `**Technical Skills Overview:**

**Frontend:** ${frontend.join(', ')}
**Backend:** ${backend.join(', ')}
**Languages:** ${languages.join(', ')}
**Cloud & DevOps:** ${cloud.join(', ')}
**AI/ML:** ${ai.join(', ')}

Nicolette specializes in AI & agent engineering — LangGraph, DSPy, RAG, and Azure Durable Functions in production — backed by strong full-stack expertise in React, TypeScript, and Node.js. She's also Azure certified and experienced with mobile development using Flutter.`;
  }

  // Projects queries
  if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('build')) {
    const featuredProject = portfolioData.projects[0];
    return `**Featured Projects:**

**${featuredProject.title}** - ${featuredProject.subtitle}
${featuredProject.description}
${featuredProject.award ? `Award: ${featuredProject.award}` : ''}
Tech Stack: ${featuredProject.tech.join(', ')}

**Other Notable Projects:**
${portfolioData.projects.slice(1, 3).map((p) => `• ${p.title} - ${p.description}`).join('\n')}

Projects range from production AI pipelines to full-stack apps, spanning agentic systems, RAG, and modern tech stacks. Check out the Projects section for more details!`;
  }

  // Experience queries
  if (lowerQuery.includes('experience') || lowerQuery.includes('work history') || lowerQuery.includes('internship')) {
    const recentExp = portfolioData.experience.filter((e) => e.type === 'work').slice(0, 2);
    return `**Recent Work Experience:**

${recentExp.map((e) => `**${e.title}** at ${e.company} (${e.period})
${e.description.join('\n')}
${e.achievements ? `\nKey Achievements: ${e.achievements.join(', ')}` : ''}`).join('\n\n')}

Nicolette has diverse experience from internships at tech companies to her unique background as a Navigation Officer in the South African Navy, bringing strategic thinking and precision to software development.`;
  }

  // About/Bio queries
  if (lowerQuery.includes('about') || lowerQuery.includes('who') || lowerQuery.includes('background')) {
    return `**About Nicolette:**

${portfolioData.personal.bio}

**Key Highlights:**
${portfolioData.personal.highlights.map((h) => `• ${h}`).join('\n')}

What makes her unique is the transition from Naval Officer to AI Engineer, bringing leadership, problem-solving, and strategic thinking from military service to tech. She builds production LLM systems — agentic pipelines, RAG, and compliance automation — backed by full-stack and cloud engineering skills.`;
  }

  // Contact queries
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('linkedin') || lowerQuery.includes('github')) {
    return `**Get in Touch:**

**LinkedIn:** ${portfolioData.personal.social.linkedin}
**GitHub:** ${portfolioData.personal.social.github}
**Location:** ${portfolioData.personal.location}
**Status:** ${portfolioData.personal.status}

Feel free to connect on LinkedIn or check out her projects on GitHub!`;
  }

  // Certifications queries
  if (lowerQuery.includes('certif') || lowerQuery.includes('award') || lowerQuery.includes('achievement')) {
    return `**Certifications & Awards:**

${portfolioData.certifications.map((c) => `• ${c.name}${c.year ? ` (${c.year})` : ''}`).join('\n')}

Nicolette is Microsoft Azure certified (AZ-204 renewed at 92%, plus DP-900) and was recognised as a Geekulcha Top 15 AI Innovator and AIMS hackathon winner in partnership with Mila and QUT.`;
  }

  // Default response
  return `I'm Nicolette's AI assistant! I can help you learn about:

• **Skills & Technologies** - Her technical expertise
• **Projects** - Featured work and achievements  
• **Experience** - Work history and internships
• **About** - Background and journey
• **Contact** - How to connect

What would you like to know? Try asking about her skills, best projects, or work experience!`;
};
