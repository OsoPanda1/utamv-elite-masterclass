import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { verifyCertificatePublic } from '@/lib/certificates';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2, XCircle, Award, Calendar, User, BookOpen, ArrowLeft, Shield, Search, Loader2, FileCheck } from 'lucide-react';
import utamvSeal from '@/assets/utamv-seal.png';
import { useEffect } from 'react';

export default function VerifyCertificatePage() {
  const { publicId: urlPublicId } = useParams<{ publicId: string }>();
  const [searchParams] = useSearchParams();
  const queryPublicId = searchParams.get('cert');

  const [result, setResult] = useState<{
    certificate_number: string;
    student_name: string;
    program_name: string;
    generated_at: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const certId = urlPublicId || queryPublicId;

  useEffect(() => {
    if (certId) {
      doVerify(certId);
    }
  }, [certId]);

  const doVerify = async (id: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const data = await verifyCertificatePublic(id.trim());
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) doVerify(inputValue.trim());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (searched && result) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <img src={utamvSeal} alt="UTAMV" className="h-20 w-20 mx-auto mb-4 object-contain" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Verificación de Certificado</h1>
          <Card className="border-green-500/20">
            <CardContent className="pt-8 pb-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-6">Certificado Válido</h2>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div><p className="text-xs text-muted-foreground">Titular</p><p className="font-semibold text-foreground">{result.student_name}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div><p className="text-xs text-muted-foreground">Programa</p><p className="font-semibold text-foreground">{result.program_name}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div><p className="text-xs text-muted-foreground">Fecha</p><p className="font-semibold text-foreground">{result.generated_at ? new Date(result.generated_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div><p className="text-xs text-muted-foreground">Número</p><p className="font-mono text-foreground">{result.certificate_number}</p></div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button asChild variant="outline" className="flex-1"><Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />Inicio</Link></Button>
                <Button onClick={() => { setSearched(false); setResult(null); setInputValue(''); }} className="flex-1"><Search className="h-4 w-4 mr-2" />Verificar otro</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (searched && !result) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <img src={utamvSeal} alt="UTAMV" className="h-20 w-20 mx-auto mb-4 object-contain" />
          <Card className="border-destructive/20">
            <CardContent className="pt-8 pb-8 text-center">
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-destructive mb-2">No Encontrado</h2>
              <p className="text-muted-foreground mb-6">El código no corresponde a ningún certificado registrado.</p>
              <Button onClick={() => { setSearched(false); setResult(null); setInputValue(''); }} className="w-full"><Search className="h-4 w-4 mr-2" />Intentar de nuevo</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-xl mx-auto text-center">
        <img src={utamvSeal} alt="UTAMV" className="h-20 w-20 mx-auto mb-4 object-contain" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Verificación de Certificados</h1>
        <p className="text-muted-foreground mb-8">Sistema oficial de validación académica UTAMV</p>
        <Card>
          <CardContent className="pt-8 pb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <Input
                placeholder="Código de certificado (ej: UTAMV-...)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                className="text-lg tracking-wider"
              />
              <Button type="submit" className="w-full h-12" disabled={!inputValue.trim()}>
                <Shield className="h-5 w-5 mr-2" />Verificar
              </Button>
            </form>
          </CardContent>
        </Card>
        <Button asChild variant="ghost" className="mt-6"><Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />Inicio</Link></Button>
      </div>
    </div>
  );
}
