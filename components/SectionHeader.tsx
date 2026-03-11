interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ label, title, subtitle, center = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span className="section-label">{label}</span>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-base max-w-2xl" style={{ color: 'var(--text-secondary)', marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
