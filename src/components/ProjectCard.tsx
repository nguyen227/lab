'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-8 -m-8 rounded-2xl transition-all duration-300 hover:bg-foreground/[0.02]"
    >
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <ExternalLink className="w-4 h-4 text-foreground/10 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <p className="text-foreground/50 text-sm leading-relaxed font-normal mb-6 line-clamp-2 uppercase tracking-wide">
        {description}
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 group-hover:text-foreground/40 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
