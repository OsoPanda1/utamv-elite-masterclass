import { Routes, Route } from "react-router-dom";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Modulos from "@/pages/Modulos";
import ModuleViewer from "@/pages/ModuleViewer";
import Certificacion from "@/pages/Certificacion";
import Programa from "@/pages/Programa";
import Inscripcion from "@/pages/Inscripcion";
import Settings from "@/pages/Settings";
import VerifyCertificate from "@/pages/VerifyCertificate";
import Expertos from "@/pages/Expertos";
import NotFound from "@/pages/NotFound";

// Route Guards
import { RequireAuth } from "@/components/guards/RequireAuth";
import { RequirePaid } from "@/components/guards/RequirePaid";
import { RequireAdmin } from "@/components/guards/RequireAdmin";

function App() {
  return (
    <Routes>
      {/* ========================= */}
      {/* RUTAS PÚBLICAS */}
      {/* ========================= */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/programa" element={<Programa />} />
      <Route path="/inscripcion" element={<Inscripcion />} />
      <Route path="/expertos" element={<Expertos />} />
      <Route
        path="/verificar-certificado"
        element={<VerifyCertificate />}
      />

      {/* ========================= */}
      {/* RUTAS AUTENTICADAS */}
      {/* ========================= */}
      <Route
        path="/dashboard"
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

      {/* ========================= */}
      {/* RUTAS DE PAGO */}
      {/* ========================= */}
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
        path="/certificacion"
        element={
          <RequireAuth>
            <RequirePaid>
              <Certificacion />
            </RequirePaid>
          </RequireAuth>
        }
      />

      {/* ========================= */}
      {/* RUTAS ADMIN (ESCALABLES) */}
      {/* ========================= */}
      {/* 
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          </RequireAuth>
        }
      />
      */}

      {/* ========================= */}
      {/* 404 */}
      {/* ========================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
