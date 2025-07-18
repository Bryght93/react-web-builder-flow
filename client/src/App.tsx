import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";
import { Layout } from "./components/Layout";
import VoiceFunnelsAI from "./components/VoiceFunnelsAI";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LeadMagnets from "./pages/LeadMagnets";
import Funnels from "./pages/Funnels";
import Leads from "./pages/Leads";
import EmailMarketing from "./pages/EmailMarketing";
import NotFound from "./pages/NotFound";
import PageBuilder from "./components/PageBuilder";
import AdvancedPageBuilderPage from "./pages/AdvancedPageBuilder";
import AILeadMagnetBuilder from "./components/AILeadMagnetBuilder";
import CRMDashboard from "./components/CRMDashboard";
import MultiChannelSync from "./components/MultiChannelSync";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import CallBookingCloser from "./components/CallBookingCloser";
import AdLaunchTracker from "./components/AdLaunchTracker";
import AISalesCoach from "./components/AISalesCoach";
import IntegrationsHub from "./components/IntegrationsHub";
import AILaunchAssistantPage from "./pages/AILaunchAssistant";
import AIEmailSMSEnginePage from "./pages/AIEmailSMSEngine";
import AIAdLauncherPage from "./pages/AIAdLauncher";


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lead-magnets" element={<LeadMagnets />} />
            <Route path="/funnels" element={<Funnels />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/email-marketing" element={<EmailMarketing />} />
            
            <Route path="/crm" element={<CRMDashboard />} />
            <Route path="/channels" element={<MultiChannelSync />} />
            <Route path="/page-builder" element={<PageBuilder />} />
            <Route path="/advanced-builder" element={<AdvancedPageBuilderPage />} />
            <Route path="/ai-builder" element={<AILeadMagnetBuilder />} />
            <Route path="/ai-launch" element={<AILaunchAssistantPage />} />
            <Route path="/ai-email-sms" element={<AIEmailSMSEnginePage />} />
            <Route path="/ai-ads" element={<AIAdLauncherPage />} />
            <Route path="/call-booking" element={<CallBookingCloser />} />
            <Route path="/ads" element={<AdLaunchTracker />} />
            <Route path="/ai-coach" element={<AISalesCoach />} />
            <Route path="/integrations" element={<IntegrationsHub />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <VoiceFunnelsAI />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
