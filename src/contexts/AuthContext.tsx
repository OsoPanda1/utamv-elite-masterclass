import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPaid: boolean;
  isAdmin: boolean;
  role: AppRole;
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: Error | null }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshPaymentStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [role, setRole] = useState<AppRole>("student");
  const [isAdmin, setIsAdmin] = useState(false);

  // =========================
  // Payment status
  // =========================
  const fetchPaymentStatus = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("is_paid")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching payment status:", error);
        return;
      }

      setIsPaid(Boolean(data?.is_paid));
    } catch (err) {
      console.error("Error fetching payment status:", err);
    }
  }, []);

  // =========================
  // Role / Admin status
  // =========================
  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc("get_user_role", {
        _user_id: userId,
      });

      if (error) {
        console.error("Error fetching user role:", error);
        setRole("student");
        setIsAdmin(false);
        return;
      }

      const resolvedRole = data ?? "student";
      setRole(resolvedRole);
      setIsAdmin(resolvedRole === "admin");
    } catch (err) {
      console.error("Error fetching user role:", err);
      setRole("student");
      setIsAdmin(false);
    }
  }, []);

  // =========================
  // Refresh combined status
  // =========================
  const refreshPaymentStatus = useCallback(async () => {
    if (!user) return;

    await Promise.all([
      fetchPaymentStatus(user.id),
      fetchUserRole(user.id),
    ]);
  }, [user, fetchPaymentStatus, fetchUserRole]);

  // =========================
  // Init + Auth listener
  // =========================
  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (error) {
        console.error("Error getting session:", error);
      }

      setSession(session ?? null);
      setUser(session?.user ?? null);

      if (session?.user) {
        await Promise.all([
          fetchPaymentStatus(session.user.id),
          fetchUserRole(session.user.id),
        ]);
      }

      setLoading(false);
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await Promise.all([
          fetchPaymentStatus(newSession.user.id),
          fetchUserRole(newSession.user.id),
        ]);
      } else {
        setIsPaid(false);
        setRole("student");
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchPaymentStatus, fetchUserRole]);

  // =========================
  // Auth actions
  // =========================
  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });

      if (!error && data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: data.user.id,
          email,
          full_name: fullName,
        });

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }

      return { error: error as Error | null };
    },
    [],
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error as Error | null };
    },
    [],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsPaid(false);
    setRole("student");
    setIsAdmin(false);
  }, []);

  // =========================
  // Context value
  // =========================
  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isPaid,
      isAdmin,
      role,
      signUp,
      signIn,
      signOut,
      refreshPaymentStatus,
    }),
    [
      user,
      session,
      loading,
      isPaid,
      isAdmin,
      role,
      signUp,
      signIn,
      signOut,
      refreshPaymentStatus,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
