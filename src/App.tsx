import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { useKonami } from "@/hooks/useKonami";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  const [redAlert, setRedAlert] = useState(false);
  useKonami(() => setRedAlert(v => !v));

  return (
    <div className={redAlert ? 'theme-red-alert' : ''}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter 
          future={{ 
            v7_startTransition: true, 
            v7_relativeSplatPath: true 
          }}
        >
          <GoogleAnalytics />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </div>
  );
};

export default App;
