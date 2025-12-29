import { Instagram, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            Developed by <span className="font-medium text-foreground">Chirag Rane</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/chiragrane04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/chiragRane-Projects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }