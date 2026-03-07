import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo-campus.png';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'Nombre demasiado largo'),
  email: z.string().email('Correo electrónico inválido').max(255, 'Email demasiado largo'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(72, 'Contraseña demasiado larga'),
});

type AuthMode = 'login' | 'signup' | 'forgot';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as any)?.from?.pathname || '/campus-virtual';

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: 'Ingresa tu correo electrónico' });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Correo enviado', description: 'Revisa tu bandeja de entrada para restablecer tu contraseña.' });
      setMode('login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') return handleForgotPassword(e);

    setErrors({});
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Error de inicio de sesión',
            description: error.message.includes('Invalid login credentials')
              ? 'Credenciales incorrectas. Verifica tu correo y contraseña.'
              : error.message,
            variant: 'destructive',
          });
        } else {
          toast({ title: '¡Bienvenido!', description: 'Has iniciado sesión correctamente.' });
        }
      } else {
        const result = signupSchema.safeParse({ email, password, fullName });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: error.message.includes('User already registered') ? 'Usuario existente' : 'Error al registrarse',
            description: error.message.includes('User already registered')
              ? 'Este correo ya está registrado. Intenta iniciar sesión.'
              : error.message,
            variant: 'destructive',
          });
        } else {
          toast({ title: '¡Registro exitoso!', description: 'Tu cuenta ha sido creada. Bienvenido al Campus Virtual UTAMV.' });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-border mb-4 shadow-lg">
              <img src={utamvLogo} alt="UTAMV" className="w-14 h-14 object-contain" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {mode === 'login' ? 'Bienvenido de Vuelta' : mode === 'signup' ? 'Únete a UTAMV' : 'Recuperar Contraseña'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === 'login'
                ? 'Accede al Campus Virtual UTAMV'
                : mode === 'signup'
                ? 'Crea tu cuenta para comenzar tu formación académica'
                : 'Ingresa tu correo para recibir instrucciones'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Nombre Completo
                </Label>
                <Input
                  id="fullName" type="text" value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="bg-card border-border focus:border-primary"
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Correo Electrónico
              </Label>
              <Input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="bg-card border-border focus:border-primary"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Contraseña
                </Label>
                <Input
                  id="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-card border-border focus:border-primary"
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" onClick={() => { setMode('forgot'); setErrors({}); }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <Button
              type="submit" variant="outline" size="lg"
              className="w-full border-primary text-primary hover:bg-primary/10"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
              ) : (
                <>
                  {mode === 'login' ? 'Iniciar Sesión' : mode === 'signup' ? 'Crear Cuenta' : 'Enviar instrucciones'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            {mode === 'forgot' ? (
              <button type="button" onClick={() => { setMode('login'); setErrors({}); }}
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                ← Volver a iniciar sesión
              </button>
            ) : (
              <>
                <p className="text-muted-foreground">
                  {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </p>
                <button type="button"
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }}
                  className="text-primary hover:text-primary/80 font-medium mt-1 inline-flex items-center gap-1">
                  {mode === 'login' ? 'Registrarse' : 'Iniciar Sesión'}
                  <Sparkles className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <button type="button" onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground text-sm">
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-card via-background to-card items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative z-10 text-center px-12">
          <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-card border-4 border-border flex items-center justify-center animate-float">
            <GraduationCap className="w-20 h-20 text-primary" />
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Campus Virtual UTAMV
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Educación Superior de Calidad
          </p>
          <div className="space-y-4">
            {['Certificación Académica con QR verificable', 'Programas desde $1,200 MXN', 'Primera Generación 2026–2027'].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-secondary/5 blur-3xl" />
      </div>
    </div>
  );
};

export default Auth;
