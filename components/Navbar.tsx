'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { labInfo } from '@/data/siteData';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/team', label: 'Team' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/patents', label: 'Patents' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .nav-links { display: flex; }
        @media (max-width: 1024px) { .nav-links { display: none; } }
        .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: 0.01em;
          transition: color 0.15s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link.active { color: #fff; font-weight: 700; }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        background: '#000000',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        height: 58,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '0 40px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* LEFT — Big bold stacked logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 28, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {labInfo.shortName.split(' ')[0]}
            </span>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.25em', lineHeight: 1, marginTop: 2, textTransform: 'uppercase' }}>
              {labInfo.shortName.split(' ').slice(1).join(' ') || 'LAB'}
            </span>
          </Link>

          {/* RIGHT — Nav links, desktop only, no hamburger */}
          <div className="nav-links" style={{ alignItems: 'center', gap: 32 }}>
            {navLinks.map(link => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`nav-link${active ? ' active' : ''}`}>
                  {link.label}
                </Link>
              );
            })}
          </div>

        </div>
      </nav>
    </>
  );
}