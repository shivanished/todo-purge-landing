import React from 'react';
import { Trash2, Brain, Zap, GitPullRequest } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Zero Friction",
    description: "Runs in milliseconds. Designed for 'Type B' devs who want to become 'Type A' without the administrative overhead."
  },
  {
    icon: Brain,
    title: "Optional AI Smarts",
    description: "Want better context? Enable the AI flag to have GPT 5-Nano analyze the code and write the ticket description for you.",
    badge: "New"
  },
  {
    icon: GitPullRequest,
    title: "Code Context",
    description: "Automatically captures the relevant file, line number, and code snippet, attaching it to the ticket for instant context."
  },
  {
    icon: Trash2,
    title: "Auto-Purge",
    description: "Optionally removes the TODO comments from your codebase as it creates tickets, keeping your source clean."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-dark-950/50 border-y border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-dark-900 border border-dark-800 hover:border-brand-500/30 transition-colors group">
              {feature.badge && (
                <div className="absolute top-4 right-4 bg-brand-500/10 text-brand-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-500/20 uppercase tracking-wide">
                  {feature.badge}
                </div>
              )}
              <div className="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-900/20 transition-colors">
                <feature.icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;