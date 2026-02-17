import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users } from 'lucide-react';
import { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              CONTACTO
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para resolver tus dudas y ayudarte en tu proceso de admisión.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6 bg-card/50 border border-platinum/20 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-platinum" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">admisiones@utamv.edu.mx</p>
                <p className="text-xs text-muted-foreground">Respuesta en 24-48 horas</p>
              </div>

              <div className="text-center p-6 bg-card/50 border border-platinum/20 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-platinum" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Teléfono</h3>
                <p className="text-sm text-muted-foreground mb-4">+52 (55) 1234-5678</p>
                <p className="text-xs text-muted-foreground">Lunes-Viernes: 9am-6pm</p>
              </div>

              <div className="text-center p-6 bg-card/50 border border-platinum/20 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-platinum" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Chat En Vivo</h3>
                <p className="text-sm text-muted-foreground mb-4">Agente disponible</p>
                <p className="text-xs text-muted-foreground">Respuesta inmediata</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Envíanos un Mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-platinum/20 rounded-lg focus:ring-2 focus:ring-platinum focus:border-platinum"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-platinum/20 rounded-lg focus:ring-2 focus:ring-platinum focus:border-platinum"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-card border border-platinum/20 rounded-lg focus:ring-2 focus:ring-platinum focus:border-platinum"
                      placeholder="+52 (XXX) XXX-XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-platinum/20 rounded-lg focus:ring-2 focus:ring-platinum focus:border-platinum"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="admission">Admisión y requisitos</option>
                      <option value="programs">Información sobre programas</option>
                      <option value="payment">Pagos y becas</option>
                      <option value="technical">Soporte técnico</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-card border border-platinum/20 rounded-lg focus:ring-2 focus:ring-platinum focus:border-platinum"
                    placeholder="Escribe tu mensaje..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-platinum text-primary-foreground font-semibold rounded-lg hover:bg-platinum/90 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Preguntas Frecuentes
              </h2>
              <div className="space-y-6">
                <div className="bg-card/50 p-6 rounded-xl border border-platinum/20">
                  <h3 className="font-semibold text-foreground mb-3">¿Cuánto tiempo tarda el proceso de admisión?</h3>
                  <p className="text-sm text-muted-foreground">
                    El proceso completo toma aproximadamente 2-4 semanas, dependiendo del programa.
                  </p>
                </div>
                <div className="bg-card/50 p-6 rounded-xl border border-platinum/20">
                  <h3 className="font-semibold text-foreground mb-3">¿Ofrecen becas o financiamiento?</h3>
                  <p className="text-sm text-muted-foreground">
                    Sí, contamos con programas de becas y financiamiento para estudiantes destacados.
                  </p>
                </div>
                <div className="bg-card/50 p-6 rounded-xl border border-platinum/20">
                  <h3 className="font-semibold text-foreground mb-3">¿Los títulos son reconocidos?</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos nuestros programas cuentan con la autorización correspondiente y los títulos son válidos en todo el país.
                  </p>
                </div>
                <div className="bg-card/50 p-6 rounded-xl border border-platinum/20">
                  <h3 className="font-semibold text-foreground mb-3">¿Puedo estudiar mientras trabajo?</h3>
                  <p className="text-sm text-muted-foreground">
                    Sí, nuestros programas están diseñados para estudiantes con horarios laborales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-12 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Otras Opciones de Soporte
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-platinum" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Chat en Vivo</h3>
                  <p className="text-sm text-muted-foreground">Agente disponible Lunes-Viernes 9am-6pm</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-platinum/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-platinum" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Reunión Personalizada</h3>
                  <p className="text-sm text-muted-foreground">Agenda una sesión con un advisor académico</p>
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

export default Contacto;