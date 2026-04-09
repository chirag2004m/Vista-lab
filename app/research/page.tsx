'use client';
import { researchProjects } from '@/data/siteData';
import { Calendar, DollarSign } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Our Work</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1, color: '#1a1714' }}>Research Projects</h1>
        <p style={{ fontSize: 15, color: 'rgba(26,23,20,0.5)', maxWidth: 560, lineHeight: 1.6 }}>Fundamental and applied research across machine learning, distributed systems, and AI for science.</p>
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
    <div style={{ background: '#ffffff', border: '1px solid rgba(26,23,20,0.1)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(26,107,138,0.3)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 0 24px rgba(26,107,138,0.08), 0 8px 32px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(26,23,20,0.1)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
      <div style={{ height: 170, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.85) 100%)' }} />
        <span style={{ position: 'absolute', top: 10, right: 10, padding: '3px 10px', borderRadius: 100, fontSize: '0.62rem', fontFamily: 'Space Mono, monospace', fontWeight: 600, backdropFilter: 'blur(8px)', background: isActive ? 'rgba(26,107,138,0.12)' : 'rgba(26,23,20,0.06)', border: `1px solid ${isActive ? 'rgba(26,107,138,0.35)' : 'rgba(26,23,20,0.15)'}`, color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}>
          {isActive ? '● Active' : 'Completed'}
        </span>
      </div>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {project.tags.map(t => <span key={t} style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', padding: '2px 8px', borderRadius: 100, background: 'rgba(26,107,138,0.06)', border: '1px solid rgba(26,107,138,0.15)', color: 'var(--accent)' }}>{t}</span>)}
        </div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, lineHeight: 1.4, marginBottom: 8, color: '#1a1714' }}>{project.title}</h3>
        <p style={{ color: 'rgba(26,23,20,0.5)', fontSize: 12, lineHeight: 1.6, flex: 1, marginBottom: 14 }}>{project.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(26,23,20,0.07)', fontSize: 11, color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} style={{ color: 'var(--accent)' }} />{project.year}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><DollarSign size={11} style={{ color: 'var(--accent)' }} />{project.funding}</span>
        </div>
      </div>
    </div>
  );
}