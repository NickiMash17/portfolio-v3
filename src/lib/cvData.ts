/**
 * Faithful transcription of public/Nicolette_Mashaba_CV.pdf.
 * This is the single source of truth for the /cv page — when the PDF is
 * updated, update this file to match rather than letting the two drift.
 */

export const cvHeader = {
  name: 'Nicolette Mashaba',
  title: 'AI Engineer | LangGraph | MCP | RAG | Multi-Agent Systems | Python | Azure | AZ-204',
  email: 'nene171408@gmail.com',
  phone: '+27 63 152 6795',
  location: 'South Africa | Remote | Open to Relocation in Europe',
  links: {
    linkedin: 'https://linkedin.com/in/nicolette-mashaba',
    github: 'https://github.com/NickiMash17',
    portfolio: 'https://nicmash-porfolio.vercel.app',
  },
};

export const cvSummary =
  "AI Engineer with production experience building LLM applications, RAG pipelines, multi-agent architectures, and cloud-native automation systems on Microsoft Azure. Currently engineering three live production AI systems at Always Enough LLC, applying GPT-4, Azure Durable Functions, LangGraph, LangChain, DSPy, and vector search to real business operations. Recognised in the Geekulcha Top 15 AI Innovators (South Africa, 2026). AZ-204 renewed at 92% in 2026. Hackathon winner with Mila Quebec AI Institute and QUT, applying NLP and Explainable AI to human rights compliance at scale. Sole developer and open source maintainer of EmpowaAI. Open to relocation in Europe.";

export const cvStats = [
  { value: '3', label: 'Live Production AI Systems' },
  { value: '92%', label: 'AZ-204 Score' },
  { value: '6', label: 'Certifications & Recognitions' },
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const cvSkillGroups: SkillGroup[] = [
  {
    category: 'AI and LLMs',
    skills: [
      'LangGraph', 'Model Context Protocol (MCP)', 'Retrieval-Augmented Generation (RAG)',
      'Agent Orchestration', 'Multi-Agent Systems', 'LangChain', 'DSPy',
      'LLM Application Development', 'Prompt Engineering', 'Vector Databases (ChromaDB, pgvector)',
      'Embeddings', 'Semantic Search', 'OpenAI API', 'GPT-4', 'Azure Durable Functions',
      'Structured Outputs', 'Explainable AI', 'Responsible AI',
    ],
  },
  {
    category: 'Engineering',
    skills: [
      'Python', 'JavaScript', 'TypeScript', 'C#', 'SQL', 'React', 'Node.js', 'Express',
      'FastAPI', 'ASP.NET Core', 'REST API Design', 'HTML5', 'CSS3', 'Tailwind CSS',
    ],
  },
  {
    category: 'Cloud and Infrastructure',
    skills: [
      'Microsoft Azure (AZ-204)', 'Azure Functions', 'Azure Durable Functions',
      'Azure Blob Storage', 'Azure DevOps', 'Azure VM', 'Vercel', 'Render', 'Netlify', 'Docker',
    ],
  },
  {
    category: 'Evals and Ops',
    skills: [
      'LLM Evaluation', 'Prompt Versioning', 'Observability', 'API Testing', 'Postman',
      'Bug Triage', 'PR Workflows', 'CI/CD Pipelines', 'GDPR Awareness',
    ],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MongoDB Atlas', 'SQL Server', 'Firebase', 'ChromaDB', 'pgvector'],
  },
  {
    category: 'Integrations',
    skills: [
      'Third-party API integrations', 'CRM integrations', 'Webhook design',
      'Event-driven architecture', 'Asynchronous Python',
    ],
  },
  {
    category: 'Tools and Practices',
    skills: ['Git', 'GitHub', 'Azure DevOps', 'Agile', 'Scrum', 'Open Source Maintenance'],
  },
  {
    category: 'In Progress',
    skills: ['Azure DevOps Engineer Expert (AZ-400)', 'LangSmith', 'LLM Evaluation Frameworks'],
  },
];

export interface CvProject {
  title: string;
  badge?: string;
  org: string;
  description: string;
  bullets: string[];
  tech: string[];
  link?: { label: string; href: string };
}

export const cvProjects: CvProject[] = [
  {
    title: 'AI Against Modern Slavery (AIMS)',
    badge: 'Hackathon Winner · International Tech Podcast Feature',
    org: 'Mila – Quebec Artificial Intelligence Institute and QUT Centre for Data Science',
    description:
      'Applied NLP and Explainable AI to human rights compliance at scale across thousands of corporate disclosures.',
    bullets: [
      'Shipped a semantic document analysis frontend enabling analysts to query AI-powered compliance outputs across thousands of corporate disclosures.',
      'Contributed to an NLP classification pipeline applying chunking, embeddings, and retrieval to surface compliance signals from unstructured corporate text at scale.',
      'Applied prompt engineering and structured output handling to improve consistency and explainability of LLM-generated compliance assessments.',
      'Applied Explainable AI and Responsible AI principles within a multidisciplinary team solving a cross-jurisdiction human rights regulatory problem.',
    ],
    tech: ['.NET 8', 'React', 'Python', 'Flask', 'pgvector', 'PostgreSQL', 'NLP', 'Embeddings', 'Prompt Engineering', 'Explainable AI', 'Azure DevOps'],
  },
  {
    title: 'EmpowaAI',
    badge: 'Sole Developer · Open Source',
    org: 'AI Career Platform',
    description: 'Open source AI platform helping South African youth navigate career paths.',
    bullets: [
      'Designed and deployed a full-stack RAG-powered platform integrating React TypeScript, Node.js, and FastAPI AI microservices, serving real beta users end-to-end.',
      'Engineered a Digital Economic Twin using user profile embeddings and LangChain to generate personalised career insights and income pathway simulations.',
      'Built multi-step LLM workflows and agentic orchestration patterns using LangGraph and LangChain for reliable multi-stage AI reasoning.',
      'Iterated on AI features including CV analysis, interview coaching, and skill-based opportunity matching through A/B testing of prompt variants.',
      'Manages open source community on GitHub including documentation, issue tracking, contribution guidelines, and roadmap planning.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'MongoDB Atlas', 'OpenAI API', 'RAG', 'LangChain', 'LangGraph', 'Embeddings', 'Tailwind CSS', 'Vercel', 'Render'],
    link: { label: 'live: empowa-ai.co.za', href: 'https://empowa-ai.co.za' },
  },
];

export interface CvSubSystem {
  name: string;
  bullets: string[];
}

export interface CvExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  intro?: string;
  achievements?: { heading: string; bullets: string[] };
  systems?: CvSubSystem[];
  practices?: { heading: string; bullets: string[] };
  bullets?: string[];
}

export const cvExperience: CvExperience[] = [
  {
    title: 'AI Engineer',
    company: 'Always Enough LLC',
    location: 'Remote, South Africa (Dubai-headquartered company)',
    period: 'May 2026 – Present',
    current: true,
    intro:
      "Technology company behind Marisa Peer's globally recognised RTT brand. Engineering and maintaining three live production AI systems.",
    achievements: {
      heading: 'Key Achievements — First 4 Weeks',
      bullets: [
        'Renewed Microsoft AZ-204 Azure Developer Associate certification, scoring 92%.',
        'Recognised as a Geekulcha Top 15 AI Innovator in South Africa, 2026.',
        'Resolved multiple production pipeline failures, restoring system reliability across live AI workflows.',
        'Shipped a new production feature improving compliance analysis accuracy, deployed via Azure DevOps CI/CD.',
        'Onboarded a new agent into the production system end-to-end, from configuration to live deployment.',
      ],
    },
    systems: [
      {
        name: 'Audio Processing and Compliance Pipeline',
        bullets: [
          'Maintains an Azure Durable Functions pipeline that ingests business data, runs GPT-4 compliance analysis against internal guidelines, and delivers automated structured reports to internal teams.',
          'Shipped a compliance filtering feature improving analysis precision and reducing noise in daily outputs.',
        ],
      },
      {
        name: 'Scheduling Automation System',
        bullets: [
          'Maintains an Azure Functions application monitoring live agent availability across multiple global timezones, automatically managing booking capacity based on real-time thresholds.',
          'Onboards new agents end-to-end including configuration, integration testing, and live deployment.',
        ],
      },
      {
        name: 'Executive AI Productivity Agent',
        bullets: [
          'Maintains an AI agent running on Azure VM integrated with communication and task management platforms, providing automated daily digests and intelligent task orchestration for executive use.',
          'Responsible for feature development, bug resolution, and uptime of a mission-critical agentic productivity system.',
        ],
      },
    ],
    practices: {
      heading: 'Engineering Practices',
      bullets: [
        'Resolves production bugs across live pipelines, raising pull requests via Azure DevOps CI/CD across Azure Functions, Blob Storage, and cloud PostgreSQL.',
        'Applies GDPR-aware data handling, secure environment configuration, and responsible AI practices across all systems.',
      ],
    },
  },
  {
    title: 'Engineer',
    company: 'EmpowaAI',
    location: 'Remote, Open Source',
    period: '2025 – Present',
    bullets: [
      'Sole developer, architect, and open source maintainer of an AI career platform, owning the full stack from infrastructure and AI microservices through to user-facing product features.',
      'Built multi-step LLM workflows and agentic orchestration patterns using LangGraph and LangChain, connecting user inputs to structured outputs through reliable multi-stage reasoning.',
      'Deployed and maintained production systems on Vercel and Render serving real beta users, iterating on AI features based on user feedback and prompt evaluation.',
    ],
  },
  {
    title: 'Technical Trainer (Volunteer)',
    company: 'TechBridle Foundation',
    location: 'South Africa, Remote',
    period: '2026 – Present',
    bullets: [
      'Trains aspiring developers in JavaScript, React, backend engineering, and AI integration, including coding with AI tools and embedding LLMs into applications.',
      'Introduces learners to Agile development practices including sprint planning, task management, and collaborative engineering workflows.',
      'Leads code reviews, guides Git workflows, and supports learners in building and deploying portfolio projects from concept through to production.',
    ],
  },
  {
    title: 'Software Engineering Intern (Part-Time)',
    company: 'Coast IT (Pty) Ltd',
    location: 'South Africa',
    period: 'Jan 2025 – Dec 2025',
    bullets: [
      'Contributed to feature development in an Agile/Scrum team, shipping tested code across sprint cycles with daily stand-ups and retrospectives.',
      'Tested APIs, resolved production bugs, and participated in peer code reviews improving application stability on live codebases.',
    ],
  },
  {
    title: 'AI Model Trainer',
    company: 'Outlier AI',
    location: 'Remote',
    period: '2024',
    bullets: [
      'Evaluated LLM-generated outputs and improved response quality through structured feedback, identifying failure patterns that improved model reliability.',
      'Conducted systematic prompt testing and model behaviour analysis across multiple domains.',
    ],
  },
  {
    title: 'Navigation Officer',
    company: 'South African Navy',
    location: 'South Africa',
    period: '2015 – 2021',
    bullets: [
      'Served as a commissioned Navigation Officer responsible for vessel navigation, safety, and operational execution in mission-critical maritime environments.',
      'Built cross-functional leadership, precision decision-making, and composure under pressure, skills now applied directly to production engineering and incident response.',
    ],
  },
  {
    title: 'Naval Officer Cadet',
    company: 'South African Navy',
    location: 'South Africa',
    period: '2012 – 2015',
    bullets: [
      'Completed a three-year military officer training programme covering leadership, navigation, maritime operations, engineering systems, and command under pressure.',
    ],
  },
];

export const cvCertifications = [
  'Microsoft Certified: Azure Developer Associate (AZ-204) — renewed 2026, scored 92%',
  'Microsoft Certified: Azure Data Fundamentals (DP-900)',
  'Geekulcha Top 15 AI Innovators — South Africa, 2026',
  'AWS AI Practitioner Challenge — Udacity, June 2026',
  'J.P. Morgan Software Engineering Virtual Experience',
  'Azure DevOps Engineer Expert (AZ-400) — in active development',
];

export const cvEducation = [
  {
    title: 'Occupational Certificate: Software Engineering (NQF Level 6)',
    org: 'CTU Training Solutions, South Africa',
    year: '2026',
  },
  {
    title: 'Information Technology: Programming Foundations (NQF Level 4)',
    org: 'CTU Training Solutions, South Africa',
    year: '2024',
  },
];
