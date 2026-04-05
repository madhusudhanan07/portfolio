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
  Download
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'ai' | 'languages';
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: { live?: string; github?: string };
  badge?: string;
  rank?: string;
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
  { name: 'React.js', icon: <Code2 className="w-5 h-5" />, category: 'frontend' },
  { name: 'Javascript', icon: <Terminal className="w-5 h-5" />, category: 'languages' },
  { name: 'Tailwind CSS', icon: <Layers className="w-5 h-5" />, category: 'frontend' },
  { name: 'UI/UX Design', icon: <Palette className="w-5 h-5" />, category: 'frontend' },
  { name: 'Web Speech API', icon: <Cpu className="w-5 h-5" />, category: 'ai' },
  { name: 'Firebase', icon: <Globe className="w-5 h-5" />, category: 'backend' },
  { name: 'HTML5/CSS3', icon: <Globe className="w-5 h-5" />, category: 'frontend' },
  { name: 'Vercel', icon: <Globe className="w-5 h-5" />, category: 'backend' },
  { name: 'Supabase', icon: <Globe className="w-5 h-5" />, category: 'backend' },
];

const PROJECTS: Project[] = [
  {
    title: 'AI-Driven Sales Forecasting',
    description: 'A comprehensive enterprise-level application using advanced predictive modeling to forecast quarterly sales with 94% accuracy. Integrated Claude & Gemini APIs for natural language data querying.',
    image: 'https://images.unsplash.com/photo-1551288049-bbda48658a7d?auto=format&fit=crop&q=80&w=1000',
    tags: ['Python', 'React.js', 'Gemini API', 'Firebase'],
    badge: 'GOLD MEDALIST',
    rank: '#01 PROJECT',
    year: '2024',
    links: { live: '#', github: '#' }
  },
  {
    title: 'Real-time PDF Architect',
    description: 'An automated document generation engine with a drag-and-drop interface. Features full REST API integration and dynamic template generation for corporate reporting.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000',
    tags: ['Node.js', 'Express', 'MongoDB', 'React'],
    badge: 'SILVER MEDALIST',
    rank: '#02 PROJECT',
    year: '2023',
    links: { live: '#', github: '#' }
  }
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
  <div className="mb-16">
    {label && <span className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.4em] mb-4 block">{label}</span>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-4">{title}</h2>
    {subtitle && <p className="text-gray-500 text-lg max-w-xl font-medium">{subtitle}</p>}
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
          className="text-xl font-display font-black tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center text-surface text-sm">M</div>
          <span className="hidden sm:inline">MADHUSUDHANAN</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold text-gray-400 tracking-widest">
          {['ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-purple transition-all group-hover:w-full" />
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
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] font-black leading-[0.9] mb-10 tracking-tighter text-gradient uppercase">
            MADHUSUDHANAN
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
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <motion.div style={{ y }} className="relative z-10 glass rounded-[3rem] p-5 overflow-hidden aspect-[4/5] max-w-md mx-auto group">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
              alt="Profile" 
              className="w-full h-full object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-10 left-10 right-10">
              <div className="glass p-6 rounded-3xl backdrop-blur-3xl border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Current Status</span>
                  <Sparkles className="w-4 h-4 text-accent-purple" />
                </div>
                <div className="text-lg font-black tracking-tight">Building AI-First Apps</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-6 rounded-3xl z-20 hidden xl:block"
          >
            <div className="text-3xl font-black text-accent-purple">4+</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Years Exp</div>
          </motion.div>
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          {/* Main Bio */}
          <div className="md:col-span-8 bento-card flex flex-col justify-between">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-black mb-6 tracking-tight">I bridge the gap between complex logic and intuitive design.</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                My journey is rooted in a deep curiosity for how things work, leading me to specialize in full-stack architecture and AI-driven applications. I don't just write code; I architect experiences.
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
            <div className="text-xs font-bold text-accent-purple uppercase tracking-widest">Awarded Feb 2025</div>
          </div>

          {/* Role */}
          <div className="md:col-span-4 bento-card">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Current Role</div>
            <h4 className="text-2xl font-black mb-2">UiPath Club Secretary</h4>
            <p className="text-sm text-gray-400">Leading automation initiatives and fostering a community of technical innovators at PSNA College.</p>
          </div>

          {/* Contact Quick Info */}
          <div className="md:col-span-8 bento-card grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><Mail className="w-5 h-5 text-accent-purple" /></div>
                <span className="text-sm font-medium">madhusudhanan.na@email.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><MapPin className="w-5 h-5 text-accent-blue" /></div>
                <span className="text-sm font-medium">Tamil Nadu, India</span>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden glass">
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
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'ai' | 'languages'>('frontend');

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeader 
            label="Arsenal"
            title="Technical Stack"
          />
          <div className="flex flex-wrap gap-2 p-1.5 glass rounded-2xl">
            {['frontend', 'backend', 'ai', 'languages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-accent-purple text-surface shadow-lg" : "text-gray-500 hover:text-white"
                )}
              >
                {tab === 'ai' ? 'AI & TOOLS' : tab}
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
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent-purple/20 transition-all duration-500 group-hover:rotate-12">
                  {React.cloneElement(skill.icon as React.ReactElement, { className: "w-7 h-7 text-accent-purple" })}
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

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <SectionHeader 
            label="Portfolio"
            title="Featured Works"
            subtitle="A selection of projects that demonstrate technical depth and problem-solving capabilities."
          />
          <div className="hidden md:block">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mb-4">Filters</div>
            <div className="flex gap-4">
              <span className="text-accent-purple font-black">ALL</span>
              <span className="text-gray-600 font-bold">AI</span>
              <span className="text-gray-600 font-bold">WEB</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center",
                i % 2 !== 0 && "lg:direction-rtl"
              )}
            >
              <div className={cn("lg:col-span-7 relative", i % 2 !== 0 && "lg:order-2")}>
                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden glass group-hover:shadow-[0_0_80px_rgba(129,140,248,0.15)] transition-all duration-700">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-surface/20 group-hover:bg-transparent transition-colors duration-700" />
                  
                  {/* Floating Year Tag */}
                  <div className="absolute top-8 right-8 glass px-4 py-2 rounded-full text-[10px] font-black tracking-widest">
                    {project.year}
                  </div>
                </div>
              </div>

              <div className={cn("lg:col-span-5", i % 2 !== 0 && "lg:order-1 lg:text-right")}>
                <div className={cn("flex items-center gap-4 mb-8", i % 2 !== 0 && "lg:justify-end")}>
                  <div className="px-3 py-1 bg-accent-green/10 text-accent-green text-[10px] font-black rounded-full border border-accent-green/20 flex items-center gap-2">
                    <Award className="w-3 h-3" /> {project.badge}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest">{project.rank}</span>
                </div>

                <h3 className="text-5xl font-black mb-8 tracking-tighter leading-none">{project.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">{project.description}</p>

                <div className={cn("flex flex-wrap gap-2 mb-12", i % 2 !== 0 && "lg:justify-end")}>
                  {project.tags.map(tag => (
                    <span key={tag} className="px-5 py-2 glass rounded-full text-[10px] font-bold text-accent-blue uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={cn("flex items-center gap-10", i % 2 !== 0 && "lg:justify-end")}>
                  <a href={project.links.live} className="flex items-center gap-2 text-sm font-black hover:text-accent-purple transition-all group/link">
                    LIVE DEMO <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                  <a href={project.links.github} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-all">
                    SOURCE <Github className="w-4 h-4" />
                  </a>
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
                    <div className="text-lg font-black group-hover:text-accent-purple transition-colors">madhusudhanan.na@email.com</div>
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
