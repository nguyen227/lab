'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function createPassword(
  length: number,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let chars = lowercase;
  if (useUppercase) chars += uppercase;
  if (useNumbers) chars += numbers;
  if (useSymbols) chars += symbols;

  let generated = '';
  for (let i = 0; i < length; i++) {
    generated += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return generated;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(32);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState(() =>
    createPassword(32, true, true, true),
  );
  const [copied, setCopied] = useState(false);

  const generate = useCallback(
    (l: number, u: boolean, n: boolean, s: boolean) => {
      setPassword(createPassword(l, u, n, s));
    },
    [],
  );

  const handleLengthChange = (val: number) => {
    setLength(val);
    generate(val, useUppercase, useNumbers, useSymbols);
  };

  const toggleUppercase = () => {
    const next = !useUppercase;
    setUseUppercase(next);
    generate(length, next, useNumbers, useSymbols);
  };

  const toggleNumbers = () => {
    const next = !useNumbers;
    setUseNumbers(next);
    generate(length, useUppercase, next, useSymbols);
  };

  const toggleSymbols = () => {
    const next = !useSymbols;
    setUseSymbols(next);
    generate(length, useUppercase, useNumbers, next);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelClasses =
    'text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-4 block ml-1';

  return (
    <div className="space-y-16">
      <section>
        <label className={labelClasses}>Entropy Result</label>
        <div className="relative">
          <div className="w-full bg-foreground/[0.02] border border-border-subtle rounded-lg p-8 font-mono text-xl break-all min-h-[120px] flex items-center pr-16 leading-tight text-foreground/80">
            <motion.span
              key={password}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {password}
            </motion.span>
          </div>
          <button
            onClick={copyToClipboard}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-foreground/20 hover:text-foreground transition-all"
          >
            {copied ? (
              <Check className="w-6 h-6 text-primary" />
            ) : (
              <Copy className="w-6 h-6" />
            )}
          </button>
        </div>
      </section>

      <div className="grid gap-12">
        <section>
          <div className="flex justify-between items-center mb-6">
            <label className={cn(labelClasses, 'mb-0')}>Complexity</label>
            <span className="text-sm font-bold tracking-tighter">
              {length} chars
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="128"
            value={length}
            onChange={(e) => handleLengthChange(parseInt(e.target.value))}
            className="w-full h-1 bg-foreground/[0.05] rounded-full appearance-none cursor-pointer accent-foreground"
          />
        </section>

        <section className="flex flex-wrap gap-4">
          {[
            { label: 'Uppercase', state: useUppercase, set: toggleUppercase },
            { label: 'Numbers', state: useNumbers, set: toggleNumbers },
            { label: 'Special', state: useSymbols, set: toggleSymbols },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={opt.set}
              className={cn(
                'px-5 py-2.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all',
                opt.state
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent border-border-subtle text-foreground/40 hover:border-foreground/20',
              )}
            >
              {opt.label}
            </button>
          ))}
        </section>

        <button
          onClick={() => generate(length, useUppercase, useNumbers, useSymbols)}
          className="w-full bg-foreground/[0.05] hover:bg-foreground/[0.1] text-foreground font-bold h-14 rounded-lg flex items-center justify-center space-x-3 transition-all active:scale-[0.99]"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest">
            Roll New Entropy
          </span>
        </button>
      </div>
    </div>
  );
}
