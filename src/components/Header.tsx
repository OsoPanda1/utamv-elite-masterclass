import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import utamvLogo from '@/assets/utamv-logo-campus.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isPaid } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/programas', label: 'PROGRAMAS' },
    { href: '/docentes', label: 'DOCENTES' },
    { href: '/investigacion', label: 'INVESTIGACIÓN' },
    { href: '/admisiones', label: 'ADMISIONES' },
    { href: '/campus-virtual', label: 'CAMPUS VIRTUAL' },
    { href: '/ayuda', label: 'AYUDA' },
  ];

  const isActive = (href: string) =>
    href === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-background/80 backdrop-blur-sm border-b border-border/50'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src={utamvLogo}
                alt="UTAMV"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-bold tracking-widest text-foreground leading-tight">
                UTAMV
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Campus Universitario
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-xs font-semibold tracking-[0.12em] transition-colors duration-300 rounded-md ${
                  isActive(link.href)
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden xl:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground max-w-[160px] truncate">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link to={isPaid ? '/campus-virtual' : '/admisiones'}>
                    {isPaid ? 'Campus Virtual' : 'Admisiones'}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Iniciar sesión</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admisiones">Admisiones</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            className="xl:hidden p-2 text-foreground hover:text-silver transition-colors"
            aria-label="Menú de navegación"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-20 left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border animate-slide-up">
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`py-3 px-4 rounded-lg text-sm font-semibold tracking-wider transition-all ${
                    isActive(link.href)
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                {user ? (
                  <Button variant="outline" asChild>
                    <Link to={isPaid ? '/campus-virtual' : '/admisiones'}>
                      {isPaid ? 'Campus Virtual' : 'Admisiones'}
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link to="/auth">Iniciar sesión</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/admisiones">Admisiones</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
