"use client";
import { useEffect, useState } from "react";
import { scrimSlots, nextOccurrence } from "@/lib/data";
function nextScrim(now: Date) {
  return scrimSlots.map((s) => ({ s, at: nextOccurrence(s, now) })).sort((a, b) => a.at.getTime() - b.at.getTime())[0];
}
export default function Countdown() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  const n = now ? nextScrim(now) : null;
  const diff = n && now ? n.at.getTime() - now.getTime() : 0;
  const parts = [["Days", Math.floor(diff / 864e5)], ["Hrs", Math.floor(diff / 36e5) % 24], ["Min", Math.floor(diff / 6e4) % 60], ["Sec", Math.floor(diff / 1e3) % 60]] as const;
  return (
    <div className="card p-5 shadow-pink">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-magenta-neon">● Next scrim</p>
      <p className="mt-1 font-display text-xl font-bold">{n ? `${n.s.name} · ${n.s.region} ${n.s.mode}` : "Loading…"}</p>
      <p className="text-sm text-slate-400">{n ? new Intl.DateTimeFormat(undefined, { weekday: "long", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(n.at) : "\u00a0"}</p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {parts.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-line bg-bg/60 py-3 text-center">
            <div className="font-display text-3xl font-black tabular-nums text-cyan-neon">{n ? String(v).padStart(2, "0") : "--"}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
