import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Services from "./pages/Services";
import FrameworksPage from "./pages/FrameworksPage";
import OutcomesPage from "./pages/OutcomesPage";
import InsightsPage from "./pages/InsightsPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BuildingTrustInAI from "./pages/BuildingTrustInAI";
import MeasuringWhatMatters from "./pages/MeasuringWhatMatters";
import LeadingThroughChange from "./pages/LeadingThroughChange";
import PromiseGapLanding from "./pages/promise-gap/PromiseGapLanding";
import PromiseGapProblem from "./pages/promise-gap/PromiseGapProblem";
import PromiseGapDiagnostic from "./pages/promise-gap/PromiseGapDiagnostic";
import DiagnosticFlow from "./pages/promise-gap/DiagnosticFlow";
import DiagnosticResults from "./pages/promise-gap/DiagnosticResults";
import PromiseGapVideo from "./pages/promise-gap/PromiseGapVideo";
import FieldGuide from "./pages/promise-gap/FieldGuide";
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/frameworks" element={<FrameworksPage />} />
            <Route path="/outcomes" element={<OutcomesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route
              path="/insights/building-trust-in-ai-systems"
              element={<BuildingTrustInAI />}
            />
            <Route
              path="/insights/measuring-what-matters-avs"
              element={<MeasuringWhatMatters />}
            />
            <Route
              path="/insights/leading-through-change"
              element={<LeadingThroughChange />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/promise-gap" element={<PromiseGapLanding />} />
            <Route
              path="/promise-gap/problem"
              element={<PromiseGapProblem />}
            />
            <Route
              path="/promise-gap/diagnostic"
              element={<PromiseGapDiagnostic />}
            />
            <Route
              path="/promise-gap/diagnostic/flow"
              element={<DiagnosticFlow />}
            />
            <Route
              path="/promise-gap/diagnostic/results"
              element={<DiagnosticResults />}
            />
            <Route path="/promise-gap/video" element={<PromiseGapVideo />} />
            <Route
              path="/downloads/HAI-AVS-Field-Guide-Summary"
              element={<FieldGuide />}
            />
            <Route path="/thank-you" element={<ThankYou />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
