'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  { id: 1, tag: 'Best Paper · NeurIPS 2024', title: 'Federated Learning\nfor Healthcare', subtitle: 'Privacy-preserving AI across hospital networks — recognized with the Outstanding Research Award.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=90', cta: { label: 'Read Paper', href: '/publications' }, accent: '#00d4ff' },
  { id: 2, tag: '$2.4M NSF Grant · 2024', title: 'Edge AI\nResearch Funded', subtitle: 'Next-generation transformer architectures built to run efficiently on resource-constrained devices.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90', cta: { label: 'Explore Research', href: '/research' }, accent: '#a78bfa' },
  { id: 3, tag: 'Infrastructure · 2024', title: '512-GPU Cluster\nNow Online', subtitle: 'State-of-the-art HPC infrastructure enabling large-scale distributed deep learning experiments.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=90', cta: { label: 'Join the Lab', href: '/opportunities' }, accent: '#4ade80' },
  { id: 4, tag: 'ACM Fellowship · 2024', title: 'Three Doctoral\nFellows Awarded', subtitle: 'PhD candidates recognized for exceptional contributions to ML and AI systems research.', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1800&q=90', cta: { label: 'Meet the Team', href: '/team' }, accent: '#fbbf24' },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [current, setCurrent] = useState(0);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  useEffect(() => { if (!emblaApi) return; emblaApi.on('select', () => setCurrent(emblaApi.selectedScrollSnap())); }, [emblaApi]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
      <div ref={emblaRef} style={{ height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          {slides.map((s, i) => (
            <div key={s.id} style={{ flex: '0 0 100%', minWidth: 0, position: 'relative', height: '100%' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 9s ease', transform: current === i ? 'scale(1.06)' : 'scale(1)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(4,7,13,0.97) 0%, rgba(4,7,13,0.85) 40%, rgba(4,7,13,0.3) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,7,13,1) 0%, transparent 45%)' }} />
              <div style={{ position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 2, background: `linear-gradient(to bottom, transparent, ${s.accent} 40%, ${s.accent} 60%, transparent)`, opacity: current === i ? 0.9 : 0.3, transition: 'opacity 0.6s' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px', width: '100%' }}>
                  <div style={{ maxWidth: 640 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32, opacity: current === i ? 1 : 0, transition: 'opacity 0.5s 0.2s' }}>
                      <span style={{ width: 32, height: 2, background: s.accent, borderRadius: 2, display: 'block' }} />
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: s.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.tag}</span>
                    </div>
                    <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(44px, 6.5vw, 86px)', lineHeight: 0.96, color: '#fff', marginBottom: 28, whiteSpace: 'pre-line', letterSpacing: '-0.035em' }}>{s.title}</h1>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 40, maxWidth: 460 }}>{s.subtitle}</p>
                    <Link href={s.cta.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 8, fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: 12, textDecoration: 'none', color: '#000', background: s.accent, letterSpacing: '0.03em' }}>
                      {s.cta.label} <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 44, right: 40, fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>
                {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 10 }}>
        {slides.map((s, i) => (
          <button key={i} onClick={() => scrollTo(i)} style={{ width: 3, height: i === current ? 36 : 14, borderRadius: 2, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.35s ease', background: i === current ? s.accent : 'rgba(255,255,255,0.18)' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
      </div>
    </div>
  );
}