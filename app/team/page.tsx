'use client';
import { teamMembers } from '@/data/siteData';
import { Github, Linkedin, BookOpen, ExternalLink } from 'lucide-react';

export default function TeamPage() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Our People</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 12, lineHeight: 1.1 }}>Meet the Team</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 560 }}>A diverse group of researchers united by curiosity and a passion for advancing intelligent systems.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="team-grid">
        {teamMembers.map(member => <MemberCard key={member.id} member={member} />)}
      </div>
      <style>{`
        @media (max-width: 1200px) { .team-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 860px)  { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px)  { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function MemberCard({ member }: { member: typeof teamMembers[0] }) {
  const roleLabel = { 'Principal Investigator': 'Lab Head', 'Research Scientist': 'Research Staff', 'PhD Student': 'PhD Student', 'Masters Student': 'Masters Student' }[member.role] ?? member.role;
  return (
    <div style={{ background: '#0d1117', border: '1px solid #1e3a5f', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2d6a9f'; el.style.boxShadow = '0 0 24px rgba(0,180,255,0.1), 0 8px 32px rgba(0,0,0,0.5)'; el.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#1e3a5f'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}>
      <div style={{ position: 'relative', height: 240, overflow: 'hidden', flexShrink: 0 }}>
        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(5,8,14,0.85)', backdropFilter: 'blur(6px)', padding: '7px 12px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, color: '#d0e4f4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{roleLabel}</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: '#e8edf2', marginBottom: 2 }}>{member.name}</h3>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.38)', marginBottom: 12 }}>{member.title}</p>
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#b8d0e8' }}>Email: </span>
          <a href={`mailto:${member.email}`} style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{member.email.replace('@', '[at]').replace(/\./g, '[dot]')}</a>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: '#b8d0e8', marginBottom: 3 }}>Research Interests:</div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{member.expertise.join(', ')}.</p>
        </div>
      </div>
      <div style={{ padding: '10px 16px 14px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8, marginTop: 'auto' }}>
        {[{ icon: <Linkedin size={15} />, href: member.linkedin, label: 'LinkedIn' }, { icon: <Github size={15} />, href: '#', label: 'GitHub' }, { icon: <BookOpen size={15} />, href: member.googleScholar, label: 'Scholar' }, ...(member.role === 'Principal Investigator' ? [{ icon: <ExternalLink size={15} />, href: '#', label: 'Website' }] : [])].map(({ icon, href, label }) => (
          <a key={label} href={href} title={label} target="_blank" rel="noreferrer"
            style={{ width: 34, height: 34, borderRadius: 8, background: '#161e29', border: '1px solid #1e2d3d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'background 0.15s, border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#1e2d3d'; el.style.borderColor = 'rgba(0,212,255,0.4)'; el.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#161e29'; el.style.borderColor = '#1e2d3d'; el.style.color = 'rgba(255,255,255,0.5)'; }}>
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}