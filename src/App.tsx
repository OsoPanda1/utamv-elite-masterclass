import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Modulos from "@/pages/Modulos";
import ModuleViewer from "@/pages/ModuleViewer";
import Certificacion from "@/pages/Certificacion";
import Programas from "@/pages/Programas";
import ProgramDetail from "@/pages/ProgramDetail";
import Investigacion from "@/pages/Investigacion";
import Ayuda from "@/pages/Ayuda";
import Inscripcion from "@/pages/Inscripcion";
import Settings from "@/pages/Settings";
import VerifyCertificate from "@/pages/VerifyCertificate";
import Expertos from "@/pages/Expertos";
import PreguntasFrecuentes from "@/pages/PreguntasFrecuentes";
import NotFound from "@/pages/NotFound";
import PlaceholderPage from "@/pages/PlaceholderPage";

// Route Guards
import { RequireAuth } from "@/components/guards/RequireAuth";
import { RequirePaid } from "@/components/guards/RequirePaid";

function App() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Programas */}
      <Route path="/programas" element={<Programas />} />
      <Route path="/programas/:slug" element={<ProgramDetail />} />
      <Route path="/programas/maestrias" element={<PlaceholderPage />} />
      <Route path="/programas/master-profesional" element={<PlaceholderPage />} />
      <Route path="/programas/diplomados" element={<PlaceholderPage />} />
      <Route path="/programas/certificaciones" element={<PlaceholderPage />} />
      
      {/* Docentes */}
      <Route path="/docentes" element={<Expertos />} />
      <Route path="/docentes/rectoria" element={<PlaceholderPage />} />
      <Route path="/docentes/directivos" element={<PlaceholderPage />} />
      <Route path="/docentes/profesores" element={<PlaceholderPage />} />
      
      {/* Investigación */}
      <Route path="/investigacion" element={<Investigacion />} />
      <Route path="/investigacion/proyectos" element={<PlaceholderPage />} />
      <Route path="/investigacion/publicaciones" element={<PlaceholderPage />} />
      
      {/* Admisiones */}
      <Route path="/admisiones" element={<Inscripcion />} />
      <Route path="/admisiones/requisitos" element={<PlaceholderPage />} />
      <Route path="/admisiones/proceso" element={<PlaceholderPage />} />
      <Route path="/admisiones/contacto" element={<PlaceholderPage />} />
      
      {/* Otras rutas públicas */}
      <Route path="/ayuda" element={<Ayuda />} />
      <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
      <Route path="/verificar-certificado" element={<VerifyCertificate />} />

      {/* Redirects de rutas antiguas */}
      <Route path="/programa" element={<Navigate to="/programas/master-marketing-digital-2026" replace />} />
      <Route path="/expertos" element={<Navigate to="/docentes" replace />} />
      <Route path="/inscripcion" element={<Navigate to="/admisiones" replace />} />
      <Route path="/certificacion" element={<Navigate to="/campus-virtual" replace />} />
      <Route path="/dashboard" element={<Navigate to="/campus-virtual" replace />} />

      {/* CAMPUS VIRTUAL (autenticado + pagado) */}
      <Route
        path="/campus-virtual"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <Settings />
          </RequireAuth>
        }
      />
      <Route
        path="/modulos"
        element={
          <RequireAuth>
            <RequirePaid>
              <Modulos />
            </RequirePaid>
          </RequireAuth>
        }
      />
      <Route
        path="/modulos/:id"
        element={
          <RequireAuth>
            <RequirePaid>
              <ModuleViewer />
            </RequirePaid>
          </RequireAuth>
        }
      />
      <Route
        path="/module/:moduleIndex"
        element={
          <RequireAuth>
            <RequirePaid>
              <ModuleViewer />
            </RequirePaid>
          </RequireAuth>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
