import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, FileText, GraduationCap, Users } from 'lucide-react';

const Requisitos = () => {
  const requirements = [
    {
      level: 'Licenciatura',
      title: 'Admisión a Licenciaturas',
      requirements: [
        'Título de bachillerato o equivalente',
        'Certificado de bachillerato con promedio mínimo de 8/10',
        'Curriculum vitae actualizado',
        'Carta de motivación',
        'Fotografía tamaño infantil',
        'Certificado de nacimiento',
        'Identificación oficial (INE/IFE/Pasaporte)',
      ],
    },
    {
      level: 'Posgrado',
      title: 'Admisión a Maestrías y Doctorados',
      requirements: [
        'Título de licenciatura o equivalente',
        'Certificado de licenciatura con promedio mínimo de 8.5/10',
        'Curriculum vitae detallado',
        'Carta de motivación',
        'Trabajo de investigación (para doctorado)',
        'Carta de recomendación de profesor',
        'Fotografía tamaño infantil',
        'Identificación oficial',
      ],
    },
    {
      level: 'Diplomados',
      title: 'Admisión a Diplomados',
      requirements: [
        'Título de licenciatura o equivalente',
        'Certificado de estudios',
        'Curriculum vitae',
        'Carta de motivación',
        'Fotografía tamaño infantil',
        'Identificación oficial',
      ],
    },
    {
      level: 'Certificaciones',
      title: 'Admisión a Certificaciones',
      requirements: [
        'Título de bachillerato o equivalente',
        'Certificado de estudios',
        'Curriculum vitae',
        'Fotografía tamaño infantil',
        'Identificación oficial',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              REQUISITOS DE ADMISIÓN
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Documentación y requisitos necesarios para ingresar a los programas de la UTAMV.
            </p>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {requirements.map((req, index) => (
                <div key={index} className="border border-platinum/20 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center">
                      {req.level === 'Licenciatura' && <GraduationCap className="w-6 h-6 text-platinum" />}
                      {req.level === 'Posgrado' && <GraduationCap className="w-6 h-6 text-platinum" />}
                      {req.level === 'Diplomados' && <FileText className="w-6 h-6 text-platinum" />}
                      {req.level === 'Certificaciones' && <CheckCircle2 className="w-6 h-6 text-platinum" />}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground">{req.title}</h2>
                      <p className="text-platinum font-semibold">{req.level}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {req.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Información Adicional
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Documentación en Digital</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Todas las solicitudes se realizan en línea. Los documentos deben ser digitalizados en formato PDF.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Entrevista Personal</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Para programas de posgrado y maestrías, se requiere entrevista personal o por videoconferencia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Evaluación Cualitativa</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      La admisión se basa en méritos académicos, experiencia laboral y potencial de desarrollo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-platinum/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-platinum" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Idiomas</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Requisitos de inglés varian según el programa. Certificados TOEFL/IELTS son recomendados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Notas Importantes
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Plazos de admisión:</strong> Las solicitudes se reciben constantemente. El proceso de evaluación toma 2-4 semanas.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Validación de títulos:</strong> Documentos emitidos en el extranjero deben estar apostillados o legalizados.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Convalidación de estudios:</strong> Estudios previos pueden ser convalidados según el programa y normativas.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Seguridad de datos:</strong> La información personal se maneja con total confidencialidad.
                    </p>
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

export default Requisitos;