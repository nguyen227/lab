'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Projects', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'Resources', href: '/resources' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-foreground selection:text-background">
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border-subtle py-4'
            : 'bg-transparent py-8',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold tracking-tighter">Lab.</span>
          </Link>

          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === '/tools' && pathname.startsWith('/tools/'));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-foreground',
                      isActive ? 'text-foreground' : 'text-foreground/30',
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="h-4 w-[1px] bg-border-subtle" />

            <a
              href="https://github.com/nguyen227"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/30 hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-40 pb-32 px-6 max-w-7xl mx-auto w-full">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="py-20 border-t border-border-subtle text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/10">
          Precision Engineered by Nguyen Vu.
        </p>
      </footer>
    </div>
  );
}
