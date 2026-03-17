import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { DashboardPreview } from './DashboardPreview';
import { useEarlyAccess } from '@/context/EarlyAccessContext';

const perks = [
  'Mock interview across 10 job fields',
  'Scored and graded in real time',
  'Your own dashboard to track progress',
  '1 month free when we launch in April',
];

export function BenefitsSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [spotCount, setSpotCount] = useState(0);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const { openDrawer } = useEarlyAccess();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) { setSpotCount(0); return; }
    const target = 34;
    const duration = 1400;
    const stepTime = Math.floor(duration / target);
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setSpotCount(current);
      if (current >= target) {
        clearInterval(timer);
        const rect = barRef.current?.getBoundingClientRect();
        confetti({
          particleCount: 60,
          spread: 360,
          startVelocity: 6,
          gravity: 0.2,
          decay: 0.88,
          ticks: 120,
          scalar: 0.65,
          origin: rect
            ? { x: (rect.left + rect.width * (34 / 100)) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
            : { x: 0.2, y: 0.6 },
          colors: ['#E08060', '#D4A843', '#4AADA8', '#ffffff'],
        });
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    openDrawer(email);
  };

  const leftStyle: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: '700ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
  };

  const rightStyle: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: '800ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: '160ms',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
  };

  return (
    <section id="early-access" ref={ref} className="bg-primary py-14 sm:py-20 lg:py-28 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-center">

        {/* Left: Copy + form */}
        <div style={leftStyle}>
          <p className="text-coral text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Early Access
          </p>
          <h2
            className="font-serif text-white mb-5"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Be one of the first to try mock interviews, on demand.
          </h2>
          <p className="text-primary-foreground/70 text-base leading-relaxed mb-9">
            100 spots. 1 month free. Priority access the moment we launch.
          </p>

          {/* Perks */}
          <ul className="space-y-3 mb-9">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-primary-foreground/75 text-sm">
                <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          {/* Scarcity bar */}
          <div className="flex items-center gap-3 mb-7">
            <div ref={barRef} className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  background: '#ef4444',
                  width: `${spotCount}%`,
                  transitionProperty: 'width',
                  transitionDuration: '50ms',
                  transitionTimingFunction: 'linear',
                }}
              />
            </div>
            <span className="text-primary-foreground/35 text-xs">{spotCount} of 100 spots taken</span>
          </div>

          {/* Form — desktop only */}
          <form onSubmit={handleSubmit} className="hidden sm:flex flex-row gap-3 w-full sm:max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/35 text-sm focus:outline-none focus:border-coral/60 focus:bg-white/[0.13] transition-[border-color,background-color] duration-200"
            />
            <Button type="submit" variant="coral" size="lg">
              Claim Your Spot
            </Button>
          </form>
          {error && <p className="mt-2 text-coral text-sm hidden sm:block">{error}</p>}
        </div>

        {/* Right: Recreated dashboard */}
        <div style={rightStyle}>
          <div className="relative">
            {/* Ambient coral glow */}
            <div
              className="absolute -inset-6 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, hsl(18 75% 65% / 0.12) 0%, transparent 70%)' }}
            />
            {/* Mobile: scale down to show full dashboard */}
            <div className="lg:hidden overflow-hidden" style={{ height: 340 }}>
              <div style={{ transform: 'scale(0.65)', transformOrigin: 'top left', width: '154%' }}>
                <DashboardPreview animate={isVisible} />
              </div>
            </div>
            {/* Desktop: full dashboard */}
            <div className="hidden lg:block">
              <DashboardPreview animate={isVisible} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
