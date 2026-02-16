import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Microscope, GraduationCap, Globe, ShieldCheck, BarChart3, Brain, Target } from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo-campus.png';
import edwinCastillo from '@/assets/edwin-castillo.jpg';
import renataJazmin from '@/assets/renata-jazmin.jpg';

const Index = () => {
  const academicAreas = [
    { icon: BarChart3, title: 'Marketing Digital Avanzado', description: 'SEO, AEO, metadatos y posicionamiento estratégico en buscadores e inteligencia artificial.' },
    { icon: Brain, title: 'Inteligencia Artificial Aplicada', description: 'Automatización, análisis predictivo y herramientas de IA para estrategia empresarial.' },
    { icon: Target, title: 'Estrategia y Gestión Digital', description: 'Planificación omnicanal, analítica de datos y toma de decisiones basada en evidencia.' },
    { icon: Globe, title: 'Comunicación y Medios Digitales', description: 'Narrativa digital, producción de contenido y gestión de comunidades en línea.' },
  ];

  const featuredPrograms = [
    {
      type: 'Certificado Profesional',
      title: 'Fundamentos de Marketing Digital',
      hours: '5 horas',
      duration: '1 semana',
      level: 'Introductorio',
      slug: 'fundamentos-marketing-digital',
    },
    {
      type: 'Máster Profesional',
      title: 'Marketing Digital 2026',
      hours: '50+ horas',
      duration: '6 meses',
      level: 'Avanzado',
      slug: 'master-marketing-digital-2026',
      featured: true,
    },
    {
      type: 'Doctorado Profesional',
      title: 'Inteligencia Estratégica Digital',
      hours: '120+ horas',
      duration: '12 meses',
      level: 'Especialización',
      slug: 'doctorado-inteligencia-estrategica',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero institucional */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-8">
                <img src={utamvLogo} alt="UTAMV" className="w-full h-full object-contain" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                UTAMV Campus
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                Universidad Tecnológica Avanzada del Marketing Virtual
              </p>
              <p className="text-base text-muted-foreground/80 max-w-xl mx-auto mb-10">
                Formación académica de alto nivel en marketing digital, inteligencia artificial 
                y estrategia empresarial. Nacida en Latinoamérica, con alcance global.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/programas">Explorar programas</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to="/admisiones">Admisiones</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quiénes somos */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center tracking-wide">
                QUIÉNES SOMOS
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 tracking-wider uppercase">Misión</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Formar profesionales de alto nivel en marketing digital y tecnología, 
                    con rigor académico, pensamiento estratégico y capacidad de ejecución 
                    en entornos digitales complejos.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 tracking-wider uppercase">Visión</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ser la institución de referencia en formación digital avanzada 
                    en Latinoamérica, reconocida por la calidad de sus programas, 
                    la innovación de su modelo académico y el impacto profesional de sus egresados.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 tracking-wider uppercase">Pilares</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Rigor académico, innovación tecnológica, aplicación práctica 
                    y compromiso con el desarrollo profesional de cada estudiante. 
                    Formación orientada a resultados medibles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Áreas académicas */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
              ÁREAS ACADÉMICAS
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Líneas de formación diseñadas para cubrir las competencias profesionales 
              más demandadas en el entorno digital actual.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {academicAreas.map((area, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <area.icon className="w-5 h-5 text-silver" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2">{area.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programas destacados */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
              PROGRAMAS DESTACADOS
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Oferta académica estructurada por niveles de formación, 
              desde certificaciones introductorias hasta programas de investigación aplicada.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featuredPrograms.map((prog, i) => (
                <Link
                  key={i}
                  to={`/programas/${prog.slug}`}
                  className={`group block rounded-xl border bg-card/50 hover:bg-card transition-all duration-300 overflow-hidden ${
                    prog.featured ? 'border-silver/40 ring-1 ring-silver/20' : 'border-border'
                  }`}
                >
                  {prog.featured && (
                    <div className="bg-silver/10 text-silver text-[10px] font-bold tracking-[0.2em] text-center py-1.5 uppercase">
                      Programa insignia
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                      {prog.type}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-4 group-hover:text-silver transition-colors">
                      {prog.title}
                    </h3>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Duración</span>
                        <span className="text-foreground">{prog.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Horas totales</span>
                        <span className="text-foreground">{prog.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nivel</span>
                        <span className="text-foreground">{prog.level}</span>
                      </div>
                    </div>
                    <div className="mt-5 text-xs font-semibold text-silver tracking-wider group-hover:translate-x-1 transition-transform">
                      Ver ficha académica →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Modelo académico */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
                MODELO ACADÉMICO UTAMV
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Un sistema de formación diseñado para maximizar el aprendizaje aplicado 
                y la adquisición de competencias profesionales verificables.
              </p>
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-xl border border-border bg-card/30">
                  <GraduationCap className="w-8 h-8 text-silver mx-auto mb-4" />
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Enseñanza</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Contenido multimedia estructurado: lecciones teóricas, casos de estudio, 
                    ejercicios prácticos y proyectos aplicados con datos reales.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl border border-border bg-card/30">
                  <ShieldCheck className="w-8 h-8 text-silver mx-auto mb-4" />
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Evaluación</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sistema de evaluación continua con exámenes por módulo, 
                    proyecto integrador final y criterios de aprobación transparentes.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl border border-border bg-card/30">
                  <Award className="w-8 h-8 text-silver mx-auto mb-4" />
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Certificación</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Certificado UTAMV con verificación digital, detalle de competencias 
                    desarrolladas, horas acreditadas y sello institucional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cuerpo docente preview */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center tracking-wide">
              CUERPO DOCENTE
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Profesionales con experiencia aplicada en marketing digital, 
              tecnología e inteligencia artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-3xl mx-auto">
              {[
                { img: edwinCastillo, name: 'Edwin Oswaldo Castillo Trejo', role: 'Director del Programa', company: 'CEO – TAMV Enterprise' },
                { img: renataJazmin, name: 'Renata Jazmin', role: 'Co-Directora Académica', company: 'CEO – Órbita Digital' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 w-full sm:w-auto sm:min-w-[300px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-border shrink-0">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">{doc.name}</p>
                    <p className="text-xs text-silver">{doc.role}</p>
                    <p className="text-xs text-muted-foreground">{doc.company}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/docentes" className="text-xs tracking-wider">VER EQUIPO COMPLETO →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Institutional footer CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">
                Plataforma creada con Tecnología TAMV ONLINE
              </p>
              <p className="font-display text-lg text-foreground/80 italic leading-relaxed mb-2">
                «No imitamos el futuro. Nosotros somos el futuro, lo soñamos, 
                lo creamos, lo sentimos y definitivamente lo vivimos.»
              </p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mt-4">
                Orgullosamente Realmontenses
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
