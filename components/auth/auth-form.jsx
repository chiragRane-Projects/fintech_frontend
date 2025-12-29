'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, DollarSign, Briefcase, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AuthForm = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    monthly_income: '',
    occupation: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const response = await api.login({
          email: formData.email,
          password: formData.password
        })
        login({ user_id: response.user_id, email: formData.email })
        router.push('/dashboard')
      } else {
        const response = await api.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          monthly_income: parseFloat(formData.monthly_income),
          occupation: formData.occupation
        })
        login({ user_id: response.user_id, email: formData.email, name: formData.name })
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background flex w-full overflow-hidden">
      
      {/* --- Left Side: Form --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Background Blobs for consistency */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="w-full max-w-md animate-in slide-in-from-left-4 fade-in duration-500">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-6 hover:bg-secondary/50 -ml-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          )}
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                {isLogin ? 'Welcome Back!' : 'Join the Revolution'}
            </h1>
            <p className="text-muted-foreground">
                {isLogin 
                  ? 'Enter your credentials to access your vault.' 
                  : 'Start your journey to financial freedom today.'}
            </p>
          </div>
          
          <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                        <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                        <Input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10 bg-background/50 focus:bg-background transition-colors"
                            required
                        />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative group">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                        <Input
                          name="monthly_income"
                          type="number"
                          placeholder="Monthly Income"
                          value={formData.monthly_income}
                          onChange={handleChange}
                          className="pl-10 bg-background/50 focus:bg-background transition-colors"
                          required
                        />
                      </div>
                      
                      <div className="relative group">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                        <Input
                          name="occupation"
                          placeholder="Occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          className="pl-10 bg-background/50 focus:bg-background transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-background/50 focus:bg-background transition-colors"
                    required
                  />
                </div>
                
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-background/50 focus:bg-background transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive"></div>
                    {error}
                  </div>
                )}

                <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Access Dashboard' : 'Create Account')}
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {isLogin ? (
                        <>New to Finoplex? <span className="font-semibold underline underline-offset-4">Create an account</span></>
                    ) : (
                        <>Already a member? <span className="font-semibold underline underline-offset-4">Sign in</span></>
                    )}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- Right Side: Image from Unsplash --- */}
      <div className="hidden lg:flex flex-1 relative bg-black">
        {/* Image: "Financial Data/Charts" by Unsplash user 
            Themes: Purple, Dark, Tech, Finance
        */}
        <img 
            src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2564&auto=format&fit=crop"
            alt="Finance Aesthetic"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Floating Content over Image */}
        <div className="absolute bottom-12 left-12 right-12 z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Market Insights</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                See clearly where <br/>
                your money grows.
            </h2>
            
            <div className="flex gap-4">
                <div className="backdrop-blur-md bg-black/30 p-4 rounded-xl border border-white/10 flex-1">
                    <div className="text-2xl font-bold text-white mb-1">99%</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Precision</div>
                </div>
                <div className="backdrop-blur-md bg-black/30 p-4 rounded-xl border border-white/10 flex-1">
                    <div className="text-2xl font-bold text-white mb-1">24/7</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Monitoring</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export { AuthForm }