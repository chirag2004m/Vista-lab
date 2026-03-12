import { labInfo } from '@/data/siteData';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '20px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
    }}>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
        © {new Date().getFullYear()} {labInfo.name}
      </span>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.12)' }}>
        {labInfo.university} · {labInfo.department}
      </span>
    </footer>
  );
}