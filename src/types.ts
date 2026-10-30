export type ThemeMode = 'dark' | 'light' | 'neon' | 'cyber' | 'purple' | 'blue';

export type PageId = 'home' | 'about' | 'projects' | 'services' | 'blog' | 'contact';

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Architecture' | 'Linux' | 'Cloud' | 'AI Tools';
  level: number; // 0-100
  iconName: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Full Stack' | '3D & WebGL' | 'AI & Cloud' | 'UI/UX';
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  metrics?: string;
  galleryImages?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  description: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  type: 'University' | 'College' | 'Course' | 'Certification' | 'Diploma';
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  image: string;
  verifyUrl: string;
  skillsVerified: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface TechStackItem {
  name: string;
  category: string;
  icon: string;
  proficiency: string;
  color: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

export interface BlogItem {
  id: string;
  title: string;
  category: 'Full Stack' | 'Programming' | 'Cloud' | 'AI';
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceProject: number;
  popular?: boolean;
  description: string;
  features: string[];
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  badgeIcon: string;
  description: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface AvailabilitySlot {
  date: string;
  time: string;
  available: boolean;
}
