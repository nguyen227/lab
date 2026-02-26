'use client';

import React from 'react';
import ResourceCard from '@/components/ResourceCard';

import { resources } from '@/lib/constants';

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="py-24">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
          Knowledge <br />
          <span className="text-foreground/20">Archive.</span>
        </h1>
        <p className="max-w-2xl text-foreground/40 text-lg leading-relaxed font-normal">
          A highly selective collection of engineering resources, whitepapers,
          and documentation for master-level practitioners.
        </p>
      </header>

      <section className="py-24 border-t border-border-subtle">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {resources.map((resource) => (
            <div key={resource.title}>
              <ResourceCard {...resource} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
