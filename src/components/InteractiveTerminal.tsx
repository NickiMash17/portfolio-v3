import { Suspense, lazy, useState, useRef, useEffect, KeyboardEvent } from 'react';
import { getTerminalData } from '@/lib/terminalData';

const MatrixRain = lazy(async () => {
  const mod = await import('./MatrixRain');
  return { default: mod.MatrixRain };
});

const PacmanGame = lazy(async () => {
  const mod = await import('./PacmanGame');
  return { default: mod.PacmanGame };
});

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

const portfolioData = getTerminalData();

export const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { command: '', output: (
      <div className="space-y-1">
        <p className="text-accent font-semibold">Welcome to Nicolette's Portfolio Terminal! 🚀</p>
        <p className="text-muted-foreground">Type <span className="text-primary">help</span> to see available commands.</p>
      </div>
    )}
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showPacman, setShowPacman] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, (args?: string[]) => React.ReactNode> = {
    help: () => (
      <div className="space-y-1">
        <p className="text-accent font-semibold">Available Commands:</p>
        <p><span className="text-primary">about</span>     - Learn about me</p>
        <p><span className="text-primary">skills</span>    - View my technical skills</p>
        <p><span className="text-primary">projects</span>  - Browse my projects</p>
        <p><span className="text-primary">experience</span>- View work experience</p>
        <p><span className="text-primary">contact</span>   - Get my contact info</p>
        <p><span className="text-primary">social</span>    - Social media links</p>
        <p><span className="text-primary">download cv</span>- Download my resume</p>
        <p><span className="text-primary">matrix</span>    - Matrix rain effect</p>
        <p><span className="text-primary">pacman</span>      - Play Pacman game</p>
        <p><span className="text-primary">clear</span>     - Clear terminal</p>
        <p><span className="text-primary">ls</span>        - List portfolio sections</p>
        <p><span className="text-primary">whoami</span>    - Who am I?</p>
        <p><span className="text-primary">date</span>      - Current date</p>
        <p><span className="text-primary">neofetch</span>  - System info (fun!)</p>
      </div>
    ),
  about: () => (
    <div className="space-y-2">
      <p className="text-accent font-semibold text-lg">{portfolioData.about.name}</p>
      <p className="text-primary">{portfolioData.about.title}</p>
      <p className="text-muted-foreground">📍 {portfolioData.about.location}</p>
      <p className="mt-2 text-foreground/80">{portfolioData.about.bio}</p>
    </div>
  ),
  skills: () => (
    <div className="space-y-3">
      <p className="text-accent font-semibold">Technical Skills:</p>
      {Object.entries(portfolioData.skills).map(([category, items]) => (
        <div key={category}>
          <span className="text-primary capitalize">{category}: </span>
          <span className="text-foreground/80">{items.join(' • ')}</span>
        </div>
      ))}
    </div>
  ),
  projects: () => (
    <div className="space-y-2">
      <p className="text-accent font-semibold">Featured Projects:</p>
      {portfolioData.projects.map((project, i) => (
        <div key={i} className="glass rounded px-3 py-2 border border-foreground/10">
          <p className="text-primary font-medium">{project.name}</p>
          <p className="text-muted-foreground text-xs">{project.tech}</p>
          <p className="text-xs mt-1">{project.status}</p>
        </div>
      ))}
      <p className="text-muted-foreground text-xs mt-2">Type 'scroll projects' to view more →</p>
    </div>
  ),
  experience: () => (
    <div className="space-y-2">
      <p className="text-accent font-semibold">Work Experience:</p>
      {portfolioData.experience.map((exp, i) => (
        <div key={i} className="border-l-2 border-primary pl-3">
          <p className="text-primary font-medium">{exp.role}</p>
          <p className="text-foreground/70">{exp.company}</p>
          <p className="text-muted-foreground text-xs">{exp.period}</p>
        </div>
      ))}
    </div>
  ),
  contact: () => (
    <div className="space-y-2">
      <p className="text-accent font-semibold">Contact Information:</p>
      <p><span className="text-primary">📧 Email: </span>{portfolioData.about.email}</p>
      <p><span className="text-primary">📍 Location: </span>{portfolioData.about.location}</p>
      <p className="text-muted-foreground text-xs mt-2">Type 'scroll contact' to open contact form →</p>
    </div>
  ),
  social: () => (
    <div className="space-y-2">
      <p className="text-accent font-semibold">Social Links:</p>
      <p>
        <span className="text-primary">GitHub: </span>
        <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          {portfolioData.social.github}
        </a>
      </p>
      <p>
        <span className="text-primary">LinkedIn: </span>
        <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          {portfolioData.social.linkedin}
        </a>
      </p>
    </div>
  ),
  'download': (args) => {
    if (args?.[0] === 'cv') {
      window.open('/Nicolette-Mashaba-CV.pdf', '_blank');
      return <p className="text-accent">📄 Opening CV download...</p>;
    }
    return <p className="text-destructive">Unknown file. Try 'download cv'</p>;
  },
  clear: () => null, // handled specially
  ls: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {['about/', 'skills/', 'projects/', 'experience/', 'contact/', 'social/'].map((dir) => (
        <span key={dir} className="text-primary">{dir}</span>
      ))}
    </div>
  ),
  whoami: () => <p className="text-accent">visitor@nicolette-portfolio ~ Welcome! 👋</p>,
  date: () => <p className="text-foreground/80">{new Date().toLocaleString()}</p>,
  scroll: (args) => {
    const section = args?.[0];
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      return <p className="text-accent">📍 Scrolling to {section}...</p>;
    }
    return <p className="text-destructive">Usage: scroll [section] (about, skills, projects, contact)</p>;
  },
  neofetch: () => (
    <div className="flex gap-4 items-start">
      <pre className="text-primary text-[10px] sm:text-xs leading-tight hidden sm:block">{`
   ___  _   _
  / _ \\| \\ | |
 | | | |  \\| |
 | |_| | |\\  |
  \\___/|_| \\_|
      `}</pre>
      <div className="text-xs space-y-1">
        <p><span className="text-primary">OS:</span> Portfolio v3.0</p>
        <p><span className="text-primary">Host:</span> Johannesburg, SA</p>
        <p><span className="text-primary">Kernel:</span> React 18.3.1</p>
        <p><span className="text-primary">Shell:</span> TypeScript 5.0</p>
        <p><span className="text-primary">Theme:</span> Dark Mode 🌙</p>
        <p><span className="text-primary">Terminal:</span> Interactive v1.0</p>
        <div className="flex gap-1 mt-2">
          {['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-cyan-500', 'bg-blue-500', 'bg-purple-500'].map((c) => (
            <span key={c} className={`w-3 h-3 ${c} rounded-sm`} />
          ))}
        </div>
      </div>
    </div>
  ),
  sudo: () => <p className="text-destructive">Nice try! 😄 You don't have admin access.</p>,
  rm: () => <p className="text-destructive">⚠️ Cannot delete portfolio files. Nice try though!</p>,
  pwd: () => <p className="text-foreground/80">/home/visitor/nicolette-portfolio</p>,
  cd: () => <p className="text-muted-foreground">Use 'scroll [section]' to navigate the portfolio</p>,
  cat: () => <p className="text-muted-foreground">Try 'about', 'skills', or 'projects' to view content</p>,
    echo: (args) => <p className="text-foreground/80">{args?.join(' ') || ''}</p>,
    history: () => <p className="text-muted-foreground">Command history is stored locally in this session</p>,
    exit: () => <p className="text-accent">👋 Thanks for visiting! Refresh to restart.</p>,
    matrix: () => {
      setShowMatrix(true);
      return <p className="text-accent">🌧️ Matrix rain activated! Press ESC to exit.</p>;
    },
    pacman: () => {
      setShowPacman(true);
      return <p className="text-accent">👾 Pacman game started! Use WASD or arrow keys to play. Press ESC to exit.</p>;
    },
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const mainCommand = parts[0];
    const args = parts.slice(1);

    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (mainCommand === 'clear') {
      setHistory([]);
      return;
    }

    const handler = commands[mainCommand];
    const output = handler 
      ? handler(args) 
      : <p className="text-destructive">Command not found: {mainCommand}. Type 'help' for available commands.</p>;

    setHistory(prev => [...prev, { command: cmd, output, isError: !handler }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMatrix(false);
        setShowPacman(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  if (showMatrix) {
    return (
      <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 glow-primary border border-primary/30 w-full">
        <Suspense fallback={<div className="min-h-[260px] sm:min-h-[320px]" aria-hidden="true" />}>
          <MatrixRain onClose={() => setShowMatrix(false)} />
        </Suspense>
      </div>
    );
  }

  if (showPacman) {
    return (
      <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 glow-primary border border-primary/30 w-full">
        <Suspense fallback={<div className="min-h-[260px] sm:min-h-[320px]" aria-hidden="true" />}>
          <PacmanGame onClose={() => setShowPacman(false)} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 glow-primary border border-primary/30 w-full">
      {/* Terminal Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/70 hover:bg-destructive transition-colors cursor-pointer" />
        <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary/70 hover:bg-secondary transition-colors cursor-pointer" />
        <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent/70 hover:bg-accent transition-colors cursor-pointer" />
        <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-muted-foreground font-mono">
          visitor@nicolette-portfolio ~ interactive
        </span>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        onClick={focusInput}
        className="bg-card/50 rounded-lg p-3 sm:p-4 min-h-[220px] sm:min-h-[280px] max-h-[320px] sm:max-h-[400px] overflow-y-auto cursor-text font-mono text-xs sm:text-sm"
      >
        {/* Command History */}
        {history.map((item, i) => (
          <div key={i} className="mb-3">
            {item.command && (
              <div className="flex items-center gap-2">
                <span className="text-accent">➜</span>
                <span className="text-primary">~</span>
                <span className="text-foreground/90">{item.command}</span>
              </div>
            )}
            <div className="mt-1 ml-4 text-foreground/80">{item.output}</div>
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2">
          <span className="text-accent">➜</span>
          <span className="text-primary">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground caret-accent"
            placeholder="type a command..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <span className="animate-pulse text-accent">▊</span>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
        {['help', 'about', 'skills', 'projects', 'matrix', 'pacman'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              handleCommand(cmd);
              setInput('');
            }}
            className="glass rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-muted-foreground hover:text-primary hover:border-primary/50 border border-foreground/10 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
