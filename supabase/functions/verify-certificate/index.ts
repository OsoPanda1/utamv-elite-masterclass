import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const certificateNumber = url.searchParams.get('cert');

    if (!certificateNumber) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Certificate number required' 
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Lookup certificate
    const { data: certificate, error: certError } = await supabase
      .from('certificates')
      .select(`
        id,
        certificate_number,
        generated_at,
        course_id,
        user_id
      `)
      .eq('certificate_number', certificateNumber)
      .maybeSingle();

    if (certError || !certificate) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Certificado no encontrado en el sistema UTAMV',
          certificate_number: certificateNumber
        }),
        { status: 404, headers: corsHeaders }
      );
    }

    // Get profile info (without exposing sensitive data)
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('user_id', certificate.user_id)
      .maybeSingle();

    // Get course info
    const { data: course } = await supabase
      .from('courses')
      .select('title')
      .eq('id', certificate.course_id)
      .maybeSingle();

    // Return verification result
    const verificationResult = {
      valid: true,
      certificate: {
        number: certificate.certificate_number,
        issued_at: certificate.generated_at,
        holder: profile?.full_name || 'Información protegida',
        program: course?.title || 'Master Elite en Marketing Digital 2026',
        institution: 'UTAMV - Universidad Técnica de Administración Virtual',
        status: 'VÁLIDO Y VERIFICADO'
      },
      verification: {
        timestamp: new Date().toISOString(),
        method: 'Digital Verification System',
        issuer: 'TAMV ONLINE Technology'
      }
    };

    return new Response(
      JSON.stringify(verificationResult),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Verification error:', error);
    return new Response(
      JSON.stringify({ 
        valid: false, 
        error: 'Error de verificación interno' 
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
