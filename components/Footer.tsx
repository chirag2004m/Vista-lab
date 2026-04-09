import { labInfo } from '@/data/siteData';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(26, 23, 20, 0.1)',
      padding: '20px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
      background: '#ffffff',
    }}>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(26, 23, 20, 0.35)' }}>
        © {new Date().getFullYear()} {labInfo.name}
      </span>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(26, 23, 20, 0.22)' }}>
        {labInfo.university} · {labInfo.department}
      </span>
    </footer>
  );
}