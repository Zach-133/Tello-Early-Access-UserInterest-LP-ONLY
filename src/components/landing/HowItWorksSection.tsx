import { Mic, Briefcase, Gauge, Upload, Building2, Target, TrendingUp, ClipboardCheck, FileText } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  {
    icon: Mic,
    title: 'Realistic Voice Agent',
    desc: 'A real-time voice agent listens, responds, and follows up to your answers. Conversational, not interrogative.',
  },
  {
    icon: Briefcase,
    title: 'Industry-Specific Questions',
    desc: 'Engineering, Finance, Business, Architecture, Nursing, and more - the roles that matter.',
  },
  {
    icon: Gauge,
    title: 'Flexible Difficulty Levels',
    desc: 'From beginner to expert, always tailored to your level and designed to push you to the next. Build real confidence before the real thing.',
  },
  {
    icon: Upload,
    title: 'CV and Job Description Upload',
    desc: 'Get interviews personalised to your experience and target role.',
  },
  {
    icon: Building2,
    title: 'Company Research',
    desc: 'AI researches the company, recent news, and Glassdoor reviews before your session.',
  },
  {
    icon: Target,
    title: 'Training Ground',
    desc: 'Practice individual questions using the STAR framework at your own pace.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    desc: "Track your improvement over time with detailed analytics. See how far you've come, all in one place.",
  },
  {
    icon: ClipboardCheck,
    title: 'Robust Grading Method',
    desc: 'Industry-standard scoring across 4 key criteria: technical depth, communication clarity, and more.',
  },
  {
    icon: FileText,
    title: 'Instant Score Report',
    desc: 'A detailed breakdown of every answer, delivered the moment your session ends.',
  },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="features" ref={ref} className="bg-primary py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header — blur-to-focus entrance */}
        <div className="text-center mb-16">
          <p
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)',
            }}
            className="text-primary-foreground/50 text-xs font-semibold tracking-[0.2em] uppercase mb-5"
          >
            What You Get
          </p>
          <h2
            className="font-serif text-primary-foreground mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.022em',
              lineHeight: 1.15,
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '900ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '80ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(1.04)',
              filter: isVisible ? 'blur(0px)' : 'blur(12px)',
            }}
          >
            All the must-haves to excel<br className="hidden sm:block" />in your interview.
          </h2>
          <p
            className="text-primary-foreground/70 text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
            style={{
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '800ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              filter: isVisible ? 'blur(0px)' : 'blur(6px)',
            }}
          >
            Tello gives you everything serious candidates need, and nothing they don't.
          </p>
        </div>

        {/* Grid — cards surge up from below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            const delay = 280 + i * 90;
            return (
              <div
                key={f.title}
                className="rounded-2xl p-6 cursor-default"
                style={{
                  background: 'hsl(25 40% 26%)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                  transitionProperty: 'opacity, transform, filter, box-shadow',
                  transitionDuration: '700ms, 700ms, 700ms, 250ms',
                  transitionTimingFunction:
                    'cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.16,1,0.3,1), ease',
                  transitionDelay: `${delay}ms, ${delay}ms, ${delay}ms, 0ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(56px) scale(0.88)',
                  filter: isVisible ? 'blur(0px)' : 'blur(4px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.28)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'hsla(18,75%,65%,0.18)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'hsl(18 75% 70%)' }} />
                </div>
                <h3 className="font-semibold text-primary-foreground text-base mb-2">{f.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Curiosity teaser */}
        <div
          className="text-center mt-14"
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '1000ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <p className="text-primary-foreground/40 text-sm italic">There's more waiting inside.</p>
        </div>
      </div>
    </section>
  );
}
