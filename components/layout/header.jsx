'use client'

import { useAuth } from '@/lib/auth-context'
import { useTheme } from '@/lib/theme-context'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut, User, Menu, X, Wallet, Moon, Sun, BarChart3, Home } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Finoplex
            </h1>
          </Link>

          <div className="flex items-center space-x-2">
            {user && (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Button>
                </Link>

                <Link href="/predictions">
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Prediction</span>
                  </Button>
                </Link>
              </>
            )}

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {user && (
              <>
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {(user.name || user.email).charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMenu(!showMenu)}
                    className="md:hidden"
                  >
                    {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-popover rounded-lg shadow-lg border md:hidden">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {(user.name || user.email).charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-popover-foreground">{user.name || 'User'}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <Link href="/dashboard" className="block px-4 py-3 text-sm text-popover-foreground hover:bg-accent">
                          <div className="flex items-center space-x-3">
                            <Home className="h-4 w-4" />
                            <span>Dashboard</span>
                          </div>
                        </Link>
                        <Link href="/analytics" className="block px-4 py-3 text-sm text-popover-foreground hover:bg-accent">
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="h-4 w-4" />
                            <span>Analytics</span>
                          </div>
                        </Link>

                        <Link href="/predictions">
                          <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                            <BarChart3 className="h-4 w-4" />
                            <span>Predictions</span>
                          </Button>
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-3 text-sm text-popover-foreground hover:bg-accent flex items-center space-x-3 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header }