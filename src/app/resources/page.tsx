'use client';

import React from 'react';
import ResourceCard from '@/components/ResourceCard';

const resources = [
  {
    title: 'Awesome System Design',
    description:
      'A curated list of system design topics, case studies and resources.',
    url: 'https://github.com/donnemartin/system-design-primer',
    category: 'Architecture',
  },
  {
    title: 'Refactoring.Guru',
    description:
      'The ultimate guide to design patterns and refactoring. Visual and practical.',
    url: 'https://refactoring.guru/',
    category: 'Design Patterns',
  },
  {
    title: 'React Patterns',
    description:
      'A compilation of common patterns and best practices for React components.',
    url: 'https://reactpatterns.com/',
    category: 'Frontend',
  },
  {
    title: 'Go by Example',
    description:
      'Hands-on introduction to Go using annotated example programs.',
    url: 'https://gobyexample.com/',
    category: 'Backend',
  },
  {
    title: 'Next.js Documentation',
    description:
      'Official documentation for Next.js, including App Router and Turbopack.',
    url: 'https://nextjs.org/docs',
    category: 'Framework',
  },
  {
    title: 'High Performance Browser Networking',
    description:
      'What every web developer should know about networking and browser performance.',
    url: 'https://hpbn.co/',
    category: 'Performance',
  },
];

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
