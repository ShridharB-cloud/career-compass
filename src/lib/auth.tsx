import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { email: string; name: string };

type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);
const KEY = "careerforge_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const login = async (email: string, _password: string) => {
    const u = { email, name: email.split("@")[0] };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };
  const signup = async (name: string, email: string, _password: string) => {
    const u = { email, name };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
