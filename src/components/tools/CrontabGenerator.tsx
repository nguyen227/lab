'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function CrontabGenerator() {
  const [expression, setExpression] = useState('* * * * *');
  const [description, setDescription] = useState('Every minute');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (expression === '* * * * *') setDescription('Every minute');
    else if (expression === '0 * * * *')
      setDescription('Every hour, at minute 0');
    else if (expression === '0 0 * * *')
      setDescription('Every day at midnight');
    else if (expression === '0 0 * * 0')
      setDescription('Every Sunday at midnight');
    else if (expression === '*/5 * * * *') setDescription('Every 5 minutes');
    else setDescription('Custom schedule configuration');
  }, [expression]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: 'Minute', exp: '* * * * *' },
    { label: '5 Min', exp: '*/5 * * * *' },
    { label: 'Hour', exp: '0 * * * *' },
    { label: 'Day', exp: '0 0 * * *' },
    { label: 'Week', exp: '0 0 * * 0' },
  ];

  const labelClasses =
    'text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-4 block ml-1';

  return (
    <div className="space-y-16">
      <section>
        <label className={labelClasses}>Expression Buffer</label>
        <div className="relative">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full bg-foreground/[0.02] border border-border-subtle rounded-lg p-8 text-2xl md:text-3xl font-mono text-center tracking-[0.4em] focus:border-foreground/20 outline-none text-foreground/80"
          />
          <div className="absolute inset-x-0 bottom-[-24px] flex justify-center space-x-8 text-[8px] font-black text-foreground/10 uppercase tracking-[0.3em] pointer-events-none">
            <span>min</span>
            <span>hr</span>
            <span>day</span>
            <span>mon</span>
            <span>dow</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-foreground/20 hover:text-foreground transition-all"
          >
            {copied ? (
              <Check className="w-5 h-5 text-primary" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row items-center gap-6 py-8 border-y border-border-subtle">
          <div className="p-3 bg-foreground/[0.03] rounded-full shrink-0">
            <Clock className="w-5 h-5 text-foreground/40" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/20 mb-1">
              Human Readable Status
            </h4>
            <p className="text-xl font-bold tracking-tight italic">
              "{description}"
            </p>
          </div>
        </div>
      </section>

      <section>
        <label className={labelClasses}>Preset Shortcuts</label>
        <div className="flex flex-wrap gap-3">
          {presets.map((p) => (
            <button
              key={p.exp}
              onClick={() => setExpression(p.exp)}
              className={cn(
                'px-4 py-2 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all',
                expression === p.exp
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent border-border-subtle text-foreground/40 hover:border-foreground/20',
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
