import { Link } from 'react-router-dom';
import { Globe, Mail, ExternalLink } from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo-campus.png';

const Footer = () => {
  const columns = {
    academia: [
      { label: 'Programas', href: '/programas' },
      { label: 'Docentes', href: '/docentes' },
      { label: 'Investigación', href: '/investigacion' },
      { label: 'Modelo Académico', href: '/#modelo' },
    ],
    estudiantes: [
      { label: 'Admisiones', href: '/admisiones' },
      { label: 'Campus Virtual', href: '/campus-virtual' },
      { label: 'Verificar Certificado', href: '/verificar-certificado' },
      { label: 'Ayuda', href: '/ayuda' },
    ],
    legal: [
      { label: 'Términos y Condiciones', href: '#' },
      { label: 'Política de Privacidad', href: '#' },
      { label: 'Política de Reembolso', href: '#' },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img src={utamvLogo} alt="UTAMV" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-display text-lg font-bold tracking-widest text-foreground">UTAMV</p>
                <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Campus Universitario</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Universidad Tecnológica Avanzada del Marketing Virtual. 
              Formación académica de alto nivel desde Latinoamérica.
            </p>
            <p className="text-xs text-muted-foreground/60 italic">
              Plataforma creada con Tecnología TAMV ONLINE
            </p>
          </div>

          {/* Academia */}
          <div>
            <h4 className="font-display text-xs font-semibold text-foreground mb-4 tracking-[0.2em] uppercase">Academia</h4>
            <ul className="space-y-3">
              {columns.academia.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Estudiantes */}
          <div>
            <h4 className="font-display text-xs font-semibold text-foreground mb-4 tracking-[0.2em] uppercase">Estudiantes</h4>
            <ul className="space-y-3">
              {columns.estudiantes.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display text-xs font-semibold text-foreground mb-4 tracking-[0.2em] uppercase">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@utamv.edu" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  info@utamv.edu
                </a>
              </li>
              <li>
                <a href="https://orcid.org/0009-0008-5050-1539" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Globe className="w-4 h-4" />
                  ORCID Director
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Dirección Académica</p>
              <p className="text-sm font-medium text-foreground">Edwin Oswaldo Castillo Trejo</p>
              <p className="text-xs text-muted-foreground">Anubis Villaseñor</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} UTAMV – Universidad Tecnológica Avanzada del Marketing Virtual. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {columns.legal.map((link, i) => (
                <a key={i} href={link.href} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground/50 mt-4 tracking-wider">
            Orgullosamente Realmontenses
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
