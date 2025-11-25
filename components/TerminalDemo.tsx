import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  AlertCircle, 
  MoreHorizontal, 
  Search, 
  Bell, 
  Edit3, 
  Maximize2,
  X,
  ChevronDown,
  Layout,
  Inbox,
  Layers,
  Users,
  Hash,
  Smile,
  Paperclip,
  Zap,
  ArrowRight,
  Command,
  Github
} from 'lucide-react';
import { DEMO_CODE_FILE, INITIAL_TICKET } from '../constants';
import { LinearTicket } from '../types';
import Button from './Button';

// Utility for syntax highlighting simulation
const SyntaxHighlight = ({ code }: { code: string }) => {
  return (
    <pre className="font-mono text-[13px] leading-6 overflow-x-auto custom-scrollbar">
      {code.split('\n').map((line, i) => {
        // Simple heuristic highlighting
        const isComment = line.trim().startsWith('//');
        const isImport = line.includes('import ') || line.includes('from ');
        const isFunction = line.includes('function ') || line.includes('=>');
        const isControl = line.includes('if ') || line.includes('return') || line.includes('await') || line.includes('throw');
        
        // Highlight the TODO line specifically
        const isTodoLine = line.includes('FIXME:') || line.includes('TODO:');

        return (
          <div key={i} className={`flex ${isTodoLine ? 'bg-yellow-500/10' : ''}`}>
            <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-4">{i + 1}</span>
            <code className="whitespace-pre">
              {isComment ? (
                <span className="text-slate-500 italic">{line}</span>
              ) : (
                <span className="text-slate-300">
                  {line.split(' ').map((word, wi) => {
                    let color = 'text-slate-300';
                    if (isImport && (word === 'import' || word === 'from')) color = 'text-purple-400';
                    else if (isFunction && (word === 'function' || word === 'const' || word === 'export')) color = 'text-red-400';
                    else if (isControl && ['if', 'await', 'return', 'throw', 'new', 'else'].some(k => word.startsWith(k))) color = 'text-purple-400';
                    else if (word.includes('(') && !word.startsWith('(')) color = 'text-blue-400';
                    else if (word.startsWith('"') || word.startsWith("'")) color = 'text-green-400';
                    else if (word === 'string' || word === 'number' || word === 'boolean') color = 'text-yellow-400';
                    
                    return <span key={wi} className={color}>{word}{' '}</span>;
                  })}
                </span>
              )}
            </code>
          </div>
        );
      })}
    </pre>
  );
};

const TerminalDemo: React.FC = () => {
  const [view, setView] = useState<'terminal' | 'linear'>('terminal');
  const [logs, setLogs] = useState<string[]>([]);
  const [typedCommand, setTypedCommand] = useState('');
  const [ticket, setTicket] = useState<LinearTicket>(INITIAL_TICKET);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-run terminal sequence
  useEffect(() => {
    if (view === 'terminal') {
      const runSequence = async () => {
        setLogs([]);
        setTypedCommand('');
        
        // Simulate typing
        const cmd = "todo-purge run";
        for (let i = 0; i <= cmd.length; i++) {
          setTypedCommand(cmd.slice(0, i));
          await new Promise(r => setTimeout(r, 50 + Math.random() * 50));
        }
        await new Promise(r => setTimeout(r, 400));
        
        // Logs
        const addLog = (l: string) => setLogs(prev => [...prev, l]);
        
        addLog("Scanning codebase for TODOs and FIXMEs...");
        await new Promise(r => setTimeout(r, 800));
        addLog("Found 1 issue in src/controllers/dispenser.ts:14");
        await new Promise(r => setTimeout(r, 600));
        addLog("Analyzing code context with Gemini 2.5...");
        await new Promise(r => setTimeout(r, 1200));
        addLog("✓ Generated ticket content");
        await new Promise(r => setTimeout(r, 400));
        addLog("✓ Created Linear issue ENG-392");
        await new Promise(r => setTimeout(r, 400));
        addLog("✓ Removed FIXME comment from source");
        await new Promise(r => setTimeout(r, 800));
        addLog("Opening ticket...");
        await new Promise(r => setTimeout(r, 1000));
        
        setView('linear');
      };

      runSequence();
    }
  }, [view]);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 lg:p-8">
      <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-[#2e2e2e] bg-[#0d0d0d] transition-all duration-500 h-[750px] flex flex-col font-sans">
        
        {view === 'terminal' ? (
          /* TERMINAL VIEW */
          <div className="flex flex-col h-full font-mono">
            {/* Terminal Header */}
            <div className="h-10 bg-[#1e1e1e] flex items-center px-4 border-b border-[#333]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="mx-auto text-gray-500 text-xs">user@dev-machine: ~/projects/coffee-bot</div>
            </div>
            
            {/* Terminal Body */}
            <div ref={terminalBodyRef} className="flex-1 bg-[#121212] p-6 text-sm text-gray-300 overflow-y-auto">
              <div className="mb-2">Last login: {new Date().toDateString()} on ttys002</div>
              <div className="flex">
                <span className="text-green-500 mr-2">➜</span>
                <span className="text-cyan-400 mr-2">coffee-bot</span>
                <span className="text-gray-400">git:(</span>
                <span className="text-red-400">main</span>
                <span className="text-gray-400">)</span>
                <span className="ml-2 text-white">{typedCommand}</span>
                {typedCommand.length < 14 && <span className="animate-pulse bg-gray-500 w-2 h-4 ml-1 inline-block align-middle"></span>}
              </div>
              
              <div className="mt-4 space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className={`${log.includes('✓') ? 'text-green-400' : 'text-gray-300'}`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* LINEAR UI CLONE */
          <div className="flex h-full bg-[#131316] text-[#e5e5e5]">
            
            {/* SIDEBAR */}
            <div className="w-[240px] bg-[#191a23] border-r border-[#22232e] flex flex-col py-4 px-3 gap-6 shrink-0 hidden md:flex">
               <div className="flex items-center gap-2 px-2 text-[#e5e5e5] font-semibold text-sm">
                 <div className="w-5 h-5 bg-indigo-500 rounded flex items-center justify-center text-[10px] text-white">E</div>
                 Engineering
                 <ChevronDown className="w-3 h-3 text-gray-500 ml-auto" />
               </div>

               <div className="space-y-1">
                 <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#2a2b36] rounded cursor-pointer transition-colors text-sm">
                   <Edit3 className="w-4 h-4" /> New Issue
                 </div>
               </div>

               <div className="space-y-0.5">
                  <div className="text-[11px] font-semibold text-gray-500 px-2 mb-1 uppercase tracking-wider">Your Space</div>
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-[#2a2b36] text-[#e5e5e5] rounded cursor-pointer text-sm font-medium">
                    <Inbox className="w-4 h-4" /> My Issues <span className="ml-auto text-xs text-gray-500">4</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#2a2b36] rounded cursor-pointer transition-colors text-sm">
                    <Layers className="w-4 h-4" /> Backlog <span className="ml-auto text-xs text-gray-500">12</span>
                  </div>
               </div>

               <div className="space-y-0.5">
                  <div className="text-[11px] font-semibold text-gray-500 px-2 mb-1 uppercase tracking-wider">Projects</div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#2a2b36] rounded cursor-pointer transition-colors text-sm">
                    <div className="w-3 h-3 rounded-full border border-gray-600"></div> Q2 Stability
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#2a2b36] rounded cursor-pointer transition-colors text-sm">
                    <div className="w-3 h-3 rounded-full border border-yellow-600"></div> Payment V3
                  </div>
               </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0">
               {/* Toolbar */}
               <div className="h-12 border-b border-[#22232e] flex items-center px-6 justify-between shrink-0">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span className="hover:text-gray-300 cursor-pointer">My issues</span>
                    <span className="text-gray-700">/</span>
                    <span className="text-gray-300">{ticket.id}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500">
                     <Button size="sm" variant="ghost" onClick={() => setView('terminal')}>
                        <TerminalIcon className="w-4 h-4 mr-2" /> Reset Demo
                     </Button>
                     <div className="w-px h-4 bg-[#333]"></div>
                     <Bell className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
                     <MoreHorizontal className="w-4 h-4 hover:text-gray-300 cursor-pointer" />
                  </div>
               </div>

               {/* Issue Scroll Area */}
               <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
                  <div className="max-w-3xl mx-auto">
                     <h1 className="text-2xl font-semibold text-[#e5e5e5] mb-6 leading-tight">
                       {ticket.title}
                     </h1>
                     
                     <div className="prose prose-invert max-w-none">
                       <p className="text-[#d1d5db] text-[15px] leading-relaxed mb-6 whitespace-pre-wrap">
                         {ticket.description}
                       </p>

                       {/* Code Snippet Box */}
                       <div className="bg-[#0f0f11] rounded-lg border border-[#2e2e2e] overflow-hidden mb-8 shadow-sm">
                          <div className="bg-[#1a1b23] px-4 py-2 text-xs font-mono text-gray-400 border-b border-[#2e2e2e] flex items-center gap-2">
                             <Github className="w-3 h-3" />
                             {ticket.codeContext?.file}
                             <span className="text-gray-600">:</span>
                             <span className="text-blue-400">{ticket.codeContext?.line}</span>
                          </div>
                          <div className="p-4">
                             <SyntaxHighlight code={ticket.codeContext?.snippet || ''} />
                          </div>
                       </div>

                       <div className="flex items-center gap-4 mb-8">
                         <div className="flex items-center gap-2 text-gray-500 text-sm hover:bg-[#1f2028] px-2 py-1 rounded cursor-pointer transition-colors">
                            <Smile className="w-4 h-4" />
                         </div>
                         <div className="flex items-center gap-2 text-gray-500 text-sm hover:bg-[#1f2028] px-2 py-1 rounded cursor-pointer transition-colors">
                            <Paperclip className="w-4 h-4" />
                            <span className="text-xs">Add sub-issues</span>
                         </div>
                       </div>

                       {/* Activity Feed */}
                       <div className="border-t border-[#22232e] pt-6">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-semibold text-[#e5e5e5]">Activity</h3>
                            <span className="text-xs text-gray-500">Subscribe</span>
                          </div>
                          
                          <div className="flex gap-4">
                             <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0 mt-1">
                               AI
                             </div>
                             <div>
                                <div className="text-sm text-gray-300">
                                   <span className="font-medium text-white">todo-purge</span> created the issue via CLI
                                   <span className="text-gray-500 text-xs ml-2">just now</span>
                                </div>
                             </div>
                          </div>
                       </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT SIDEBAR - Properties */}
            <div className="w-[260px] border-l border-[#22232e] py-6 px-4 bg-[#191a23] hidden lg:block shrink-0">
               <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">Properties</h3>
               
               <div className="space-y-5">
                  <div className="group">
                     <label className="text-xs text-gray-500 mb-1.5 block group-hover:text-gray-400 transition-colors">Status</label>
                     <div className="flex items-center gap-2 text-sm text-[#e5e5e5] hover:bg-[#2a2b36] -mx-2 px-2 py-1 rounded cursor-pointer transition-colors">
                        <div className="w-3 h-3 rounded-full border-[3px] border-gray-500"></div>
                        {ticket.status}
                     </div>
                  </div>

                  <div className="group">
                     <label className="text-xs text-gray-500 mb-1.5 block group-hover:text-gray-400 transition-colors">Priority</label>
                     <div className="flex items-center gap-2 text-sm text-[#e5e5e5] hover:bg-[#2a2b36] -mx-2 px-2 py-1 rounded cursor-pointer transition-colors">
                        <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                        {ticket.priority}
                     </div>
                  </div>

                  <div className="group">
                     <label className="text-xs text-gray-500 mb-1.5 block group-hover:text-gray-400 transition-colors">Assignee</label>
                     <div className="flex items-center gap-2 text-sm text-[#e5e5e5] hover:bg-[#2a2b36] -mx-2 px-2 py-1 rounded cursor-pointer transition-colors">
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white">Y</div>
                        {ticket.assignee}
                     </div>
                  </div>

                  <div className="group">
                     <label className="text-xs text-gray-500 mb-1.5 block group-hover:text-gray-400 transition-colors">Labels</label>
                     <div className="flex flex-wrap gap-2 pt-1">
                        {ticket.labels.map(l => (
                          <span key={l} className="text-xs bg-[#2a2b36] text-gray-300 px-2 py-0.5 rounded border border-[#383945] hover:border-gray-500 cursor-pointer transition-colors">
                            {l}
                          </span>
                        ))}
                        <span className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer flex items-center">
                          <PlusIcon className="w-3 h-3" />
                        </span>
                     </div>
                  </div>

                  <div className="group">
                     <label className="text-xs text-gray-500 mb-1.5 block group-hover:text-gray-400 transition-colors">Project</label>
                     <div className="flex items-center gap-2 text-sm text-[#e5e5e5] hover:bg-[#2a2b36] -mx-2 px-2 py-1 rounded cursor-pointer transition-colors">
                        <Hash className="w-3 h-3 text-gray-500" />
                        {ticket.project}
                     </div>
                  </div>
               </div>

               <div className="mt-12 pt-6 border-t border-[#2e2e2e]">
                  <div className="text-xs text-gray-500 mb-4">
                    Context from <span className="text-brand-400">todo-purge</span>
                  </div>
                  <div className="bg-[#131316] p-3 rounded border border-[#2e2e2e] text-xs text-gray-400">
                    <div className="flex justify-between mb-2">
                      <span>Detected Priority</span>
                      <span className="text-orange-400">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tech Debt Score</span>
                      <span className="text-red-400">8/10</span>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        )}
      </div>
      
      {/* Caption */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        {view === 'terminal' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Running CLI demo...
          </span>
        ) : (
           <span className="flex items-center justify-center gap-2 animate-fade-in">
             <CheckCircle2 className="w-4 h-4 text-brand-500" />
             Ticket created in 1.2s
           </span>
        )}
      </div>
    </div>
  );
};

// Helper component
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default TerminalDemo;
