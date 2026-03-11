import HeroCarousel from '@/components/HeroCarousel';
import SectionHeader from '@/components/SectionHeader';
import Link from 'next/link';
import { recentPublications, labInfo, researchProjects } from '@/data/siteData';
import { ArrowRight, BookOpen, FlaskConical, Users, Award } from 'lucide-react';

const stats = [
  { label: 'Publications', value: '120+', icon: BookOpen },
  { label: 'Active Projects', value: '6', icon: FlaskConical },
  { label: 'Team Members', value: '18', icon: Users },
  { label: 'Patents Filed', value: '12', icon: Award },
];

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{value}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader label="About the Lab" title="Advancing the Science of Intelligent Systems" />
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The {labInfo.name} at {labInfo.university} conducts fundamental and applied research at the intersection of machine learning, distributed systems, and data privacy.
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We collaborate with leading academic institutions, national labs, and industry partners to translate our research into real-world impact across healthcare, autonomous systems, and beyond.
            </p>
            <Link href="/research" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--accent)' }}>
              Explore Research <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {researchProjects.slice(0, 4).map(p => (
              <div key={p.id} className="lab-card p-4">
                <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}>
                  <FlaskConical size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 className="text-sm font-semibold mb-1 leading-snug" style={{ fontFamily: 'Syne, sans-serif' }}>{p.title}</h4>
                <span className="tag-pill">{p.tags[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <SectionHeader label="Recent Work" title="Latest Publications" />
            <Link href="/publications" className="hidden md:flex items-center gap-1 text-sm" style={{ color: 'var(--accent)' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentPublications.map((pub, idx) => (
              <div key={pub.id} className="lab-card p-5 flex gap-5">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid var(--border)', fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="tag-pill">{pub.type}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace' }}>{pub.venue} · {pub.year}</span>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base" style={{ fontFamily: 'Syne, sans-serif' }}>{pub.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{pub.authors}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="section-label">Join Us</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Interested in Working With Us?</h2>
        <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          We have open positions for PhD students, postdocs, and interns. Come build the future of AI with us.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/opportunities" className="px-6 py-3 rounded-lg font-semibold text-sm"
            style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}>See Opportunities</Link>
          <Link href="/contact" className="px-6 py-3 rounded-lg font-semibold text-sm"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
