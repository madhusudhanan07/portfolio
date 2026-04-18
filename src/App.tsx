import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  MapPin,
  Code2,
  Cpu,
  Layers,
  Globe,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Zap,
  Download,
  User2,
  Briefcase,
  Monitor,
  Server,
  Database,
  Cloud,
  Palette,
  Bot,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';
import { cn } from './lib/utils';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// --- Types ---
interface Skill {
  name: string;
  logo?: string;
  invert?: boolean;
  category: 'frontend' | 'backend' | 'database-services' | 'tools' | 'deployment' | 'soft-skills';
}

interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  image?: string;
  images?: string[];
  tags: string[];
  features: string[];
  role: string;
  links: { live?: string; github?: string };
  medal: string;
  medalColor: string;
  rank: string;
  year: string;
}

interface Certification {
  title: string;
  issuer: string;
  color: string;
  date: string;
}

// --- Data ---
const SKILLS: Skill[] = [
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', category: 'frontend' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', category: 'frontend' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', category: 'frontend' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'frontend' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'backend' },
  { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', category: 'backend', invert: true },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', category: 'database-services' },
  { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', category: 'database-services' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', category: 'database-services' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'database-services' },
  { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', category: 'deployment', invert: true },
  { name: 'Firebase Hosting', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', category: 'deployment' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', category: 'tools' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', category: 'tools', invert: true },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', category: 'tools' },
  { name: 'Power BI', logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZmlsbD0iI0YyQzgxQSIgZD0iTTE2IDEwaDR2MjBoLTR6Ii8+PHBhdGggZmlsbD0iI0Y5QUQxOSIgZD0iTTEwIDE2aDR2MTRoLTR6Ii8+PHBhdGggZmlsbD0iI0E1NzYwNyIgZD0iTTIyIDRoNHYyNmgtNHoiLz48L3N2Zz4=', category: 'tools' },
  { name: 'Communication', category: 'soft-skills' },
  { name: 'Leadership', category: 'soft-skills' },
  { name: 'Team Collaboration', category: 'soft-skills' },
  { name: 'Problem Solving', category: 'soft-skills' },
];

const PROJECTS: Project[] = [
  {
    title: 'AI Resume Maker',
    description: 'Problem: Students struggle to build professional resumes. Solution: AI-powered tool for smart formatting and suggestions.',
    problem: 'Many students struggle to build structured and professional resumes.',
    solution: 'Developed an AI-powered tool that generates resumes with proper formatting and smart content suggestions.',
    image: '/ai-resume-maker.png',
    tags: ['React', 'Firebase', 'Gemini API'],
    features: ['Resume templates', 'AI Suggestions'],
    role: 'Full Stack Developer',
    medal: '🥇',
    medalColor: '#ffd700',
    rank: '#01',
    year: '2025',
    links: { live: 'https://ai-resume-maker-63dcf.web.app', github: '#' }
  },
  {
    title: 'Voice Bot',
    description: 'Problem: Manual input is slow. Solution: Voice-enabled system for real-time speech processing and response.',
    problem: 'Traditional interfaces require manual input.',
    solution: 'Built a voice-enabled system that processes speech and responds accordingly in real time.',
    image: '/voice-bot-1.png',
    tags: ['JavaScript', 'Web Speech API'],
    features: ['Voice input', 'Real-time response'],
    role: 'Developer',
    medal: '🥈',
    medalColor: '#C0C0C0',
    rank: '#02',
    year: '2025',
    links: { live: 'https://voicebot-sooty.vercel.app/', github: '#' }
  },
  {
    title: 'Ayaara Web App',
    description: 'Problem: No unified student portal for career paths. Solution: AI portal for motivation, skills, and IoT monitoring.',
    problem: 'Students lack a unified platform for career guidance and monitoring.',
    solution: 'Comprehensive web app with real-time dashboard and AI career assistant.',
    image: '/ayaara-1.png',
    tags: ['React', 'Firebase', 'IoT'],
    features: ['Dashboard', 'AI Assistant'],
    role: 'Frontend Developer',
    medal: '🥉',
    medalColor: '#CD7F32',
    rank: '#03',
    year: '2025',
    links: { live: 'https://ayaara-ec37e.web.app/', github: '#' }
  },
  {
    title: 'Namma Madurai',
    description: 'Problem: Fragmented civic issue reporting. Solution: Smart city platform for utility location and cleanliness tracking.',
    problem: 'Citizens lack a unified platform to report civic issues.',
    solution: 'Smart city platform with interactive maps and clean score dashboards.',
    image: '/namma-1.png',
    tags: ['React', 'Firebase', 'Maps API'],
    features: ['Real-time reporting', 'City Map'],
    role: 'Lead Developer',
    medal: '🎨',
    medalColor: '#818cf8',
    rank: '#04',
    year: '2025',
    links: { live: 'https://namma-madurai1.web.app/', github: '#' }
  },
];

const CERTIFICATIONS: Certification[] = [
  { title: 'Meta Front-End Developer', issuer: 'Coursera', color: 'border-blue-500/50', date: '2024' },
  { title: 'IBM AI Engineering', issuer: 'IBM Professional Series', color: 'border-purple-500/50', date: '2023' },
  { title: 'Google Cloud Digital', issuer: 'Google Cloud Training', color: 'border-red-500/50', date: '2024' },
  { title: 'UiPath RPA Associate', issuer: 'Automation Professionals', color: 'border-blue-400/50', date: '2023' },
];

const SERVICES = [
  {
    title: 'Full-Stack Development',
    icon: <Code2 />,
    desc: 'Building scalable, high-performance web applications from scratch.',
    features: ['Custom Web Apps', 'RESTful APIs', 'Database Design', 'System Architecture']
  },
  {
    title: 'AI Integration',
    icon: <Cpu />,
    desc: 'Leveraging LLMs and predictive models to create intelligent user experiences.',
    features: ['LLM Implementation', 'Smart Chatbots', 'Predictive Models', 'Workflow Automation']
  },
  {
    title: 'UI/UX Architecture',
    icon: <Palette />,
    desc: 'Designing interfaces that are as functional as they are beautiful.',
    features: ['Wireframing', 'Design Systems', 'Interactive Prototypes', 'User Research']
  },
  {
    title: 'Cloud Infrastructure',
    icon: <Globe />,
    desc: 'Deploying and managing robust cloud solutions for modern businesses.',
    features: ['Serverless Deployments', 'CI/CD Pipelines', 'Firebase Integration', 'Vercel Mastery']
  },
];

// --- Components ---

const DecryptedText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let iteration = 0;

    setDisplayText(text.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)]));

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < Math.floor(iteration)) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1;
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <div ref={containerRef} className={className}>
      {displayText || text.replace(/[^\s]/g, '·')}
    </div>
  );
};

const Reveal = ({ children, delay = 0, y = 30, x = 0, scale = 1, duration = 0.8, className = "", once = true, mask = false }: { children: React.ReactNode, delay?: number, y?: number, x?: number, scale?: number, duration?: number, className?: string, once?: boolean, mask?: boolean }) => {
  if (mask) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once, margin: "-100px" }}
          transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeader = ({ title, label, subtitle }: { title: string; label?: React.ReactNode; subtitle?: string }) => (
  <div className="mb-16">
    <Reveal y={20} duration={0.6} delay={0.1}>
      {label && <span className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.4em] mb-4 block whitespace-nowrap">{label}</span>}
    </Reveal>
    <Reveal mask duration={1} delay={0.2}>
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-6 text-white uppercase">{title}</h2>
    </Reveal>
    {subtitle && (
      <Reveal y={20} delay={0.4} duration={0.8}>
        <p className="text-gray-500 text-lg max-w-2xl font-medium">{subtitle}</p>
      </Reveal>
    )}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      scrolled ? "bg-surface/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-display font-black tracking-tighter flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center text-surface text-sm font-bold">M</div>
          <span className="hidden sm:inline text-white">MADHUSUDHANAN N A</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-2 glass p-1.5 rounded-full border-white/10 shadow-2xl">
          {[
            { label: 'ABOUT', href: '#about' },
            { label: 'SKILLS', href: '#skills' },
            { label: 'PROJECTS', href: '#projects' },
            { label: 'CONTACT', href: '#contact' }
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-6 py-2.5 rounded-full text-xs font-black text-gray-400 tracking-widest transition-all hover:bg-white/5 hover:text-white group relative"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="hidden sm:flex items-center gap-2">
              <a href="https://www.linkedin.com/in/madhusudhanan-n-a-972819336" target="_blank" rel="noopener noreferrer" className="p-2.5 glass rounded-2xl hover:bg-white/10 transition-all text-white">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="p-2.5 glass rounded-2xl hover:bg-white/10 transition-all text-white">
                <Github className="w-4 h-4" />
              </a>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 glass rounded-full text-xs font-bold tracking-widest hover:bg-white/10 transition-all text-white">
              RESUME <Download className="w-4 h-4" />
            </button>
          </motion.div>
          <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="flex flex-col p-6 gap-6">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-black uppercase tracking-[0.2em] text-white py-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ThreeDCard = () => {
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full group/hero">
      <div className="relative w-full aspect-[4/5] perspective-1000">
        {/* 3D Card Base */}
        <motion.div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 92, 252, 0.2)',
          }}
          whileHover={{ scale: 1.02 }}
          className="relative w-full h-full rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10"
        >
          {/* Main Photo Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="/madhu.photo.png"
              alt="Madhusudhanan"
              className="w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-105 transition-all duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-white/5 opacity-60" />
          </div>

          {/* Glare Layer */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]: any) => `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.15), transparent 70%)`
              ),
              transform: 'translateZ(1px)'
            }}
          />

          {/* Animated Particles */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: ['#7c5cfc', '#00d4aa', '#ff7043', '#ffffff'][i % 4],
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [0, -40],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Smooth Running Text Overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 pt-20 pb-6 z-30 overflow-hidden"
            style={{
              transform: 'translateZ(40px)',
              background: 'linear-gradient(to top, rgba(8,8,18,0.98) 0%, transparent 100%)'
            }}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap w-max"
            >
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 pr-6 text-[11px] sm:text-[13px] font-sans font-bold tracking-[0.25em] text-[#f8f8f8] uppercase drop-shadow-md"
                >
                  <span className="text-white/30 text-lg leading-none font-light">-</span>
                  <span className="text-white/80">FULL STACK DEVELOPER</span>
                  <span className="text-white/30 text-lg leading-none font-light">-</span>
                  <span className="text-white/80">UI/UX DESIGNER</span>
                  <span className="text-white/30 text-lg leading-none font-light">-</span>
                  <span className="text-white/80">AI ENGINEER</span>
                  <span className="text-white/30 text-lg leading-none font-light">-</span>
                  <span className="text-white/80">PRODUCT BUILDER</span>
                  <span className="text-white/30 text-lg leading-none font-light">-</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden mesh-gradient">
      {/* Subtle animated glowing blobs */}
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent-purple/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-accent-blue/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7">
          <Reveal y={30} duration={0.8} delay={0.2}>
            <div className="flex items-center gap-3 mb-8">
              <div className="px-3 py-1 glass rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-accent-green uppercase">Available for Hire</span>
              </div>
              <div className="px-3 py-1 glass rounded-full">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Based in India</span>
              </div>
            </div>
          </Reveal>

          <Reveal y={40} duration={1} delay={0.3} mask>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-[0.9] mb-6 tracking-tighter uppercase whitespace-nowrap">
              <span className="text-gradient">MADHUSUDHANAN </span>
              <span className="text-white/20">N A</span>
            </h1>
          </Reveal>

          <Reveal y={20} duration={0.8} delay={0.5}>
            <p className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              Full Stack Developer building real-world web applications
            </p>
          </Reveal>

          <Reveal y={20} duration={0.8} delay={0.6}>
            <p className="text-lg text-gray-400 max-w-xl mb-12 leading-relaxed font-medium">
              I design, develop, and deploy scalable web solutions using modern technologies.
            </p>
          </Reveal>

          <Reveal y={30} duration={0.8} delay={0.8} className="flex flex-wrap gap-6 items-center">
            <a href="#projects" className="group relative px-10 py-5 bg-accent-purple text-surface font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(129,140,248,0.4)]">
              <span className="relative z-10 flex items-center gap-2 text-surface font-bold">
                VIEW PROJECTS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-10 py-5 glass rounded-2xl text-[12px] font-black tracking-widest hover:bg-white/10 transition-all uppercase text-white">
              DOWNLOAD RESUME <Download className="w-4 h-4" />
            </a>
          </Reveal>

          <Reveal y={20} duration={0.8} delay={1.0} className="mt-12 pt-8 border-t border-white/5 flex gap-10 items-center w-max">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">4+</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-1">Real Projects</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-black text-accent-purple">4+</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-1">Certifications</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">2</span>
              <span className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-1">Years Coding</span>
            </div>
          </Reveal>
        </div>

        {/* Cinematic 3D Tumble Entrance */}
        <motion.div
          initial={{ scale: 2.8, opacity: 0, x: "-100vw", y: -100, rotateY: -720, rotateX: 360, rotateZ: -180 }}
          animate={{
            scale: [2.8, 0.95, 1],
            opacity: 1,
            x: ["-100vw", 0, 0],
            y: [-100, 0, 0],
            rotateY: [-720, 15, 0],
            rotateX: [360, -10, 0],
            rotateZ: [-180, 5, 0]
          }}
          transition={{ duration: 2.2, delay: 6.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative lg:translate-x-12 z-50 origin-center"
          style={{ perspective: 1500, transformStyle: 'preserve-3d' }}
        >
          <div className="max-w-[380px] mx-auto lg:ml-auto">
            <ThreeDCard />
          </div>
        </motion.div>
      </div>

      <Reveal y={20} delay={1.5} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-accent-purple to-transparent"
        />
        <span className="text-[8px] font-bold text-gray-500 tracking-[0.5em] uppercase">Scroll</span>
      </Reveal>
    </section>
  );
};

const BentoAbout = () => {
  const [labelIndex, setLabelIndex] = useState(0);
  const labels = ["The Developer", "AI Engineer", "Product Developer", "UI/UX Designer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % labels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label={
            <AnimatePresence mode="wait">
              <motion.span
                key={labelIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {labels[labelIndex]}
              </motion.span>
            </AnimatePresence>
          }
          title="About Me"
          subtitle="A CSBS student with a passion for building professional full stack applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
          <Reveal y={40} duration={1} className="md:col-span-8 bento-card p-10 flex flex-col justify-between">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-black mb-6 tracking-tight text-white">I design, develop, and deploy scalable web solutions using modern technologies.</h3>
              <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-8">
                <p>
                  I am a Computer Science and Business Systems student with a strong passion for full stack development. I focus on creating real-world projects that solve actual problems, bridging the gap between elegant frontend design and robust backend logic.
                </p>
                <p>
                  My journey involves building everything from AI-powered tools to smart civic platforms, always ensuring the end product is scalable and user-focused.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 glass rounded-2xl flex items-center gap-3">
                <Zap className="w-4 h-4 text-accent-green" />
                <span className="text-xs font-bold tracking-widest text-white">Fast Performance</span>
              </div>
              <div className="px-6 py-3 glass rounded-2xl flex items-center gap-3">
                <Layers className="w-4 h-4 text-accent-blue" />
                <span className="text-xs font-bold tracking-widest text-white">Scalable Code</span>
              </div>
            </div>
          </Reveal>

          <Reveal y={40} delay={0.2} duration={1} className="md:col-span-4 bento-card bg-accent-purple/5 border-accent-purple/20 p-8">
            <Award className="w-10 h-10 text-accent-purple mb-6" />
            <h4 className="text-xl font-black mb-2 text-white uppercase">Top Honors</h4>
            <p className="text-sm text-gray-400 mb-6 font-medium">2nd Prize Poster Design NEXORA 2025. Recognized for visual excellence and technical clarity.</p>
            <div className="text-xs font-bold text-accent-purple uppercase tracking-[0.2em]">Awarded April 2025</div>
          </Reveal>

          <Reveal y={40} delay={0.3} duration={1} className="md:col-span-4 bento-card p-8">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Current Role</div>
            <h4 className="text-2xl font-black mb-2 text-white">UiPath Club Secretary</h4>
            <p className="text-sm text-gray-400 mb-6">Leading automation initiatives and technical communities at PSNA College.</p>
            <h4 className="text-2xl font-black mb-2 text-white">Math Club Member</h4>
            <p className="text-sm text-gray-400">Executive member contributing to mathematical research and events.</p>
          </Reveal>

          <Reveal scale={0.8} y={0} delay={0.4} duration={1} className="md:col-span-8 bento-card p-0 overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
              alt="Tech Space"
              className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-transform duration-[1.5s] scale-125 group-hover:scale-100 ease-[cubic-bezier(0.2,1,0.3,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent p-12 flex flex-col justify-center transition-opacity duration-700">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl"><Mail className="w-5 h-5 text-accent-purple" /></div>
                  <span className="text-lg font-medium text-white tracking-tight">msudhanan2007@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl"><MapPin className="w-5 h-5 text-accent-blue" /></div>
                  <span className="text-lg font-medium text-white tracking-tight">Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Expertise"
          title="Core Services"
          subtitle="Specialized solutions tailored for modern digital challenges."
        />

        <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
          {SERVICES.map((service, i) => (
            <Reveal key={i} y={20} delay={i * 0.1} className="w-full">
              <motion.div
                layout
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative overflow-hidden transition-all duration-300 rounded-3xl cursor-pointer group",
                  hoveredIndex === i ? "bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-lg" : "bg-white/[0.01] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                )}
                transition={{ duration: 0.3 }}
              >
                <div className="p-8 md:px-12 flex flex-col justify-center">
                  <div className="flex justify-between items-center w-full">
                    <h4 className={cn(
                      "text-xl md:text-3xl font-black tracking-tight uppercase transition-colors duration-300",
                      hoveredIndex === i ? "text-white" : "text-gray-500"
                    )}>
                      {service.title}
                    </h4>

                    <div className={cn(
                      "transition-all duration-300 transform flex items-center justify-center rounded-full w-12 h-12 border border-white/10 shrink-0",
                      hoveredIndex === i ? "bg-accent-purple/10 rotate-90 scale-110 border-accent-purple/30 shadow-[0_0_20px_rgba(124,92,252,0.2)]" : "bg-white/5"
                    )}>
                      <ChevronRight className={cn("w-5 h-5 transition-colors duration-300", hoveredIndex === i ? "text-accent-purple" : "text-gray-500")} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.25, delay: 0.1 }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-8 items-start">
                          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 transition-all duration-300 group-hover:bg-accent-purple/10 group-hover:border-accent-purple/30">
                            {React.cloneElement(service.icon as React.ReactElement, { className: "w-8 h-8 text-white transition-all duration-300 group-hover:text-accent-purple group-hover:scale-110" })}
                          </div>
                          <div className="flex flex-col gap-6 w-full">
                            <p className="text-base text-gray-300 leading-relaxed font-medium max-w-2xl">{service.desc}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-2">
                              {service.features.map((feature, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 + (idx * 0.05), duration: 0.3 }}
                                  className="flex items-center gap-3 pl-4 border-l border-accent-purple/30 text-[11px] font-bold tracking-widest text-gray-400 uppercase"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-purple" /> {feature}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database-services' | 'tools' | 'deployment' | 'soft-skills'>('frontend');

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeader
            label="Arsenal"
            title="Technical Stack"
          />
          <Reveal y={20} className="flex flex-wrap justify-center gap-3 p-2.5 glass rounded-[2rem] border-white/5 shadow-2xl">
            {[
              { id: 'frontend', label: 'FRONTEND', icon: <Monitor className="w-4 h-4" /> },
              { id: 'backend', label: 'BACKEND', icon: <Server className="w-4 h-4" /> },
              { id: 'database-services', label: 'DATABASE & SERVICES', icon: <Database className="w-4 h-4" /> },
              { id: 'deployment', label: 'DEPLOYMENT', icon: <Cloud className="w-4 h-4" /> },
              { id: 'tools', label: 'TOOLS', icon: <Zap className="w-4 h-4" /> },
              { id: 'soft-skills', label: 'SOFT SKILLS', icon: <User2 className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all relative group overflow-hidden shadow-none",
                  activeTab === tab.id
                    ? "text-surface bg-accent-purple"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
              >
                <span className={cn("transition-transform group-hover:scale-110", activeTab === tab.id ? "text-surface" : "text-gray-500")}>
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <AnimatePresence mode="wait">
            {SKILLS.filter(s => s.category === activeTab).map((skill, i) => (
              <Reveal
                key={`${activeTab}-${skill.name}`}
                y={30}
                delay={i * 0.05}
                className="glass p-8 rounded-[2rem] flex flex-col items-center justify-center gap-6 glass-hover group h-full min-h-[160px]"
              >
                {skill.logo ? (
                  <>
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/10 transition-all duration-500 p-4">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className={cn(
                          'w-full h-full object-contain transition-all duration-500 group-hover:scale-110',
                          skill.invert && 'invert brightness-200'
                        )}
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white text-center">{skill.name}</span>
                  </>
                ) : (
                  <span className="text-[12px] lg:text-[14px] font-semibold uppercase tracking-[0.2em] text-white text-center leading-relaxed">{skill.name}</span>
                )}
              </Reveal>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Portfolio"
          title="Featured Works"
          subtitle="Real-world projects built with precision and purpose."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, i) => (
            <Reveal
              key={project.title}
              y={40}
              delay={i * 0.15}
              className="glass rounded-[2rem] overflow-hidden group flex flex-col glass-hover"
            >
              <div className="relative aspect-[16/9] bg-white/[0.03] border-b border-white/5 flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <div
                    className="px-3 py-1 rounded-full text-[11px] font-black tracking-widest flex items-center gap-2"
                    style={{ background: 'rgba(10,10,15,0.85)', border: `1px solid ${project.medalColor}40`, color: project.medalColor, backdropFilter: 'blur(10px)' }}
                  >
                    {project.medal} {project.rank}
                  </div>
                </div>
                <div className="absolute top-5 right-5 glass px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white">
                  {project.year}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-3 tracking-tight text-white uppercase">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">{project.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06]">
                    <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Problem</div>
                    <p className="text-xs text-gray-500 font-medium">{project.problem}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06]">
                    <div className="text-[10px] font-black text-accent-green uppercase tracking-widest mb-2">Solution</div>
                    <p className="text-xs text-gray-500 font-medium">{project.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 glass rounded-full text-[10px] font-black text-accent-blue uppercase tracking-widest border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto pt-6 border-t border-white/5">
                  <a
                    href={project.links.live}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-accent-purple text-surface rounded-xl text-[10px] font-black tracking-widest hover:shadow-xl transition-all font-bold"
                  >
                    LIVE DEMO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.links.github}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 glass rounded-xl text-[10px] font-black tracking-widest hover:bg-white/10 transition-all text-white border-white/5"
                  >
                    GITHUB <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Validation"
          title="Expertise"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal
              key={i}
              y={30}
              delay={i * 0.12}
              className={cn("p-8 glass rounded-[2rem] border-l-4 flex flex-col gap-2 glass-hover border-white/5", cert.color)}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent-green" />
                </div>
                <span className="text-[10px] font-bold text-gray-500">{cert.date}</span>
              </div>
              <h4 className="text-xl font-black mb-4 leading-tight tracking-tight text-white uppercase">{cert.title}</h4>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{cert.issuer}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex justify-center text-center px-4">
          <DecryptedText
            text="BUILDING REAL-WORLD SOLUTIONS WITH CERTIFIED SKILLS IN FRONTEND, AI, CLOUD, AND AUTOMATION"
            className="text-xs sm:text-sm md:text-base font-sans font-semibold tracking-[0.2em] text-[#a1a1aa] uppercase max-w-4xl leading-relaxed drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, project, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry${project ? ` — ${project}` : ''} from ${name}`);
    const body = encodeURIComponent(
      `Hi Madhusudhanan,\n\nMy name is ${name} (${email}).\n\nProject Type: ${project || 'Not specified'}\n\nMessage:\n${message}\n\nBest regards,\n${name}`
    );

    window.location.href = `mailto:msudhanan2007@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setFormData({ name: '', email: '', project: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Side: Info */}
          <div className="space-y-12">
            <div>
              <Reveal y={20} duration={0.6} className="mb-6">
                <span className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.4em] block">Get in Touch</span>
              </Reveal>
              <Reveal mask duration={1} delay={0.2}>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white">
                  Let's <br /> build the <br />
                  <span className="text-accent-blue font-black uppercase">future.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal y={20} delay={0.4} duration={0.8}>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed font-medium">
                I'm currently open to new opportunities and interesting projects. Let's create something extraordinary together.
              </p>
            </Reveal>

            <div className="space-y-8 pt-8">
              <Reveal x={-20} delay={0.6}>
                <a href="mailto:msudhanan2007@gmail.com" className="group flex items-center gap-6 cursor-pointer">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/10 transition-all duration-500 border-white/5">
                    <Mail className="w-6 h-6 text-white group-hover:text-accent-purple transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Me</div>
                    <div className="text-lg font-bold text-white tracking-tight group-hover:text-accent-purple transition-colors">msudhanan2007@gmail.com</div>
                  </div>
                </a>
              </Reveal>

              <div className="flex gap-4">
                <Reveal x={-20} delay={0.7}>
                  <a href="https://www.linkedin.com/in/madhusudhanan-n-a-972819336" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all duration-500 border-white/5 hover:-translate-y-1 group">
                    <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </a>
                </Reveal>
                <Reveal x={-20} delay={0.8}>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all duration-500 border-white/5 hover:-translate-y-1 group">
                    <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <Reveal y={40} delay={0.4} className="bento-card p-8 lg:p-10 border-white/5">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Your Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-project" className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Project Type</label>
                <div className="relative">
                  <select
                    id="contact-project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-accent-purple/50 transition-colors appearance-none cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <option value="" disabled style={{ background: '#0f0f14', color: '#6b7280' }}>Select a project type...</option>
                    <option value="Web Application" style={{ background: '#0f0f14' }}>Web Application</option>
                    <option value="Mobile App" style={{ background: '#0f0f14' }}>Mobile App</option>
                    <option value="UI/UX Design" style={{ background: '#0f0f14' }}>UI/UX Design</option>
                    <option value="AI / ML Solution" style={{ background: '#0f0f14' }}>AI / ML Solution</option>
                    <option value="E-Commerce" style={{ background: '#0f0f14' }}>E-Commerce</option>
                    <option value="Portfolio / Personal Site" style={{ background: '#0f0f14' }}>Portfolio / Personal Site</option>
                    <option value="API / Backend" style={{ background: '#0f0f14' }}>API / Backend</option>
                    <option value="Other" style={{ background: '#0f0f14' }}>Other</option>
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your vision..."
                  required
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs font-bold tracking-wide">{error}</p>
              )}

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-accent-green/10 border border-accent-green/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  <span className="text-xs font-bold text-accent-green">Opening your email client — message ready to send!</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-6 px-10 bg-accent-blue hover:bg-accent-blue/90 text-surface font-black text-base rounded-2xl transition-all shadow-[0_0_30px_rgba(129,140,248,0.2)] flex items-center justify-center gap-3 group"
              >
                SEND MESSAGE <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ── Code Rain Canvas ──────────────────────────────────────────────
const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/={}[]();';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(18,17,17,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const progress = y / (canvas.height / fontSize);
        ctx.fillStyle = `rgba(255,75,92,${Math.max(0.03, 0.18 - progress * 0.15)})`;
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 45);
    return () => clearInterval(id);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
};

// ── Terminal Lines ─────────────────────────────────────────────────
const TerminalBoot = ({ active }: { active: boolean }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = [
    { text: '> Initializing portfolio...', color: '#a1a1aa' },
    { text: '> Loading skills: [AI, React, Node, Python]', color: '#a1a1aa' },
    { text: '> Connecting to design system...', color: '#a1a1aa' },
    { text: '> Building components... ✓', color: '#4ade80' },
    { text: '> Deploying experience... ✓', color: '#4ade80' },
    { text: '> Welcome. — Madhusudhanan', color: '#FF4B5C' },
  ];
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(t);
    }, 220);
    return () => clearInterval(t);
  }, [active]);
  return (
    <div className="w-full max-w-md font-mono text-xs space-y-1.5 text-left">
      {lines.slice(0, visibleLines).map((l, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} style={{ color: l.color }}>
          {l.text}
          {i === visibleLines - 1 && (
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block ml-1 w-1.5 h-3 bg-current align-middle" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ── Letter Reveal Name ─────────────────────────────────────────────
const LetterReveal = ({ text, color, delay = 0 }: { text: string; color: string; delay?: number }) => (
  <span className="inline-flex">
    {text.split('').map((ch, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, filter: 'blur(8px)', color: 'rgba(80,20,20,0.3)' }}
        animate={{
          opacity: 1,
          filter: 'blur(0px)',
          color,
          textShadow: [`0 0 20px ${color}aa`, `0 0 8px ${color}44`, `0 0 0px transparent`],
        }}
        transition={{
          duration: 1.2,
          delay: delay + i * 0.12,
          ease: [0.22, 1, 0.36, 1],
          textShadow: { duration: 1.8, delay: delay + i * 0.12 },
        }}
        style={{ display: 'inline-block' }}
      >
        {ch === ' ' ? '\u00A0' : ch}
      </motion.span>
    ))}
  </span>
);

// ── Phase Progress Bar ─────────────────────────────────────────────
const PhaseBar = ({ progress }: { progress: number }) => {
  const phases = [
    { label: 'DESIGN', icon: '✦', threshold: 0 },
    { label: 'BUILD', icon: '⬡', threshold: 40 },
    { label: 'DEPLOY', icon: '◈', threshold: 75 },
  ];
  return (
    <div className="w-full max-w-lg px-4">
      <div className="flex justify-between mb-3">
        {phases.map((p, i) => {
          const active = progress >= p.threshold;
          return (
            <motion.div key={i} animate={{ opacity: active ? 1 : 0.3 }} className="flex flex-col items-center gap-1">
              <motion.span animate={{ scale: active ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }} className="text-base" style={{ color: active ? '#FF4B5C' : '#555' }}>{p.icon}</motion.span>
              <span className="text-[9px] font-black tracking-[0.25em]" style={{ color: active ? '#FF4B5C' : '#444' }}>{p.label}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF4B5C, #ff8c69)' }} />
        <motion.div className="absolute inset-y-0 left-0 rounded-full blur-sm opacity-60" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF4B5C, #ff8c69)' }} />
      </div>
      <div className="flex justify-end mt-2">
        <span className="text-[10px] font-black tracking-widest" style={{ color: '#FF4B5C' }}>{progress}%</span>
      </div>
    </div>
  );
};

// ── Main Preloader ─────────────────────────────────────────────────
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'terminal' | 'split'>('terminal');
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ['Full Stack Developer', 'AI Engineer', 'UI/UX Designer', 'Product Builder'];
  const TOTAL_MS = 6000;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Phase switch: terminal → split at 1.5s
    const phaseTimer = setTimeout(() => setPhase('split'), 1500);

    // Role cycling
    const roleTimer = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 900);

    // Progress bar
    const steps = TOTAL_MS / 20;
    let step = 0;
    const progressTimer = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.round((step / steps) * 100)));
      if (step >= steps) clearInterval(progressTimer);
    }, 20);

    // Complete
    const done = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, TOTAL_MS + 300);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(phaseTimer);
      clearTimeout(done);
      clearInterval(roleTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0c0b0b' }}
    >
      {/* Matrix code rain */}
      <CodeRain />

      {/* Dark center vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(12,11,11,0.85) 100%)' }} />

      {/* ─ Content ─ */}
      <div className="relative z-10 flex flex-col items-center gap-10 w-full px-6">

        {/* PHASE 1 — Terminal boot */}
        <AnimatePresence>
          {phase === 'terminal' && (
            <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="w-full max-w-md bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px] text-gray-500 font-mono tracking-wider">portfolio.init — bash</span>
              </div>
              <TerminalBoot active={phase === 'terminal'} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 2 — Split: Role | Name with 3D letter reveal */}
        <AnimatePresence>
          {phase === 'split' && (
            <motion.div key="split" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center justify-center px-4" style={{ perspective: 1000 }}>
              {/* Left — role */}
              <div className="flex flex-col items-center md:items-end md:pr-16 md:border-r border-white/10 text-center md:text-right">
                <span className="text-[11px] sm:text-[13px] font-black tracking-[0.5em] text-gray-500 uppercase mb-4 opacity-80">Currently</span>
                <AnimatePresence mode="wait">
                  <motion.p key={roleIndex} 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 1.1, y: -10 }} 
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-black text-white/90 tracking-tight leading-none min-h-[1.2em]">
                    {roles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
              {/* Right — name with slow glow reveal */}
              <div className="flex flex-col items-center md:items-start md:pl-16 text-center md:text-left overflow-visible">
                <span className="text-[11px] sm:text-[13px] font-black tracking-[0.5em] text-gray-500 uppercase block mb-4 opacity-80">Portfolio of</span>
                <div className="font-black tracking-widest leading-[1.1] relative group whitespace-nowrap flex items-center" style={{ fontSize: 'clamp(1rem, 4vw, 2.6rem)' }}>
                  <LetterReveal text="MADHUSUDHANAN " color="#FF4B5C" delay={0.2} />
                  <LetterReveal text="N A" color="#555" delay={2.0} />
                  {/* Glow pulse under name */}
                  <motion.div 
                    animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1.2, 0.8] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-6 md:mt-8 h-[1px] w-full bg-gradient-to-r from-[#FF4B5C] via-[#FF4B5C]/50 to-transparent mx-auto md:mx-0 rounded-full blur-[1px]" 
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase Progress Bar — always visible */}
        <motion.div className="w-full flex justify-center mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <PhaseBar progress={progress} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const CodeTyping = () => {
  const [lines, setLines] = useState<string[]>([]);
  const codeLines = [
    "import { Builder } from 'future';",
    "",
    "const portfolio = new Builder({",
    "  developer: 'Madhusudhanan',",
    "  skills: ['AI', 'UI/UX', 'Full Stack'],",
    "  theme: 'late_night',",
    "  status: 'deploying...'",
    "});",
    "",
    "portfolio.initialize();"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines(codeLines.slice(0, currentLine + 1));
      currentLine++;
      if (currentLine >= codeLines.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-2 w-full max-w-lg bg-[#0d0d14] rounded-xl border border-white/5 p-4 font-mono text-xs text-gray-300 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#151520] border-b border-white/5 flex items-center px-4 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[10px] text-gray-500 font-sans tracking-wider">init.ts — Portfolio</span>
      </div>
      <div className="pt-8 font-mono text-left min-h-[220px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-pre"
          >
            <span className="text-gray-600 mr-4 select-none opacity-50">{i + 1}</span>
            <span dangerouslySetInnerHTML={{
              __html: line
                .replace(/import|from|const|new/g, '<span class="text-[#c678dd]">$&</span>')
                .replace(/'[^']*'/g, '<span class="text-[#98c379]">$&</span>')
                .replace(/({|}|\[|\]|\(|\))/g, '<span class="text-[#56b6c2]">$&</span>')
                .replace(/(developer|skills|theme|status)/g, '<span class="text-[#e06c75]">$&</span>')
                .replace(/(Builder|portfolio|initialize)/g, '<span class="text-[#61afef]">$&</span>')
            }} />
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-[#61afef] ml-2 mt-1 align-middle"
        />
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.02,
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-surface selection:bg-accent-purple selection:text-white">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent-purple z-[60] origin-left" style={{ scaleX }} />

      <Navbar />
      <main className="outline-none">
        <Hero />
        <BentoAbout />
        <Services />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-[9px] font-black text-gray-500 tracking-[0.5em] uppercase">
        © 2026 MADHUSUDHANAN N A — ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
