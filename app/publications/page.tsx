'use client';
import { useState } from 'react';
import { allPublications } from '@/data/siteData';
import { ExternalLink } from 'lucide-react';

export default function PublicationsPage() {
  const [yearFilter, setYearFilter] = useState('All');
  const years = [...new Set(allPublications.map(p => p.year))].sort((a, b) => b - a);
  const filtered = allPublications.filter(p => (yearFilter === 'All' || p.year === Number(yearFilter))).sort((a, b) => b.year - a.year);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Research Output</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1, color: '#1a1714' }}>Publications</h1>
        <p style={{ fontSize: 15, color: 'rgba(26,23,20,0.5)', lineHeight: 1.6 }}>Our work published in top-tier venues across machine learning, AI, and related fields.</p>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 48, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['All', ...years.map(String)].map(y => {
            const active = yearFilter === y;
            return <button key={y} onClick={() => setYearFilter(y)} style={{ padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: active ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'Space Mono, monospace', background: active ? '#1a1714' : 'transparent', color: active ? '#fff' : 'rgba(26,23,20,0.4)', border: `1px solid ${active ? '#1a1714' : 'rgba(26,23,20,0.15)'}` }}>{y}</button>;
          })}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filtered.map(pub => (
          <div key={pub.id} style={{ padding: '32px 0', borderBottom: '1px solid rgba(26,23,20,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', fontWeight: 700, color: pub.type === 'Journal' ? '#6d28d9' : 'var(--accent)', letterSpacing: '0.05em' }}>{pub.venue}</span>
              <span style={{ fontSize: 11, color: 'rgba(26,23,20,0.3)', fontFamily: 'Space Mono, monospace' }}>{pub.year}</span>
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(26,23,20,0.05)', color: 'rgba(26,23,20,0.35)', fontFamily: 'Space Mono, monospace' }}>{pub.type}</span>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#1a1714', lineHeight: 1.3, marginBottom: 8 }}>{pub.title}</h3>
            <p style={{ fontSize: 13, color: 'rgba(26,23,20,0.45)', marginBottom: 12, fontStyle: 'italic' }}>{pub.authors}</p>
            <p style={{ fontSize: 13, color: 'rgba(26,23,20,0.55)', lineHeight: 1.7, marginBottom: 16, maxWidth: 760 }}>{pub.abstract}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {pub.tags.map(t => <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: 'rgba(26,23,20,0.04)', border: '1px solid rgba(26,23,20,0.1)', color: 'rgba(26,23,20,0.45)', fontFamily: 'Space Mono, monospace' }}>{t}</span>)}
              </div>
              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--accent)', textDecoration: 'none', fontFamily: 'Space Mono, monospace', opacity: 0.8, transition: 'opacity 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}>
                <ExternalLink size={13} /> DOI
              </a>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(26,23,20,0.3)', fontFamily: 'Space Mono, monospace', fontSize: 13 }}>No publications match the selected filters.</div>}
    </div>
  );
}