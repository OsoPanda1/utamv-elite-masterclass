import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ModuleViewer from "./pages/ModuleViewer";
import VerifyCertificate from "./pages/VerifyCertificate";
import Programa from "./pages/Programa";
import Modulos from "./pages/Modulos";
import Expertos from "./pages/Expertos";
import Inscripcion from "./pages/Inscripcion";
import Certificacion from "./pages/Certificacion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/module/:moduleId" element={<ModuleViewer />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/programa" element={<Programa />} />
            <Route path="/modulos" element={<Modulos />} />
            <Route path="/expertos" element={<Expertos />} />
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/certificacion" element={<Certificacion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
