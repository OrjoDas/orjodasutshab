import {
  SkillItem,
  ServiceItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CertificateItem,
  TestimonialItem,
  TechStackItem,
  GalleryItem,
  BlogItem,
  PricingPlan,
  FaqItem,
  AchievementItem,
} from '../types';

import avatarImg from '../assets/images/orjo_avatar_1785358591560.jpg';

export const PERSONAL_INFO = {
  name: 'Orjo Das Utshab',
  professions: [
    'Senior Full Stack Web Developer',
    'React & Next.js Specialist',
    'Creative 3D Web Architect',
    'Node.js & Cloud Solutions Engineer',
    'DevOps & System Architect',
  ],
  bio: 'Passionate Senior Full Stack Developer & 3D Web Architect with 5+ years of experience building scalable, high-performance web applications, responsive user interfaces, and immersive interactive web experiences. Skilled in modern JavaScript/TypeScript ecosystems, React, Node.js, Next.js, Three.js, and cloud deployments.',
  avatar: 'https://i.ibb.co.com/DgKPSTnX/Chat-GPT-Image-Jul-30-2026-03-18-23-AM.png',
  location: 'Dhaka, Bangladesh (Available Worldwide Remote)',
  email: 'orjodasutshab@gmail.com',
  phone: '+880 1700-000000',
  stats: {
    yearsExperience: 5,
    completedProjects: 120,
    happyClients: 85,
    coffeeCups: 1450,
    awardsCount: 18,
  },
  socials: {
    github: 'https://github.com/orjodasutshab',
    linkedin: 'https://linkedin.com/in/orjodasutshab',
    facebook: 'https://facebook.com/orjodasutshab',
    instagram: 'https://instagram.com/orjodasutshab',
    twitter: 'https://twitter.com/orjodasutshab',
    youtube: 'https://youtube.com/@orjodasutshab',
    discord: 'https://discord.gg/orjodasutshab',
    telegram: 'https://t.me/orjodasutshab',
  },
};

export const SKILLS_DATA: SkillItem[] = [
  // Frontend
  { name: 'React.js & Next.js', category: 'Frontend', level: 96, iconName: 'Code', description: 'App Router, Server Components, Custom Architecture & State Management' },
  { name: 'TypeScript', category: 'Frontend', level: 92, iconName: 'FileCode', description: 'Strict Typing, Generics, Complex Interfaces & Design Patterns' },
  { name: 'Tailwind CSS & Motion', category: 'Frontend', level: 96, iconName: 'Palette', description: 'Utility-first styling, 3D CSS transforms, Framer/Motion animations' },
  { name: 'Three.js & WebGL', category: 'Frontend', level: 88, iconName: 'Boxes', description: 'Interactive 3D particle systems, lighting, shaders, and geometry' },

  // Backend
  { name: 'Node.js & Express', category: 'Backend', level: 94, iconName: 'Server', description: 'Scalable REST APIs, WebSockets, microservices, and middleware design' },
  { name: 'Python (FastAPI / Django)', category: 'Backend', level: 90, iconName: 'Terminal', description: 'AI API wrappers, data pipelines, automation scripts' },
  { name: 'Java (Spring Boot)', category: 'Backend', level: 82, iconName: 'Cpu', description: 'Enterprise object-oriented applications, auth management & ORM' },

  // Database
  { name: 'MongoDB', category: 'Database', level: 92, iconName: 'Database', description: 'Document schemas, aggregation pipelines, replica indexing' },
  { name: 'PostgreSQL / MySQL', category: 'Database', level: 90, iconName: 'Database', description: 'Relational query optimization, triggers, transactions, Drizzle & Prisma ORM' },
  { name: 'Redis Cache', category: 'Database', level: 86, iconName: 'Zap', description: 'In-memory caching, rate-limiting, message queues' },

  // DevOps & Architecture
  { name: 'REST & GraphQL Architecture', category: 'DevOps & Architecture', level: 95, iconName: 'Network', description: 'Scalable API contracts, WebSockets, rate limiting, and microservices design' },
  { name: 'CI/CD & Cloud Workflows', category: 'DevOps & Architecture', level: 92, iconName: 'Command', description: 'GitHub Actions, automated build pipelines, containerized deployments & SSL' },
  { name: 'Performance & Web Vitals', category: 'DevOps & Architecture', level: 96, iconName: 'Zap', description: 'Sub-second TTFB, code-splitting, asset compression, and 95+ Lighthouse score' },

  // Linux
  { name: 'Ubuntu / RedHat Enterprise', category: 'Linux', level: 95, iconName: 'Terminal', description: 'Server administration, systemd, IPTables, SSH key management & cron automation' },
  { name: 'Bash & Shell Scripting', category: 'Linux', level: 92, iconName: 'Command', description: 'Automated backup scripts, devops workflows, automated system maintenance' },

  // Cloud
  { name: 'AWS & Cloud Run', category: 'Cloud', level: 88, iconName: 'Cloud', description: 'EC2, S3, IAM, CloudFront, Cloud Run container deployments & SSL configuration' },
  { name: 'Docker & Kubernetes', category: 'Cloud', level: 89, iconName: 'Container', description: 'Containerization, multi-stage builds, docker-compose & cluster setup' },

  // AI Tools
  { name: 'Gemini AI API & SDK', category: 'AI Tools', level: 94, iconName: 'Sparkles', description: 'Server-side LLM integration, function calling, multimodal RAG, and live AI bots' },
  { name: 'OpenAI & LangChain', category: 'AI Tools', level: 88, iconName: 'Bot', description: 'Embeddings, prompt engineering, custom vector search tools' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    icon: 'Layers',
    shortDesc: 'End-to-end web applications with ultra-fast React frontends and secure Node.js/Python backends.',
    fullDesc: 'Building custom enterprise-ready web applications, SaaS platforms, and eCommerce portals with responsive designs, real-time database sync, and high security standard.',
    deliverables: ['Custom React/Next.js UI', 'RESTful / GraphQL APIs', 'Database Design & Migration', '100% Mobile Responsive', 'SEO Optimization'],
    popular: true,
  },
  {
    id: 'webdesign',
    title: 'Modern Web Design',
    icon: 'Layout',
    shortDesc: 'Eye-catching glassmorphism, 3D interactive elements, and liquid animations that convert visitors.',
    fullDesc: 'Crafting pixel-perfect visual interfaces with fluid typography, smooth micro-interactions, dark/light themes, and interactive 3D particle elements.',
    deliverables: ['Responsive Figma Layouts', 'Tailwind & Motion Code', 'Interactive 3D Objects', 'Custom Micro-animations'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Architecture',
    icon: 'Component',
    shortDesc: 'User-first interface design focusing on conversion, intuitive navigation, and accessibility.',
    fullDesc: 'Wireframing, user journey mapping, and prototyping to ensure frictionless user flow across all desktop and mobile devices.',
    deliverables: ['Interactive Prototypes', 'Design System & UI Library', 'User Journey Maps', 'Usability Testing'],
  },
  {
    id: 'saasarch',
    title: 'SaaS Platform Architecture',
    icon: 'Layers',
    shortDesc: 'Full-cycle SaaS applications with subscription billing, admin panels, and multi-tenancy.',
    fullDesc: 'Architecting robust Software-as-a-Service platforms featuring user role-based access, stripe subscription webhooks, automated invoicing, and real-time dashboard analytics.',
    deliverables: ['Custom SaaS Dashboard', 'Stripe Billing & Invoicing', 'Role-Based Access Control', 'Multi-tenant Data Model'],
    popular: true,
  },
  {
    id: 'apiperformance',
    title: 'High-Performance Web Apps',
    icon: 'Zap',
    shortDesc: 'Sub-second page speeds, Google PageSpeed 95+ scores, and fluid 60FPS UI animations.',
    fullDesc: 'Refactoring web applications for lightning-fast responsiveness, server-side caching with Redis, lazy loading, edge network distribution, and Core Web Vitals optimization.',
    deliverables: ['95+ PageSpeed Audit', 'Edge Cache Setup', 'Code Splitting & Bundle Tuning', 'Smooth 60FPS Animations'],
  },
  {
    id: 'linuxserver',
    title: 'Linux Server & Cloud DevOps',
    icon: 'Server',
    shortDesc: 'Linux server administration, Nginx tuning, SSL security, and automated backup setups.',
    fullDesc: 'Deploying and optimizing Ubuntu, Debian, and RedHat servers with automated updates, SSH key enforcement, and reverse proxy caching.',
    deliverables: ['Server Setup & SSL', 'Nginx Load Balancing', 'Automated Shell Backups', 'Docker Deployment'],
  },
  {
    id: 'seo',
    title: 'Technical SEO Optimization',
    icon: 'TrendingUp',
    shortDesc: 'Speeding up web apps to 95+ Google Lighthouse scores and boosting search engine rankings.',
    fullDesc: 'Optimizing Core Web Vitals, dynamic OpenGraph meta tags, sitemap generation, structured schema markup, and image compression.',
    deliverables: ['Google PageSpeed 95+ Audit', 'Schema Markup Integration', 'Technical Sitemap & Robots.txt', 'Keyword Strategy'],
  },
  {
    id: 'itsupport',
    title: 'IT Support & Cloud DevOps',
    icon: 'Headphones',
    shortDesc: 'AWS, Docker, CI/CD pipeline configuration, domain management, and 24/7 server monitoring.',
    fullDesc: 'Streamlining deployment workflows with GitHub Actions, Docker containers, SSL setup, and infrastructure troubleshooting.',
    deliverables: ['Docker & Compose Setup', 'CI/CD Automation Pipelines', 'DNS & Domain Setup', 'System Health Monitoring'],
  },
  {
    id: 'graphicdesign',
    title: 'Graphic & Brand Design',
    icon: 'Image',
    shortDesc: 'Futuristic vector graphics, tech logos, promotional banners, and social media branding kit.',
    fullDesc: 'Creating visual identity assets, neon logo marks, vector illustrations, and high-impact visual banners.',
    deliverables: ['Vector Logo Formats', 'Social Media Branding Kit', 'Custom Banner Graphics', 'Brand Color Palette'],
  },
  {
    id: 'digitalmarketing',
    title: 'Digital Marketing & Growth',
    icon: 'Globe',
    shortDesc: 'Data-driven marketing campaigns, tech product launch strategy, and social media conversion ads.',
    fullDesc: 'Strategic digital marketing for SaaS products, tech startups, and freelance services to drive organic and paid traffic.',
    deliverables: ['Campaign Setup & Funnels', 'Social Media Strategy', 'Analytics & Pixel Tracking', 'Monthly ROI Reports'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'cloudscale-saas',
    title: 'CloudScale - Multi-Tenant Real-Time Cloud Analytics SaaS',
    category: 'Full Stack',
    description: 'A real-time metrics dashboard monitoring cloud server workloads, API response latencies, database query performance, and user traffic.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'Chart.js'],
    liveUrl: 'https://cloudscale-demo.example.com',
    githubUrl: 'https://github.com/orjodasutshab/cloudscale-analytics-saas',
    featured: true,
    metrics: 'Processed 500,000+ API metrics / day with 99.99% uptime',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'ai-code-auditor',
    title: 'DevGuard - Gemini AI Powered Code Review & Architecture Engine',
    category: 'AI & Cloud',
    description: 'Serverless application that scans GitHub repositories for code refactoring, automated unit test generation, and optimal architectural suggestions.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tags: ['TypeScript', 'Gemini API', 'Express', 'Docker', 'Motion'],
    liveUrl: 'https://devguard-ai.example.com',
    githubUrl: 'https://github.com/orjodasutshab/devguard-ai-scanner',
    featured: true,
    metrics: '90% faster code review cycle for development teams',
    galleryImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'nexus-ecommerce',
    title: 'NexusCommerce - 3D Interactive Web Hardware Marketplace',
    category: '3D & WebGL',
    description: 'An ultra-fast e-commerce platform featuring 3D product previews with Three.js, instant search, dynamic cart, and secure Stripe payments.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Three.js', 'MongoDB', 'Node.js', 'Tailwind', 'Stripe'],
    liveUrl: 'https://nexuscommerce.example.com',
    githubUrl: 'https://github.com/orjodasutshab/nexus-3d-ecommerce',
    featured: true,
    metrics: '$250k+ processed in demo transactions with 99.9% uptime',
  },
  {
    id: 'linux-manager',
    title: 'LinuxPulse - Web-Based Multi-Server Manager',
    category: 'Full Stack',
    description: 'Lightweight web management console for Linux Ubuntu/RedHat servers featuring SSH terminal execution, CPU/RAM monitoring, and Nginx site manager.',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    tags: ['Linux', 'Bash', 'WebSockets', 'React', 'Node.js', 'Tailwind'],
    liveUrl: 'https://linuxpulse.example.com',
    githubUrl: 'https://github.com/orjodasutshab/linuxpulse-manager',
    featured: false,
  },
  {
    id: 'crypto-track',
    title: 'CryptoNeuron - Real-Time Crypto Analytics & AI Signals',
    category: 'Full Stack',
    description: 'Live crypto market dashboard streaming prices via WebSockets with technical chart patterns and AI-driven sentiment analysis.',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Recharts', 'FastAPI', 'WebSockets', 'Tailwind'],
    liveUrl: 'https://cryptoneuron.example.com',
    githubUrl: 'https://github.com/orjodasutshab/cryptoneuron-dashboard',
    featured: false,
  },
  {
    id: 'smart-clinic',
    title: 'HealthPulse - Telemedicine & Patient Portal',
    category: 'Full Stack',
    description: 'Healthcare appointment scheduling app with real-time video consultation room and lab report storage.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'Tailwind'],
    liveUrl: 'https://healthpulse.example.com',
    githubUrl: 'https://github.com/orjodasutshab/healthpulse-telemed',
    featured: false,
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Full Stack & Cloud Solutions Engineer',
    company: 'TechShield Solutions Ltd.',
    period: '2023 - Present',
    location: 'Dhaka, Bangladesh',
    logo: 'Server',
    description: [
      'Architected end-to-end full stack web platforms using React, Node.js, and MongoDB serving 200,000+ active monthly users.',
      'Led frontend performance optimization and microservices integration, improving API response times by 65% across distributed cloud instances.',
      'Automated Linux server deployments on Cloud Run and AWS EC2 with Docker containers and GitHub Actions CI/CD.',
    ],
    skillsUsed: ['React', 'Next.js', 'Node.js', 'Docker', 'Linux', 'AWS', 'Gemini AI'],
  },
  {
    id: 'exp-2',
    role: 'Senior Full Stack Web Developer',
    company: 'ByteCraft Innovation Agency',
    period: '2021 - 2023',
    location: 'Remote',
    logo: 'Code',
    description: [
      'Developed 50+ custom web apps for global clients across USA, Europe, and Asia with 98% client satisfaction rate.',
      'Implemented robust OAuth2, JWT authentication, and high-performance PostgreSQL database schemas for large-scale SaaS.',
      'Boosted web application core web vitals and speed performance by an average of 45%.',
    ],
    skillsUsed: ['TypeScript', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Redis', 'GraphQL'],
  },
  {
    id: 'exp-3',
    role: 'Junior Full Stack Developer',
    company: 'NexGen Software Solutions',
    period: '2019 - 2021',
    location: 'Dhaka, Bangladesh',
    logo: 'Terminal',
    description: [
      'Built responsive UI components using React, Redux, and RESTful API integrations.',
      'Configured Linux server environments, SSL certificates, Nginx reverse proxies, and automated backup cron jobs.',
    ],
    skillsUsed: ['JavaScript', 'React', 'Node.js', 'MySQL', 'Linux Ubuntu', 'Nginx'],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.Sc. in Computer Science & Engineering (CSE)',
    institution: 'Dhaka University of Engineering & Technology (DUET)',
    period: '2018 - 2022',
    type: 'University',
    description: 'Major in Software Engineering & Distributed Systems. Thesis on Machine Learning for Web Traffic Optimization. CGPA: 3.85 / 4.00.',
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary Certificate (HSC) in Science',
    institution: 'Dhaka College',
    period: '2016 - 2018',
    type: 'College',
    description: 'Focus on Mathematics, Physics, and Information & Communication Technology (ICT). GPA 5.00 / 5.00.',
  },
  {
    id: 'edu-3',
    degree: 'Meta Certified Professional Full Stack Developer',
    institution: 'Meta / Coursera',
    period: '2022',
    type: 'Certification',
    description: 'Mastery in frontend architecture, React, backend APIs, data structures, and database engineering.',
  },
  {
    id: 'edu-4',
    degree: 'AWS Certified Solutions Architect - Associate',
    institution: 'Amazon Web Services',
    period: '2023',
    type: 'Course',
    description: 'Deep understanding of cloud architecture, serverless computing, VPCs, IAM policies, and S3 storage.',
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-meta-fs',
    title: 'Meta Certified Senior Full Stack Engineer',
    issuer: 'Meta Inc.',
    issueDate: 'August 2022',
    credentialId: 'META-FS-982104',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    verifyUrl: 'https://coursera.org/verify/meta-fs',
    skillsVerified: ['React.js', 'Node.js', 'Full Stack Architecture', 'REST APIs'],
  },
  {
    id: 'cert-aws',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'January 2023',
    credentialId: 'AWS-SA-778912',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    verifyUrl: 'https://aws.amazon.com/verification',
    skillsVerified: ['Cloud Infrastructure', 'EC2 & S3', 'Serverless', 'VPC & Microservices'],
  },
  {
    id: 'cert-redhat',
    title: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat Inc.',
    issueDate: 'November 2023',
    credentialId: 'RHCSA-200192',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80',
    verifyUrl: 'https://redhat.com/verify',
    skillsVerified: ['Linux System Administration', 'Bash Shell', 'SELinux', 'User Management'],
  },
  {
    id: 'cert-fullstack',
    title: 'Advanced Full Stack Web Architect',
    issuer: 'Meta / Coursera',
    issueDate: 'May 2021',
    credentialId: 'META-FS-881293',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    verifyUrl: 'https://coursera.org/verify/META-FS',
    skillsVerified: ['React.js', 'Node.js', 'System Architecture', 'Database Engineering'],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Robert Vance',
    role: 'CTO',
    company: 'FinTech Cloud Inc., USA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Orjo transformed our Web application speed, reduced page load times under 0.8s, and implemented clean scalable code. His mastery in Full Stack and 3D Web architecture is exceptionally rare and invaluable!',
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'Founder & CEO',
    company: 'SaaSify Studio, UK',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Working with Orjo was a breeze! He built our entire React 3D product showcase in less than 3 weeks. Communication was top-tier and the design standard blew us away.',
  },
  {
    id: 'test-3',
    name: 'Michael Zhang',
    role: 'VP of Engineering',
    company: 'CloudPulse Technologies, Singapore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Orjo modernized our cloud infrastructure, optimized microservices response times, and automated our Linux deployments. Absolute pro full stack developer!',
  },
  {
    id: 'test-4',
    name: 'Amina Rahman',
    role: 'Product Lead',
    company: 'InnovateBD, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Orjo Das Utshab is one of the brightest full stack talents in Bangladesh. His attention to design detail, clean code, and production reliability is world-class.',
  },
];

export const TECH_STACK_DATA: TechStackItem[] = [
  { name: 'HTML5', category: 'Frontend', icon: 'Code', proficiency: 'Expert (98%)', color: '#E34F26' },
  { name: 'CSS3 / Tailwind', category: 'Frontend', icon: 'Palette', proficiency: 'Expert (98%)', color: '#38BDF8' },
  { name: 'JavaScript ES6+', category: 'Frontend', icon: 'FileCode', proficiency: 'Expert (96%)', color: '#F7DF1E' },
  { name: 'React.js', category: 'Frontend', icon: 'Atom', proficiency: 'Expert (95%)', color: '#61DAFB' },
  { name: 'Node.js', category: 'Backend', icon: 'Server', proficiency: 'Expert (94%)', color: '#5FA04E' },
  { name: 'Python', category: 'Language', icon: 'Terminal', proficiency: 'Advanced (90%)', color: '#3776AB' },
  { name: 'Java', category: 'Language', icon: 'Cpu', proficiency: 'Proficient (82%)', color: '#007396' },
  { name: 'Docker', category: 'DevOps', icon: 'Box', proficiency: 'Advanced (89%)', color: '#2496ED' },
  { name: 'Linux', category: 'OS', icon: 'Terminal', proficiency: 'Expert (95%)', color: '#FCC624' },
  { name: 'Git & GitHub', category: 'DevOps', icon: 'GitBranch', proficiency: 'Expert (96%)', color: '#F05032' },
  { name: 'MongoDB', category: 'Database', icon: 'Database', proficiency: 'Advanced (92%)', color: '#47A248' },
  { name: 'MySQL / Postgres', category: 'Database', icon: 'Database', proficiency: 'Advanced (90%)', color: '#4479A1' },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '3D Web Interface Architecture',
    category: 'UI/UX',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    caption: 'Futuristic glassmorphism SaaS platform layout with interactive metrics.',
  },
  {
    id: 'gal-2',
    title: 'Cloud Infrastructure Analytics Hub',
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    caption: 'Live microservices health and load balancing cluster console.',
  },
  {
    id: 'gal-3',
    title: 'E-Commerce 3D Product View',
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    caption: 'Web-based 3D hardware canvas with custom dynamic lighting.',
  },
  {
    id: 'gal-4',
    title: 'Linux Terminal Automation',
    category: 'Linux & Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    caption: 'WebSSH terminal console with script execution & container management.',
  },
  {
    id: 'gal-5',
    title: 'AI Code Review Engine',
    category: 'AI Tools',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    caption: 'Automated code review & refactoring engine powered by Gemini API.',
  },
  {
    id: 'gal-6',
    title: 'Cryptocurrency Analytics Portal',
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    caption: 'Real-time charting canvas streaming WebSocket trade ticks.',
  },
];

export const BLOG_DATA: BlogItem[] = [
  {
    id: 'blog-1',
    title: 'How to Build Scalable & High-Speed React & Node.js Web Applications',
    category: 'Full Stack',
    excerpt: 'A comprehensive architecture guide for full stack developers on building responsive React frontends, high-throughput Express backends, and caching strategies.',
    content: `
### Modern Web Architecture in 2026
Building web applications today requires ultra-fast responsiveness, modular code architecture, and bulletproof reliability. In this article, Orjo Das Utshab shares core architectural strategies for modern full-stack systems.

#### 1. Server-Side Optimization & Caching
Utilize in-memory caches like Redis to cache high-frequency database reads and reduce database query load by up to 80%.

#### 2. Component Code-Splitting & Lazy Loading
Ensure your initial bundle size remains under 100KB by implementing dynamic imports and route-based code splitting in React and Next.js.

#### 3. Database Indexing & ORM Efficiency
Structure composite indexes properly in PostgreSQL and MongoDB to guarantee sub-20ms query execution times even under high concurrent loads.

#### Conclusion
By combining modular TypeScript patterns, Redis caching, and responsive Tailwind styling, you can deliver web applications with 99+ Google Lighthouse scores.
`,
    date: 'July 15, 2026',
    readTime: '6 min read',
    author: 'Orjo Das Utshab',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-2',
    title: 'Building Interactive 3D Web Apps with Three.js & React Motion',
    category: 'Programming',
    excerpt: 'Step-by-step tutorial on integrating 3D particle meshes, light reflection, and smooth spring physics into your modern developer portfolio.',
    content: `
### Bringing Web Apps to Life with 3D
Static websites belong to the past. Today's modern web user expects immersive, fluid, responsive 3D environments that feel alive under their cursor.

#### Key Principles for 3D Performance:
1. **Reuse Geometries & Materials**: Never instantiate new Mesh3D objects in requestAnimationFrame loops.
2. **Dynamic Resize Observer**: Always hook window and canvas container resize events using standard ResizeObserver.
3. **Cap Pixel Ratios**: Restrict WebGL renderer pixel ratio to \`Math.min(window.devicePixelRatio, 2)\` to keep GPU usage smooth on high-DPI retina screens.

#### Integrating with React & Framer Motion
Combine Three.js canvas backgrounds with Framer Motion spring physics for smooth, non-blocking UI overlays!
`,
    date: 'June 28, 2026',
    readTime: '8 min read',
    author: 'Orjo Das Utshab',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-3',
    title: 'Deploying Production Cloud Apps with Docker & Nginx Reverse Proxy',
    category: 'Cloud',
    excerpt: 'Essential cloud deployment checklist for Ubuntu and AWS servers including multi-stage Docker builds, Nginx load balancing, and SSL configuration.',
    content: `
### Production Deployment Checklist
Deploying your app to Cloud Run, AWS, or DigitalOcean? Make sure your container setup is optimized:

1. **Multi-Stage Docker Builds**: Keep production images lean (< 150MB) by separating build dependencies from the runtime container.
2. **Nginx Reverse Proxy**: Offload SSL termination, enable gzip/brotli compression, and proxy requests to backend Node.js clusters.
3. **Automated CI/CD**: Use GitHub Actions to run automated testing suites and deploy containers seamlessly on every merge.
4. **Environment Configuration**: Always store environment variables securely using cloud secret managers.
`,
    date: 'May 10, 2026',
    readTime: '5 min read',
    author: 'Orjo Das Utshab',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
  },
];

export const PRICING_DATA = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: '$999/proj',
    priceMonthly: '$499/mo',
    description: 'Perfect for small businesses, personal branding, and portfolio websites requiring high speed and modern aesthetics.',
    features: [
      'Up to 5 Responsive Pages / Sections',
      'Modern React / Tailwind Design',
      'Basic SEO & Meta Tag Optimization',
      'Contact Form with Email Notifications',
      'Mobile & Tablet Responsive',
      '1 Month Free Technical Support',
    ],
    badge: 'Starter',
  },
  {
    id: 'standard',
    name: 'Standard Package',
    price: '$2,499/proj',
    priceMonthly: '$1,299/mo',
    popular: true,
    description: 'Ideal for growing businesses, startups, and web apps requiring full stack database integration & 3D elements.',
    features: [
      'Full Stack Web Application (React + Node.js)',
      'Custom Database Architecture (MongoDB / SQL)',
      'Interactive 3D Canvas / Motion Animations',
      'AI Assistant & Gemini API Integration',
      'Performance & Web Vitals Optimization',
      'Admin Dashboard & CMS Panel',
      '3 Months Free Server & Cloud Support',
    ],
    badge: 'Most Popular',
  },
  {
    id: 'premium',
    name: 'Enterprise SaaS & Cloud Package',
    price: '$5,999/proj',
    priceMonthly: '$2,999/mo',
    description: 'For mission-critical enterprise applications, complex SaaS products, and high-concurrency cloud systems.',
    features: [
      'Custom Full Stack SaaS Platform Architecture',
      'High-Concurrency Load Testing & Scalability Tuning',
      'Linux Server Setup & CI/CD Pipeline Deployment',
      'Custom AI Agent & Smart Proposal Integrations',
      'Dedicated 24/7 Priority Support',
      '1 Year Free Updates & Server Maintenance',
    ],
    badge: 'Full Suite',
  },
];

export const PRICING_PLANS = PRICING_DATA;

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Services & Work',
    question: 'What tech stack do you specialize in?',
    answer: 'I specialize in full-stack development using React, Next.js, TypeScript, Node.js, Express, Python, MongoDB, PostgreSQL, Three.js 3D WebGL, and Linux cloud server management.',
  },
  {
    category: 'Services & Work',
    question: 'Can you optimize and scale my existing web application?',
    answer: 'Yes! I offer complete web architecture reviews, Core Web Vitals optimization, database query tuning, and cloud deployment on AWS / Cloud Run.',
  },
  {
    category: 'Hiring & Process',
    question: 'Are you available for freelance projects and remote full-time roles?',
    answer: 'Yes, I am currently available for freelance projects, contract consulting, and long-term remote full-time opportunities with companies worldwide.',
  },
  {
    category: 'Hiring & Process',
    question: 'How do project payments and milestones work?',
    answer: 'For fixed projects, work is divided into transparent milestones (e.g. 30% upfront deposit, 40% demo milestone, 30% final deployment). Payments can be handled securely via invoice, wire transfer, or Stripe.',
  },
  {
    category: 'Support & Maintenance',
    question: 'Do you provide post-launch support and server maintenance?',
    answer: 'Absolutely. Every package includes dedicated post-launch support. I also offer monthly maintenance retainers for server updates, backups, and performance monitoring.',
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-1',
    title: '1st Place Winner - National Full-Stack Web Hackathon 2024',
    organization: 'Bangladesh ICT Division',
    year: '2024',
    badgeIcon: 'Trophy',
    description: 'Secured first rank out of 150+ competing teams by developing an end-to-end real-time AI SaaS collaborative workspace.',
  },
  {
    id: 'ach-2',
    title: 'Top 1% Global Open Source Contributor',
    organization: 'Developer Community',
    year: '2023',
    badgeIcon: 'Award',
    description: 'Recognized for impactful contributions to popular modern React, Next.js, and TypeScript open source ecosystems.',
  },
  {
    id: 'ach-3',
    title: 'Best Developer Award',
    organization: 'TechShield Innovation Summit',
    year: '2023',
    badgeIcon: 'Award',
    description: 'Awarded for outstanding contribution to building high-throughput, low-latency React & Node.js microservices.',
  },
  {
    id: 'ach-4',
    title: 'AWS Certified Solutions Architect Honor Roll',
    organization: 'AWS Community',
    year: '2023',
    badgeIcon: 'CheckCircle2',
    description: 'Scored in top percentile globally during the AWS Solutions Architect professional assessment.',
  },
];

export const MAP_MARKERS = [
  { id: 'dhaka', name: 'Dhaka, Bangladesh', lat: 23.8103, lng: 90.4125, role: 'Primary Base & Lab', active: true },
  { id: 'london', name: 'London, UK', lat: 51.5074, lng: -0.1278, role: 'Client SaaS Project', active: false },
  { id: 'ny', name: 'New York, USA', lat: 40.7128, lng: -74.006, role: 'FinTech Web App Client', active: false },
  { id: 'tokyo', name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, role: 'Cloud Infrastructure Client', active: false },
  { id: 'sydney', name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, role: 'Remote App Consulting', active: false },
];
