export function Footer() {
  return (
    <footer className="bg-primary py-10 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Logo row — same spacing as navbar */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, hsl(18 75% 65%), hsl(18 65% 55%))' }}
            >
              <span className="font-serif text-white font-bold text-base leading-none">T</span>
            </div>
            <span
              className="text-primary-foreground text-xl leading-none"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
            >
              Tello
            </span>
            <span className="text-primary-foreground/40 text-sm leading-none mx-1">·</span>
            <span
              className="text-primary-foreground/80 text-sm leading-none"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Your interview coach.
            </span>
          </div>
          <p className="text-primary-foreground/50 text-xs">
            © {new Date().getFullYear()} Tello. All rights reserved.
          </p>
        </div>
        <div className="border-t border-white/15 pt-5 flex items-center justify-center gap-6">
          <a
            href="#"
            className="text-primary-foreground/55 text-xs hover:text-primary-foreground transition-[color] duration-200"
          >
            Privacy Policy
          </a>
          <span className="w-px h-3 bg-white/20" />
          <a
            href="#"
            className="text-primary-foreground/55 text-xs hover:text-primary-foreground transition-[color] duration-200"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
