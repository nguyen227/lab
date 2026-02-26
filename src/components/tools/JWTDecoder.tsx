'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function JWTDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<Record<string, unknown> | null>(null);
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const decodeJWT = (val: string) => {
    setToken(val);
    setError('');

    if (!val) {
      setHeader(null);
      setPayload(null);
      return;
    }

    try {
      const parts = val.trim().split('.');
      if (parts.length < 2) {
        throw new Error('Token structure invalid.');
      }

      const decodedHeader = JSON.parse(
        atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')),
      );
      const decodedPayload = JSON.parse(
        atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')),
      );

      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch {
      setError('Malformed or invalid token encoding.');
      setHeader(null);
      setPayload(null);
    }
  };

  const copyResult = (data: Record<string, unknown> | null) => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelClasses =
    'text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-4 block ml-1';

  return (
    <div className="space-y-16">
      <section>
        <label className={labelClasses}>Input Token</label>
        <textarea
          rows={6}
          placeholder="Paste encoded JWT here..."
          value={token}
          onChange={(e) => decodeJWT(e.target.value)}
          className="w-full bg-foreground/[0.02] border border-border-subtle rounded-lg p-6 text-sm font-mono focus:border-foreground/20 outline-none resize-none transition-all placeholder:text-foreground/10 text-foreground/80 leading-relaxed"
        />
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-[10px] font-bold uppercase tracking-widest text-foreground/30"
            >
              / {error} /
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {payload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-12"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <label className={cn(labelClasses, 'mb-0')}>Header Data</label>
                <button
                  onClick={() => copyResult(header)}
                  className="p-2 text-foreground/20 hover:text-foreground transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="bg-foreground/[0.02] border border-border-subtle rounded-lg p-6 text-xs font-mono text-primary/80 overflow-auto">
                {JSON.stringify(header, null, 2)}
              </pre>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <label className={cn(labelClasses, 'mb-0')}>
                  Payload Claims
                </label>
                <button
                  onClick={() => copyResult(payload)}
                  className="p-2 text-foreground/20 hover:text-foreground transition-all"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <pre className="bg-foreground/[0.02] border border-border-subtle rounded-lg p-6 text-xs font-mono text-primary/80 overflow-auto">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
