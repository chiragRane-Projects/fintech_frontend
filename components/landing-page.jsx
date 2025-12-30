'use client'

import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-context'
import { 
  TrendingUp, Shield, Smartphone, BarChart3, Wallet, 
  Moon, Sun, ArrowRight, Github, PieChart, 
  Zap, Database, Lock, Layout 
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import Link from 'next/link'

// --- 3D Tilt Card Component for Hero Image ---
const TiltCard = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      style={{ perspective: 1000, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative flex items-center justify-center cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const LandingPage = ({ onGetStarted }) => {
  const { theme, toggleTheme } = useTheme()
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div ref={targetRef} className="relative min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground font-sans">
      
      {/* --- Dynamic Vector Backgrounds (Animated) --- */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"
      />
      <motion.div 
         animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
         transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
         className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-40 pointer-events-none"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* --- Header --- */}
      <motion.header 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8 bg-background/70 backdrop-blur-xl border-b border-border/40 supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Finoplex
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <Link href={"https://github.com/chiragRane-Projects/fintech_frontend.git"} className='flex flex-row gap-2'>
                <Github className="w-4 h-4" />
                <span>Source Code</span>
                </Link>
            </a>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-primary/10 active:scale-95 transition-transform">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* --- Hero Section --- */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            style={{ opacity, scale }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            
            {/* Left - Content */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start text-left"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                v1.0 Now Live
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
                Master Your <br/>
                <span className="relative inline-block">
                    <span className="relative z-10 text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary bg-300% animate-gradient">Personal Economy</span>
                    {/* SVG Underline */}
                    <svg className="absolute w-[105%] h-3 -bottom-1 -left-1 text-primary/30 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <motion.path 
                          initial={{ pathLength: 0 }} 
                          animate={{ pathLength: 1 }} 
                          transition={{ duration: 1, delay: 0.5 }} 
                          d="M0 5 Q 50 12 100 5" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          fill="none" 
                        />
                    </svg>
                </span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Stop using spreadsheets. Start using intelligence. A custom-built financial tracker to visualize burn rate, savings goals, and net worth in real-time.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => window.location.href = '/auth'}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                >
                  Enter Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
               
              </motion.div>

              <motion.div variants={itemVariants} className="mt-10 pt-6 border-t border-border/50 w-full max-w-md flex items-center gap-4">
                <div className="flex -space-x-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900"></div>
                   ))}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Open Source</p>
                  <p className="text-xs text-muted-foreground">Join the development</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Interactive 3D Visual */}
            <TiltCard>
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-[2rem] blur-3xl group-hover:blur-4xl transition-all duration-500 opacity-60"></div>
                
                {/* Main Image Container */}
                <div className="relative z-10 bg-card/50 backdrop-blur-sm p-4 rounded-[2rem] border border-white/10 shadow-2xl">
                    <img 
                      src="https://img.freepik.com/free-vector/financial-data-concept-illustration_114360-4320.jpg" 
                      alt="Financial Analytics Vector Art"
                      className="w-full max-w-lg h-auto rounded-2xl mix-blend-multiply dark:mix-blend-normal dark:opacity-90 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    />
                </div>

                {/* Floating Elements (Animated) */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -left-8 bg-card/90 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl hidden sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Net Worth</p>
                      <p className="text-sm font-bold text-foreground">+12.5%</p>
                    </div>
                  </div>
                </motion.div>

                 <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-xl hidden sm:block"
                 >
                    <PieChart className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>

          {/* --- Tech Stack Strip (New) --- */}
          <div className="py-12 border-y border-border/40 mt-20 bg-muted/20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Powered by modern architecture</p>
            <div className="flex justify-center flex-wrap gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {['Next.js 16', 'React', 'Tailwind CSS', 'Framer Motion', 'MongoDB'].map((tech) => (
                    <div key={tech} className="flex items-center gap-2 font-medium text-foreground">
                        <Zap className="w-4 h-4 text-primary" /> {tech}
                    </div>
                ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-24">
            {[
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: "Mobile First",
                desc: "Optimized for mobile view so you can log expenses immediately after purchase.",
                color: "bg-blue-500/10 text-blue-500"
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Visual Analytics",
                desc: "Custom Recharts integration to visualize monthly burn rate and savings goals.",
                color: "bg-purple-500/10 text-purple-500"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Private Data",
                desc: "No third-party tracking. Your financial data stays securely on your database.",
                color: "bg-green-500/10 text-green-500"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card/40 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}

export { LandingPage }