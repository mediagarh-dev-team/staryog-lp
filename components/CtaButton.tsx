'use client';

import { ArrowRight } from 'lucide-react';
import { CTA_LABEL } from '@/lib/content';

export function ArrowDot({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
        light ? 'bg-peach text-ink' : 'bg-ink text-peach'
      }`}
    >
      <ArrowRight size={18} strokeWidth={2.5} />
    </span>
  );
}

function scrollToHeroForm() {
  const el = document.getElementById('register');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function CtaButton({ label = CTA_LABEL, className = '' }: { label?: string; className?: string }) {
  return (
    <button type="button" onClick={scrollToHeroForm} className={`btn-primary ${className}`}>
      <span>{label}</span>
      <ArrowDot />
    </button>
  );
}
