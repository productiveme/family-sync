import { h } from 'preact';
import { useState } from 'preact/hooks';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md relative shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          ×
        </button>
        
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button 
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              view === 'login'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setView('login')}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              view === 'register'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setView('register')}
          >
            Register
          </button>
        </div>

        {view === 'login' ? (
          <LoginForm onSuccess={onClose} switchView={() => setView('register')} />
        ) : (
          <RegisterForm onSuccess={onClose} switchView={() => setView('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
