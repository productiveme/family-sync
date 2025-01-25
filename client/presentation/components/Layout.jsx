import { Link } from 'wouter'
import { InstallPrompt } from './InstallPrompt'

export const Layout = ({ children }) => (
  <div className="min-h-screen bg-background">
    <nav className="bg-background-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-text font-semibold text-xl">
              {import.meta.env.VITE_APP_NAME}
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {children}
    </main>
    <InstallPrompt />
  </div>
)
