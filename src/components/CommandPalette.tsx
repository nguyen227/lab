'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import {
  tools,
  resources,
  projects,
  Tool,
  Resource,
  Project,
} from '@/lib/constants';

type SearchResult =
  | (Tool & { type: 'tool' })
  | (Resource & { type: 'resource' })
  | (Project & { type: 'project' });

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const flatResults: SearchResult[] = [
    ...tools.map((t) => ({ ...t, type: 'tool' as const })),
    ...resources.map((r) => ({ ...r, type: 'resource' as const })),
    ...projects.map((p) => ({ ...p, type: 'project' as const })),
  ].filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      ('category' in item &&
        item.category.toLowerCase().includes(query.toLowerCase())) ||
      ('tags' in item &&
        item.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase()),
        )),
  );

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const handleSelect = useCallback(
    (item: SearchResult) => {
      const target = 'href' in item ? item.href : item.url;
      if (target.startsWith('http')) {
        window.open(target, '_blank');
      } else {
        router.push(target);
      }
      closePalette();
    },
    [router, closePalette],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSelectedIndex(0);
      } else if (e.key === 'Escape') {
        closePalette();
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % flatResults.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(
            (prev) => (prev - 1 + flatResults.length) % flatResults.length,
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            handleSelect(flatResults[selectedIndex]);
          }
        }
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
      setSelectedIndex(0);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenEvent);
    };
  }, [isOpen, flatResults, selectedIndex, closePalette, handleSelect]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl overflow-hidden glass border border-border-subtle rounded-2xl shadow-2xl mx-4"
          >
            <div className="p-4 border-b border-border-subtle flex items-center gap-3">
              <Search className="w-5 h-5 text-foreground/20" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools, resources, categories..."
                className="flex-1 bg-transparent border-none outline-none text-lg font-normal placeholder:text-foreground/20 py-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border border-border-subtle text-[10px] font-black text-foreground/20">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-2">
              {flatResults.length > 0 ? (
                <div className="space-y-1">
                  {flatResults.map((item, index) => (
                    <button
                      key={item.title}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all ${
                        index === selectedIndex
                          ? 'bg-foreground/5 translate-x-1'
                          : 'hover:bg-foreground/[0.02]'
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold tracking-tight">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20 px-1.5 py-0.5 rounded-full border border-border-subtle/50">
                            {item.type}
                          </span>
                        </div>
                        <span className="text-xs text-foreground/40 font-normal line-clamp-1">
                          {item.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest hidden sm:block">
                          {'category' in item
                            ? item.category
                            : item.tags.join(', ')}
                        </span>
                        {index === selectedIndex && (
                          <span className="text-foreground/40 text-sm">→</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-foreground/10">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-foreground/20 font-medium">
                    No results found for &quot;{query}&quot;
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border-subtle bg-foreground/[0.01] flex items-center justify-between text-[10px] font-black text-foreground/10 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded border border-border-subtle leading-none">
                    ↑↓
                  </span>{' '}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded border border-border-subtle leading-none">
                    Enter
                  </span>{' '}
                  Select
                </span>
              </div>
              <div>ESC to close</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
