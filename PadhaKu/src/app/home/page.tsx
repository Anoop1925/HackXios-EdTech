'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Zap, Brain, Users, Trophy, ArrowRight, Play, Sparkles, Rocket, BookOpen, Target, CheckCircle2, MessageSquare, FolderOpen, Headphones } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SharedNavbar from '@/components/SharedNavbar';

export default function HomeNew() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about-us', 'features', 'assets', 'support'];
      const scrollPosition = window.scrollY + 100; // Using a smaller offset for more accurate detection

      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          // If we've scrolled past this section's start, it becomes the current section
          if (scrollPosition >= offsetTop - 100) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    handleScroll(); // Call on mount to set initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      {/* Ultra-Futuristic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(56, 123, 255, 0.15) 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(92, 86, 255, 0.12) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#387bff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#5c56ff" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={`${i * 8.33}%`}
              x2="100%"
              y2={`${i * 8.33}%`}
              stroke="url(#circuit-grad)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(15)].map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${i * 6.66}%`}
              y1="0"
              x2={`${i * 6.66}%`}
              y2="100%"
              stroke="url(#circuit-grad)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2.5,
                delay: i * 0.08,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
          {/* Circuit Nodes */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="3"
              fill="#387bff"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1, 1.5, 1, 0]
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>

        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Cursor Follower Glow */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(56, 123, 255, 0.08) 0%, transparent 70%)',
          }}
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 100
          }}
        />
      </div>

      {/* SHARED NAVBAR */}
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        showNavItems={true}
      />

      {/* EPIC HERO SECTION WITH CUSTOM GRADIENT LEFT TO RIGHT */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-8 overflow-hidden">
        {/* CUSTOM GRADIENT BACKGROUND - LEFT TO RIGHT - VIBRANT DARK BLUE */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Vibrant Dark Blue Gradient - More interesting left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2463] via-[#1e4fb8] via-[#2563eb] via-[#3d5ab8] to-[#4a4ab0]"></div>
          
          {/* Darker overlay for more depth and contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Multi-layered Smooth Elliptical Arcs - Positioned with standard CSS */}
          <div className="absolute left-0 right-0" style={{ bottom: '0', marginTop: '80px' }}>
            {/* First Layer - Outermost Smooth Arc - INVERTED TO FACE DOWNWARDS */}
            <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute" style={{ height: '320px', bottom: '0' }} preserveAspectRatio="none">
              <path 
                d="M0,160 Q360,240 720,220 T1440,160 L1440,320 L0,320 Z" 
                className="fill-white dark:fill-gray-950"
                opacity="0.95"
              />
            </svg>
            
            {/* Second Layer - Middle Smooth Arc - INVERTED TO FACE DOWNWARDS */}
            <svg viewBox="0 0 1440 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute" style={{ height: '280px', bottom: '0' }} preserveAspectRatio="none">
              <path 
                d="M0,140 Q360,210 720,195 T1440,140 L1440,280 L0,280 Z" 
                className="fill-white dark:fill-gray-950"
                opacity="0.85"
              />
            </svg>
            
            {/* Third Layer - Innermost Smooth Arc - INVERTED TO FACE DOWNWARDS */}
            <svg viewBox="0 0 1440 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute" style={{ height: '240px', bottom: '0' }} preserveAspectRatio="none">
              <path 
                d="M0,120 Q360,180 720,170 T1440,120 L1440,240 L0,240 Z" 
                className="fill-white dark:fill-gray-950"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>

        {/* FLOATING HERO IMAGE - POSITIONED ABSOLUTELY */}
        {/* EDIT POSITION: Change left and top values in pixels below */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-20"
          style={{ 
            width: '790px', 
            height: '700px',
            left: '150px',    /* EDIT: Move left/right - increase to move RIGHT */
            top: '80px'      /* EDIT: Move up/down - increase to move DOWN */
          }}
        >
          {/* Image Container - Floating Above Everything */}
          <div className="relative w-full h-full">
            <Image
              src="/Main-page.png"
              alt="PadhaKU Platform"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="flex items-center justify-end gap-12">
            
            {/* RIGHT: CONTENT CONTAINER - Wrapped in separate div with absolute positioning */}
            <div 
              className="absolute" 
              style={{ 
                right: '30px',
                top: '-200px'
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
              {/* HEADLINE - WHITE TEXT */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight"
                >
                  <span className="text-white">Learn </span>
                  <span className="relative inline-block">
                    <span className="text-cyan-300">
                      Smarter
                    </span>
                  </span>
                  <span className="text-white">,</span><br />
                  <span className="text-white">Not </span>
                  <span className="text-cyan-300">Harder</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-base text-white/80 max-w-md leading-relaxed"
                >
                  AI-powered personalized learning that gamifies education
                </motion.p>
              </div>

              {/* CTA Buttons - WHITE/CYAN ON BLUE BACKGROUND */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 font-bold text-base shadow-xl shadow-cyan-500/40 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <Link href="/sign-in" className="relative flex items-center gap-2">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.button>                <motion.button
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-base hover:bg-white/30 transition-all shadow-lg flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Compact Stats - WHITE TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                {[
                  { icon: Users, value: '50K+', label: 'Learners' },
                  { icon: Brain, value: '1M+', label: 'AI Sessions' },
                  { icon: Trophy, value: '500K+', label: 'Achievements' },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + idx * 0.1 }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
                      <stat.icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* About Us Section WITH GRID ANIMATION */}
      <section id="about-us" className="relative py-24 px-8 overflow-hidden bg-gradient-to-br from-indigo-50/30 to-blue-50/20 dark:from-indigo-950/30 dark:to-blue-950/20">
        {/* ANIMATED GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.12]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-about" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 123, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-about)" />
            {[...Array(15)].map((_, i) => (
              <motion.line
                key={`about-v-${i}`}
                x1={`${i * 6.66}%`}
                y1="0"
                x2={`${i * 6.66}%`}
                y2="100%"
                stroke="rgba(56, 123, 255, 0.4)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  delay: i * 0.06,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PadhaKU
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing education through AI-powered personalization. We're building the future of learning where technology meets pedagogy.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-3xl border border-blue-200/50 dark:border-blue-700/50 shadow-xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3.5 mb-5 shadow-lg">
                <Target className="w-full h-full text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To democratize quality education by leveraging artificial intelligence, making personalized learning accessible to every student regardless of their background or learning style.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-3xl border border-indigo-200/50 dark:border-indigo-700/50 shadow-xl p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-3.5 mb-5 shadow-lg">
                <Rocket className="w-full h-full text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To create a global learning ecosystem where AI companions guide students through their educational journey, transforming passive studying into an engaging, interactive adventure.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Intelligence',
                description: 'Adaptive learning algorithms that understand your pace, strengths, and areas for improvement',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Trophy,
                title: 'Gamified Learning',
                description: 'Earn points, unlock achievements, and compete on leaderboards while mastering new concepts',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                icon: Zap,
                title: 'Real-Time Feedback',
                description: 'Instant AI-powered evaluation and personalized suggestions to accelerate your learning',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Users,
                title: 'Collaborative Community',
                description: 'Connect with fellow learners, share progress, and grow together in a supportive environment',
                gradient: 'from-pink-500 to-rose-500'
              },
              {
                icon: Sparkles,
                title: 'Interactive Experiences',
                description: 'Transform static content into dynamic, immersive learning experiences with Magic Learn',
                gradient: 'from-amber-500 to-orange-500'
              },
              {
                icon: BookOpen,
                title: 'Comprehensive Content',
                description: 'Access AI-generated courses, quizzes, and study materials tailored to your goals',
                gradient: 'from-green-500 to-emerald-500'
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6 h-full transition-all duration-300 group-hover:shadow-2xl">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 shadow-md`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section WITH GRID ANIMATION */}
      <section id="features" className="relative py-24 px-8 overflow-hidden bg-gradient-to-br from-blue-50/30 to-indigo-50/20 dark:from-blue-950/30 dark:to-indigo-950/20">
        {/* ANIMATED GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.12]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-features" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 123, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-features)" />
            {[...Array(12)].map((_, i) => (
              <motion.line
                key={`feat-h-${i}`}
                x1="0"
                y1={`${i * 8.33}%`}
                x2="100%"
                y2={`${i * 8.33}%`}
                stroke="rgba(92, 86, 255, 0.4)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.08,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">
              Powerful{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need for transformative learning experiences
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              { 
                title: 'Magic Learn', 
                description: 'Transform your hand-drawn sketches and diagrams into fully interactive, AI-powered learning experiences. Upload images, and watch as our AI brings them to life with explanations and insights.',
                icon: Sparkles,
                gradient: 'from-purple-500 to-pink-500',
                features: ['Image Recognition', 'Interactive Explanations', 'Real-time Processing', 'Multi-format Support']
              },
              { 
                title: 'AI Mentor (AskSensei)', 
                description: 'Your personal AI learning companion available 24/7. Get instant answers, personalized guidance, and voice-powered assistance for any subject or topic.',
                icon: Brain,
                gradient: 'from-blue-500 to-cyan-500',
                features: ['Voice Chat Support', 'Contextual Understanding', 'Multi-subject Expertise', 'Personalized Guidance']
              },
              { 
                title: 'Smart Course Generator', 
                description: 'Generate comprehensive AI-powered courses on any topic. Customize difficulty levels, question types, and receive structured learning paths tailored to your goals.',
                icon: BookOpen,
                gradient: 'from-indigo-500 to-purple-500',
                features: ['AI Content Generation', 'Custom Difficulty Levels', 'Progress Tracking', 'Multi-format Questions']
              },
              { 
                title: 'Quiz Generator', 
                description: 'Create personalized quizzes with AI-generated questions. Features gesture-based controls for accessibility, making learning inclusive for all students.',
                icon: CheckCircle2,
                gradient: 'from-green-500 to-emerald-500',
                features: ['Gesture Controls', 'Age-appropriate Content', 'Multiple Question Types', 'Instant Feedback']
              },
              { 
                title: 'Gamification & Leaderboards', 
                description: 'Earn points, unlock achievements, and compete with peers on global leaderboards. Track your progress and celebrate milestones as you learn.',
                icon: Trophy,
                gradient: 'from-amber-500 to-orange-500',
                features: ['Points System', 'Achievement Badges', 'Global Rankings', 'Progress Analytics']
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative w-full md:w-[calc(50%-1rem)]"
              >
                <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-300 dark:group-hover:border-blue-600">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-5 shadow-lg`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Assets Section WITH GRID ANIMATION */}
      <section id="assets" className="relative py-24 px-8 overflow-hidden bg-gradient-to-br from-purple-50/20 to-pink-50/15 dark:from-purple-950/20 dark:to-pink-950/15">
        {/* ANIMATED GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.12]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-assets" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 123, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-assets)" />
            {[...Array(15)].map((_, i) => (
              <motion.line
                key={`assets-d-${i}`}
                x1="0"
                y1={`${i * 6.66}%`}
                x2={`${i * 6.66}%`}
                y2="100%"
                stroke="rgba(147, 51, 234, 0.4)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.07,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">
              Learning{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Assets
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Download study materials, templates, and resources to enhance your learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: FolderOpen,
                title: 'Study Materials',
                count: '500+ PDFs',
                description: 'Comprehensive notes and guides for all subjects',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: BookOpen,
                title: 'Templates',
                count: '200+ Templates',
                description: 'Ready-to-use study planners and worksheets',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Sparkles,
                title: 'Interactive Content',
                count: '100+ Resources',
                description: 'Quizzes, flashcards, and practice tests',
                gradient: 'from-indigo-500 to-purple-500'
              },
            ].map((asset, idx) => (
              <motion.div
                key={asset.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative"
              >
                <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8 text-center transition-all duration-300 group-hover:shadow-2xl">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${asset.gradient} p-4 mb-5 shadow-lg mx-auto`}>
                    <asset.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{asset.title}</h3>
                  <p className={`text-2xl font-black bg-gradient-to-r ${asset.gradient} bg-clip-text text-transparent mb-3`}>{asset.count}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{asset.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Categories */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                category: 'Mathematics',
                items: ['Algebra Formulas', 'Geometry Guides', 'Calculus Notes', 'Statistics Cheat Sheets'],
                icon: Target
              },
              {
                category: 'Science',
                items: ['Physics Concepts', 'Chemistry Tables', 'Biology Diagrams', 'Lab Report Templates'],
                icon: Zap
              },
              {
                category: 'Languages',
                items: ['Grammar Rules', 'Vocabulary Lists', 'Essay Templates', 'Reading Comprehension'],
                icon: MessageSquare
              },
              {
                category: 'Exam Prep',
                items: ['Practice Tests', 'Study Schedules', 'Revision Checklists', 'Time Management'],
                icon: Trophy
              },
            ].map((cat, idx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{cat.category}</h4>
                </div>
                <div className="space-y-2">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">
                      <span className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        {item}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-purple-600 dark:text-purple-400"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section WITH GRID ANIMATION */}
      <section id="support" className="relative py-24 px-8 overflow-hidden bg-gradient-to-br from-indigo-50/20 to-purple-50/15 dark:from-indigo-950/20 dark:to-purple-950/15">
        {/* ANIMATED GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.12]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-support" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 123, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-support)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">
              Need{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Support?
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're here to help you succeed. Reach out through any of our support channels
            </p>
          </motion.div>

          {/* Support Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Headphones,
                title: '24/7 Live Chat',
                description: 'Get instant help from our support team',
                action: 'Start Chat',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: MessageSquare,
                title: 'Email Support',
                description: 'Send us your questions anytime',
                action: 'Send Email',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                icon: BookOpen,
                title: 'Help Center',
                description: 'Browse FAQs and documentation',
                action: 'View Docs',
                gradient: 'from-purple-500 to-pink-500'
              },
            ].map((option, idx) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative"
              >
                <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8 text-center transition-all duration-300 group-hover:shadow-2xl">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} p-4 mb-5 shadow-lg mx-auto`}>
                    <option.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{option.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{option.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2.5 rounded-full bg-gradient-to-r ${option.gradient} text-white font-semibold text-sm shadow-lg`}
                  >
                    {option.action}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: 'How do I get started with PadhaKU?',
                  a: 'Simply sign up for a free account and explore our features. No credit card required!'
                },
                {
                  q: 'Is PadhaKU suitable for all ages?',
                  a: 'Yes! Our AI adapts content for learners aged 5-100, with age-appropriate language and difficulty.'
                },
                {
                  q: 'Can I use PadhaKU offline?',
                  a: 'Some features work offline, but AI-powered tools require an internet connection.'
                },
                {
                  q: 'How does the points system work?',
                  a: 'Earn points by completing quizzes, courses, and daily challenges. Climb the leaderboards!'
                },
              ].map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/30 dark:border-blue-700/30">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer WITH GRID ANIMATION */}
      <footer className="relative py-16 px-8 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* ANIMATED GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-footer" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 123, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-footer)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <Image
                src="/Main-logo22.png"
                alt="PadhaKU"
                width={140}
                height={46}
                className="object-contain"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                AI-powered personalized learning that gamifies education for everyone.
              </p>
            </div>

            {/* Column 2: Platform */}
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Platform</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'About Us', href: '#about-us' },
                  { label: 'Features', href: '#features' },
                  { label: 'Assets', href: '#assets' },
                  { label: 'Support', href: '#support' },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href.replace('#', ''))}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Features */}
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Features</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Magic Learn', href: '/feature-1' },
                  { label: 'AI Course Generator', href: '/feature-2' },
                  { label: 'Interactive Quiz', href: '/feature-3' },
                  { label: 'AI Mentor', href: '/ai-mentor' },
                  { label: 'Gamification', href: '/feature-5' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@padhaku.com"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:legal@padhaku.com"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                  >
                    Legal Inquiries
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 PadhaKU - Learning, Reimagined for Everyone. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#387BFF] dark:hover:text-blue-400 transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
