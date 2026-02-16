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
    { href: '/preguntas-frecuentes', label: 'PREGUNTAS FRECUENTES' },
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
          ? 'bg-[#0A1128]/95 backdrop-blur-md border-b border-gold/30 shadow-lg'
          : 'bg-[#0A1128]/80 backdrop-blur-sm border-b border-gold/20'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-gold">
              <img
                src={utamvLogo}
                alt="UTAMV"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-xl font-bold tracking-widest text-white leading-tight">
                UTAMV
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80">
                Universidad de Tecnología Avanzada, Marketing y Versatilidad
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 text-xs font-semibold tracking-[0.12em] transition-all duration-300 rounded-lg ${
                  isActive(link.href)
                    ? 'text-gold bg-gold/10 border border-gold/30'
                    : 'text-white/70 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden xl:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-xs text-white/60 max-w-[160px] truncate">
                  {user.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
                >
                  <Link to={isPaid ? '/campus-virtual' : '/admisiones'}>
                    {isPaid ? 'Campus Virtual' : 'Admisiones'}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="text-white/70 hover:text-gold hover:bg-white/5"
                >
                  <Link to="/auth">Iniciar sesión</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
                >
                  <Link to="/admisiones">Admisiones</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            className="xl:hidden p-2 text-white/70 hover:text-gold transition-colors"
            aria-label="Menú de navegación"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-24 left-0 right-0 bg-[#0A1128]/98 backdrop-blur-md border-b border-gold/30 animate-slide-up">
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`py-4 px-6 rounded-xl text-sm font-semibold tracking-wider transition-all ${
                    isActive(link.href)
                      ? 'bg-gold/10 text-gold border border-gold/30'
                      : 'text-white/70 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gold/20">
                {user ? (
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
                  >
                    <Link to={isPaid ? '/campus-virtual' : '/admisiones'}>
                      {isPaid ? 'Campus Virtual' : 'Admisiones'}
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      asChild
                      className="text-white/70 hover:text-gold hover:bg-white/5"
                    >
                      <Link to="/auth">Iniciar sesión</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      asChild
                      className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
                    >
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
