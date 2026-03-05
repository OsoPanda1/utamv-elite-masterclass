// ============================================
// UTAMV Campus - Página de Verificación de Certificados
// ============================================

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { verifyCertificatePublic, formatPublicId } from '@/lib/certificates';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  Calendar, 
  User, 
  BookOpen,
  ArrowLeft,
  Shield,
  Search,
  Loader2,
  FileCheck
} from 'lucide-react';
import utamvSeal from '@/assets/utamv-seal.png';

interface VerificationResult {
  public_id: string;
  student_name: string;
  program_name: string;
  issue_date: string;
  status: string;
  final_average: number | null;
}

export default function VerifyCertificatePage() {
  const { publicId: urlPublicId } = useParams<{ publicId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPublicId = searchParams.get('cert');
  
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const publicId = urlPublicId || queryPublicId;

  useEffect(() => {
    if (publicId) {
      verifyCertificate(publicId);
    }
  }, [publicId]);

  const verifyCertificate = async (id: string) => {
    setLoading(true);
    setSearched(true);
    
    try {
      // Limpiar el ID (quitar guiones si los tiene)
      const cleanId = id.replace(/-/g, '');
      const data = await verifyCertificatePublic(cleanId);
      setResult(data);
    } catch (err) {
      console.error('Error verifying certificate:', err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      verifyCertificate(inputValue.trim());
    }
  };

  // Si está cargando
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verificando certificado...</p>
        </div>
      </div>
    );
  }

  // Mostrar resultado de verificación - Certificado VÁLIDO
  if (searched && result && result.status === 'valid') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <img 
              src={utamvSeal} 
              alt="UTAMV Seal" 
              className="h-24 w-24 mx-auto mb-4 object-contain"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              Verificación de Certificado
            </h1>
            <p className="text-gray-600 mt-2">
              Universidad Tecnológica Autónoma de México Virtual
            </p>
          </div>

          {/* Resultado válido */}
          <Card className="border-green-200 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Certificado Válido
                </h2>
                <p className="text-gray-600">
                  Este certificado ha sido verificado y es auténtico
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Nombre del titular</p>
                    <p className="font-semibold text-gray-900">{result.student_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Programa</p>
                    <p className="font-semibold text-gray-900">{result.program_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha de emisión</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(result.issue_date).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Código de verificación</p>
                    <p className="font-mono text-lg text-gray-900">
                      {formatPublicId(result.public_id)}
                    </p>
                  </div>
                </div>

                {result.final_average && (
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Promedio final</p>
                      <p className="font-semibold text-gray-900">{result.final_average}/100</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Verificación segura</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Este documento fue emitido por UTAMV y está registrado en nuestra base de datos.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al inicio
                  </Link>
                </Button>
                <Button onClick={() => {setSearched(false); setResult(null); setInputValue('');}} className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Verificar otro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Mostrar resultado de verificación - Certificado NO VÁLIDO
  if (searched && !result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <img 
              src={utamvSeal} 
              alt="UTAMV Seal" 
              className="h-24 w-24 mx-auto mb-4 object-contain"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              Verificación de Certificado
            </h1>
          </div>

          <Card className="border-red-200">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                Certificado No Encontrado
              </h2>
              <p className="text-gray-600 mb-6">
                El código proporcionado no corresponde a ningún certificado válido en nuestro sistema.
              </p>
              
              <div className="space-y-3">
                <Button onClick={() => {setSearched(false); setResult(null); setInputValue('');}} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Intentar nuevamente
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/ayuda">
                    Contactar soporte
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Formulario de búsqueda (estado inicial)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src={utamvSeal} 
            alt="UTAMV Seal" 
            className="h-24 w-24 mx-auto mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold text-gray-900">
            Verificación de Certificados
          </h1>
          <p className="text-gray-600 mt-2">
            Sistema oficial de validación de documentos académicos UTAMV
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="pt-8 pb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de certificado
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Ingresa el código (ej: ABCD-1234-EFGH)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                    className="pr-12 text-lg tracking-wider"
                    maxLength={14}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Ingresa el código de 12 caracteres que aparece en tu certificado
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg"
                disabled={!inputValue.trim()}
              >
                <Shield className="h-5 w-5 mr-2" />
                Verificar certificado
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">¿Dónde encuentro el código?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>En la parte inferior de tu certificado impreso o digital</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>En el correo de confirmación de emisión del certificado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>En tu cuenta del campus virtual, sección "Mis certificados"</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
