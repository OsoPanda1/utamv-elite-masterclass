import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageSquare, GraduationCap, Clock, DollarSign, Award, BookOpen, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PreguntasFrecuentes = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todas', icon: Search },
    { id: 'admisiones', name: 'Admisiones', icon: GraduationCap },
    { id: 'programas', name: 'Programas', icon: BookOpen },
    { id: 'certificacion', name: 'Certificación', icon: Award },
    { id: 'pagos', name: 'Pagos', icon: DollarSign },
    { id: 'tecnico', name: 'Técnico', icon: ShieldCheck },
  ];

  const faqs = [
    {
      id: 1,
      category: 'admisiones',
      question: '¿Cuáles son los requisitos para ingresar a UTAMV?',
      answer: 'Nuestros programas están diseñados para profesionales con experiencia en marketing digital o áreas relacionadas. Requisitos generales: Titulo universitario, experiencia laboral en marketing, conocimiento básico de herramientas digitales, y pasión por la innovación tecnológica.',
    },
    {
      id: 2,
      category: 'programas',
      question: '¿Cuál es la duración de los programas?',
      answer: 'La duración varía según el nivel académico: Certificaciones (1-3 meses), Diplomados (3-6 meses), Máster Profesional (6-12 meses), y Maestrías (12-18 meses). Todos los programas son a distancia y self-paced.',
    },
    {
      id: 3,
      category: 'certificacion',
      question: '¿Las certificaciones UTAMV tienen validez internacional?',
      answer: 'Sí, nuestras certificaciones son reconocidas en más de 15 países y validadas por instituciones educativas globales. Incluyen verificación digital via QR y blockchain para garantizar su autenticidad.',
    },
    {
      id: 4,
      category: 'pagos',
      question: '¿Ofrecen financiamiento o cuotas?',
      answer: 'Sí, contamos con opciones de financiamiento en cuotas para diferentes países. Ofrecemos planes de pago mensuales, descuentos por pago anticipado, y becas para profesionales con excelente desempeño.',
    },
    {
      id: 5,
      category: 'tecnico',
      question: '¿Qué tecnologías debo manejar para acceder al campus?',
      answer: 'Necesitas un navegador web moderno (Chrome, Firefox, Edge), conexión a internet estable, y acceso a herramientas básicas de productividad. No requieres instalaciones complejas.',
    },
    {
      id: 6,
      category: 'programas',
      question: '¿Qué diferencia a UTAMV de otras universidades online?',
      answer: 'Nuestro modelo educativo combina rigor académico con aplicabilidad práctica, cuerpo docente de reconocimiento global, contenido actualizado constantemente, y una comunidad exclusiva de profesionales.',
    },
    {
      id: 7,
      category: 'admisiones',
      question: '¿Cuál es el proceso de admisión?',
      answer: 'El proceso incluye: postulación en línea, evaluación de perfil, entrevista virtual, y confirmación de admisión. Normalmente toma entre 3-5 días hábiles.',
    },
    {
      id: 8,
      category: 'certificacion',
      question: '¿Qué incluye el diploma digital?',
      answer: 'El diploma incluye verificación QR, registro en blockchain, certificado digital, informe de competencias, y reconocimiento institucional. Es compatible con LinkedIn y otras plataformas profesionales.',
    },
    {
      id: 9,
      category: 'programas',
      question: '¿Ofrecen apoyo académico durante el programa?',
      answer: 'Sí, contamos con asistencia AI 24/7, mentoría personalizada, grupos de estudio, y sesiones de coaching para garantizar tu éxito.',
    },
    {
      id: 10,
      category: 'pagos',
      question: '¿Hay política de reembolso?',
      answer: 'Ofrecemos reembolso completo dentro de los primeros 15 días del programa, siempre que no hayas completado más del 20% del contenido.',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              PREGUNTAS FRECUENTES
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Respuestas a las dudas más comunes sobre nuestra universidad, 
              programas y proceso de admisión.
            </p>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar preguntas frecuentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-lg border border-border"
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* FAQs */}
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <Card key={faq.id} className="border border-border">
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {faq.question}
                        </h3>
                        {activeFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      {activeFaq === faq.id && (
                        <div className="text-muted-foreground">
                          <p className="text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                    {faq.id < filteredFaqs.length && (
                      <Separator className="border-border" />
                    )}
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No se encontraron preguntas que coincidan con tu búsqueda.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('todos');
                  }}>
                    Ver todas las preguntas
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AI Support */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-background flex items-center justify-center shadow-lg">
                <MessageSquare className="w-8 h-8 text-silver" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                SOPORTE INTELIGENTE ISABELLA
              </h2>
              <p className="text-muted-foreground mb-8">
                Isabella, nuestra asistente AI, está disponible 24/7 para responder todas tus preguntas 
                sobre admisiones, programas, certificación y cualquier otro tema relacionado con UTAMV.
              </p>
              <Button size="lg" className="bg-silver text-background hover:bg-silver/90">
                Chatear con Isabella
              </Button>
            </div>
          </div>
        </section>

        {/* Guía de Estudios */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                GUÍA DE ESTUDIOS
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    ¿Cómo funciona la educación en UTAMV?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Matrícula y acceso</p>
                        <p className="text-xs text-muted-foreground">Completa el proceso de admisión y accede al campus virtual.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Aprendizaje</p>
                        <p className="text-xs text-muted-foreground">Realiza lecciones, ejercicios y proyectos en tu propio ritmo.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Evaluación</p>
                        <p className="text-xs text-muted-foreground">Completa exámenes y proyectos para demostrar tus competencias.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Certificación</p>
                        <p className="text-xs text-muted-foreground">Obtén tu certificación y acceso a la comunidad UTAMV.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Pasos para Obtener tu Certificado
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Completar contenido</p>
                        <p className="text-xs text-muted-foreground">Finaliza todas las lecciones y proyectos del programa.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Aprobar evaluaciones</p>
                        <p className="text-xs text-muted-foreground">Obtén calificaciones satisfactorias en todos los módulos.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Proyecto final</p>
                        <p className="text-xs text-muted-foreground">Completa el proyecto integrador final.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Solicitar certificado</p>
                        <p className="text-xs text-muted-foreground">Genera y descarga tu certificado digital.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PreguntasFrecuentes;