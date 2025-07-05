import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LeadMagnets from "./pages/LeadMagnets";
import Funnels from "./pages/Funnels";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";
import PageBuilder from "./components/PageBuilder";
import AILeadMagnetBuilder from "./components/AILeadMagnetBuilder";
import CRMDashboard from "./components/CRMDashboard";
import MultiChannelSync from "./components/MultiChannelSync";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lead-magnets" element={<LeadMagnets />} />
          <Route path="/funnels" element={<Funnels />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/crm" element={<CRMDashboard />} />
          <Route path="/channels" element={<MultiChannelSync />} />
          <Route path="/page-builder" element={<PageBuilder />} />
          <Route path="/ai-builder" element={<AILeadMagnetBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
