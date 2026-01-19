import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import utamvSeal from '@/assets/utamv-seal.png';

const Footer = () => {
  return (
    <footer className="bg-navy-deep border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={utamvSeal} alt="UTAMV" className="w-16 h-16 glow-gold" />
              <div>
                <h3 className="font-display text-2xl font-bold text-gradient-gold">UTAMV</h3>
                <p className="text-sm text-muted-foreground">Universidad Tecnológica Avanzada<br />de Marketing Virtual</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              El primer programa internacional de marketing digital de clase elite, 
              nacido desde Latinoamérica para el mundo. Orgullosamente realmontenses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-foreground">Programa</h4>
            <ul className="space-y-3">
              {['Inicio', 'Módulos', 'Certificación', 'Instructores', 'Inscripción'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-gold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-foreground">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-gold" />
                <span>info@utamv.edu</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-teal" />
                <span>+52 (844) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <span>Real del Monte, Hidalgo<br />México</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 UTAMV - Universidad Tecnológica Avanzada de Marketing Virtual. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-gold transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-gold transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
