# Manual Técnico–Académico UTAMV Elite Masterclass (Lovable)

**Versión:** 1.0  
**Fecha:** 2026-02-09  
**Mantenimiento:** Edwin Oswaldo Castillo Trejo + Equipo Técnico UTAMV

---

## Índice

1. [Introducción y Alcance](#1-introducción-y-alcance)
2. [Arquitectura General del Sistema](#2-arquitectura-general-del-sistema)
3. [Modelo de Datos](#3-modelo-de-datos)
4. [Flujo de Usuario Estudiante](#4-flujo-de-usuario-estudiante-pago-normal)
5. [Flujo de Usuario Administrador](#5-flujo-de-usuario-administrador--equipo-utamv)
6. [Estándar de Diseño de Lecciones](#6-estándar-de-diseño-de-lecciones)
7. [Voz de Isabella (TTS)](#7-voz-de-isabella-tts)
8. [Acceso Maestro para Fundador/Desarrollador](#8-acceso-maestro-para-fundadordesarrollador-sin-pago)
9. [Checklists por Lección](#9-checklists-por-lección)
10. [Procedimiento de Verificación Post–Despliegue](#10-procedimiento-de-verificación-post-despliegue)
11. [Notas Finales](#11-notas-finales)
12. [Seguridad de Datos y Políticas RLS](#12-seguridad-de-datos-y-políticas-rls)

---

## 1. Introducción y Alcance

UTAMV Elite Masterclass es un programa profesional de **Marketing Digital 360 (Versión 2026)** orientado a profesionales y emprendedores de Latinoamérica, operado como plataforma web sobre Lovable/Supabase con sistema de pago, evaluación y certificación institucional UTAMV.

Este manual está dirigido a:
- Equipo académico UTAMV (diseño de contenidos y evaluación).
- Equipo técnico (desarrollo, DevOps, QA, seguridad).
- Equipo de soporte y coordinación de cohortes.

Objetivos del manual:
- Documentar la arquitectura funcional de la plataforma.
- Definir el estándar de diseño de lecciones (incluyendo recursos visuales).
- Establecer mecanismos de acceso maestro para fundadores/desarrolladores sin pago.
- Proporcionar checklist de verificación después de cada despliegue.

---

## 2. Arquitectura General del Sistema

### 2.1 Frontend

Tecnologías:
- React + Vite.
- React Router para navegación.
- Tailwind CSS + diseño silver/platinum institucional UTAMV.
- Framer Motion para animaciones.

Páginas principales:
| Ruta | Descripción |
|------|-------------|
| `/` | Landing con intro cinematográfica y acceso a secciones clave |
| `/programa` | Descripción del programa y 4 pilares fundamentales |
| `/modulos` | Plan de estudios con los 10 módulos |
| `/expertos` | Perfil del equipo académico (Edwin, Renata, Isabella) |
| `/inscripcion` | Información de inscripción y redirección al checkout |
| `/certificacion` | Explicación del sistema de certificación |
| `/auth` | Registro e inicio de sesión |
| `/dashboard` | Panel estudiantil con progreso, estadísticas y certificados |
| `/module/:id` | Visor de módulos y lecciones |
| `/verify?cert=XXXX` | Verificación externa de certificados |
| `/settings` | Configuración de usuario (intro, preferencias) |

Componentes clave:
- `IntroScreen` – Presentación cinematográfica inicial
- `HeroSection`, `Header`, `Footer` – Estructura principal
- `LessonViewer.tsx` – Visor de lecciones con TTS Isabella
- `QuizSystem.tsx` – Sistema de evaluación con anti-plagio
- `GeneralChat.tsx` – Chat con salas y membresía
- `AISupportChat.tsx`, `HumanSupportButton.tsx` – Soporte

### 2.2 Backend e Integraciones

Backend principal:
- Supabase (PostgreSQL + Auth + Edge Functions).

Integraciones:
- Stripe para pagos:
  - Checkout a 199 USD (Master completo).
  - Webhooks configurables para confirmación de pago.
- TTS del navegador para voz femenina **Isabella** (español).
- Generación de certificados PDF con QR y verificación pública.

---

## 3. Modelo de Datos

Tablas principales en Supabase:

| Tabla | Campos principales |
|-------|-------------------|
| `profiles` | id, user_id, email, full_name, is_paid, stripe_customer_id |
| `courses` | id, title, description, price_cents, stripe_price_id |
| `modules` | id, title, description, order_index, course_id, image_url |
| `lessons` | id, module_id, title, content, order_index, duration_minutes |
| `lesson_progress` | user_id, lesson_id, completed_at, time_spent_seconds |
| `quizzes` | id, module_id, title, passing_score, is_final_exam |
| `questions` | id, quiz_id, text, order_index |
| `answers` | id, question_id, text, is_correct |
| `quiz_attempts` | user_id, quiz_id, score, passed |
| `payments` | user_id, course_id, amount_cents, status, stripe_session_id |
| `certificates` | user_id, course_id, certificate_number, generated_at |
| `chat_rooms` | id, name, description, is_public, created_by |
| `room_members` | room_id, user_id, joined_at |
| `chat_messages` | user_id, room_id, message, is_flagged |
| `support_tickets` | user_id, subject, message, status |
| `user_roles` | user_id, role (admin/instructor/student) |

Funciones de seguridad:
- `has_role(user_id, role)` – Verifica rol del usuario
- `get_user_role(user_id)` – Obtiene rol del usuario
- `has_course_access(user_id, course_id)` – Verifica acceso al curso

---

## 4. Flujo de Usuario Estudiante (Pago Normal)

1. **Registro e inicio de sesión**
   - El usuario se registra/inicia sesión en `/auth`.
   - Se crea registro en `profiles` y `user_roles` (por defecto `student`).

2. **Selección de plan y pago**
   - El usuario va a `/inscripcion` y elige el plan Master.
   - Se redirige al checkout de Stripe.
   - Stripe notifica al webhook; se marca el pago como `paid` en `payments`.

3. **Acceso al dashboard**
   - El usuario accede a `/dashboard`.
   - Ve progreso de módulos, estadísticas y acceso a certificados.

4. **Consumo del contenido**
   - Desde el dashboard, entra a `/module/:id`.
   - Recorre lecciones en `ModuleViewer`, utilizando `LessonViewer`.
   - Puede reproducir el contenido con TTS de Isabella.

5. **Evaluación y certificación**
   - Realiza quizzes módulo a módulo y el examen final.
   - Al aprobar, se genera un certificado PDF con QR.
   - El certificado se puede validar vía `/verify?cert=XXXX`.

---

## 5. Flujo de Usuario Administrador / Equipo UTAMV

**Rol:** `admin` en `user_roles`

**Permisos:**
- Acceso a todos los módulos y lecciones sin requerir pago.
- Visualizar y simular progreso de cualquier estudiante (para QA).
- Evaluar la experiencia completa: navegación, contenido, exámenes y certificados.

**Configuración:**
1. Asignar rol `admin` en tabla `user_roles` para el correo fundador.
2. El sistema verifica `has_role(uid, 'admin')` para bypass de pago.

---

## 6. Estándar de Diseño de Lecciones

### 6.1 Estructura General de Cada Lección

Cada lección debe contener:

1. **Contexto:**  
   - Qué aprenderá el estudiante y por qué es importante.

2. **Desarrollo teórico–práctico:**  
   - Explicación clara, ejemplos, referencias a casos latinoamericanos.

3. **Recurso visual principal (obligatorio):**  
   - Foto contextual, infografía, gráfico, tabla comparativa, diagrama de flujo, o mapa.

4. **Checklist accionable:**  
   - Lista de 3–7 pasos concretos que el estudiante puede ejecutar.

5. **Preguntas de reflexión o mini-quiz (1–3):**  
   - Preguntas rápidas para reforzar conceptos clave.

### 6.2 Tipos de Recursos Visuales por Módulo

| Tipo de módulo | Recursos recomendados |
|---------------|----------------------|
| Estratégicos (fundamentos, planeación) | Diagramas de flujo, mapas conceptuales, tablas comparativas |
| Ejecución (anuncios, redes, email) | Capturas, maquetas, checklists paso a paso |
| Métricas y analítica | Gráficos de barras/líneas, embudos, tablas de KPIs |
| Casos de estudio | Fotos, infografías antes/después, tablas con resultados |

---

## 7. Voz de Isabella (TTS)

### 7.1 Lineamientos Técnicos

- TTS basado en el navegador (Web Speech API).
- Seleccionar voces femeninas en español: Paulina, Monica, Helena, Laura, Lucia.
- Pitch configurado a 1.1 para tono femenino natural.
- Botón visible en cada lección: "🎧 Escuchar con Isabella".

### 7.2 Marcado de Contenido

El contenido principal de la lección debe estar en un contenedor claro:
```html
<div class="lesson-content">...</div>
```

---

## 8. Acceso Maestro para Fundador/Desarrollador (sin Pago)

### 8.1 Rol `admin` vía `user_roles`

1. **Cuenta fundador**
   - Asignar rol `admin` en `user_roles` para el correo del fundador.

2. **Bypass de pago**
   - En los guards de `/dashboard` y `/module/:id`:
   - Permitir acceso completo si `has_role(user, 'admin')`.

3. **Implementación en código:**
```typescript
// AuthContext.tsx
const [isAdmin, setIsAdmin] = useState(false);

// Verificar rol admin
const { data: roleData } = await supabase.rpc('has_role', {
  _user_id: user.id,
  _role: 'admin'
});
setIsAdmin(roleData === true);

// En guards de rutas
if (!isPaid && !isAdmin) {
  navigate('/dashboard');
}
```

4. **Seguridad**
   - Esta cuenta se utiliza exclusivamente para QA y validación interna.
   - El rol se almacena en base de datos, no en localStorage.

---

## 9. Checklists por Lección

Para cada lección, el equipo académico debe completar:

- [ ] Título claro y descriptivo
- [ ] Contexto inicial redactado
- [ ] Desarrollo teórico–práctico listo y revisado
- [ ] Recurso visual principal definido
- [ ] Checklist accionable con 3–7 pasos
- [ ] Mini-quiz o preguntas de reflexión
- [ ] Botón "Escuchar con Isabella" funcional
- [ ] Revisión de ortografía y tono institucional UTAMV

---

## 10. Procedimiento de Verificación Post–Despliegue

### 10.1 Preparación

- [ ] Configurar usuario fundador con rol `admin`
- [ ] Validar que las migraciones de Supabase estén aplicadas
- [ ] Verificar RLS habilitado en todas las tablas

### 10.2 Pasos de QA

1. **Ingreso al sistema**
   - Iniciar sesión con cuenta fundador (rol admin)

2. **Dashboard**
   - Confirmar acceso a `/dashboard` sin necesidad de pago
   - Verificar que se muestran módulos, estadísticas y certificados

3. **Módulos y lecciones**
   - Navegar a `/modulos` y luego a varios `/module/:id`
   - Revisar que todas las lecciones cargan contenido
   - Verificar que el botón de TTS Isabella funciona

4. **Exámenes y certificados**
   - Ejecutar algunos quizzes
   - Ejecutar examen final
   - Generar un certificado de prueba
   - Validar el certificado en `/verify?cert=XXXX`

5. **Chat y soporte**
   - Enviar mensaje en chat general
   - Probar asistente IA y botón de soporte humano

### 10.3 Registro de incidencias

- Registrar errores en sistema de issues con etiquetas: `utamv-masterclass`, `frontend`, `backend`, `content`

---

## 11. Notas Finales

- Este manual debe mantenerse actualizado conforme se agreguen nuevos módulos, rutas o políticas de seguridad.
- Cualquier cambio crítico en pagos, certificación o accesos maestros debe reflejarse aquí antes del siguiente despliegue público.

---

## 12. Seguridad de Datos y Políticas RLS

### 12.1 Perfiles de Usuario (`profiles`)

**Riesgo:** La tabla contiene información sensible (email, nombre, IDs de Stripe).

**Política obligatoria:**
```sql
CREATE POLICY "Require authentication for profiles"
ON profiles FOR SELECT
USING (auth.uid() IS NOT NULL);
```

### 12.2 Pagos y Transacciones (`payments`)

**Riesgo:** Contiene datos de transacciones financieras.

**Política obligatoria:**
```sql
CREATE POLICY "Require authentication for payments"
ON payments FOR SELECT
USING (auth.uid() IS NOT NULL);
```

### 12.3 Privacidad del Chat (`chat_messages`)

**Modelo implementado:** Chat con salas y membresía

- Tabla `chat_rooms` para definir salas (públicas o privadas)
- Tabla `room_members` para controlar membresía
- Los mensajes están aislados por sala
- Solo miembros de una sala ven sus mensajes

**Políticas:**
```sql
CREATE POLICY "Users see messages in their rooms or public rooms"
ON chat_messages FOR SELECT
USING (
  auth.uid() IS NOT NULL
  AND room_id IN (
    SELECT id FROM chat_rooms 
    WHERE is_public = true 
    OR id IN (SELECT room_id FROM room_members WHERE user_id = auth.uid())
  )
);
```

### 12.4 Checklist de Seguridad por Despliegue

- [ ] RLS habilitado en `profiles`, `payments`, `chat_messages`
- [ ] Políticas de autenticación obligatoria activas
- [ ] Probar con usuario no autenticado (no debe ver datos)
- [ ] Probar con usuario autenticado sin pago (acceso limitado)
- [ ] Probar con usuario pagado (acceso a sus datos únicamente)

---

## Mantenimiento y Versión

| Campo | Valor |
|-------|-------|
| Versión | v1.0 |
| Fecha | 2026-02-09 |
| Mantenedor | Edwin Oswaldo Castillo Trejo + Equipo Técnico UTAMV |
| Cambios | Cualquier modificación en Stripe, Supabase, rutas o políticas debe reflejarse aquí antes de desplegar |

---

**Plataforma creada con Tecnología TAMV ONLINE**  
*Orgullosamente Realmontenses*  
*— Anubis Villaseñor, Leyenda Urbana Alianzas LATAM*
