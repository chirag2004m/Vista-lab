import { Mail, Phone, MapPin, FlaskConical } from 'lucide-react';
import { labInfo } from '@/data/siteData';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
      className="mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Brand block */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.25)',
                }}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
              >
                <FlaskConical size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="font-bold leading-none" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem' }}>
                  {labInfo.shortName}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace' }}>
                  {labInfo.department}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {labInfo.tagline}
            </p>
          </div>

          {/* Contact block */}
          <div className="flex flex-col gap-3 justify-end">
            <div className="flex items-start gap-3">
              <MapPin size={13} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} />
              <span className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {labInfo.address}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <a
                href={`mailto:${labInfo.email}`}
                className="text-sm transition-colors hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              >
                {labInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {labInfo.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: '1px solid var(--border)' }}
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
        >
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace' }}
          >
            © {new Date().getFullYear()} {labInfo.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {labInfo.university} · {labInfo.department}
          </p>
        </div>
      </div>
    </footer>
  );
}