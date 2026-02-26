'use client';

import React from 'react';
import CrontabGenerator from '@/components/tools/CrontabGenerator';
import QuickTools from '@/components/tools/QuickTools';

export default function CrontabPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-20">
      <div className="flex-1 max-w-2xl">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Crontab Builder.
          </h1>
          <p className="text-foreground/40 leading-relaxed font-normal">
            A minimalist visual editor for scheduling recurring tasks.
          </p>
        </header>

        <section>
          <CrontabGenerator />
        </section>
      </div>

      <aside>
        <QuickTools />
      </aside>
    </div>
  );
}
