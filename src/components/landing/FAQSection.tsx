import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
  {
    q: 'What is Tello?',
    a: 'Tello is your personal interview coach, built for fresh graduates, career changers, and anyone who gets nervous before an interview.',
  },
  {
    q: 'When does Tello launch?',
    a: 'Early access begins 1st April 2026, with the full-features public launch following on 1st May 2026. Early access users get in first, before the public.',
  },
  {
    q: 'What is early access?',
    a: 'Early access grants you priority entry to Tello ahead of the official public launch. You will also receive 1 month of free PRO access when the app officially releases.',
  },
  {
    q: 'Is it free?',
    a: 'Early access is completely free. No credit card, no commitment required.',
  },
  {
    q: 'How does it work?',
    a: 'Tello conducts a live voice interview with you, powered by an AI voice agent that sounds exactly like your real interviewer. Try it and see for yourself.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="faq" ref={ref} className="bg-primary py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h2
          className="font-serif text-primary-foreground mb-12"
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            letterSpacing: '-0.02em',
            transitionProperty: 'opacity, transform',
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          } as React.CSSProperties}
        >
          Your questions, answered.
        </h2>

        <div className="divide-y divide-white/10">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '600ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${80 + i * 70}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-primary-foreground font-medium text-base group-hover:text-coral transition-[color] duration-200">
                  {faq.q}
                </span>
                <span className="shrink-0 text-primary-foreground/40 group-hover:text-coral transition-[color] duration-200">
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: open === i ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="overflow-hidden">
                  <p className="text-primary-foreground/70 text-sm leading-relaxed pb-5">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
