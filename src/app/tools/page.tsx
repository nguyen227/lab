'use client';

import React from 'react';
import Link from 'next/link';

import { tools } from '@/lib/constants';

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="py-24">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
          System <br />
          <span className="text-foreground/20">Utilities.</span>
        </h1>
        <p className="max-w-2xl text-foreground/40 text-lg leading-relaxed font-normal">
          A collection of precise, local-only developer tools optimized for
          daily engineering workflows.
        </p>
      </header>

      <div className="grid grid-cols-1 border-t border-border-subtle">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group grid grid-cols-[80px_1fr_auto] items-center py-16 border-b border-border-subtle hover:bg-foreground/[0.01] transition-all px-8 -mx-8"
          >
            <span className="text-xs font-black tracking-widest text-foreground/10 group-hover:text-foreground transition-colors">
              {tool.index}
            </span>
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
                {tool.title}
              </h3>
              <p className="text-sm text-foreground/40 font-normal group-hover:text-foreground/60 transition-colors uppercase tracking-wide">
                {tool.description}
              </p>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/10 group-hover:text-foreground transition-colors flex items-center">
              Execute{' '}
              <span className="ml-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-xl mt-[-4px]">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
