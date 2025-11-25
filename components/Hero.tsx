import React, { useState } from 'react';
import { Copy, Check, ChevronRight, Sparkles } from 'lucide-react';
import { CLI_INSTALL_CMD } from '../constants';
import Button from './Button';

interface HeroProps {
  onSeeAction?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSeeAction }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CLI_INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActionClick = () => {
    if (onSeeAction) {
      onSeeAction();
    } else {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth'});
    }
  };

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Background Blobs */}
      <div className="blob bg-brand-600 top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="blob bg-purple-600 top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800 border border-dark-700 text-xs font-medium text-brand-400 mb-8 animate-fade-in-up">
          <Sparkles className="w-3 h-3" />
          <span className="text-gray-300">New Feature:</span>
          <span className="font-semibold text-brand-300">Optional AI Descriptions</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl">
          Turn your TODOs into <br/>
          <span className="gradient-text">Linear tickets instantly.</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          The CLI tool that scans your codebase and converts comments into tracked issues. 
          <span className="block mt-2 text-gray-500 text-lg">
            Works instantly out of the box. Toggle on the <span className="text-gray-300 font-medium">optional AI mode</span> to have Gemini write the descriptions for you.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto mb-16">
          <div className="relative flex items-center w-full">
            <div className="absolute left-4 text-gray-500 select-none">$</div>
            <input 
              readOnly 
              value={CLI_INSTALL_CMD}
              className="w-full bg-dark-900 border border-dark-700 text-gray-300 font-mono text-sm py-3 pl-8 pr-12 rounded-lg focus:outline-none focus:border-brand-500/50"
            />
            <button 
              onClick={handleCopy}
              className="absolute right-2 p-1.5 hover:bg-dark-800 rounded-md transition-colors text-gray-500 hover:text-white"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <Button size="lg" className="w-full sm:w-auto min-w-[160px]" onClick={handleActionClick}>
            See it in Action <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Hero;