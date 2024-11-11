import React, { useEffect, useState } from 'react';
import { Command, Search, ExternalLink, Github, Linkedin, Mail, Download } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands = [
  { id: 'github', icon: Github, label: 'GitHub Profile', url: 'https://github.com' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn Profile', url: 'https://linkedin.com' },
  { id: 'email', icon: Mail, label: 'Send Email', url: 'mailto:hello@example.com' },
  { id: 'resume', icon: Download, label: 'Download Resume', url: '#' },
  { id: 'portfolio', icon: ExternalLink, label: 'View Portfolio Source', url: '#' },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => (i + 1) % filteredCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            window.open(filteredCommands[selectedIndex].url, '_blank');
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]">
      <div className="bg-zinc-900 rounded-lg shadow-2xl w-full max-w-xl overflow-hidden border border-zinc-800">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
          <Command className="text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Type a command or search..."
            className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-zinc-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          <kbd className="hidden md:block px-2 py-1 text-xs text-zinc-500 bg-zinc-800 rounded">ESC</kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredCommands.map((cmd, index) => (
            <a
              key={cmd.id}
              href={cmd.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-zinc-800 transition-colors
                ${index === selectedIndex ? 'bg-zinc-800' : ''}`}
              onClick={() => onClose()}
            >
              <cmd.icon size={18} />
              <span>{cmd.label}</span>
              {index === selectedIndex && (
                <span className="ml-auto text-xs text-zinc-500">↵</span>
              )}
            </a>
          ))}
          {filteredCommands.length === 0 && (
            <div className="px-4 py-8 text-center text-zinc-500">
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}