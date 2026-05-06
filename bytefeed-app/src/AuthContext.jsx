import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { name, handle, avatarUrl }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // true enquanto restaura sessão do localStorage

  // Restaura sessão ao carregar o app
  useEffect(() => {
    const storedToken = localStorage.getItem('bf_token');
    const storedUser = localStorage.getItem('bf_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Credenciais inválidas.');
    }

    const data = await res.json();
    _persistSession(data);
    return data;
  }, []);

  const register = useCallback(async (name, handle, email, password) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, handle, email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Erro ao criar conta.');
    }

    const data = await res.json();
    _persistSession(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('bf_token');
    localStorage.removeItem('bf_user');
    setToken(null);
    setUser(null);
  }, []);

  function _persistSession(data) {
    const userInfo = { name: data.name, handle: data.handle, avatarUrl: data.avatarUrl };
    localStorage.setItem('bf_token', data.token);
    localStorage.setItem('bf_user', JSON.stringify(userInfo));
    setToken(data.token);
    setUser(userInfo);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
