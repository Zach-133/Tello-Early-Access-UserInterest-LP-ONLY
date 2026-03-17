import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEarlyAccess } from '@/context/EarlyAccessContext';

const benefits = [
  'Priority early access',
  '1 month free PRO on launch',
  '100 spots only',
];

export function CTASection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const { openDrawer } = useEarlyAccess();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    openDrawer(email);
  };

  return (
    <section ref={ref} className="relative bg-primary py-14 sm:py-20 px-5 sm:px-6 overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(18 75% 65% / 0.08) 0%, transparent 65%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(175 45% 45% / 0.06) 0%, transparent 65%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-coral/30 text-coral text-xs font-semibold tracking-[0.15em] uppercase mb-8"
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral" />
          Limited spots available
        </div>

        {/* Heading */}
        <h2
          className="font-serif text-primary-foreground mb-10"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            transitionProperty: 'opacity, transform',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '80ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          } as React.CSSProperties}
        >
          Ready to ace your<br />
          <span className="text-coral">next interview?</span>
        </h2>

        {/* Form */}
        <div
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '180ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-coral/60 focus:bg-white/[0.13] transition-[border-color,background-color] duration-200"
            />
            <Button type="submit" variant="coral" size="lg" className="whitespace-nowrap font-semibold">
              Get Early Access
            </Button>
          </form>
          {error && <p className="mb-4 text-coral text-sm">{error}</p>}
        </div>

        {/* Benefits row */}
        <div
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-6"
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '280ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-primary-foreground/70 text-sm">
              <Check className="w-3.5 h-3.5 text-coral shrink-0" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
