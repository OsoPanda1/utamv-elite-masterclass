import { Link } from 'react-router-dom';
import { Globe, Mail, Linkedin, Twitter, Youtube, ExternalLink } from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo-official.jpg';

const Footer = () => {
  const footerLinks = {
    programa: [
      { label: 'Sobre el Programa', href: '/programa' },
      { label: 'Módulos', href: '/modulos' },
      { label: 'Expertos', href: '/expertos' },
      { label: 'Certificación', href: '/certificacion' },
    ],
    recursos: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Verificar Certificado', href: '/verify' },
      { label: 'Inscripción', href: '/inscripcion' },
      { label: 'Iniciar Sesión', href: '/auth' },
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
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-silver/30">
                <img src={utamvLogo} alt="UTAMV" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-gradient-silver">UTAMV</p>
                <p className="text-xs text-muted-foreground">Universidad Tecnológica Avanzada</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Formando líderes digitales desde Latinoamérica para el mundo. 
              Master Elite Profesional en Marketing Digital 2026.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-silver hover:bg-silver/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-silver hover:bg-silver/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-silver hover:bg-silver/10 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Programa */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Programa</h4>
            <ul className="space-y-3">
              {footerLinks.programa.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-silver transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-silver transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@utamv.edu"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-silver transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@utamv.edu
                </a>
              </li>
              <li>
                <a 
                  href="https://orcid.org/0009-0000-5715-9993"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-silver transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  ORCID Director
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-2">Autoría Académica</p>
              <p className="text-sm font-medium text-foreground">Edwin Oswaldo Castillo Trejo</p>
              <p className="text-xs text-muted-foreground">Anubis Villaseñor</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} UTAMV - Universidad Tecnológica Avanzada del Marketing Virtual. 
              Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-silver transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
