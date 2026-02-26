'use client';

import React from 'react';
import PasswordGenerator from '@/components/tools/PasswordGenerator';
import QuickTools from '@/components/tools/QuickTools';

export default function PasswordGeneratorPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-20">
      <div className="flex-1 max-w-2xl">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Password Generator.
          </h1>
          <p className="text-foreground/40 leading-relaxed font-normal">
            Generate high-entropy, cryptographically secure passwords.
          </p>
        </header>

        <section>
          <PasswordGenerator />
        </section>
      </div>

      <aside>
        <QuickTools />
      </aside>
    </div>
  );
}
