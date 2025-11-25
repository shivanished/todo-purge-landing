import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dark-800 bg-dark-900 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-600 rounded-sm"></div>
          <span className="font-bold text-white tracking-tight">todo-purge</span>
        </div>
        
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Open Source. Released under MIT License.
        </div>

        <div className="flex gap-4">
          <a href="https://github.com/shivanished/todo-purge" className="text-gray-500 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://x.com/sonishivansh1" className="text-gray-500 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;