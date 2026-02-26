'use client';

import React from 'react';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  category: string;
}

export default function ResourceCard({
  title,
  description,
  url,
  category,
}: ResourceCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-8 -m-8 rounded-2xl transition-all duration-300 hover:bg-foreground/[0.02]"
    >
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/10 group-hover:text-primary transition-colors">
          {category}
        </span>
      </div>

      <p className="text-foreground/50 text-sm leading-relaxed font-normal mb-6">
        {description}
      </p>

      <div className="text-[9px] font-mono text-foreground/20 italic group-hover:text-foreground/40 transition-colors uppercase tracking-[0.2em]">
        {new URL(url).hostname}
      </div>
    </a>
  );
}
