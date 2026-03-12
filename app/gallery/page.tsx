'use client';
import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { galleryImages } from '@/data/siteData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const breakpointCols = { default: 4, 1280: 4, 1024: 3, 768: 2, 640: 2 };

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setLightbox(i => i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setLightbox(i => i === null ? null : (i + 1) % galleryImages.length); };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Photo Gallery</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1 }}>Life at the Lab</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Moments from conferences, lab events, and research milestones.</p>
      </div>
      <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-col">
        {galleryImages.map((img, i) => (
          <div key={img.id} onClick={() => setLightbox(i)} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
            <img src={img.src} alt={img.caption} style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)', opacity: 0, transition: 'opacity 0.25s', display: 'flex', alignItems: 'flex-end', padding: 14, borderRadius: 10 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}>
              <p style={{ fontSize: 12, color: '#fff', lineHeight: 1.4 }}>{img.caption}</p>
            </div>
          </div>
        ))}
      </Masonry>
      {lightbox !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={17} /></button>
          <button onClick={prev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
          <button onClick={next} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={20} /></button>
          <div style={{ maxWidth: 900, width: '100%' }} onClick={e => e.stopPropagation()}>
            <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].caption} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12, display: 'block' }} />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{galleryImages[lightbox].caption}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Mono, monospace', marginTop: 4 }}>{lightbox + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}