'use client';
import { useState, useEffect, useRef } from 'react';
import { labInfo } from '@/data/siteData';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState({ name: '', email: '', category: 'General Inquiry', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w; canvas.height = h;
    const R = Math.min(w, h) * 0.38;
    const cx = w * 0.5, cy = h * 0.5;
    const dots: { phi: number; theta: number }[] = [];
    const N = 600;
    for (let i = 0; i < N; i++) dots.push({ phi: Math.acos(-1 + (2 * i) / N), theta: Math.sqrt(N * Math.PI) * (2 * i) / N });
    let angle = 0, raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      angle += 0.003;
      for (const d of dots) {
        const x = R * Math.sin(d.phi) * Math.cos(d.theta + angle);
        const y = R * Math.sin(d.phi) * Math.sin(d.theta + angle);
        const z = R * Math.cos(d.phi);
        const px = cx + x, py = cy + y * 0.4 + z * 0.9;
        const size = (z / R + 1) * 0.9 + 0.3;
        const alpha = (z / R + 1) * 0.35 + 0.05;
        ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading');
    setTimeout(() => setStatus('success'), 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 8,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#e8edf2', fontSize: 13, outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 58px)', display: 'flex', alignItems: 'stretch' }}>

      {/* LEFT — animated globe */}
      <div className="contact-left" style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050810', minHeight: 500 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 48px' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Get in Touch</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 48, lineHeight: 1.05, color: '#fff', marginBottom: 16 }}>Contact<br />Us</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 320, margin: '0 auto' }}>
            Whether you have a research question, collaboration idea, or application inquiry — we'd love to hear from you.
          </p>
        </div>
      </div>

      {/* RIGHT — contact card */}
      <div className="contact-right" style={{ width: 520, background: '#0d1117', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '48px 40px' }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, marginBottom: 20, color: '#e8edf2' }}>{labInfo.name}</h2>
          {[
            { icon: <MapPin size={14} />, label: 'Address', value: labInfo.address },
            { icon: <Mail size={14} />, label: 'Email', value: labInfo.email, href: `mailto:${labInfo.email}` },
            { icon: <Phone size={14} />, label: 'Phone', value: labInfo.phone },
          ].map(({ icon, label, value, href }) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)', marginTop: 1 }}>{icon}</div>
              <div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                {href ? <a href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{value}</a>
                  : <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{value}</span>}
              </div>
            </div>
          ))}
        </div>
        

        <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 32, border: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8390024673!2d72.9165625!3d19.1334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA4JzAwLjAiTiA3MsKwNTUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%" height="180" style={{ display: 'block', border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 28 }} />

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <CheckCircle size={40} style={{ color: '#4ade80', margin: '0 auto 14px' }} />
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message Sent!</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>We'll get back to you within 2–3 business days.</p>
            <button onClick={() => setStatus('idle')} style={{ marginTop: 16, fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ name: 'name', placeholder: 'Full Name' }, { name: 'email', placeholder: 'Email Address', type: 'email' }].map(f => (
                <div key={f.name}>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.placeholder}</label>
                  <input name={f.name} type={f.type || 'text'} required placeholder={f.placeholder} value={(form as any)[f.name]} onChange={handleChange} style={inputStyle}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
              ))}
            </div>
          
            <div>
              <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Subject</label>
              <input name="subject" required placeholder="Brief subject..." value={form.subject} onChange={handleChange} style={inputStyle}
                onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)'}
                onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            <div>
              <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Message</label>
              <textarea name="message" required rows={4} placeholder="Describe your inquiry..." value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)'}
                onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            <button type="submit" disabled={status === 'loading'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 8, border: 'none', fontSize: 13, fontFamily: 'Space Mono, monospace', fontWeight: 700, cursor: 'pointer', background: 'var(--accent)', color: '#000', marginTop: 4 }}>
              <Send size={13} /> {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-left { display: none !important; } .contact-right { width: 100% !important; } }
      `}</style>
    </div>
  );
}