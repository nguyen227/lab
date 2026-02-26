'use client';

import React from 'react';
import JWTDecoder from '@/components/tools/JWTDecoder';
import QuickTools from '@/components/tools/QuickTools';

export default function JWTDecoderPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-20">
      <div className="flex-1">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            JWT Decoder.
          </h1>
          <p className="text-foreground/40 leading-relaxed font-normal max-w-2xl">
            Inspecting JSON Web Tokens with local-first security.
          </p>
        </header>

        <section>
          <JWTDecoder />
        </section>
      </div>

      <aside>
        <QuickTools />
      </aside>
    </div>
  );
}
