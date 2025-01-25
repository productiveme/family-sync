import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useAuth } from '../../../domain/hooks/useAuth';

const RegisterForm = ({ onSuccess, switchView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'parent'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(formData);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-center text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-1">
        <label 
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="space-y-1">
        <label 
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="space-y-1">
        <label 
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
          minLength={8}
        />
      </div>

      <div className="space-y-1">
        <label 
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Role
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="parent">Parent</option>
          <option value="child">Child</option>
        </select>
      </div>

      <button 
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Register
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={switchView}
          className="text-blue-600 hover:text-blue-500 font-medium dark:text-blue-400"
        >
          Login here
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
