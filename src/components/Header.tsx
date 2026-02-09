import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import utamvLogo from '@/assets/utamv-logo-official.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isPaid } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Cerrar menú móvil al cambiar de ruta
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/programa', label: 'Programa' },
    { href: '/modulos', label: 'Módulos' },
    { href: '/expertos', label: 'Expertos' },
    { href: '/certificacion', label: 'Certificación' },
  ];

  const handlePrimaryCta = () => {
    if (user && isPaid) {
      navigate('/dashboard');
    } else if (user && !isPaid) {
      navigate('/inscripcion');
    } else {
      navigate('/auth');
    }
  };

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-gradient-to-b from-background/80 via-background/40 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Marca */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-silver/30 glow-silver transition-transform duration-300 group-hover:scale-105">
              <img
                src={utamvLogo}
                alt="UTAMV"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-bold text-gradient-silver leading-tight">
                UTAMV Elite Masterclass
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Máster en Marketing Digital
              </p>
            </div>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium relative transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-silver after:w-full after:bg-silver'
                      : 'text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full hover:after:bg-silver'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTAs desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground max-w-[180px] truncate text-right">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Cambiar de cuenta</Link>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Iniciar sesión</Link>
              </Button>
            )}
            <Button variant="elite" size="sm" onClick={handlePrimaryCta}>
              {user && isPaid ? 'Ir a mi Dashboard' : 'Inscribirme ahora'}
            </Button>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="lg:hidden p-2 text-foreground hover:text-silver transition-colors"
            aria-label="Abrir menú de navegación"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border animate-slide-up">
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`py-3 px-4 rounded-lg transition-all ${
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-foreground hover:text-silver hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                {user ? (
                  <Button variant="ghost" asChild>
                    <Link to="/auth">Cambiar de cuenta</Link>
                  </Button>
                ) : (
                  <Button variant="ghost" asChild>
                    <Link to="/auth">Iniciar sesión</Link>
                  </Button>
                )}
                <Button variant="elite" onClick={handlePrimaryCta}>
                  {user && isPaid ? 'Ir a mi Dashboard' : 'Inscribirme ahora'}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
