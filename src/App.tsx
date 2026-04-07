import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  MapPin,
  Phone,
  Code2,
  Cpu,
  Layers,
  Globe,
  FileText,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  Zap,
  Terminal,
  Palette,
  ArrowUpRight,
  Download,
  User2,
  Briefcase,
  Monitor,
  Server,
  Database,
  Cloud
} from 'lucide-react';
import { cn } from './lib/utils';
import { div, section } from 'motion/react-client';

// --- Types ---
interface Skill {
  name: string;
  logo: string;
  invert?: boolean;
  category: 'frontend' | 'backend' | 'database-services' | 'tools' | 'deployment';
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
  // Frontend
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', category: 'frontend' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', category: 'frontend' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', category: 'frontend' },
  { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'frontend' },
  // Backend
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'backend' },
  { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', category: 'backend', invert: true },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'backend' },
  // Database & Services
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', category: 'database-services' },
  { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', category: 'database-services' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', category: 'database-services' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'database-services' },
  // Deployment
  { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', category: 'deployment', invert: true },
  { name: 'Hosting', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', category: 'deployment' },
  // Tools
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', category: 'tools' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', category: 'tools', invert: true },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', category: 'tools' },
  { name: 'Stitch', logo: 'https://www.vectorlogo.zone/logos/stitchdata/stitchdata-icon.svg', category: 'tools' },
  { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', category: 'tools' },
];

const PROJECTS: Project[] = [
  {
    title: 'AI Resume Maker',
    description: 'A web application that helps users create professional resumes quickly with AI-based suggestions and smart formatting.',
    problem: 'Many students struggle to build structured and professional resumes.',
    solution: 'Developed an AI-powered tool that generates resumes with proper formatting and smart content suggestions.',
    image: '/ai-resume-maker.png',
    images: ['/ai-resume-maker.png', '/ai-resume-maker-2.png', '/ai-resume-maker-3.png'],
    tags: ['React', 'Firebase', 'Gemini API'],
    features: ['Resume templates', 'AI-based content suggestions', 'Easy editing interface', 'Download / export option'],
    role: 'Designed and developed the full application including frontend UI and backend integration.',
    medal: '🥇',
    medalColor: '#ffd700ff',
    rank: '#01',
    year: '2025',
    links: { live: 'https://ai-resume-maker-63dcf.web.app' }
  },
  {
    title: 'Voice Bot',
    description: 'An interactive web application that allows users to communicate using voice commands with real-time response.',
    problem: 'Traditional web interfaces require manual input, which can be slow and less interactive.',
    solution: 'Built a voice-enabled system that processes speech and responds accordingly in real time.',
    images: ['/voice-bot-1.png', '/voice-bot-2.png'],
    tags: ['JavaScript', 'Web Speech API'],
    features: ['Voice input recognition', 'Real-time response system', 'Interactive user experience'],
    role: 'Implemented voice recognition logic and UI interaction flow.',
    medal: '🥈',
    medalColor: '#C0C0C0',
    rank: '#02',
    year: '2025',
    links: { live: 'https://voicebot-sooty.vercel.app/' }
  },
  {
    title: 'Ayaara Web Application',
    description: 'MotiTrack — an AI-powered student portal for motivation tracking, skill assessment, career guidance, and IoT device monitoring.',
    problem: 'Students lack a unified platform to track motivation, assess skills, and plan their career journey.',
    solution: 'Built a comprehensive web app with a real-time dashboard, AI career assistant, skill gap analysis, and IoT device integration.',
    images: ['/ayaara-1.png', '/ayaara-2.png', '/ayaara-3.png', '/ayaara-4.png', '/ayaara-5.png'],
    tags: ['React', 'Firebase', 'IoT'],
    features: ['Motivation & wellness dashboard', 'Skill gap analysis', 'AI career assistant', 'Career path roadmap', 'IoT device hub'],
    role: 'Developed the frontend and handled deployment.',
    medal: '🥉',
    medalColor: '#CD7F32',
    rank: '#03',
    year: '2025',
    links: { live: 'https://ayaara-ec37e.web.app/' }
  },
  {
    title: 'Namma Madurai',
    description: 'A Smart Civic Intelligence Platform for Madurai — empowering citizens to locate utilities, report issues, and track city cleanliness in real time.',
    problem: 'Citizens lacked a unified platform to report civic issues, find public utilities, and monitor city cleanliness.',
    solution: 'Built a smart city web app with an interactive map, AI assistant, community dashboard, and leaderboard.',
    images: ['/namma-1.png', '/namma-2.png', '/namma-3.png', '/namma-4.png', '/namma-5.png'],
    tags: ['React', 'Firebase', 'Google Maps API', 'AI'],
    features: ['Real-time civic issue reporting', 'Interactive city map', 'City Clean Score dashboard', 'AI assistant', 'Community leaderboard'],
    role: 'Designed and developed the entire frontend experience including maps, dashboards, and AI integration.',
    medal: '🎨',
    medalColor: '#818cf8',
    rank: '#04',
    year: '2025',
    links: { live: 'https://namma-madurai1.web.app/' }
  },
];

const CERTIFICATIONS: Certification[] = [
  { title: 'UiPath RPA Associate', issuer: 'Automation Professionals Council', color: 'border-blue-500/50', date: '2023' },
  { title: 'Meta Front-End Dev', issuer: 'Coursera Professional Certificate', color: 'border-green-500/50', date: '2024' },
  { title: 'Google Cloud Digital', issuer: 'Cloud Foundations Badge', color: 'border-red-500/50', date: '2024' },
  { title: 'IBM AI Engineering', issuer: 'Applied AI Developer Series', color: 'border-purple-500/50', date: '2023' },
];

const SERVICES = [
  { title: 'Full-Stack Development', icon: <Code2 />, desc: 'Building scalable, high-performance web applications from scratch.' },
  { title: 'AI Integration', icon: <Cpu />, desc: 'Leveraging LLMs and predictive models to create intelligent user experiences.' },
  { title: 'UI/UX Architecture', icon: <Palette />, desc: 'Designing interfaces that are as functional as they are beautiful.' },
  { title: 'Cloud Infrastructure', icon: <Globe />, desc: 'Deploying and managing robust cloud solutions for modern businesses.' },
];

// --- Components ---

const SectionHeader = ({ title, subtitle, label }: { title: string; subtitle?: string; label?: string }) => (
  <div className="mb-10">
    {label && <span className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.4em] mb-4 block">{label}</span>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-4">{title}</h2>
    {subtitle && <p className="text-gray-500 text-lg max-w-xl font-medium">{subtitle}</p>}
  </div>
);

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
        {/* Floating Tech Labels - 3D adjusted */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-6 top-[5%] z-30 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold glass"
          style={{ transform: 'translateZ(60px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#7c5cfc]" /> Claude API
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -right-6 top-[5%] z-30 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold glass"
          style={{ transform: 'translateZ(60px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00d4aa]" /> Gemini API
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-10 top-[45%] z-30 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold glass"
          style={{ transform: 'translateZ(50px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#ff7043]" /> React
        </motion.div>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -right-8 top-[45%] z-30 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold glass"
          style={{ transform: 'translateZ(50px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#7c5cfc]" /> Firebase
        </motion.div>

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
                ([x, y]) => `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.15), transparent 70%)`
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

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-30" style={{ transform: 'translateZ(40px)', background: 'linear-gradient(to top, rgba(8,8,18,0.95) 0%, transparent 100%)' }}>
            <div className="text-xl font-display font-black tracking-[0.2em] text-white">
              MADHUSUDHANAN N A
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-[10px] font-bold text-gray-500 tracking-[0.5em] uppercase animate-pulse">
        HOVER TO INTERACT
      </div>
    </div>
  );
};

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
          className="text-xl font-display font-black tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center text-surface text-sm">M</div>
          <span className="hidden sm:inline font-black tracking-tight">MADHUSUDHANAN N A</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-2 glass p-1.5 rounded-full border-white/10 shadow-2xl">
          {[
            { label: 'ABOUT', icon: <User2 className="w-4 h-4" /> },
            { label: 'SKILLS', icon: <Zap className="w-4 h-4" /> },
            { label: 'PROJECTS', icon: <Briefcase className="w-4 h-4" /> },
            { label: 'CONTACT', icon: <Mail className="w-4 h-4" /> }
          ].map((item) => (
            <a 
              key={item.label} 
              href={`#${item.label.toLowerCase()}`} 
              className="flex flex-col items-center px-6 py-2 rounded-full text-[9px] font-bold text-gray-400 tracking-widest transition-all hover:bg-white/5 hover:text-white group relative"
            >
              <div className="mb-1 transition-transform group-hover:-translate-y-0.5">{item.icon}</div>
              <span className="opacity-0 group-hover:opacity-100 transition-all absolute -bottom-5 text-[8px] whitespace-nowrap bg-surface px-2 py-1 rounded-md border border-white/5 shadow-xl pointer-events-none">{item.label}</span>
              {item.label === 'ABOUT' && <div className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/10" />}
              <span className="group-hover:text-accent-purple hidden lg:block transition-colors">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 glass rounded-full text-[10px] font-bold tracking-widest hover:bg-white/10 transition-all">
            RESUME <Download className="w-3 h-3" />
          </button>
          <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-2xl border-b border-white/5 p-8 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            {['ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-2xl font-black tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden mesh-gradient">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 glass rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-accent-green uppercase">Available for Hire</span>
            </div>
            <div className="px-3 py-1 glass rounded-full">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Based in India</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.2vw] font-black leading-[0.9] mb-10 tracking-tighter text-gradient uppercase">
            MADHUSUDHANAN N A
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-xl mb-12 leading-relaxed font-medium">
            Architecting the future of digital experiences through <span className="text-white">Full-Stack Precision</span> and <span className="text-white">AI Innovation</span>.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <button className="group relative px-10 py-5 bg-accent-purple text-surface font-black rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(129,140,248,0.4)]">
              <span className="relative z-10 flex items-center gap-2">
                START A PROJECT <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <div className="flex items-center gap-4">
              <a href="#" className="p-4 glass rounded-2xl hover:bg-white/10 transition-all"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-4 glass rounded-2xl hover:bg-white/10 transition-all"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "circOut", delay: 0.4 }}
          className="lg:col-span-5 relative lg:translate-x-12"
        >
          <ThreeDCard />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-purple to-transparent" />
        <span className="text-[8px] font-bold text-gray-500 tracking-[0.5em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

const BentoAbout = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="The Architect"
          title="Behind the Craft"
          subtitle="A fusion of technical precision and creative vision, dedicated to building the next generation of web applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
          {/* Main Bio */}
          <div className="md:col-span-8 bento-card p-6 flex flex-col justify-between">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-black mb-6 tracking-tight">I bridge the gap between complex logic and intuitive design through Full-Stack precision.</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I am a Computer Science and Business Systems student with a strong interest in full stack development and building real-world applications. I enjoy working across both frontend and backend, focusing on creating clean user interfaces and efficient system logic.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I have built multiple projects including an AI-powered resume generator, a voice-enabled web application, and other interactive platforms. These projects have helped me gain practical experience in modern web technologies, deployment, and problem-solving.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I am continuously learning and improving my skills in full stack development, with a focus on building scalable, user-focused applications.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 glass rounded-2xl flex items-center gap-3">
                <Zap className="w-4 h-4 text-accent-green" />
                <span className="text-xs font-bold tracking-widest">Fast Performance</span>
              </div>
              <div className="px-6 py-3 glass rounded-2xl flex items-center gap-3">
                <Layers className="w-4 h-4 text-accent-blue" />
                <span className="text-xs font-bold tracking-widest">Scalable Code</span>
              </div>
            </div>
          </div>

          {/* Achievement */}
          <div className="md:col-span-4 bento-card bg-accent-purple/5 border-accent-purple/20">
            <Award className="w-10 h-10 text-accent-purple mb-6" />
            <h4 className="text-xl font-black mb-2">Top Honors</h4>
            <p className="text-sm text-gray-400 mb-6">2nd Prize Poster Design NEXORA 2025. Recognized for visual excellence and technical clarity.</p>
            <div className="text-xs font-bold text-accent-purple uppercase tracking-widest">Awarded April 2025</div>
          </div>

          {/* Role */}
          <div className="md:col-span-4 bento-card">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Current Role</div>
            <h4 className="text-2xl font-black mb-2">UiPath Club Secretary</h4>
            <p className="text-sm text-gray-400">Leading automation initiatives and fostering a community of technical innovators at PSNA College.</p>
            <h4 className="text-2xl font-black mb-2">Math Club Executive Member</h4>
            <p className="text-sm text-gray-400">Honored to serve as an Executive Member-Math club,PSNA CET</p>
          </div>

          <div className="md:col-span-8 bento-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl"><Mail className="w-4 h-4 text-accent-purple" /></div>
                <span className="text-sm font-medium">msudhanan2007@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl"><MapPin className="w-4 h-4 text-accent-blue" /></div>
                <span className="text-sm font-medium">Tamil Nadu, India</span>
              </div>
            </div>
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden glass">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
                alt="Tech"
                className="w-full h-full object-cover opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[10px] font-bold tracking-[0.5em] uppercase">Global Reach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Expertise"
          title="Core Services"
          subtitle="Specialized solutions tailored for modern digital challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[2.5rem] glass-hover group"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent-purple/20 transition-colors">
                {React.cloneElement(service.icon as React.ReactElement, { className: "w-6 h-6 text-accent-purple" })}
              </div>
              <h4 className="text-xl font-black mb-4 tracking-tight">{service.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database-services' | 'tools' | 'deployment'>('frontend');

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeader
            label="Arsenal"
            title="Technical Stack"
          />
          <div className="flex flex-wrap gap-2 p-1.5 glass rounded-full border-white/5 shadow-2xl">
            {[
              { id: 'frontend', label: 'FRONTEND', icon: <Monitor className="w-3.5 h-3.5" /> },
              { id: 'backend', label: 'BACKEND', icon: <Server className="w-3.5 h-3.5" /> },
              { id: 'database-services', label: 'DATABASE & SERVICES', icon: <Database className="w-3.5 h-3.5" /> },
              { id: 'deployment', label: 'DEPLOYMENT', icon: <Cloud className="w-3.5 h-3.5" /> },
              { id: 'tools', label: 'TOOLS', icon: <Zap className="w-3.5 h-3.5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-3 px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] transition-all relative group overflow-hidden",
                  activeTab === tab.id 
                    ? "text-surface bg-accent-purple shadow-[0_0_20px_rgba(129,140,248,0.4)]" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
              >
                <span className={cn("transition-transform group-hover:scale-110", activeTab === tab.id ? "text-surface" : "text-gray-500")}>
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-white/10 blur-xl rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {SKILLS.filter(s => s.category === activeTab).map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="glass p-10 rounded-[2rem] flex flex-col items-center gap-6 glass-hover group"
              >
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/10 transition-all duration-500 p-4">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className={cn(
                      'w-full h-full object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-lg',
                      skill.invert && 'invert brightness-200'
                    )}
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{skill.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ProjectImageSlider = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setPrev(current);
      setSliding(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % images.length);
        setSliding(false);
        setPrev(null);
      }, 500);
    }, 2000);
    return () => clearInterval(interval);
  }, [current, images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Outgoing image slides left */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={images[prev]}
          alt={`${title} ${prev + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            transform: sliding ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'transform 0.5s cubic-bezier(0.77,0,0.18,1)',
          }}
        />
      )}
      {/* Incoming image slides in from right */}
      <img
        key={`curr-${current}`}
        src={images[current]}
        alt={`${title} ${current + 1}`}
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{
          transform: sliding ? 'translateX(0)' : prev !== null ? 'translateX(100%)' : 'translateX(0)',
          transition: sliding ? 'transform 0.5s cubic-bezier(0.77,0,0.18,1)' : 'none',
        }}
      />
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className="rounded-full transition-all duration-300"
            style={{
              width: idx === current ? 18 : 6,
              height: 6,
              background: idx === current ? 'rgba(129,140,248,0.9)' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Portfolio"
          title="Featured Works"
          subtitle="Real-world projects — from AI tools to cultural platforms — built with precision and purpose."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-[2.5rem] overflow-hidden group flex flex-col glass-hover"
            >
              {/* Image Slot */}
              <div className="relative aspect-[16/9] bg-white/[0.03] border-b border-white/5 flex items-center justify-center overflow-hidden">
                {project.images && project.images.length > 1 ? (
                  <ProjectImageSlider images={project.images} title={project.title} />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 opacity-30">
                    <div className="text-5xl">{project.medal}</div>
                    <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500">Add Project Screenshot</div>
                  </div>
                )}
                {/* Rank + Medal badge */}
                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <div
                    className="px-3 py-1 rounded-full text-[11px] font-black tracking-widest flex items-center gap-2"
                    style={{ background: 'rgba(10,10,15,0.85)', border: `1px solid ${project.medalColor}40`, color: project.medalColor, backdropFilter: 'blur(10px)' }}
                  >
                    {project.medal} {project.rank}
                  </div>
                </div>
                <div className="absolute top-5 right-5 glass px-3 py-1 rounded-full text-[10px] font-black tracking-widest">
                  {project.year}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-3 tracking-tight">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

                {/* Problem / Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06]">
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">Problem</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.06]">
                    <div className="text-[10px] font-bold text-accent-green uppercase tracking-widest mb-2">Solution</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Key Features</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-3">
                    {project.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle2 className="w-3 h-3 text-accent-green flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 glass rounded-full text-[10px] font-bold text-accent-blue uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Role */}
                <div className="text-xs text-gray-500 mb-6 italic border-l-2 border-accent-purple/30 pl-4">
                  <span className="text-gray-400 font-medium not-italic">Role: </span>{project.role}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 mt-auto">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-black hover:text-accent-purple transition-all group/link"
                    >
                      LIVE DEMO <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-all"
                    >
                      SOURCE <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionHeader
            label="Validation"
            title="Verified Expertise"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className={cn("glass p-10 rounded-[2.5rem] border-t-4 glass-hover", cert.color)}
            >
              <div className="flex justify-between items-start mb-8">
                <CheckCircle2 className="w-6 h-6 text-accent-green" />
                <span className="text-[10px] font-bold text-gray-500">{cert.date}</span>
              </div>
              <h4 className="text-xl font-black mb-3 leading-tight tracking-tight">{cert.title}</h4>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-12 md:p-24 rounded-[4rem] relative overflow-hidden noise">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-purple/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-blue/20 blur-[120px] rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
            <div>
              <span className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.5em] mb-6 block">Get in Touch</span>
              <h2 className="text-7xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter">
                Let's<br />build the<br /><span className="text-gradient-purple">future.</span>
              </h2>
              <p className="text-gray-400 text-xl mb-16 leading-relaxed max-w-md font-medium">
                I'm currently open to new opportunities and interesting projects. Let's create something extraordinary together.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-accent-purple/20 transition-all">
                    <Mail className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Me</div>
                    <div className="text-lg font-black group-hover:text-accent-purple transition-colors">msudhanan2007@gmail.com</div>
                  </div>
                </div>
                <div className="flex gap-6 pt-6">
                  <a href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"><Linkedin className="w-6 h-6" /></a>
                  <a href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"><Github className="w-6 h-6" /></a>
                </div>
              </div>
            </div>

            <form className="space-y-8 glass p-10 rounded-[3rem] border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-accent-purple transition-all font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-accent-purple transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Project Type</label>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-accent-purple transition-all font-medium appearance-none">
                  <option className="bg-surface">Web Application</option>
                  <option className="bg-surface">AI Integration</option>
                  <option className="bg-surface">UI/UX Design</option>
                  <option className="bg-surface">Other</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Your Message</label>
                <textarea
                  placeholder="Tell me about your vision..."
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-accent-purple transition-all font-medium resize-none"
                />
              </div>
              <button className="w-full py-6 bg-accent-purple text-surface font-black rounded-2xl hover:shadow-[0_0_50px_rgba(129,140,248,0.5)] transition-all flex items-center justify-center gap-3 group">
                SEND MESSAGE <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="text-2xl font-display font-black tracking-tighter">MADHUSUDHANAN</div>
          <div className="flex gap-12 text-[10px] font-bold text-gray-500 tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-white transition-colors">GITHUB</a>
            <a href="#" className="hover:text-white transition-colors">DRIBBBLE</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center">
          <div>BUILT WITH PRECISION BY MADHUSUDHANAN © 2025</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
            SYSTEMS OPERATIONAL
          </div>
          <div>LOCATED IN TAMIL NADU, INDIA</div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-surface selection:bg-accent-purple selection:text-white noise">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent-purple z-[60] origin-left" style={{ scaleX }} />

      <Navbar />
      <main>
        <Hero />
        <BentoAbout />
        <Services />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
