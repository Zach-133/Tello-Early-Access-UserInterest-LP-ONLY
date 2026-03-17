import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEarlyAccess } from '@/context/EarlyAccessContext';

export function EarlyAccessDrawer() {
  const { isOpen, initialEmail, closeDrawer } = useEarlyAccess();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  // Sync email when drawer opens with a pre-filled value
  useEffect(() => {
    if (isOpen) {
      setEmail(initialEmail);
      setName('');
      setConsent(false);
      setErrors({});
      setSubmitted(false);
      setSubmitting(false);
      // Focus name field (or email if name already done)
      setTimeout(() => nameRef.current?.focus(), 320);
    }
  }, [isOpen, initialEmail]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { name?: string; email?: string; consent?: string } = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      next.email = 'Please enter a valid email address (e.g. jane@example.com).';
    }
    if (!consent) next.consent = 'Please agree to the terms before continuing.';
    if (Object.keys(next).length) { setErrors(next); return; }
    setErrors({});
    setSubmitting(true);
    fetch(import.meta.env.VITE_N8N_WEBHOOK_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim() }),
    }).catch(() => {});
    const btn = submitRef.current;
    const rect = btn ? btn.getBoundingClientRect() : null;
    confetti({
      particleCount: 120,
      spread: 60,
      origin: rect
        ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
        : { x: 0.5, y: 0.75 },
      colors: ['#E08060', '#D4A843', '#4AADA8', '#ffffff'],
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: 'rgba(18, 10, 5, 0.55)',
          backdropFilter: 'blur(3px)',
          transitionProperty: 'opacity',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(440px, 100vw)',
          zIndex: 70,
          background: 'hsl(30 25% 97%)',
          boxShadow: '-8px 0 48px rgba(0,0,0,0.22)',
          transitionProperty: 'transform',
          transitionDuration: '380ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Early Access signup"
      >
        {/* Coral top wash */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 160,
          background: 'linear-gradient(160deg, hsl(18 75% 65% / 0.13) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Close button */}
        <button
          onClick={closeDrawer}
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid hsl(30 15% 86%)',
            background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            transitionProperty: 'background, box-shadow',
            transitionDuration: '160ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'hsl(30 20% 94%)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
          aria-label="Close"
        >
          <X size={15} style={{ color: 'hsl(25 25% 40%)' }} />
        </button>

        <div style={{ padding: '52px clamp(18px, 5vw, 36px) 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {submitted ? (
            /* ── Success state ── */
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', flex: 1, textAlign: 'center', gap: 20,
              paddingTop: 40,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'hsl(18 85% 94%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'eaDrawerPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}>
                <CheckCircle size={30} style={{ color: '#E08060' }} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: 26, fontWeight: 400,
                  color: 'hsl(25 45% 15%)', lineHeight: 1.25,
                  marginBottom: 10,
                }}>
                  You're on the list{name ? `, ${name.split(' ')[0]}` : ''}.
                </p>
                <p style={{ fontSize: 14, color: 'hsl(25 15% 50%)', lineHeight: 1.6 }}>
                  We'll reach you at <strong style={{ color: 'hsl(25 35% 25%)', fontWeight: 600 }}>{email}</strong> when early access opens in April 2026.
                </p>
                <p style={{ fontSize: 12, color: 'hsl(25 15% 62%)', lineHeight: 1.55, marginTop: 10 }}>
                  Can't find our email? Check your junk or spam folder.
                </p>
              </div>
              <button
                onClick={closeDrawer}
                style={{
                  marginTop: 8,
                  padding: '10px 28px', borderRadius: 8,
                  border: '1px solid hsl(30 15% 85%)',
                  background: 'white', fontSize: 13,
                  color: 'hsl(25 25% 40%)', fontWeight: 500,
                  cursor: 'pointer',
                  transitionProperty: 'background',
                  transitionDuration: '150ms',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'hsl(30 20% 94%)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              {/* Header */}
              <div style={{ marginBottom: 36 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '4px 12px', borderRadius: 20,
                  background: 'hsl(18 85% 94%)',
                  marginBottom: 16,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#E08060', display: 'inline-block',
                  }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#E08060', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    100 spots · Free
                  </span>
                </div>
                <h2 style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: 'clamp(1.6rem, 4vw, 2rem)',
                  fontWeight: 400,
                  color: 'hsl(25 45% 15%)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  marginBottom: 10,
                }}>
                  Claim your early<br />access spot.
                </h2>
                <p style={{ fontSize: 14, color: 'hsl(25 15% 50%)', lineHeight: 1.6 }}>
                  Priority entry + 1 month free PRO when we officially launch in April 2026.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
                <DrawerField
                  ref={nameRef}
                  label="Your name"
                  type="text"
                  value={name}
                  placeholder="Jane Smith"
                  error={errors.name}
                  onChange={v => { setName(v); setErrors(p => ({ ...p, name: undefined })); }}
                />
                <DrawerField
                  label="Email address"
                  type="email"
                  value={email}
                  placeholder="jane@example.com"
                  error={errors.email}
                  onChange={v => { setEmail(v); setErrors(p => ({ ...p, email: undefined })); }}
                />

                {/* Consent checkbox */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    cursor: 'pointer', userSelect: 'none',
                  }}>
                    <div style={{ position: 'relative', flexShrink: 0, marginTop: 1 }}>
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={e => { setConsent(e.target.checked); setErrors(p => ({ ...p, consent: undefined })); }}
                        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                      />
                      <div style={{
                        width: 18, height: 18, borderRadius: 5,
                        border: `1.5px solid ${errors.consent ? 'hsl(18 65% 62%)' : consent ? 'hsl(18 65% 62%)' : 'hsl(30 15% 78%)'}`,
                        background: consent ? 'hsl(18 65% 62%)' : errors.consent ? 'hsl(18 85% 98%)' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transitionProperty: 'background, border-color',
                        transitionDuration: '140ms',
                      }}>
                        {consent && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: 'hsl(25 20% 42%)', lineHeight: 1.55 }}>
                      I agree to be contacted by Tello about early access and product updates. Unsubscribe any time.
                    </span>
                  </label>
                  {errors.consent && (
                    <p style={{ fontSize: 12, color: 'hsl(18 65% 55%)', margin: 0, fontWeight: 500, paddingLeft: 28 }}>
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div style={{ marginTop: 4 }}>
                  <button
                    ref={submitRef}
                    type="submit"
                    style={{
                      width: '100%', padding: '13px 0', borderRadius: 10,
                      background: 'hsl(18 65% 62%)', color: 'white',
                      fontSize: 14, fontWeight: 600, border: 'none',
                      cursor: 'pointer', letterSpacing: '0.01em',
                      boxShadow: '0 4px 20px hsl(18 65% 62% / 0.35)',
                      transitionProperty: 'background, box-shadow, transform',
                      transitionDuration: '160ms',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'hsl(18 62% 55%)';
                      el.style.boxShadow = '0 6px 24px hsl(18 65% 62% / 0.45)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'hsl(18 65% 62%)';
                      el.style.boxShadow = '0 4px 20px hsl(18 65% 62% / 0.35)';
                    }}
                    onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.985)'; }}
                    onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting…' : 'Join the Early Access List'}
                  </button>
                  <p style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: 'hsl(25 15% 58%)' }}>
                    No credit card. No commitment.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>

        <style>{`
          @keyframes eaDrawerPop {
            0%   { transform: scale(0.7); opacity: 0; }
            60%  { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1);   opacity: 1; }
          }
        `}</style>
      </div>
    </>
  );
}

// ── DrawerField ──────────────────────────────────────────────────────────────
import { forwardRef } from 'react';

const DrawerField = forwardRef<HTMLInputElement, {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (v: string) => void;
}>(({ label, type, value, placeholder, error, onChange }, ref) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: 'hsl(25 35% 28%)', letterSpacing: '0.01em' }}>
      {label}
    </label>
    <input
      ref={ref}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        height: 44, padding: '0 14px', borderRadius: 8,
        border: `1px solid ${error ? 'hsl(18 65% 62%)' : 'hsl(30 15% 84%)'}`,
        background: error ? 'hsl(18 85% 98%)' : 'white',
        fontSize: 14, color: 'hsl(25 35% 18%)',
        outline: 'none',
        transitionProperty: 'border-color, box-shadow, background',
        transitionDuration: '150ms',
        fontFamily: 'Inter, sans-serif',
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'hsl(18 65% 62%)';
        e.currentTarget.style.boxShadow = '0 0 0 3px hsl(18 85% 92%)';
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = error ? 'hsl(18 65% 62%)' : 'hsl(30 15% 84%)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    />
    {error && (
      <p style={{ fontSize: 12, color: 'hsl(18 65% 55%)', margin: 0, fontWeight: 500 }}>{error}</p>
    )}
  </div>
));
DrawerField.displayName = 'DrawerField';
