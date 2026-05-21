import { Capa4L, TipoEvidencia, TipoModulo } from "@prisma/client";
import { prisma } from "@utamv/core-engine/db";

const rutas = [
  {
    slug: "ia-soberana",
    nombre: "IA Soberana",
    descripcion: "De usuario de IA a arquitecto cognitivo.",
    resultado: "Agente inteligente funcional aplicado a un reto real.",
  },
  {
    slug: "marketing-civilizatorio",
    nombre: "Marketing Civilizatorio",
    descripcion: "Ecosistemas narrativos, marcas con propósito y sistemas de posicionamiento.",
    resultado: "Sistema completo de posicionamiento para una marca o proyecto real.",
  },
  {
    slug: "community-manager-5d",
    nombre: "Community Manager 5D",
    descripcion: "Gobernanza digital avanzada para comunidades vivas.",
    resultado: "Operación documentada de una comunidad con protocolos, métricas y bitácora.",
  },
  {
    slug: "python-sistema-nervioso",
    nombre: "Python como Sistema Nervioso",
    descripcion: "Programación práctica para organismos digitales que perciben, procesan y actúan.",
    resultado: "Microsistema operativo conectado a datos, APIs o flujos automatizados.",
  },
];

const modulosBase = [
  {
    indice: 1,
    nombre: "Lectura del sistema",
    capa4L: Capa4L.LECTURA,
    resumen: "Mapeo de contexto, actores, datos, procesos, riesgos y oportunidades.",
    resultados: "Mapa sistémico base del proyecto.",
    horasEstimadas: 6,
  },
  {
    indice: 2,
    nombre: "Lógica de diseño",
    capa4L: Capa4L.LOGICA,
    resumen: "Traducción de problemas reales en arquitecturas y flujos.",
    resultados: "Diseño lógico documentado del sistema.",
    horasEstimadas: 8,
  },
  {
    indice: 3,
    nombre: "Laboratorio aplicado",
    capa4L: Capa4L.LABORATORIO,
    resumen: "Construcción de evidencias funcionales.",
    resultados: "Prototipo o micro-sistema operativo.",
    horasEstimadas: 10,
  },
  {
    indice: 4,
    nombre: "Legado digital",
    capa4L: Capa4L.LEGADO,
    resumen: "Documentar, publicar y custodiar activos reutilizables.",
    resultados: "Repositorio y manual operativo listos para reutilizar.",
    horasEstimadas: 6,
  },
];

async function main() {
  for (const rutaData of rutas) {
    const ruta = await prisma.ruta.upsert({
      where: { slug: rutaData.slug },
      update: rutaData,
      create: rutaData,
    });

    for (const moduloData of modulosBase) {
      const modulo = await prisma.modulo.upsert({
        where: {
          rutaId_indice: {
            rutaId: ruta.id,
            indice: moduloData.indice,
          },
        },
        update: {
          nombre: moduloData.nombre,
          capa4L: moduloData.capa4L,
          resumen: moduloData.resumen,
          resultados: moduloData.resultados,
          horasEstimadas: moduloData.horasEstimadas,
          tipo: TipoModulo.INTEGRADOR,
        },
        create: {
          rutaId: ruta.id,
          ...moduloData,
          tipo: TipoModulo.INTEGRADOR,
        },
      });

      await prisma.evidencia.upsert({
        where: {
          moduloId_tipo_descripcion: {
            moduloId: modulo.id,
            tipo: TipoEvidencia.REPO,
            descripcion: "Repositorio con entregables del módulo.",
          },
        },
        update: { plantilla: null, obligatorio: true },
        create: {
          moduloId: modulo.id,
          tipo: TipoEvidencia.REPO,
          descripcion: "Repositorio con entregables del módulo.",
          plantilla: null,
        },
      });

      await prisma.rubrica.upsert({
        where: {
          moduloId_criterio: {
            moduloId: modulo.id,
            criterio: "Dominio del Método 4L en este módulo.",
          },
        },
        update: {
          nivelOperador: "Aplica el procedimiento con guía.",
          nivelDisenador: "Adapta el procedimiento a un caso concreto.",
          nivelArquitecto: "Diseña el flujo completo del módulo para otros.",
          nivelCentinela: "Audita y mejora el módulo, midiendo impacto.",
        },
        create: {
          moduloId: modulo.id,
          criterio: "Dominio del Método 4L en este módulo.",
          nivelOperador: "Aplica el procedimiento con guía.",
          nivelDisenador: "Adapta el procedimiento a un caso concreto.",
          nivelArquitecto: "Diseña el flujo completo del módulo para otros.",
          nivelCentinela: "Audita y mejora el módulo, midiendo impacto.",
        },
      });
    }
  }
}

main()
  .then(() => console.log("Seed académico UTAMV completado."))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
