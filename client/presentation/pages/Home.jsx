import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useAuth } from '../../domain/hooks/useAuth';
import AuthModal from '../components/Auth/AuthModal';

export const Home = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');

  const handleAuthClick = (view) => {
    setAuthView(view);
    setShowAuthModal(true);
  };

  const features = [
    {
      title: 'Multi-User Calendar',
      description: 'Manage schedules for the whole family with color-coded activities',
      icon: '📅',
      path: '/calendar'
    },
    {
      title: 'Study Planning',
      description: 'Smart study time allocation and progress tracking',
      icon: '📚',
      path: '/study'
    },
    {
      title: 'Activity Management',
      description: 'Track preparations and materials for each activity',
      icon: '📝',
      path: '/activities'
    },
    {
      title: 'Weekly Summary',
      description: 'Get automated email summaries of upcoming schedules',
      icon: '📊',
      path: '/summary'
    }
  ];

  const handleFeatureClick = (path) => {
    if (!user) {
      handleAuthClick('login');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Family Calendar
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Organize your family's activities, studies, and projects in one place
        </p>
        
        {!user ? (
          <div className="space-x-4">
            <button
              onClick={() => handleAuthClick('login')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Log In to Start
            </button>
            <button
              onClick={() => handleAuthClick('register')}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Welcome back, {user.name}!
            </p>
            <button
              onClick={() => navigate('/calendar')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Calendar
            </button>
          </div>
        )}
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(feature => (
            <div
              key={feature.path}
              onClick={() => handleFeatureClick(feature.path)}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
              {!user && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">Login Required</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialView={authView}
      />
    </div>
  );
};
