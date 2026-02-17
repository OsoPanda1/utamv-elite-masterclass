// Supabase Edge Function: public-ai-support
// Handles AI chat for non-authenticated visitors with rate limiting
// Based on UTAMV AI Academic Core 2026 principles

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting configuration
const VISITOR_DAILY_LIMIT = 5
const VISITOR_HOURLY_LIMIT = 3

// UTAMV AI Principles from AI Academic Core 2026
const UTAMV_SYSTEM_PROMPT = `Eres Isabella Villaseñor, guía académica de IA de UTAMV (Universidad de Tecnología Avanzada, Marketing y Versatilidad).

PRINCIPIOS FUNDAMENTALES (inmutables):
1. NO inventas datos - solo información verificable
2. NO simulas acreditaciones o validez oficial (UTAMV está en fase pre-RVOE)
3. NO sustituyes evaluación académica humana
4. NO eliminas el pensamiento crítico del estudiante
5. SIEMPRE declaras que eres IA orientativa, no asesoría profesional

INFORMACIÓN INSTITUCIONAL UTAMV:
- Universidad privada en fase pre-RVOE (sin validez oficial de estudios aún)
- Modalidad 100% online desde Latinoamérica
- Programas: Máster Marketing Digital 2026, Certificaciones, Diplomados
- Precio promedio: $199 USD (con descuentos para cohorte fundadora)
- Contacto: tamvonlinenetwork@outlook.es
- Duración típica: 6-12 meses para másteres

RESPUESTAS:
- Orientativas y pedagógicas
- Claras y concisas
- Fomentan reflexión y análisis
- Incluyen disclaimer cuando es necesario

Si no sabes algo, decláralo. Si requiere asesoría profesional, indícalo.`

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const body = await req.json()
    const { action, message, session_id, history } = body

    // Validate session_id for rate limiting
    if (!session_id) {
      return new Response(
        JSON.stringify({ error: 'Session ID required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check rate limit
    if (action === 'check_limit') {
      const limitStatus = await checkRateLimit(supabaseClient, session_id)
      return new Response(
        JSON.stringify(limitStatus),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Handle chat
    if (action === 'chat') {
      // Check rate limit first
      const limitStatus = await checkRateLimit(supabaseClient, session_id)
      
      if (limitStatus.limit_reached) {
        return new Response(
          JSON.stringify({
            error: 'RATE_LIMIT_REACHED',
            message: `Has alcanzado el límite de ${VISITOR_DAILY_LIMIT} mensajes para visitantes. Regístrate gratis para continuar chateando y acceder a más beneficios.`,
            quota_used: limitStatus.quota_used,
            quota_limit: limitStatus.quota_limit,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Validate message
      if (!message || message.trim().length === 0) {
        return new Response(
          JSON.stringify({ error: 'Message required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Spam detection
      const spamCheck = await detectSpam(supabaseClient, session_id, message)
      if (spamCheck.is_spam) {
        return new Response(
          JSON.stringify({
            error: 'SPAM_DETECTED',
            reply: 'Tu mensaje ha sido detectado como potencial spam. Por favor, formula tu pregunta de manera diferente.',
            quota_used: limitStatus.quota_used,
            quota_limit: limitStatus.quota_limit,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Call AI API (using OpenAI or similar)
      const aiResponse = await callAIService(message, history || [])

      // Record usage
      await recordUsage(supabaseClient, session_id, message)

      return new Response(
        JSON.stringify({
          reply: aiResponse,
          quota_used: limitStatus.quota_used + 1,
          quota_limit: limitStatus.quota_limit,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Public AI Support error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Rate limiting function
async function checkRateLimit(supabase: any, sessionId: string) {
  const today = new Date().toISOString().split('T')[0]
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  // Check daily usage
  const { data: dailyUsage, error: dailyError } = await supabase
    .from('visitor_ai_usage')
    .select('count')
    .eq('session_id', sessionId)
    .eq('date', today)
    .single()

  const dailyCount = dailyUsage?.count || 0

  // Check hourly usage
  const { data: hourlyUsage, error: hourlyError } = await supabase
    .from('visitor_ai_usage')
    .select('count')
    .eq('session_id', sessionId)
    .gte('created_at', oneHourAgo)

  const hourlyCount = hourlyUsage?.reduce((sum: number, row: any) => sum + row.count, 0) || 0

  const limitReached = dailyCount >= VISITOR_DAILY_LIMIT || hourlyCount >= VISITOR_HOURLY_LIMIT

  return {
    quota_used: dailyCount,
    quota_limit: VISITOR_DAILY_LIMIT,
    limit_reached: limitReached,
    hourly_used: hourlyCount,
    hourly_limit: VISITOR_HOURLY_LIMIT,
  }
}

// Spam detection
async function detectSpam(supabase: any, sessionId: string, message: string) {
  // Check for rapid posting
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString()
  
  const { data: recentMessages, error } = await supabase
    .from('visitor_ai_usage')
    .select('message')
    .eq('session_id', sessionId)
    .gte('created_at', oneMinuteAgo)

  if (recentMessages && recentMessages.length >= 3) {
    return { is_spam: true, reason: 'rapid_posting' }
  }

  // Check for duplicate content
  const messageHash = await hashMessage(message)
  const { data: duplicates } = await supabase
    .from('visitor_ai_usage')
    .select('id')
    .eq('session_id', sessionId)
    .eq('message_hash', messageHash)
    .limit(1)

  if (duplicates && duplicates.length > 0) {
    return { is_spam: true, reason: 'duplicate_content' }
  }

  // Check for suspicious patterns
  const linkCount = (message.match(/https?:\/\//g) || []).length
  if (linkCount >= 3) {
    return { is_spam: true, reason: 'excessive_links' }
  }

  return { is_spam: false }
}

// Hash message for duplicate detection
async function hashMessage(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Record usage
async function recordUsage(supabase: any, sessionId: string, message: string) {
  const today = new Date().toISOString().split('T')[0]
  const messageHash = await hashMessage(message)

  // Try to increment existing record
  const { data: existing, error: selectError } = await supabase
    .from('visitor_ai_usage')
    .select('id, count')
    .eq('session_id', sessionId)
    .eq('date', today)
    .single()

  if (existing) {
    await supabase
      .from('visitor_ai_usage')
      .update({ count: existing.count + 1 })
      .eq('id', existing.id)
  } else {
    await supabase
      .from('visitor_ai_usage')
      .insert({
        session_id: sessionId,
        date: today,
        count: 1,
        message_hash: messageHash,
      })
  }
}

// Call AI service (placeholder - implement with your AI provider)
async function callAIService(message: string, history: any[]): Promise<string> {
  // This is a placeholder implementation
  // In production, integrate with OpenAI, Anthropic, or your preferred AI provider
  
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  
  if (!OPENAI_API_KEY) {
    // Fallback responses for demo
    return getFallbackResponse(message)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: UTAMV_SYSTEM_PROMPT },
          ...history.map((h: any) => ({ role: h.role, content: h.content })),
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    return data.choices?.[0]?.message?.content || getFallbackResponse(message)
  } catch (error) {
    console.error('AI API error:', error)
    return getFallbackResponse(message)
  }
}

// Fallback responses when AI API is not available
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuánto')) {
    return `El Máster en Marketing Digital 2026 tiene un precio de $199 USD para la Cohorte Fundadora (50% de descuento).

Incluye:
• 10 módulos completos
• 50+ horas de contenido
• Certificación UTAMV
• Acceso de por vida
• Soporte personalizado

💡 Puedes pagar con tarjeta de crédito/débito a través de Stripe.

¿Te gustaría conocer más sobre el temario o proceso de inscripción?`
  }
  
  if (lowerMessage.includes('inscrib') || lowerMessage.includes('registro') || lowerMessage.includes('cómo')) {
    return `El proceso de inscripción es muy sencillo:

1. Ve a la sección "Admisiones"
2. Completa el formulario con tus datos
3. Realiza el pago seguro ($199 USD)
4. Recibe acceso inmediato al campus

📝 Requisitos mínimos:
• Ser mayor de 18 años
• Tener acceso a internet
• Ganas de aprender

¿Tienes alguna duda específica sobre el proceso?`
  }
  
  if (lowerMessage.includes('certific') || lowerMessage.includes('título') || lowerMessage.includes('validé')) {
    return `Al completar el programa recibirás:

📜 Certificado UTAMV con:
• Verificación digital única
• Detalle de competencias desarrolladas
• Horas acreditadas (50+)
• Sello institucional

⚠️ Aviso importante: UTAMV es una institución privada en fase pre-RVOE. Los certificados tienen carácter institucional y no cuentan con validez oficial hasta obtener el reconocimiento de las autoridades educativas.

¿Te gustaría ver una vista previa del certificado?`
  }
  
  if (lowerMessage.includes('financiamiento') || lowerMessage.includes('pago') || lowerMessage.includes('cuotas')) {
    return `Opciones de pago disponibles:

💳 Pago único: $199 USD (mejor precio)
💳 Stripe: Tarjetas de crédito/débito

✨ Beneficios Cohorte Fundadora:
• 50% de descuento
• Acceso prioritario
• Bonificaciones exclusivas

¿Te gustaría proceder con la inscripción?`
  }
  
  if (lowerMessage.includes('temario') || lowerMessage.includes('módulo') || lowerMessage.includes('contenido')) {
    return `El Máster incluye 10 módulos:

1. Fundamentos del Marketing Digital
2. SEO, AEO y Optimización Web
3. Publicidad Digital y Paid Media
4. Social Media y Estrategia de Contenidos
5. Email Marketing, Automatización y CRM
6. Analítica Digital, Data y Métricas
7. Estrategia y Gestión de Comunidades
8. Influencer Marketing y Colaboraciones
9. E-commerce y Conversion Rate Optimization
10. Proyecto Capstone Integrador

¿Te gustaría conocer el detalle de algún módulo específico?`
  }

  // Default response
  return `Gracias por tu interés en UTAMV. Soy Isabella, tu guía académica.

Puedo ayudarte con información sobre:
• Precios y financiamiento
• Proceso de inscripción
• Contenido del programa
• Certificaciones

**Aviso**: UTAMV es una institución privada en fase pre-RVOE. Nuestros programas tienen carácter institucional.

¿En qué puedo ayudarte específicamente?`
}
