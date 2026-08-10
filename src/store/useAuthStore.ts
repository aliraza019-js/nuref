import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      set({ user: data.user, isLoading: false });
      return data.user as User;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Login failed", isLoading: false });
      return null;
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    set({ user: null });
  },

  clearError: () => set({ error: null }),
}));
