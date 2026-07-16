import { useState, useEffect } from 'react';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Link2, Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

export const SocialShare = ({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Nicolette Mashaba | AI Engineer | LLM & Agent Systems',
  description = 'AI Engineer building production LLM systems: multi-agent orchestration (LangGraph, DSPy), RAG pipelines, and compliance automation on Azure.'
}: SocialShareProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canUseWebShare, setCanUseWebShare] = useState(false);

  useEffect(() => {
    // Check if Web Share API is available (mobile devices)
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setCanUseWebShare(true);
    }
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=m_neyi`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  };

  const handleShare = async (platform: string) => {
    trackEvent('Social Share', 'Share Click', platform);

    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
      return;
    }

    if (platform === 'web-share' && canUseWebShare) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        trackEvent('Social Share', 'Web Share', 'success');
        setIsOpen(false);
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
      return;
    }

    // Open share link in new window
    const shareUrl = shareLinks[platform as keyof typeof shareLinks];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed right-6 z-40" style={{ bottom: 'calc(5.75rem + env(safe-area-inset-bottom))' }}>
      {/* Share Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all shadow-xl shadow-primary/40 group"
        aria-label="Share portfolio"
      >
        <Share2 className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Share Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute bottom-20 right-0 glass rounded-2xl p-4 border border-primary/20 shadow-xl min-w-[200px] max-h-[70vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Share Portfolio</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Close share menu"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-2">
              {/* Web Share API (Mobile) */}
              {canUseWebShare && (
                <button
                  onClick={() => handleShare('web-share')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Share2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Share via...</span>
                </button>
              )}

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Facebook className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-sm font-medium">Facebook</span>
              </button>

              {/* Twitter/X */}
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-black/10 dark:bg-white/10 group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors">
                  <Twitter className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-sm font-medium">Twitter/X</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-[#0A66C2]/10 group-hover:bg-[#0A66C2]/20 transition-colors">
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>

              {/* Email */}
              <button
                onClick={() => handleShare('email')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium">Email</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {copied ? (
                    <Check className="w-4 h-4 text-accent" />
                  ) : (
                    <Link2 className="w-4 h-4 text-primary" />
                  )}
                </div>
                <span className="text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
