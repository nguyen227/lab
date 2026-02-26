'use client';

import React from 'react';
import BcryptTool from '@/components/tools/BcryptTool';
import QuickTools from '@/components/tools/QuickTools';
import { motion } from 'framer-motion';

export default function BcryptPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-20">
      <div className="flex-1 max-w-2xl">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Bcrypt Utility.
          </h1>
          <p className="text-foreground/40 leading-relaxed font-normal">
            A minimalist workspace for enterprise-grade password hashing and
            verification.
          </p>
        </header>

        <section>
          <BcryptTool />
        </section>
      </div>

      <aside>
        <QuickTools />
      </aside>
    </div>
  );
}
