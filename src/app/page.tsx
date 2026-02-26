'use client';

import React from 'react';
import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    title: 'Distributed Task Scheduler',
    description:
      'A fault-tolerant, high-performance task scheduler built with Go and Redis. Handles 1M+ concurrent jobs.',
    tags: ['Go', 'Redis', 'gRPC'],
    href: 'https://nguyen227.dev/tech-lab',
  },
  {
    title: 'AI Canvas',
    description:
      'An experimental drawing tool powered by Stable Diffusion. Generates art based on strokes and prompts.',
    tags: ['Python', 'PyTorch', 'Next.js'],
    href: 'https://nguyen227.dev/tech-lab',
  },
  {
    title: 'Crypto Indexer',
    description:
      'High-speed blockchain indexer for Ethereum-based networks. Optimized for analytical queries.',
    tags: ['Rust', 'PostgreSQL', 'Kafka'],
    href: 'https://nguyen227.dev/tech-lab',
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-24 text-left">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-12">
          Architectural <br />
          <span className="text-foreground/20">Refinement.</span>
        </h1>

        <p className="max-w-2xl text-foreground/40 text-lg leading-relaxed font-normal">
          A minimalist exhibition of technical deep-dives, infrastructure
          experiments, and developer utilities designed for precision and
          performance.
        </p>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24 border-t border-border-subtle">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-4">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20 mb-4 block">
              Featured Systems
            </h2>
            <p className="text-xl font-bold tracking-tight">
              Selected core prototypes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {projects.map((project) => (
            <div key={project.title} className="relative">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
