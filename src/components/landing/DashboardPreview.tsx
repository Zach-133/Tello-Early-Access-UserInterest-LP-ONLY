import { useState, useRef, useEffect } from 'react';
import { Flame, CircleDot, TrendingUp, Trophy, ChevronDown } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ── Colours ───────────────────────────────────────────────────────────────────
const CORAL    = '#E08060';
const GOLD     = '#D4A843';
const TEAL     = '#4D9E8E';
const GREEN    = '#5CAD7A';
const CORAL_BG = 'hsl(18 85% 94%)';
const TEAL_BG  = 'hsl(175 45% 92%)';
const GOLD_BG  = 'hsl(42 85% 92%)';

const CRITERIA = [
  { label: 'Technical',       color: GOLD  },
  { label: 'Problem-Solving', color: TEAL  },
  { label: 'Communication',   color: GREEN },
  { label: 'Relevance',       color: CORAL },
];

// ── Chart data ────────────────────────────────────────────────────────────────
// Breakdown per-session scores average to the overall score:
// S1(5): (8+5+4+3)/4=5  S2(23): (28+12+25+27)/4=23
// S3(27): (18+30+32+28)/4=27  S4(45): (38+55+42+45)/4=45  S5(52): (60+48+55+45)/4=52
const overallData = [
  { label: 'S1', date: 'Jan 15, 2026', time: '2:30 PM',  'Overall Score': 5,  'Your Potential': null },
  { label: 'S2', date: 'Jan 22, 2026', time: '3:45 PM',  'Overall Score': 23, 'Your Potential': null },
  { label: 'S3', date: 'Feb 3, 2026',  time: '11:00 AM', 'Overall Score': 27, 'Your Potential': null },
  { label: 'S4', date: 'Feb 14, 2026', time: '4:15 PM',  'Overall Score': 45, 'Your Potential': null },
  { label: 'S5', date: 'Mar 1, 2026',  time: '10:30 AM', 'Overall Score': 52, 'Your Potential': 52  },
  { label: '', date: null, time: null, 'Overall Score': null, 'Your Potential': 61 },
  { label: '', date: null, time: null, 'Overall Score': null, 'Your Potential': 70 },
  { label: '', date: null, time: null, 'Overall Score': null, 'Your Potential': 65 },
  { label: '', date: null, time: null, 'Overall Score': null, 'Your Potential': 77 },
];

const breakdownData = [
  { label: 'S1', date: 'Jan 15, 2026', time: '2:30 PM',  Technical: 8,  'Problem-Solving': 5,  Communication: 4,  Relevance: 3  },
  { label: 'S2', date: 'Jan 22, 2026', time: '3:45 PM',  Technical: 28, 'Problem-Solving': 12, Communication: 25, Relevance: 27 },
  { label: 'S3', date: 'Feb 3, 2026',  time: '11:00 AM', Technical: 18, 'Problem-Solving': 30, Communication: 32, Relevance: 28 },
  { label: 'S4', date: 'Feb 14, 2026', time: '4:15 PM',  Technical: 38, 'Problem-Solving': 55, Communication: 42, Relevance: 45 },
  { label: 'S5', date: 'Mar 1, 2026',  time: '10:30 AM', Technical: 60, 'Problem-Solving': 48, Communication: 55, Relevance: 45 },
];

// ── Custom tooltip ─────────────────────────────────────────────────────────────
const TooltipContent = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d?.label) return null;
  const items = (payload as any[]).filter(p => p.value != null && p.dataKey !== 'Your Potential');
  return (
    <div style={{
      background: 'hsl(30 20% 99%)', border: '1px solid hsl(30 20% 88%)',
      borderRadius: 10, fontSize: 11, padding: '8px 12px',
      boxShadow: '0 4px 20px -4px rgba(60,30,10,0.14)', minWidth: 148,
    }}>
      <p style={{ fontWeight: 700, color: 'hsl(25 35% 18%)', marginBottom: 2, fontSize: 12 }}>
        Session {d.label}
      </p>
      <p style={{ color: 'hsl(25 15% 55%)', marginBottom: 6, fontSize: 10 }}>
        {d.date} · {d.time}
      </p>
      {items.map((item: any, i: number) => (
        <p key={i} style={{ color: item.stroke, margin: '2px 0', display: 'flex', justifyContent: 'space-between', gap: 14 }}>
          <span>{item.dataKey}</span>
          <strong>{Math.round(item.value)}</strong>
        </p>
      ))}
    </div>
  );
};

// ── Animated flame ─────────────────────────────────────────────────────────────
function AnimatedFlame() {
  return (
    <div style={{
      animation: 'eaFireFlicker 0.38s ease-in-out infinite',
      transformOrigin: 'center bottom',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Flame size={15} style={{ color: CORAL }} />
    </div>
  );
}

// ── Cursor SVG ─────────────────────────────────────────────────────────────────
const CursorArrow = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.5 1L1.5 13.5L4.5 10.5L7 16.5L8.5 15.5L6 9.5L10.5 9.5L1.5 1Z"
      fill="white" stroke="#1a1a1a" strokeWidth="1.2"
      strokeLinejoin="round" strokeLinecap="round"
    />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
type ChartMode = 'overall' | 'breakdown';

export function DashboardPreview({ animate }: { animate?: boolean }) {
  const [chartMode, setChartMode] = useState<ChartMode>('overall');
  const [animationDone, setAnimationDone] = useState(false);
  const outerRef        = useRef<HTMLDivElement>(null);
  const breakdownBtnRef = useRef<HTMLButtonElement>(null);

  // ── Compute cursor keyframe translation from button positions ──────────────
  useEffect(() => {
    const compute = () => {
      if (!outerRef.current || !breakdownBtnRef.current) return;
      const or = outerRef.current.getBoundingClientRect();
      const br = breakdownBtnRef.current.getBoundingClientRect();

      // Cursor tip starts at: left=20px, bottom=28px of outer div
      // position: absolute; left:20; bottom:28 → top of div = or.bottom - 28 - 18(svg height)
      const startX = or.left + 20;
      const startY = or.bottom - 28 - 18;

      // Cursor tip ends at: center of Breakdown button
      const endX = br.left + br.width * 0.5;
      const endY = br.top  + br.height * 0.5;

      const dx = Math.round(endX - startX);
      const dy = Math.round(endY - startY);

      let el = document.getElementById('ea-cursor-kf') as HTMLStyleElement | null;
      if (!el) {
        el = document.createElement('style');
        el.id = 'ea-cursor-kf';
        document.head.appendChild(el);
      }
      el.textContent = `
        @keyframes eaCursorMove {
          0%, 8%    { opacity: 0; transform: translate(0px, 0px); }
          15%       { opacity: 1; transform: translate(0px, 0px); }
          52%       { opacity: 1; transform: translate(${dx}px, ${dy}px); }
          55%       { opacity: 1; transform: translate(${dx}px, ${dy}px) scale(0.82); }
          58%       { opacity: 1; transform: translate(${dx}px, ${dy}px) scale(1); }
          80%       { opacity: 0.5; transform: translate(${dx}px, ${dy}px); }
          90%, 100% { opacity: 0; transform: translate(0px, 0px); }
        }
      `;
    };
    const t = setTimeout(compute, 450);
    return () => {
      clearTimeout(t);
      document.getElementById('ea-cursor-kf')?.remove();
    };
  }, []);

  // ── Auto mode-switch loop (synchronized with 7s cursor animation) ──────────
  useEffect(() => {
    if (!animate) return;
    const CYCLE_MS  = 7000;
    const CLICK_AT  = Math.round(CYCLE_MS * 0.59); // ~4130ms — just after cursor "clicks"
    const RESET_AT  = Math.round(CYCLE_MS * 0.90); // ~6300ms — switch back to Overall

    const runCycle = () => {
      const t1 = setTimeout(() => { setChartMode('breakdown'); setAnimationDone(false); }, CLICK_AT);
      const t2 = setTimeout(() => { setChartMode('overall');   setAnimationDone(false); }, RESET_AT);
      return [t1, t2] as ReturnType<typeof setTimeout>[];
    };

    let timers = runCycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runCycle();
    }, CYCLE_MS);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [animate]);

  const switchMode = (mode: ChartMode) => { setChartMode(mode); setAnimationDone(false); };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartData: any[] = chartMode === 'overall' ? overallData : breakdownData;

  return (
    <div
      ref={outerRef}
      className="rounded-2xl overflow-hidden select-none w-full"
      style={{
        position: 'relative',
        background: 'hsl(30 25% 97%)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.14)',
        fontFamily: 'Inter, sans-serif',
        border: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes eaFireFlicker {
          0%,100% { transform: scaleX(1)    scaleY(1);    filter: drop-shadow(0 0 2px rgba(220,80,20,0.6)); }
          15%     { transform: scaleX(0.90) scaleY(1.07); filter: drop-shadow(0 0 4px rgba(255,130,30,0.9)); }
          30%     { transform: scaleX(1.07) scaleY(0.95); filter: drop-shadow(0 0 2px rgba(200,60,10,0.5)); }
          50%     { transform: scaleX(0.93) scaleY(1.09); filter: drop-shadow(0 0 6px rgba(255,160,30,1.0)); }
          70%     { transform: scaleX(1.05) scaleY(0.96); filter: drop-shadow(0 0 3px rgba(220,80,20,0.7)); }
          85%     { transform: scaleX(0.92) scaleY(1.04); filter: drop-shadow(0 0 4px rgba(255,120,20,0.85)); }
        }
      `}</style>

      {/* ── Animated cursor overlay ── */}
      <div
        style={{
          position: 'absolute',
          left: 20,
          bottom: 28,
          zIndex: 50,
          pointerEvents: 'none',
          animation: 'eaCursorMove 7s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          animationPlayState: animate ? 'running' : 'paused',
          opacity: 0,
          transformOrigin: 'top left',
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))',
        }}
      >
        <CursorArrow />
      </div>

      {/* ── Window chrome ── */}
      <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ background: 'hsl(30 20% 94%)', borderColor: 'hsl(30 15% 88%)' }}>
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FF6058' }} />
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FFBD2E' }} />
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#28C840' }} />
        <div className="ml-3 flex-1 h-4 rounded-full" style={{ background: 'hsl(30 12% 84%)' }} />
      </div>

      {/* ── Dashboard body ── */}
      <div className="p-3 sm:p-5">

        {/* Header */}
        <div className="mb-4">
          <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: 22, fontWeight: 400, color: 'hsl(25 45% 15%)', lineHeight: 1.2, margin: 0 }}>
            Welcome back, Zachery.
          </h3>
          <p style={{ fontSize: 13, color: 'hsl(25 15% 50%)', marginTop: 3 }}>
            2 days in a row — you're building momentum.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          <StatCard icon={<AnimatedFlame />}                                                                   iconBg={CORAL_BG} value="2"       label="Day Streak"    sub="Keep it up!" />
          <StatCard icon={<CircleDot  size={15} style={{ color: TEAL }} />}                                   iconBg={TEAL_BG}  value="5"       label="Sessions Done" />
          <StatCard icon={<TrendingUp size={15} style={{ color: GOLD }} />}                                   iconBg={GOLD_BG}  value="+30 pts" label="Improvement"   />
          <StatCard icon={<Trophy     size={15} style={{ color: GOLD }} />}                                   iconBg={GOLD_BG}  value="52"      label="Best Score"    />
        </div>

        {/* ── Bottom two columns ── */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-[1.15fr_0.85fr]">

          {/* Performance chart */}
          <div className="rounded-xl p-3 flex flex-col" style={{ background: 'white', border: '1px solid hsl(30 15% 90%)', minHeight: 220 }}>

            {/* Chart header */}
            <div className="flex items-start justify-between mb-2 flex-shrink-0">
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'hsl(25 35% 20%)', margin: 0 }}>Your Performance</p>
                <p style={{ fontSize: 11, color: 'hsl(25 15% 55%)', margin: '2px 0 0' }}>
                  {chartMode === 'overall' ? 'Overall score' : 'Score breakdown across all 4 criteria.'}
                </p>
              </div>

              {/* Toggle */}
              <div style={{ display: 'flex', gap: 2, background: 'hsl(30 15% 92%)', borderRadius: 10, padding: 3, flexShrink: 0 }}>
                {(['overall', 'breakdown'] as ChartMode[]).map((mode) => (
                  <button
                    key={mode}
                    ref={mode === 'breakdown' ? breakdownBtnRef : undefined}
                    onClick={() => switchMode(mode)}
                    style={{
                      padding: '3px 9px', borderRadius: 7, fontSize: 10, fontWeight: 500,
                      border: 'none', cursor: 'pointer',
                      transition: 'background 150ms, color 150ms, box-shadow 150ms',
                      background: chartMode === mode ? 'white' : 'transparent',
                      color: chartMode === mode ? 'hsl(25 35% 20%)' : 'hsl(25 15% 55%)',
                      boxShadow: chartMode === mode ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
                    }}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart area */}
            <div className="relative flex-1" style={{ minHeight: 0 }}>
              {/* Breakdown legend */}
              {chartMode === 'breakdown' && (
                <div style={{
                  position: 'absolute', top: 4, left: 36, zIndex: 10,
                  display: 'flex', flexDirection: 'column', gap: 5,
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: 8, padding: '6px 10px',
                  border: '1px solid hsl(30 15% 88%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                  {CRITERIA.map(({ label, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: 10, color: 'hsl(25 20% 38%)', fontWeight: 500 }}>{label}</span>
                    </div>
                  ))}
                </div>
              )}

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  key={chartMode}
                  data={chartData}
                  margin={{ top: 6, right: 8, left: -4, bottom: 2 }}
                >
                  <CartesianGrid strokeDasharray="4 4" stroke="hsl(30 15% 91%)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: '#333', fontFamily: 'Inter, sans-serif' }}
                    axisLine={{ stroke: 'hsl(30 15% 87%)' }}
                    tickLine={false}
                    dy={4}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11, fill: '#333', fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                  />
                  <Tooltip
                    content={<TooltipContent />}
                    cursor={{ stroke: 'hsl(25 15% 72%)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />

                  {chartMode === 'overall' ? (
                    <>
                      <Line
                        type="monotone" dataKey="Overall Score" stroke={CORAL} strokeWidth={2.5}
                        dot={{ r: 3.5, fill: CORAL, strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: CORAL, strokeWidth: 0 }}
                        connectNulls={false}
                        isAnimationActive={!animationDone} animationDuration={700}
                        onAnimationEnd={() => setAnimationDone(true)}
                      />
                      <Line
                        type="monotone" dataKey="Your Potential" stroke={CORAL} strokeWidth={2}
                        strokeDasharray="6 4" strokeOpacity={0.55}
                        dot={false} activeDot={false} connectNulls
                        isAnimationActive={!animationDone} animationDuration={700}
                      />
                    </>
                  ) : (
                    <>
                      <Line type="monotone" dataKey="Technical"       stroke={GOLD}  strokeWidth={2} dot={{ r: 3.5, fill: GOLD,  stroke: 'white', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: GOLD,  stroke: 'white', strokeWidth: 1.5 }} connectNulls isAnimationActive={!animationDone} animationDuration={700} onAnimationEnd={() => setAnimationDone(true)} />
                      <Line type="monotone" dataKey="Problem-Solving" stroke={TEAL}  strokeWidth={2} dot={{ r: 3.5, fill: TEAL,  stroke: 'white', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: TEAL,  stroke: 'white', strokeWidth: 1.5 }} connectNulls isAnimationActive={!animationDone} animationDuration={700} />
                      <Line type="monotone" dataKey="Communication"   stroke={GREEN} strokeWidth={2} dot={{ r: 3.5, fill: GREEN, stroke: 'white', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: GREEN, stroke: 'white', strokeWidth: 1.5 }} connectNulls isAnimationActive={!animationDone} animationDuration={700} />
                      <Line type="monotone" dataKey="Relevance"       stroke={CORAL} strokeWidth={2} dot={{ r: 3.5, fill: CORAL, stroke: 'white', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: CORAL, stroke: 'white', strokeWidth: 1.5 }} connectNulls isAnimationActive={!animationDone} animationDuration={700} />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* New Mock Interview */}
          <div className="rounded-xl p-3.5 flex flex-col" style={{ background: 'white', border: '1.5px solid hsl(18 60% 83%)', gap: 10 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'hsl(25 35% 20%)', margin: 0 }}>New Mock Interview</p>
              <p style={{ fontSize: 11, color: 'hsl(25 15% 55%)', marginTop: 3 }}>Configure and start your next session</p>
            </div>
            <VisualDropdown label="Interview Duration"  placeholder="Select duration"   />
            <VisualDropdown label="Job Field"           placeholder="Select job field"  />
            <VisualDropdown label="Difficulty Level"    placeholder="Select difficulty" />
            <button style={{
              marginTop: 'auto', width: '100%', padding: '9px 0', borderRadius: 8,
              background: 'hsl(18 65% 72%)', color: 'white', fontSize: 12,
              fontWeight: 600, border: 'none', cursor: 'default', letterSpacing: '0.015em',
            }}>
              Start Interview
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, value, label, sub }: {
  icon: React.ReactNode; iconBg: string; value: string; label: string; sub?: string;
}) {
  return (
    <div className="rounded-xl p-3 flex flex-col items-center text-center gap-1.5"
      style={{ background: 'white', border: '1px solid hsl(30 15% 91%)' }}>
      <div className="rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ width: 28, height: 28, background: iconBg }}>{icon}</div>
      <span style={{ fontSize: 17, fontWeight: 700, color: 'hsl(25 35% 18%)', lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 10, fontWeight: 600, color: 'hsl(25 30% 30%)', lineHeight: 1.2 }}>{label}</span>
      {sub && <span style={{ fontSize: 10, color: CORAL, fontWeight: 600 }}>{sub}</span>}
    </div>
  );
}

// ── VisualDropdown ────────────────────────────────────────────────────────────
function VisualDropdown({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: 'hsl(25 35% 28%)' }}>{label}</label>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 10px', borderRadius: 7,
        border: '1px solid hsl(30 15% 85%)', background: 'hsl(30 20% 98%)', cursor: 'default',
      }}>
        <span style={{ fontSize: 11, color: 'hsl(25 12% 62%)' }}>{placeholder}</span>
        <ChevronDown size={11} style={{ color: 'hsl(25 12% 58%)', flexShrink: 0 }} />
      </div>
    </div>
  );
}
