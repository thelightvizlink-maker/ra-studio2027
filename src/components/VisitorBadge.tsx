import { useEffect, useState } from 'react';
import AnimatedCounter from './AnimatedCounter';

const VISITOR_API = import.meta.env.VITE_VISITOR_API;
const FALLBACK_BASE = 1000;

const getWeekKey = () => {
  const now = new Date();
  // ISO week number
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = ((now as any) - (oneJan as any)) / 86400000 + 1;
  const week = Math.ceil((dayOfYear + oneJan.getDay()) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
};

const VisitorBadge = () => {
  const [count, setCount] = useState<number | null>(null);
  const [visitorId, setVisitorId] = useState<string>('----');
  const freeWebappSlots = 10; // manually adjust for first 10 free webapp builds
  const discountedAppSlots = 50; // manually adjust for first 50 mobile app discounts

  useEffect(() => {
    const weekKey = getWeekKey();
    const countKey = `ra-visitor-count-${weekKey}`;
    const idKey = `ra-visitor-id-${weekKey}`;

    const hydrateFromLocal = () => {
      const storedCount = localStorage.getItem(countKey);
      const storedId = localStorage.getItem(idKey);
      if (storedCount) setCount(Number(storedCount));
      if (storedId) setVisitorId(storedId);
      return { storedCount, storedId };
    };

    const persist = (newCount: number, newId: string) => {
      setCount(newCount);
      setVisitorId(newId);
      localStorage.setItem(countKey, String(newCount));
      localStorage.setItem(idKey, newId);
    };

    const { storedCount, storedId } = hydrateFromLocal();

    const recordVisit = async () => {
      // If already have this week ID, avoid double increment
      if (storedId && storedCount) return;

      // Attempt server-side counter if configured
      if (VISITOR_API) {
        try {
          const res = await fetch(VISITOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ week: weekKey }),
          });
          const data = await res.json();
          const serverCount = Number(data.count ?? data.total ?? data.thisWeek ?? data.visitor) || FALLBACK_BASE;
          const yourNumber = Number(data.yourNumber ?? serverCount) || serverCount;
          const paddedId = String(yourNumber).padStart(4, '0');
          persist(serverCount, paddedId);
          return;
        } catch (error) {
          // fall through to local fallback
        }
      }

      // Local-only fallback (per-browser, not global)
      const next = (Number(storedCount) || FALLBACK_BASE) + 1;
      const paddedId = String(next).padStart(4, '0');
      persist(next, paddedId);
    };

    recordVisit();
  }, []);

  return (
    <div className="w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-4 space-y-2 pt-4 pb-2">
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/8 dark:bg-black/20 px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md">
          <span className="uppercase tracking-[0.12em] text-muted-foreground">This week</span>
          <AnimatedCounter end={count ?? FALLBACK_BASE} decimals={0} className="text-primary font-bold" />
          <span className="text-muted-foreground">visitors</span>
          <span className="h-5 w-px bg-border" aria-hidden />
          <span>You are visitor</span>
          <span className="font-mono text-sm bg-background/70 px-2 py-1 rounded-md border border-border">
            {visitorId}
          </span>
        </div>

        <div className="rounded-2xl border border-orange-400/40 bg-white/12 dark:bg-black/25 px-5 py-4 shadow-[0_10px_35px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 text-center sm:text-left sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm sm:text-base font-semibold text-orange-100 drop-shadow-[0_0_8px_rgba(255,138,76,0.7)]">
              <span className="mr-2 font-black uppercase tracking-[0.16em] text-orange-300">Just Re-Launched Tech AI Services & Products</span>
              <span className="text-orange-200">
                Investing in freelancers, solopreneurs, and founders with 5–7 page mobile‑first sites + SEO & AI-assisted content.
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <BadgeNumber label="Free Webapp Spots" value={freeWebappSlots} />
              <BadgeNumber label="50% Off Mobile Apps" value={discountedAppSlots} />
            </div>
          </div>
          <p className="mt-1 text-xs text-orange-100/80 text-center sm:text-left">
            Manually update the slot numbers as bookings fill. First 10 get full webapp build free (testimonials for relaunch). First 50 get 50% off mobile/e‑commerce app with quarterly support for 1 year.
          </p>
        </div>
      </div>
    </div>
  );
};

const BadgeNumber = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 border border-orange-500/60 shadow-[0_0_12px_rgba(255,140,64,0.4)]">
    <span className="text-[11px] uppercase tracking-[0.14em] text-orange-200">{label}</span>
    <span
      className="text-lg font-mono text-orange-300 px-2 py-1 rounded-md"
      style={{
        textShadow:
          '0 0 6px rgba(255,140,64,0.85), 0 0 16px rgba(255,200,120,0.45)',
        letterSpacing: '0.08em',
      }}
    >
      {String(value).padStart(2, '0')}
    </span>
  </div>
);

export default VisitorBadge;
