import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, ArrowRight, Shield } from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo-campus.png';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for recovery event from URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    if (type === 'recovery') {
      setIsRecovery(true);
    }

    // Also listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ title: 'Error', description: 'La contraseña debe tener al menos 6 caracteres.', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Las contraseñas no coinciden.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: '¡Contraseña actualizada!', description: 'Ya puedes iniciar sesión con tu nueva contraseña.' });
      navigate('/campus-virtual');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-border mb-4">
            <img src={utamvLogo} alt="UTAMV" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Nueva Contraseña
          </h1>
          <p className="text-muted-foreground mt-2">
            {isRecovery ? 'Establece tu nueva contraseña para acceder a tu cuenta.' : 'Ingresa tu nueva contraseña.'}
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Nueva contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-card border-border focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Confirmar contraseña
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-card border-border focus:border-primary"
            />
          </div>

          <Button type="submit" variant="outline" size="lg" className="w-full border-primary text-primary hover:bg-primary/10" disabled={isLoading}>
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
            ) : (
              <>
                Actualizar contraseña
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button type="button" onClick={() => navigate('/auth')} className="text-muted-foreground hover:text-foreground text-sm">
            ← Volver a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
