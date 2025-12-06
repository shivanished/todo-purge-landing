import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import TerminalDemo from "./components/TerminalDemo";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [demoKey, setDemoKey] = useState(0);

  const handleSeeAction = () => {
    // Increment key to force re-render of TerminalDemo, resetting its state
    setDemoKey((prev) => prev + 1);

    // Smooth scroll to demo section
    setTimeout(() => {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 selection:bg-brand-500/30 selection:text-brand-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-dark-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono font-bold text-lg tracking-tighter">
            <div className="w-3 h-3 bg-brand-500 rounded-sm animate-pulse"></div>
            todo-purge
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <a
              href="https://github.com/shivanished/todo-purge"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/todo-purge"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              NPM
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero onSeeAction={handleSeeAction} />

        <div id="demo" className="scroll-mt-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Interactive Demo
            </h2>
            <p className="text-gray-500">
              Experience the power of todo-purge directly in your browser.
            </p>
          </div>
          <TerminalDemo key={demoKey} />
        </div>

        <Features />
      </main>

      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
