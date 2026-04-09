'use client';
import { useState, useEffect, useRef } from 'react';
import { labInfo } from '@/data/siteData';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const R = Math.min(canvas.width, canvas.height) * 0.38;
    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.5;

    const N = 600;
    const dots = Array.from({ length: N }, (_, i) => ({
      phi: Math.acos(-1 + (2 * i) / N),
      theta: Math.sqrt(N * Math.PI) * (2 * i) / N,
    }));

    let angle = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.003;
      for (const d of dots) {
        const x = R * Math.sin(d.phi) * Math.cos(d.theta + angle);
        const y = R * Math.sin(d.phi) * Math.sin(d.theta + angle);
        const z = R * Math.cos(d.phi);
        const px = cx + x;
        const py = cy + y * 0.4 + z * 0.9;
        const size = (z / R + 1) * 0.8 + 0.2;
        const alpha = (z / R + 1) * 0.25 + 0.04;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 119, 182, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    background: '#f4f6f9',
    border: '1px solid rgba(168,189,212,0.6)',
    color: '#0f1923',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 58px)', display: 'flex', alignItems: 'stretch' }}>

      {/* LEFT — animated globe on light blue wash */}
      <div
        className="contact-left"
        style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e8f3fb 0%, #ddeef8 100%)', minHeight: 500 }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 48px' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#0077b6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Get in Touch</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1.05, color: '#0f1923', marginBottom: 18 }}>Contact<br />Us</h1>
          <p style={{ fontSize: 14, color: 'rgba(15,25,35,0.6)', lineHeight: 1.75, maxWidth: 300, margin: '0 auto' }}>
            Whether you have a research question, collaboration idea, or application inquiry — we'd love to hear from you.
          </p>

          {/* Quick contact badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32, alignItems: 'center' }}>
            {[
              { icon: <Mail size={13} />, text: labInfo.email },
              { icon: <Phone size={13} />, text: labInfo.phone },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 100, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(168,189,212,0.5)', backdropFilter: 'blur(6px)', fontSize: 12, color: '#0f1923', fontFamily: 'Space Mono, monospace' }}>
                <span style={{ color: '#0077b6' }}>{icon}</span>{text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — form panel */}
      <div
        className="contact-right"
        style={{ width: 520, background: '#ffffff', borderLeft: '1px solid rgba(168,189,212,0.5)', display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '48px 40px' }}
      >
        {/* Lab info */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, marginBottom: 18, color: '#0f1923' }}>{labInfo.name}</h2>
          {[
            { icon: <MapPin size={14} />, label: 'Address', value: labInfo.address },
            { icon: <Mail size={14} />, label: 'Email', value: labInfo.email, href: `mailto:${labInfo.email}` },
            { icon: <Phone size={14} />, label: 'Phone', value: labInfo.phone },
          ].map(({ icon, label, value, href }) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(0,119,182,0.08)', border: '1px solid rgba(0,119,182,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0077b6', marginTop: 1 }}>{icon}</div>
              <div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(15,25,35,0.38)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                {href
                  ? <a href={href} style={{ fontSize: 13, color: 'rgba(15,25,35,0.65)', textDecoration: 'none' }}>{value}</a>
                  : <span style={{ fontSize: 13, color: 'rgba(15,25,35,0.65)', lineHeight: 1.5 }}>{value}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 28, border: '1px solid rgba(168,189,212,0.45)', flexShrink: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7693.514276979156!2d73.87426854179293!3d15.389633690782466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb8375851666d%3A0x4ad5683010110240!2sBITS%20Pilani%20K%20K%20Birla%20Goa%20Campus!5e0!3m2!1sen!2sin!4v1775737033970!5m2!1sen!2sin"
            width="100%"
            height="170"
            style={{ display: 'block', border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div style={{ height: 1, background: 'rgba(168,189,212,0.4)', marginBottom: 28 }} />

        {/* Form / success */}
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}>
            <CheckCircle size={44} style={{ color: '#059669', margin: '0 auto 16px', display: 'block' }} />
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 8, color: '#0f1923' }}>Message Sent!</h3>
            <p style={{ fontSize: 13, color: 'rgba(15,25,35,0.5)', lineHeight: 1.6 }}>We'll get back to you within 2–3 business days.</p>
            <button
              onClick={() => setStatus('idle')}
              style={{ marginTop: 18, fontSize: 12, color: '#0077b6', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Space Mono, monospace' }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { name: 'name', placeholder: 'Full Name', type: 'text' },
                { name: 'email', placeholder: 'Email Address', type: 'email' },
              ].map(f => (
                <div key={f.name}>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(15,25,35,0.42)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.placeholder}</label>
                  <input
                    name={f.name}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.name]}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLElement).style.borderColor = 'rgba(0,119,182,0.55)'; (e.target as HTMLElement).style.background = '#fff'; }}
                    onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(168,189,212,0.6)'; (e.target as HTMLElement).style.background = '#f4f6f9'; }}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(15,25,35,0.42)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Subject</label>
              <input
                name="subject"
                required
                placeholder="Brief subject..."
                value={form.subject}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = 'rgba(0,119,182,0.55)'; (e.target as HTMLElement).style.background = '#fff'; }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(168,189,212,0.6)'; (e.target as HTMLElement).style.background = '#f4f6f9'; }}
              />
            </div>

            <div>
              <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(15,25,35,0.42)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Message</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Describe your inquiry..."
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = 'rgba(0,119,182,0.55)'; (e.target as HTMLElement).style.background = '#fff'; }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(168,189,212,0.6)'; (e.target as HTMLElement).style.background = '#f4f6f9'; }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 8, border: 'none', fontSize: 13, fontFamily: 'Space Mono, monospace', fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer', background: '#0077b6', color: '#fff', marginTop: 4, opacity: status === 'loading' ? 0.7 : 1, transition: 'opacity 0.15s, background 0.15s' }}
              onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#005f92'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0077b6'; }}
            >
              <Send size={13} />
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-left { display: none !important; }
          .contact-right { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}