'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-context'
import { TrendingUp, Shield, Smartphone, BarChart3, Wallet, Moon, Sun, ArrowRight, Code2, Github, PieChart } from 'lucide-react'

const LandingPage = ({ onGetStarted }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-white">
      
      {/* --- Dynamic Vector Backgrounds --- */}
      {/* Large Abstract Blob (Top Right) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
      
      {/* Secondary Blob (Bottom Left) */}
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      {/* Grid Pattern Overlay for Tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* --- Header --- */}
      <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Finsight
            </span>
          </div>
          <div className="flex items-center gap-4">
             {/* GitHub Link for Personal Project Credibility */}
            <a href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
                <span>Source</span>
            </a>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-primary/10">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left - Content */}
            <div className="flex flex-col items-start text-left animate-in slide-in-from-left-4 fade-in duration-700">
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
                Master Your <br/>
                <span className="relative inline-block">
                    <span className="relative z-10 text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Personal Economy</span>
                    {/* Stylized Underline */}
                    <svg className="absolute w-[105%] h-3 -bottom-1 -left-1 text-primary/30 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                A custom-built financial tracker designed to simplify wealth management. Built with React & Next.js to provide real-time insights into my personal spending.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => window.location.href = '/auth'}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Enter Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
              </div>

              {/* Personal Motivation / Quote */}
              <div className="mt-10 pt-6 border-t border-border/50 w-full max-w-md">
                <p className="text-sm italic text-muted-foreground">
                  "I built this to stop using spreadsheets and start using intelligence."
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-primary"></div>
                    <span className="text-xs font-semibold text-foreground">Developer & Founder</span>
                </div>
              </div>
            </div>

            {/* Right - Vector Art Visual */}
            <div className="relative flex items-center justify-center animate-in slide-in-from-right-4 fade-in duration-1000 group">
              
              {/* Blob Background for the Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-[3rem] transform rotate-6 scale-90 blur-2xl transition-all duration-500 group-hover:rotate-3"></div>
              
              {/* Fixed: Used a specific Freepik vector URL for 'Financial Data'.
                 Class 'mix-blend-multiply' makes the white background of the image transparent in Light Mode.
              */}
              <div className="relative z-10">
                <img 
                  src="https://img.freepik.com/free-vector/financial-data-concept-illustration_114360-4320.jpg" 
                  alt="Financial Analytics Vector Art"
                  className="w-full max-w-lg h-auto drop-shadow-2xl rounded-2xl mix-blend-multiply dark:mix-blend-normal dark:opacity-90 dark:rounded-[2rem]"
                />

                {/* Floating 3D Element (CSS Only) */}
                <div className="absolute -bottom-8 -left-8 bg-card/80 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl animate-bounce duration-[4000ms] hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Net Worth</p>
                      <p className="text-sm font-bold text-foreground">+12.5%</p>
                    </div>
                  </div>
                </div>

                 <div className="absolute -top-4 -right-4 bg-card/80 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-xl animate-pulse duration-[3000ms] hidden sm:block">
                    <PieChart className="w-6 h-6 text-primary" />
                </div>
              </div>

            </div>
          </div>

          {/* Features Grid - Clean & Illustrative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-24">
            {[
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: "Responsive Design",
                desc: "Optimized for mobile view so I can log expenses immediately after purchase."
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Visual Analytics",
                desc: "Custom built charts to visualize monthly burn rate and savings goals."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Private Data",
                desc: "No third-party tracking. My financial data stays on my database."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-card/40 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}

export { LandingPage }