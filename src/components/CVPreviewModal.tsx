import { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, X, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { trackDownload, trackEvent } from '@/lib/analytics';

const CV_PATH = '/Nicolette_Mashaba_CV.pdf';

interface CVPreviewModalProps {
  trigger: React.ReactNode;
}

export const CVPreviewModal = ({ trigger }: CVPreviewModalProps) => {
  const [open, setOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIframeLoaded(false);
    trackEvent('cv_preview_open', { category: 'cv' });
  };

  // Fallback: If the browser's PDF viewer doesn't trigger the onLoad event,
  // we show the iframe anyway after a short delay to ensure it's visible.
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setIframeLoaded(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span onClick={handleOpen} className="contents">
        {trigger}
      </span>

      <DialogContent
        className="
          fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
          w-[95vw] max-w-5xl h-[92vh] max-h-[92vh]
          p-0 border border-primary/30 bg-background shadow-2xl shadow-primary/10
          flex flex-col overflow-hidden rounded-xl
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        "
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-primary/20 bg-background/95 backdrop-blur flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-md bg-primary/10">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <DialogTitle className="text-sm font-mono font-semibold text-foreground truncate">
              Nicolette Mashaba: CV
            </DialogTitle>
            <DialogDescription className="sr-only">
              Interactive preview of Nicolette Mashaba's Curriculum Vitae.
            </DialogDescription>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Interactive CV page */}
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium bg-secondary/15 text-secondary border border-secondary/30 hover:bg-secondary/25 transition-all"
              onClick={() => trackEvent('cv_interactive_open', { category: 'cv' })}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Interactive CV</span>
              <span className="sm:hidden">Interactive</span>
            </a>

            {/* Open in new tab */}
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium text-muted-foreground border border-foreground/10 hover:text-foreground hover:border-foreground/30 transition-all"
              onClick={() => trackEvent('cv_open_tab', { category: 'cv' })}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in tab</span>
            </a>

            {/* Download */}
            <a
              href={CV_PATH}
              download="Nicolette_Mashaba_CV.pdf"
              className="min-h-11 flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
              onClick={() => trackDownload('Nicolette_Mashaba_CV.pdf', 'pdf')}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="min-w-11 min-h-11 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all"
              aria-label="Close CV preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <div className="relative flex-1 min-h-0 bg-muted/20">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-xs font-mono">Loading CV…</span>
            </div>
          )}

          <iframe
            src={CV_PATH}
            title="Nicolette Mashaba CV"
            className={`w-full h-full border-0 transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-center py-2 border-t border-primary/10 bg-background/95 flex-shrink-0">
          <p className="text-[10px] text-muted-foreground font-mono">
            Scroll to read · Download for offline access
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
