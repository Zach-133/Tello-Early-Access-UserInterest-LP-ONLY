import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEarlyAccess } from '@/context/EarlyAccessContext';

const NAV_LINKS = [
  { label: 'Features', id: 'features', block: 'start' as ScrollLogicalPosition },
  { label: 'Early Access', id: 'early-access', block: 'start' as ScrollLogicalPosition },
  { label: 'FAQ', id: 'faq', block: 'start' as ScrollLogicalPosition },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDrawer } = useEarlyAccess();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handle = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const scrollTo = (id: string, block: ScrollLogicalPosition = 'start') => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block });
    }, mobileOpen ? 200 : 0);
  };

  const handleCTA = () => {
    setMobileOpen(false);
    setTimeout(() => openDrawer(), mobileOpen ? 200 : 0);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/40 shadow-soft">
        <div className="container mx-auto flex items-center justify-between h-16 px-6 max-w-6xl">
          {/* Inline SVG logo — crisp at any resolution */}
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, hsl(18 75% 65%), hsl(18 65% 55%))' }}
            >
              <span className="font-serif text-white font-bold text-base leading-none">T</span>
            </div>
            <span
              className="leading-none"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.25rem', color: 'hsl(25 30% 12%)' }}
            >
              Tello
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, id, block }) => (
              <button
                key={id}
                onClick={() => scrollTo(id, block)}
                className="text-sm font-medium text-foreground/65 hover:text-foreground transition-[color] duration-200 focus-visible:outline-none"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="coral"
              size="sm"
              onClick={handleCTA}
              className="font-semibold hidden sm:inline-flex"
            >
              Get Early Access
            </Button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-[color,background-color] duration-200 focus-visible:outline-none"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: mobileOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="md:hidden border-t border-border/40 bg-white overflow-hidden"
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(({ label, id, block }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id, block)}
                  className="text-left py-3 text-base font-medium text-foreground/70 hover:text-foreground border-b border-border/30 last:border-0 transition-[color] duration-200 focus-visible:outline-none"
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 pb-1">
                <Button
                  variant="coral"
                  className="w-full font-semibold"
                  onClick={handleCTA}
                >
                  Get Early Access
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
