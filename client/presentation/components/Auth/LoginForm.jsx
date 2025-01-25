import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'wouter';
import useUserStore from '../../../domain/store/userStore';
import styles from './Auth.module.css';

export const LoginForm = () => {
  const [, navigate] = useLocation();
  const { login } = useUserStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // In a real app, this would make an API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        navigate('/calendar');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div class={styles.container}>
      <form onSubmit={handleSubmit} class={styles.form}>
        <h2>Login</h2>
        
        {error && <div class={styles.error}>{error}</div>}
        
        <div class={styles.field}>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData(prev => ({
              ...prev,
              email: e.target.value
            }))}
            required
          />
        </div>

        <div class={styles.field}>
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={e => setFormData(prev => ({
              ...prev,
              password: e.target.value
            }))}
            required
          />
        </div>

        <button type="submit" class={styles.submitButton}>
          Log In
        </button>

        <p class={styles.links}>
          Don't have an account?{' '}
          <a href="/register" onClick={e => {
            e.preventDefault();
            navigate('/register');
          }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};
