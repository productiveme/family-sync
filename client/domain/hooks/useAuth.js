import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null }),
}));

export const useAuth = () => {
  const { user, token, setAuth, clearAuth } = useAuthStore();

  const login = async ({ email, password }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      setAuth(data.user, data.token);
      localStorage.setItem('auth_token', data.token);
      
      return data.user;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async ({ name, email, password, role }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      setAuth(data.user, data.token);
      localStorage.setItem('auth_token', data.token);
      
      return data.user;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    clearAuth();
    localStorage.removeItem('auth_token');
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    if (token && !user) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAuth(data.user, token);
        } else {
          clearAuth();
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        clearAuth();
        localStorage.removeItem('auth_token');
      }
    }
  };

  return {
    user,
    token,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };
};
