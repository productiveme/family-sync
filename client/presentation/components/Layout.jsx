import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'wouter';
import { InstallPrompt } from './InstallPrompt';
import { useAuth } from '../../domain/hooks/useAuth';
import AuthModal from './Auth/AuthModal';

export const Layout = ({ children }) => {
  const { user, logout, checkAuth } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');

  useEffect(() => {
    checkAuth();
  }, []);

  const handleAuthClick = (view) => {
    setAuthView(view);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {import.meta.env.VITE_APP_NAME}
                </span>
              </Link>

              {user && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/calendar" className="text-gray-900 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 text-sm font-medium">
                    Calendar
                  </Link>
                  <Link href="/study" className="text-gray-900 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 text-sm font-medium">
                    Study
                  </Link>
                  <Link href="/activities" className="text-gray-900 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 text-sm font-medium">
                    Activities
                  </Link>
                  <Link href="/summary" className="text-gray-900 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 text-sm font-medium">
                    Summary
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialView={authView}
      />
      
      <InstallPrompt />
    </div>
  );
};
