'use client';

import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BcryptTool() {
  const [password, setPassword] = useState('');
  const [rounds, setRounds] = useState(10);
  const [hashedText, setHashedText] = useState('');
  const [isHashing, setIsHashing] = useState(false);

  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const [copied, setCopied] = useState(false);

  const handleHash = () => {
    if (!password) return;
    setIsHashing(true);
    setTimeout(() => {
      try {
        const salt = bcrypt.genSaltSync(rounds);
        const hash = bcrypt.hashSync(password, salt);
        setHashedText(hash);
      } finally {
        setIsHashing(false);
      }
    }, 50);
  };

  const handleVerify = () => {
    if (!verifyPassword || !verifyHash) return;
    try {
      setVerifyResult(bcrypt.compareSync(verifyPassword, verifyHash));
    } catch (e) {
      setVerifyResult(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClasses =
    'w-full bg-foreground/[0.03] border border-border-subtle rounded-lg px-4 py-3 text-sm focus:border-foreground/20 outline-none transition-all placeholder:text-foreground/20 font-medium';
  const labelClasses =
    'text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-4 block ml-1';

  return (
    <div className="space-y-16">
      {/* Hashing Section */}
      <section>
        <label className={labelClasses}>Generate Hash</label>
        <div className="space-y-6">
          <div className="grid md:grid-cols-[1fr_100px] gap-4">
            <input
              type="text"
              placeholder="Plaintext password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
            />
            <input
              type="number"
              min="4"
              max="20"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value))}
              className={cn(inputClasses, 'text-center')}
            />
          </div>

          <button
            onClick={handleHash}
            disabled={!password || isHashing}
            className="w-full bg-foreground text-background font-bold h-12 rounded-lg flex items-center justify-center space-x-3 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-20"
          >
            <span className="text-xs uppercase tracking-widest">
              {isHashing ? 'Processing...' : 'Hash Password'}
            </span>
          </button>

          <AnimatePresence>
            {hashedText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
              >
                <div className="bg-foreground/[0.02] border border-border-subtle rounded-lg p-5 text-xs font-mono break-all pr-12 text-foreground/60">
                  {hashedText}
                </div>
                <button
                  onClick={() => copyToClipboard(hashedText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-foreground/20 hover:text-foreground transition-all"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Verification Section */}
      <section>
        <label className={labelClasses}>Verify Match</label>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Plaintext"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            className={inputClasses}
          />
          <input
            type="text"
            placeholder="Bcrypt Hash"
            value={verifyHash}
            onChange={(e) => setVerifyHash(e.target.value)}
            className={cn(inputClasses, 'font-mono text-xs')}
          />
          <button
            onClick={handleVerify}
            className="w-full bg-foreground/[0.05] hover:bg-foreground/[0.1] border border-border-subtle text-foreground font-bold h-12 rounded-lg text-xs uppercase tracking-widest transition-all active:scale-[0.99]"
          >
            Test Compatibility
          </button>

          <AnimatePresence>
            {verifyResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'p-4 rounded-lg flex items-center space-x-4 border',
                  verifyResult
                    ? 'bg-foreground/[0.02] border-foreground/10'
                    : 'bg-foreground/[0.02] border-foreground/10',
                )}
              >
                {verifyResult ? (
                  <ShieldCheck className="w-5 h-5 text-primary" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-foreground/20" />
                )}
                <span className="text-xs font-bold uppercase tracking-widest">
                  {verifyResult ? 'Credentials Validated' : 'Validation Failed'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
