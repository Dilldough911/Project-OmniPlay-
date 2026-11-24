import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  callsign: string | null;
  role: string;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    callsign: string,
  ) => Promise<{ error: Error | null; user: User | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Rehidrasi Otomatis saat Startup
    supabase.auth
      .getSession()
      .then(({ data, error }: { data: { session: Session | null }; error: Error | null }) => {
        if (error) {
          console.warn("Error fetching initial session:", error.message);
        }
        if (isMounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        console.warn("Failed to retrieve session on startup:", err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    // 2. Real-time Session Subscription
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, currentSession: Session | null) => {
        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setIsLoading(false);
        }
      },
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Ambil metadata khusus (callsign dan role)
  const callsign = useMemo(() => {
    if (!user) return null;
    return (
      (user.user_metadata?.callsign as string) ||
      user.email?.split("@")[0] ||
      "Agent"
    );
  }, [user]);

  const role = useMemo(() => {
    if (!user) return "guest";
    return (user.user_metadata?.role as string) || "hero";
  }, [user]);

  // Alur Masuk (Sign In)
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      return { error: error as Error | null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  // Alur Pendaftaran (Sign Up)
  const signUp = async (
    email: string,
    password: string,
    agentCallsign: string,
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            callsign: agentCallsign.trim() || "Agent",
            role: "hero",
          },
        },
      });
      return { error: error as Error | null, user: data.user };
    } catch (err) {
      return { error: err as Error, user: null };
    }
  };

  // Alur Keluar (Sign Out)
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Error signing out:", err);
    } finally {
      setSession(null);
      setUser(null);
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      isLoading,
      callsign,
      role,
      signIn,
      signUp,
      signOut,
    }),
    [user, session, isLoading, callsign, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
