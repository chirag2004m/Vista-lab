'use client';
import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { galleryImages } from '@/data/siteData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const breakpointCols = { default: 4, 1280: 4, 1024: 3, 768: 2, 640: 2 };

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox(i => i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox(i => i === null ? null : (i + 1) % galleryImages.length);
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 40px 80px' }}>

        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#0077b6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Photo Gallery</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, marginBottom: 14, lineHeight: 1.1, color: '#0f1923' }}>Life at the Lab</h1>
          <p style={{ fontSize: 15, color: 'rgba(15,25,35,0.55)', lineHeight: 1.6 }}>Moments from conferences, lab events, and research milestones.</p>
        </div>

        <Masonry breakpointCols={breakpointCols} className="masonry-grid" columnClassName="masonry-grid-col">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setLightbox(i)}
              style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: 10, border: '1px solid rgba(168,189,212,0.45)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'box-shadow 0.25s, transform 0.25s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 28px rgba(0,0,0,0.13)'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; el.style.transform = 'translateY(0)'; }}
            >
              <img
                src={img.src}
                alt={img.caption}
                style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
              />
              {/* Caption overlay on hover */}
              <div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,25,35,0.72) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.25s', display: 'flex', alignItems: 'flex-end', padding: 14, borderRadius: 10 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}
              >
                <p style={{ fontSize: 12, color: '#fff', lineHeight: 1.4, fontWeight: 500 }}>{img.caption}</p>
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(10,17,26,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(6px)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 20, right: 20, width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={next}
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronRight size={22} />
          </button>

          <div style={{ maxWidth: 920, width: '100%' }} onClick={e => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].caption}
              style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 12, display: 'block', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
            />
            <div style={{ textAlign: 'center', marginTop: 18 }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>{galleryImages[lightbox].caption}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Mono, monospace', marginTop: 5 }}>{lightbox + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}