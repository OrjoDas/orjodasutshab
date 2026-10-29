import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Resume & Portfolio Knowledge Base for AI Assistant
const PORTFOLIO_CONTEXT = `
You are DevBot 2.0, the personal AI Assistant for Orjo Das Utshab.
Orjo Das Utshab is a Senior Full Stack Web Developer, 3D Web Architect (Three.js/WebGL), and Cloud & AI Solutions Engineer based in Dhaka, Bangladesh (available for global remote work).

Key Details:
- Name: Orjo Das Utshab
- Experience: 5+ Years in Full Stack Web Development & High-Performance Web Applications
- Education: B.Sc in Computer Science & Engineering
- Core Skills:
  * Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS, Motion, GSAP, Three.js (WebGL), Vue
  * Backend: Node.js, Express, Fastify, Python, RESTful APIs, WebSockets, Microservices
  * Databases: PostgreSQL, MongoDB, Redis, Firebase Firestore, MySQL
  * Cloud & Infrastructure: Docker, Kubernetes, AWS, Google Cloud, Nginx, CI/CD pipelines
  * Modern Architecture: Server-Side Rendering (SSR), Core Web Vitals optimization, High-concurrency systems
- Services Offered: Full Stack Web Development, Interactive 3D WebGL Experiences, SaaS Platform Architecture, UI/UX Engineering, Cloud Microservices & API Integration.
- Projects Completed: 120+ successful web applications & digital platforms.
- Pricing Tiers: Starter ($499), Professional ($1299), Enterprise ($2999) or Custom Quote.
- Contact Email: orjodasutshab@gmail.com / Location: Dhaka, Bangladesh.
- Social Links: GitHub, LinkedIn, Facebook, Instagram, Twitter/X, Discord, Telegram.

Your job is to answer visitors' questions politely, concisely, and accurately about Orjo's full stack skills, 3D development experience, completed projects, pricing, and hiring availability.
Always keep answers friendly, tech-savvy, and scannable with markdown bullet points if relevant.
`;

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message parameter is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback intelligent response if API key is not set yet
      return res.json({
        reply: `Hello! I'm DevBot 2.0, Orjo's portfolio AI. Orjo is a Senior Full Stack Web Developer & 3D Web Architect with 5+ years of experience, 120+ completed projects, and expertise in React, Node.js, Three.js, PostgreSQL, Cloud, and AI. How can I assist you with your project requirements or hiring?`,
        suggestions: ['What full-stack services does Orjo provide?', 'What is his pricing for web apps?', 'How do I book a call?'],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction: PORTFOLIO_CONTEXT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process that request right now. Please feel free to email Orjo directly at orjodasutshab@gmail.com!";

    res.json({
      reply: replyText,
      suggestions: [
        'Explore Full-Stack Projects',
        'What is the pricing for custom web apps?',
        'How do I schedule a kickoff call?',
      ],
    });
  } catch (err: any) {
    console.error('Error in /api/chat route:', err);
    res.json({
      reply: `Hi! Orjo is open for Full-Stack & 3D Web freelancing, remote contracts, and consulting. You can book a direct meeting or contact him via the contact form on this page!`,
      suggestions: ['View Services', 'See Project Portfolio', 'Contact Orjo'],
    });
  }
});

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
