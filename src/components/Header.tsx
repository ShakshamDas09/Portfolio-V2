import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, Sparkles, Terminal, Coffee } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { CommandPalette } from './CommandPalette';

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isSparkling, setIsSparkling] = React.useState(false);
  const [showCmd, setShowCmd] = useState(false);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [lastCoffee, setLastCoffee] = useState(0);

  const triggerSparkle = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 1000);
  };

  const handleCoffee = () => {
    const now = Date.now();
    if (now - lastCoffee > 1000) {
      setCoffeeCount(prev => prev + 1);
      setLastCoffee(now);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCmd(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <header className="relative mb-16 group">
      <CommandPalette isOpen={showCmd} onClose={() => setShowCmd(false)} />
      
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
        rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-all duration-700
        animate-pulse-slow" />

      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <h1 
            className="text-5xl font-bold cursor-pointer inline-block"
            onClick={triggerSparkle}
          >
            John Smith
            <Sparkles 
              size={24} 
              className={`inline-block ml-2 transform transition-all duration-300
              ${isSparkling ? 'text-yellow-400 rotate-180 scale-125 animate-float' : 'text-zinc-600 rotate-0'}`}
            />
          </h1>
          <div className="flex-1" />
          <button
            onClick={() => setShowCmd(true)}
            className="social-link group/cmd hidden md:flex items-center gap-2 px-3"
          >
            <Terminal size={16} className="group-hover/cmd:animate-float" />
            <span className="text-sm">Press ⌘K</span>
          </button>
        </div>
      </div>
      
      <div className="relative group/bio">
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Full Stack Developer specializing in building exceptional digital experiences. 
          Currently focused on building accessible, human-centered products.
        </p>
        <div className="absolute -right-12 top-0 opacity-0 group-hover/bio:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleCoffee}
            className="social-link group/coffee relative"
            title="Buy me a coffee!"
          >
            <Coffee size={20} className="group-hover/coffee:animate-float" />
            {coffeeCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {coffeeCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link group/link"
          >
            <Github className="group-hover/link:animate-float" size={24} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link group/link"
          >
            <Linkedin className="group-hover/link:animate-float" size={24} />
          </a>
          <a 
            href="mailto:hello@example.com" 
            className="social-link group/link"
          >
            <Mail className="group-hover/link:animate-float" size={24} />
          </a>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-zinc-800/50 transition-all duration-300
          hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun size={24} className="hover:animate-float" />
          ) : (
            <Moon size={24} className="hover:animate-float" />
          )}
        </button>
      </div>
    </header>
  );
}