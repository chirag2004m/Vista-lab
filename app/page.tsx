'use client';
import HeroCarousel from '@/components/HeroCarousel';
import Link from 'next/link';
import { allPublications, labInfo, researchProjects, teamMembers } from '@/data/siteData';
import { ArrowRight, ExternalLink, FlaskConical, Cpu, Brain, Microscope } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Animated counter — triggers when scrolled into view
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 1800 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: 'Publications', numeric: 120, suffix: '+' },
  { label: 'Active Projects', numeric: 6, suffix: '' },
  { label: 'Team Members', numeric: 18, suffix: '' },
  { label: 'Patents Filed', numeric: 12, suffix: '' },
  { label: 'Years Active', numeric: 10, suffix: '+' },
];

const researchAreas = [
  { icon: <Brain size={16} />, label: 'Machine Learning', desc: 'Novel architectures for sparse, efficient deep learning' },
  { icon: <FlaskConical size={16} />, label: 'Biomedical AI', desc: 'Drug discovery, genomics, and clinical decision systems' },
  { icon: <Cpu size={16} />, label: 'Edge Intelligence', desc: 'AI systems for resource-constrained IoT devices' },
  { icon: <Microscope size={16} />, label: 'Privacy & Security', desc: 'Federated learning with differential privacy guarantees' },
];

const recentPubs = allPublications.slice(0, 3);
const pi = teamMembers.find(m => m.role === 'Principal Investigator')!;
const activeProjects = researchProjects.filter(p => p.status === 'Active').slice(0, 3);

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <HeroCarousel />

      {/* STATS — animated count-up */}
      <div style={{ background: '#06090f', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }} className="stats-bar">
          {stats.map(({ label, numeric, suffix }, i) => (
            <div key={label} style={{ padding: '26px 0', textAlign: 'center', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 30, color: '#e8edf2', lineHeight: 1, letterSpacing: '-0.03em' }}>
                <CountUp target={numeric} suffix={suffix} />
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr', gap: 72, alignItems: 'start' }} className="about-grid">
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 14 }}>About the Lab</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.03em' }}>
              Advancing the<br />
              <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)', color: 'transparent' }}>Science of AI</span>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, marginBottom: 10 }}>
              The {labInfo.name} at {labInfo.university} conducts fundamental and applied research at the intersection of machine learning, distributed systems, and data privacy.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, marginBottom: 28 }}>
              We collaborate with leading academic institutions, national labs, and industry partners to translate research into real-world impact across healthcare, autonomous systems, and beyond.
            </p>
            {/* Research pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 28 }} className="pillars-grid">
              {researchAreas.map(({ icon, label, desc }) => (
                <div key={label} style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(0,212,255,0.025)', border: '1px solid rgba(0,212,255,0.08)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', opacity: 0.6, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12, color: '#e0eaf2', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/research" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, textDecoration: 'none', background: '#fff', color: '#000' }}>Explore Research <ArrowRight size={12} /></Link>
              <Link href="/team" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, textDecoration: 'none', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>Meet the Team</Link>
            </div>
          </div>
          {/* PI card */}
          <div style={{ position: 'sticky', top: 96 }}>
            <div style={{ position: 'absolute', inset: -1, borderRadius: 18, background: 'linear-gradient(135deg, rgba(0,212,255,0.1), transparent 55%)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, background: '#0d1117', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <div style={{ height: 190, overflow: 'hidden', position: 'relative' }}>
                <img src={pi.image} alt={pi.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #0d1117 100%)' }} />
              </div>
              <div style={{ padding: '14px 18px 20px' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 5 }}>Lab Director</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 17, color: '#e8edf2', marginBottom: 2 }}>{pi.name}</h3>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginBottom: 10 }}>{pi.title} · {labInfo.university}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, marginBottom: 14 }}>{pi.bio}</p>
                <div style={{ display: 'flex', gap: 7 }}>
                  <a href={pi.googleScholar} target="_blank" rel="noreferrer" style={{ padding: '5px 11px', borderRadius: 6, fontSize: 10, fontFamily: 'Space Mono, monospace', textDecoration: 'none', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.18)', color: 'var(--accent)' }}>Scholar</a>
                  <a href={`mailto:${pi.email}`} style={{ padding: '5px 11px', borderRadius: 6, fontSize: 10, fontFamily: 'Space Mono, monospace', textDecoration: 'none', color: 'rgba(255,255,255,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>Email</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVE RESEARCH */}
      <section style={{ background: '#06090f', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '56px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 6 }}>What We Do</p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 28, lineHeight: 1.0, letterSpacing: '-0.025em' }}>Active Research</h2>
            </div>
            <Link href="/research" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', flexShrink: 0 }}>All projects <ArrowRight size={12} /></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="research-trio">
            {activeProjects.map((p) => (
              <div key={p.id} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', cursor: 'default', transition: 'border-color 0.25s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; (el.querySelector('img') as HTMLElement).style.transform = 'scale(1.06)'; (el.querySelector('.proj-overlay') as HTMLElement).style.opacity = '1'; el.style.borderColor = 'rgba(0,212,255,0.2)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; (el.querySelector('img') as HTMLElement).style.transform = 'scale(1)'; (el.querySelector('.proj-overlay') as HTMLElement).style.opacity = '0'; el.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,7,13,0.96) 0%, rgba(4,7,13,0.35) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 16px' }}>
                  <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>{p.tags.slice(0, 2).map(t => <span key={t} style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', padding: '2px 7px', borderRadius: 100, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.5)' }}>{t}</span>)}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#e8edf2', lineHeight: 1.25, marginBottom: 4 }}>{p.title}</h3>
                  <p className="proj-overlay" style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, opacity: 0, transition: 'opacity 0.3s' }}>{p.description.slice(0, 80)}…</p>
                </div>
                <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, fontFamily: 'Space Mono, monospace', padding: '2px 8px', borderRadius: 100, background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.28)', color: 'var(--accent)' }}>● Active</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '56px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 6 }}>Recent Work</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 28, lineHeight: 1.0, letterSpacing: '-0.025em' }}>Latest Publications</h2>
          </div>
          <Link href="/publications" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>View all <ArrowRight size={12} /></Link>
        </div>
        <div>
          {recentPubs.map((pub, idx) => (
            <div key={pub.id} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 32px', gap: 18, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'start', borderRadius: 6, transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.01)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.1)', paddingTop: 2 }}>{String(idx + 1).padStart(2, '0')}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', fontWeight: 700, color: pub.type === 'Journal' ? '#a78bfa' : 'var(--accent)' }}>{pub.venue}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.14)', fontFamily: 'Space Mono, monospace' }}>{pub.year}</span>
                  <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.16)', fontFamily: 'Space Mono, monospace' }}>{pub.type}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.3, marginBottom: 4, color: '#e8edf2' }}>{pub.title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.26)', fontStyle: 'italic' }}>{pub.authors}</p>
              </div>
              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.16)', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,212,255,0.08)'; el.style.borderColor = 'rgba(0,212,255,0.28)'; el.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.color = 'rgba(255,255,255,0.16)'; }}>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#06090f', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '56px 40px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }} className="cta-grid">
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>Join Us</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 12 }}>Interested in<br />Working With Us?</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.33)', maxWidth: 460, lineHeight: 1.75 }}>Open positions for PhD students, postdocs, and interns. Competitive funding and a collaborative, publication-driven environment.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 180 }}>
            <Link href="/opportunities" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '11px 22px', borderRadius: 8, fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, textDecoration: 'none', background: '#fff', color: '#000', whiteSpace: 'nowrap' }}>See Opportunities <ArrowRight size={12} /></Link>
            <Link href="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '11px 22px', borderRadius: 8, fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, textDecoration: 'none', color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.09)', whiteSpace: 'nowrap' }}>Contact Us</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .research-trio { grid-template-columns: repeat(2,1fr) !important; }
          .cta-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(3,1fr) !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; }
          .research-trio { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}