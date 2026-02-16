# UTAMV - Universidad Tecnológica Avanzada del Marketing Virtual

## Plataforma de Campus Universitario Online

UTAMV es una plataforma educativa innovadora especializada en formación de alto nivel en marketing digital, inteligencia artificial y estrategia empresarial. Diseñada para profesionales que buscan desarrollar competencias avanzadas en entornos digitales.

## Características Principales

### 1. Sistema de Autenticación y Autorización
- **Login/Registro**: Validación de formularios con Zod
- **Roles de Usuario**: Estudiante, Admin, Pagado/No Pagado
- **Protección de Rutas**: Guards para acceso controlado
- **Recuperación de Cuenta**: (Próximamente)

### 2. Dashboard Académico
- **Visualización de Progreso**: Gráficos interactivos con Recharts
- **Certificación**: Generación automática de PDFs con pdf-lib
- **Chat Integrado**: Comunidad en tiempo real y soporte IA
- **Evaluación**: Sistema de exámenes con anti-plagio
- **Contenido Multimedia**: Lecciones estructuradas con audio y visuales

### 3. Sistema de Certificación
- **Generación Automática**: Certificados PDF con diseño institucional
- **Verificación Digital**: QR únicos para validación pública
- **Niveles de Certificación**: Profesional, Master Elite, Doctorado
- **Registro Académico**: Almacenamiento seguro de credenciales

### 4. Chat y Soporte
- **Chat General**: Comunidad de estudiantes (solo pagados)
- **AI Support**: Asistente virtual "Isabella" con límite diario
- **Human Support**: Tickets de soporte con email backup
- **Moderación**: Detección de spam y contenido no permitido

### 5. Sistema de Evaluación
- **Anti-plagio**: Deshabilitación de copy/paste y context menu
- **Timer**: Límites de tiempo según tipo de examen
- **Resultados**: Feedback inmediato con revisión de respuestas
- **Aprobación**: 70% mínimo para aprobación

## Programas Académicos

### Certificado Profesional
- **Duración**: 1 semana (5 horas)
- **Nivel**: Introductorio
- **Contenido**: Fundamentos de Marketing Digital
- **Precio**: $60 USD

### Master Profesional (Programa Insignia)
- **Duración**: 6 meses (50+ horas)
- **Nivel**: Avanzado
- **Contenido**: Marketing Digital 2026
- **Precio**: $199 USD

### Doctorado Profesional
- **Duración**: 12 meses (120+ horas)
- **Nivel**: Especialización
- **Contenido**: Inteligencia Estratégica Digital
- **Precio**: $1,750 USD

## Tecnologías Utilizadas

### Frontend
- React 18 con TypeScript
- Vite para desarrollo rápido
- Tailwind CSS para estilos
- shadcn-ui para componentes UI
- Lucide React para iconos
- Recharts para gráficos

### Backend
- Supabase (PostgreSQL + autenticación)
- Functions Serverless
- Storage de archivos

### Integrations
- Stripe para procesamiento de pagos
- pdf-lib para generación de PDFs
- QRCode para códigos QR
- Speech Synthesis para audio

## Arquitectura del Proyecto

```
src/
├── pages/           # 15 páginas principales
├── components/      # UI components y dashboard
├── contexts/       # Auth context
├── integrations/   # Supabase client
├── hooks/          # Custom hooks
└── data/           # Contenido estático
```

## Instalación y Configuración

### Requisitos
- Node.js 16+
- npm o yarn
- Cuenta de Supabase

### Pasos de Instalación
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno en `.env` (base de datos Supabase)
4. Iniciar servidor de desarrollo: `npm run dev`
5. Acceder a `http://localhost:5173`

## Despliegue

### Producción
1. Construir el proyecto: `npm run build`
2. Desplegar en Vercel, Netlify o similar
3. Configurar variables de entorno en el servidor

## Contribución

1. Crear una rama para la funcionalidad
2. Implementar cambios
3. Crear pull request
4. Revisión y mergue

## Licencia

Este proyecto está bajo licencia MIT.

## Contacto

- Email: info@utamv.edu
- Soporte: tamvonlinenetwork@outlook.es
- Página web: https://utamv.edu

## Derechos Reservados

© 2026 UTAMV - Universidad Tecnológica Avanzada del Marketing Virtual. Todos los derechos reservados.
