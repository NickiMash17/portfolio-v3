import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageSquare, Sparkles, Zap, Code2, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { portfolioData, getSystemPrompt, generateLocalResponse } from '@/lib/portfolioData';
import { trackAIChat } from '@/lib/analytics';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-lg glass border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all group opacity-0 group-hover:opacity-100"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={14} className="text-accent" />
      ) : (
        <Copy size={14} className="text-muted-foreground group-hover:text-primary" />
      )}
    </button>
  );
};

const quickCommands = [
  { icon: Code2, label: 'Skills', query: 'What are your technical skills?' },
  { icon: Sparkles, label: 'Projects', query: 'Tell me about your best projects' },
  { icon: Zap, label: 'Experience', query: 'What is your work experience?' },
  { icon: MessageSquare, label: 'About', query: 'Tell me about yourself' },
];

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "⚡ Neural link established. I'm Nicolette's AI consciousness—ask me anything about skills, projects, or experience. Try a quick command below!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [useLocalFallback, setUseLocalFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, quickQuery?: string) => {
    e?.preventDefault();
    const messageText = quickQuery || input.trim();
    if (!messageText || isLoading) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setInput('');
    const userMessage = { role: 'user' as const, content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setStreamingMessage('');
    
    // Track AI chat interaction
    trackAIChat('query_sent', messageText);

    abortControllerRef.current = new AbortController();

    // Check if we should use local fallback
    const shouldUseLocal = useLocalFallback || !import.meta.env.VITE_SUPABASE_URL;

    if (shouldUseLocal) {
      // Simulate typing delay for better UX
      setTimeout(() => {
        const localResponse = generateLocalResponse(messageText);
        setMessages((prev) => [...prev, { role: 'assistant', content: localResponse }]);
        setIsLoading(false);
        setStreamingMessage('');
      }, 500);
      return;
    }

    try {
      // Prepare messages with system prompt
      const systemMessage = {
        role: 'system' as const,
        content: getSystemPrompt(),
      };
      
      const conversationMessages = [
        systemMessage,
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: messageText },
      ];

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ 
            messages: conversationMessages,
            systemPrompt: getSystemPrompt(),
            portfolioData: portfolioData,
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullResponse += content;
              setStreamingMessage(fullResponse);
            }
          } catch {
            // Incomplete JSON - will be completed in next chunk
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Commit the final message
      if (fullResponse) {
        setMessages((prev) => [...prev, { role: 'assistant', content: fullResponse }]);
      }
      setStreamingMessage('');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request cancelled');
        return;
      }

      console.error('Chat error:', error);
      
      // Fallback to local response on error
      const localResponse = generateLocalResponse(messageText);
      
      toast({
        title: '⚠️ Using Local Mode',
        description: 'API unavailable, using local knowledge base',
        variant: 'default',
      });
      
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: localResponse + '\n\n*Note: Using local knowledge base. For full AI capabilities, the API connection is needed.*'
      }]);
      setStreamingMessage('');
      setUseLocalFallback(true);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleReset = () => {
    setMessages([{
      role: 'assistant',
      content: "⚡ Neural link established. I'm Nicolette's AI consciousness—ask me anything about skills, projects, or experience. Try a quick command below!",
    }]);
    setUseLocalFallback(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <>
      {/* Chat Toggle Button with Animated Ring */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="relative rounded-full h-14 w-14 p-0 glass border-primary/50 hover:bg-primary/20 hover:scale-110 transition-all shadow-xl glow-primary group"
        >
          {isOpen ? (
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          ) : (
            <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[calc(100vh-6rem)] sm:h-[600px] max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-8rem)] glass rounded-2xl border border-primary/30 flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 230, 230, 0.15) 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}
            />
          </div>

          {/* Header */}
          <div className="relative p-4 border-b border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-full bg-primary/20">
                <Bot className="text-primary animate-pulse" size={24} />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                  useLocalFallback ? 'bg-yellow-500' : 'bg-accent'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  Neural Assistant
                  <span className={`text-xs font-mono animate-pulse ${
                    useLocalFallback ? 'text-yellow-500' : 'text-primary'
                  }`}>●</span>
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {useLocalFallback ? 'Local Mode • v2.5' : 'AI.v2.5 • Real-time'}
                </p>
              </div>
              {messages.length > 1 && (
                <Button
                  onClick={handleReset}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
                  title="Reset conversation"
                >
                  <RefreshCw size={14} />
                </Button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="relative flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.length === 1 && (
              <div className="mb-3 sm:mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(undefined, cmd.query)}
                    disabled={isLoading}
                    className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 glass rounded-xl border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <cmd.icon size={18} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground group-hover:text-foreground">
                      {cmd.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 sm:gap-3 animate-fade-in ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`p-1.5 sm:p-2 rounded-full relative flex-shrink-0 ${
                    message.role === 'user' ? 'bg-accent/20' : 'bg-primary/20'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                  ) : (
                    <>
                      <Bot size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    </>
                  )}
                </div>
                <div
                  className={`group relative flex-1 p-2.5 sm:p-3 rounded-2xl backdrop-blur-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 text-foreground'
                      : 'glass border border-primary/20 hover:border-primary/40 transition-colors'
                  }`}
                >
                  {message.role === 'assistant' && <CopyButton text={message.content} />}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content.split('\n').map((line, i) => {
                      // Enhanced markdown-like formatting
                      const parts: (string | JSX.Element)[] = [];
                      let remaining = line;
                      let partIndex = 0;
                      
                      // Process bold text **text**
                      while (remaining.includes('**')) {
                        const start = remaining.indexOf('**');
                        if (start > 0) {
                          parts.push(remaining.slice(0, start));
                        }
                        const end = remaining.indexOf('**', start + 2);
                        if (end > start) {
                          parts.push(
                            <strong key={`${i}-${partIndex++}`} className="text-foreground font-semibold">
                              {remaining.slice(start + 2, end)}
                            </strong>
                          );
                          remaining = remaining.slice(end + 2);
                        } else {
                          parts.push(remaining);
                          remaining = '';
                        }
                      }
                      if (remaining) parts.push(remaining);
                      
                      const content = parts.length > 0 ? parts : [line];
                      
                      if (line.trim() === '') {
                        return <br key={i} />;
                      }
                      if (line.startsWith('•') || line.startsWith('-')) {
                        return <div key={i} className="ml-2">{content}</div>;
                      }
                      return <div key={i}>{content}</div>;
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {streamingMessage && (
              <div className="flex gap-2 sm:gap-3 animate-fade-in">
                <div className="p-1.5 sm:p-2 rounded-full bg-primary/20 relative flex-shrink-0">
                  <Bot size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                </div>
                <div className="flex-1 p-2.5 sm:p-3 rounded-2xl glass border border-primary/20">
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {streamingMessage}
                    <span className="inline-block w-0.5 sm:w-1 h-3 sm:h-4 ml-1 bg-primary animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {isLoading && !streamingMessage && (
              <div className="flex gap-2 sm:gap-3 animate-fade-in">
                <div className="p-1.5 sm:p-2 rounded-full bg-primary/20 relative flex-shrink-0">
                  <Bot size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                </div>
                <div className="glass border border-primary/20 p-2.5 sm:p-3 rounded-2xl">
                  <div className="flex gap-1 items-center">
                    <span className="text-[10px] sm:text-xs text-muted-foreground font-mono mr-2">Processing</span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={(e) => handleSubmit(e)} className="relative p-3 sm:p-4 border-t border-primary/30 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type command or query..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl glass border border-primary/30 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono text-xs sm:text-sm"
                  disabled={isLoading}
                  autoFocus
                />
                {input && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-primary">
                    ⏎
                  </div>
                )}
              </div>
              <Button
                type="submit"
                size="icon"
                className="rounded-xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/50 transition-all hover:scale-105 disabled:opacity-50 h-10 w-10 sm:h-11 sm:w-11"
                disabled={isLoading || !input.trim()}
              >
                <Send size={16} className={`sm:w-[18px] sm:h-[18px] ${isLoading ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono mt-2 text-center">
              Powered by Neural AI • {new Date().getFullYear()}
            </p>
          </form>
        </div>
      )}
    </>
  );
};
