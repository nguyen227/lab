'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const quickTools = [
  { title: 'Password Generator', href: '/tools/password-generator' },
  { title: 'Bcrypt Utility', href: '/tools/bcrypt' },
  { title: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { title: 'Crontab Builder', href: '/tools/crontab' },
];

export default function QuickTools() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:block w-64 h-fit sticky top-32">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20 mb-8 block ml-2">
        Index
      </h3>
      <div className="space-y-1">
        {quickTools.map((tool) => {
          const isActive = pathname === tool.href;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                'group block py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300',
                isActive
                  ? 'bg-foreground/5 text-primary'
                  : 'text-foreground/40 hover:text-foreground hover:bg-foreground/[0.02]',
              )}
            >
              {tool.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
