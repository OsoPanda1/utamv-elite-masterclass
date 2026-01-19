import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Award, Users, Globe, Volume2, VolumeX } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import aiAssistant from '@/assets/ai-assistant.jpg';

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playWelcome = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(
      "Bienvenido al Master Elite Profesional en Marketing Digital 2026. Soy Isabella Villaseñor, tu guía académica de inteligencia artificial. Estás a punto de comenzar una transformación que te posicionará como líder en el mundo digital. Prepárate para dominar el SEO, los metadatos, el geo-targeting y las estrategias más avanzadas del marketing del futuro. Universidad TAMV, formando líderes digitales desde Latinoamérica para el mundo."
    );
    utterance.lang = 'es-MX';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const stopWelcome = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <section 
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-6">
              <Award className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">Acreditación Académica UTAMV</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-foreground">Master Elite</span>
              <br />
              <span className="text-gradient-gold">Marketing Digital</span>
              <br />
              <span className="text-teal">2026</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              El primer programa internacional de clase elite nacido desde Latinoamérica. 
              Domina SEO, metadatos, geo-targeting y posicionamiento avanzado con IA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button variant="elite" size="xl" asChild>
                <a href="#inscripcion">
                  <Play className="w-5 h-5" />
                  Comenzar Ahora - $199 USD
                </a>
              </Button>
              <Button variant="teal" size="xl" asChild>
                <a href="#programa">Ver Programa Completo</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-display font-bold text-gold">10</p>
                <p className="text-sm text-muted-foreground">Módulos</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-display font-bold text-teal">50+</p>
                <p className="text-sm text-muted-foreground">Horas</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">∞</p>
                <p className="text-sm text-muted-foreground">Acceso</p>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="relative flex justify-center lg:justify-end" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 via-teal/20 to-gold/30 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse-gold" />
              
              {/* AI Image */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gold/50 shadow-gold animate-float">
                <img 
                  src={aiAssistant} 
                  alt="Isabella Villaseñor - AI Guide" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Play Button */}
              <button
                onClick={isPlaying ? stopWelcome : playWelcome}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-gold-light text-primary-foreground font-semibold shadow-gold hover:shadow-[0_8px_40px_-5px_hsla(42,70%,55%,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="w-5 h-5" />
                    Detener
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    Bienvenida IA
                  </>
                )}
              </button>

              {/* Info Badge */}
              <div className="absolute -right-4 top-1/4 px-4 py-2 rounded-lg bg-card border border-border shadow-lg animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <p className="text-xs text-muted-foreground">Tu Guía</p>
                <p className="text-sm font-semibold text-foreground">Isabella Villaseñor</p>
                <p className="text-xs text-gold">AI Academic Tutor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-10 border-t border-border/50">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              <span className="text-sm">100% Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal" />
              <span className="text-sm">Comunidad Global</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              <span className="text-sm">Certificación UTAMV</span>
            </div>
            <div className="text-sm font-display font-semibold text-gradient-gold">
              Orgullosamente Realmontenses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
