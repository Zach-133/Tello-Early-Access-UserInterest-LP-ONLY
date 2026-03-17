import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useEarlyAccess } from '@/context/EarlyAccessContext';

// Staggered entrance: each element starts hidden, revealed in sequence
const stagger = (delayMs: number): React.CSSProperties => ({
  opacity: 0,
  animation: `slide-up 0.7s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms forwards`,
});


export function HeroSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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
    <section className="relative min-h-screen bg-primary flex items-center justify-center overflow-hidden">
      {/* Ambient coral glow behind heading */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -58%)',
          width: 720,
          height: 720,
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(18 75% 65% / 0.07) 0%, transparent 62%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 pt-24 pb-20 sm:pt-28 sm:pb-24 text-center">
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-coral/30 text-coral text-sm font-medium mb-10"
          style={stagger(0)}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-soft" />
          Early Access &nbsp;·&nbsp; 100 spots only
        </div>

        {/* Headline */}
        <h1
          className="font-serif text-white mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            ...stagger(160),
          }}
        >
          Interviews just<br />got easier.
        </h1>

        {/* Subtitle */}
        <p
          className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={stagger(340)}
        >
          Practice live mock interviews across 10 industries, without fear of judgement. Get instant, scored feedback. No prep course needed.
        </p>

        {/* Email CTA — desktop */}
        <div style={stagger(520)}>
          <form
            onSubmit={handleSubmit}
            className="hidden sm:flex flex-row gap-3 max-w-md mx-auto"
          >
            <input
              id="hero-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/35 text-sm focus:outline-none focus:border-coral/60 focus:bg-white/[0.13] transition-[border-color,background-color] duration-200"
            />
            <Button type="submit" variant="coral" size="lg" className="whitespace-nowrap">
              Claim Your Spot →
            </Button>
          </form>
          {error && <p className="mt-2 text-coral text-sm hidden sm:block">{error}</p>}

          {/* Mobile CTA — opens drawer directly */}
          <Button
            onClick={() => openDrawer('')}
            variant="coral"
            size="lg"
            className="sm:hidden w-full max-w-xs"
          >
            Claim Your Spot →
          </Button>
        </div>

      </div>

    </section>
  );
}
