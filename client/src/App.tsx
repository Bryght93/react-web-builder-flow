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
import Home from "./pages/marketing/Home";
import Features from "./pages/marketing/Features";
import Pricing from "./pages/marketing/Pricing";
import About from "./pages/marketing/About";
import Contact from "./pages/marketing/Contact";
import CaseStudies from "./pages/marketing/CaseStudies";
import Blog from "./pages/marketing/Blog";
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
import EmailBuilder from "./components/EmailBuilder";


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Marketing Pages (No Layout) */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          
          {/* App Pages (With Layout) */}
          <Route path="/app" element={<Layout><Index /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/lead-magnets" element={<Layout><LeadMagnets /></Layout>} />
          <Route path="/funnels" element={<Layout><Funnels /></Layout>} />
          <Route path="/leads" element={<Layout><Leads /></Layout>} />
          <Route path="/email-marketing" element={<Layout><EmailMarketing /></Layout>} />
          <Route path="/email-builder" element={<Layout><EmailBuilder /></Layout>} />
          
          <Route path="/crm" element={<Layout><CRMDashboard /></Layout>} />
          <Route path="/channels" element={<Layout><MultiChannelSync /></Layout>} />
          <Route path="/page-builder" element={<Layout><PageBuilder /></Layout>} />
          <Route path="/advanced-builder" element={<Layout><AdvancedPageBuilderPage /></Layout>} />
          <Route path="/ai-builder" element={<Layout><AILeadMagnetBuilder /></Layout>} />
          <Route path="/ai-launch" element={<Layout><AILaunchAssistantPage /></Layout>} />
          <Route path="/ai-email-sms" element={<Layout><AIEmailSMSEnginePage /></Layout>} />
          <Route path="/ai-ads" element={<Layout><AIAdLauncherPage /></Layout>} />
          <Route path="/call-booking" element={<Layout><CallBookingCloser /></Layout>} />
          <Route path="/ads" element={<Layout><AdLaunchTracker /></Layout>} />
          <Route path="/ai-coach" element={<Layout><AISalesCoach /></Layout>} />
          <Route path="/integrations" element={<Layout><IntegrationsHub /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <VoiceFunnelsAI />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
