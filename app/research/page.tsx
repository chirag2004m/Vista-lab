'use client';
import { researchProjects } from '@/data/siteData';
import { Calendar, DollarSign } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Our Work</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1 }}>Research Projects</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 560, lineHeight: 1.6 }}>Fundamental and applied research across machine learning, distributed systems, and AI for science.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="research-grid">
        {researchProjects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
      <style>{`
        @media (max-width: 1100px) { .research-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .research-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof researchProjects[0] }) {
  const isActive = project.status === 'Active';
  return (
    <div style={{ background: '#0d1117', border: '1px solid #1e3a5f', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2d6a9f'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 0 24px rgba(0,180,255,0.1), 0 8px 32px rgba(0,0,0,0.5)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#1e3a5f'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
      <div style={{ height: 170, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(8,11,16,0.8) 100%)' }} />
        <span style={{ position: 'absolute', top: 10, right: 10, padding: '3px 10px', borderRadius: 100, fontSize: '0.62rem', fontFamily: 'Space Mono, monospace', fontWeight: 600, backdropFilter: 'blur(8px)', background: isActive ? 'rgba(0,212,255,0.18)' : 'rgba(255,255,255,0.07)', border: `1px solid ${isActive ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.12)'}`, color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}>
          {isActive ? '● Active' : 'Completed'}
        </span>
      </div>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {project.tags.map(t => <span key={t} style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '2px 8px', borderRadius: 100, background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', color: 'rgba(0,212,255,0.7)' }}>{t}</span>)}
        </div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, lineHeight: 1.4, marginBottom: 8, color: '#e8edf2' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6, flex: 1, marginBottom: 14 }}>{project.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} style={{ color: 'var(--accent)' }} />{project.year}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><DollarSign size={11} style={{ color: 'var(--accent)' }} />{project.funding}</span>
        </div>
      </div>
    </div>
  );
}