"use client";
import { useEffect, useMemo, useState } from "react";
import { scrimSlots, nextOccurrence, type Mode } from "@/lib/data";
const modes: ("All" | Mode)[] = ["All", "Solos", "Duos", "Trios"];
export default function Schedule() {
  const [mode, setMode] = useState<"All" | Mode>("All");
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const tz = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
  const rows = useMemo(() => {
    if (!now) return [];
    return scrimSlots.filter((s) => (mode === "All" || s.mode === mode))
      .map((s) => ({ s, at: nextOccurrence(s, now) })).sort((a, b) => a.at.getTime() - b.at.getTime());
  }, [now, mode]);
  const day = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" });
  const et = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
  const Filter = <T extends string>({ opts, val, set, color }: { opts: T[]; val: T; set: (v: T) => void; color: string }) => (
    <div className="flex flex-wrap gap-2">{opts.map((o) => (
      <button key={o} onClick={() => set(o)} className={`chip ${val === o ? `${color} text-black` : "border-line text-slate-300 hover:border-slate-500"}`}>{o}</button>
    ))}</div>
  );
  return (
    <section id="schedule" className="section">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="h2">Scrim <span className="text-gradient">Schedule</span></h2>
          <p className="mt-2 text-sm text-slate-400">NA scrims · times shown in your local timezone{tz && <> · <span className="text-cyan-neon">{tz}</span></>}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Filter opts={modes} val={mode} set={setMode} color="border-magenta-neon bg-magenta-neon" />
        </div>
      </div>
      <div className="mt-8 grid gap-3">
        {!now && <div className="card h-24 animate-pulse" />}
        {now && rows.length === 0 && <p className="card p-6 text-slate-400">No scrims match those filters.</p>}
        {rows.map(({ s, at }) => (
          <div key={s.id} className="card grid grid-cols-[auto_1fr] items-center gap-4 p-4 transition hover:border-purple-neon sm:grid-cols-[120px_1fr_auto]">
            <div className="text-center">
              <div className="text-xs uppercase text-slate-400">{day.format(at)}</div>
              <div className="font-display text-xl font-black text-cyan-neon">{time.format(at)}</div>
              <div className="text-[10px] text-slate-500">{et.format(at)} ET</div>
            </div>
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-cyan-neon/10 px-2 py-0.5 text-cyan-neon">{s.region}</span>
                <span className="rounded bg-magenta-neon/10 px-2 py-0.5 text-magenta-neon">{s.mode}</span>
                <span className="rounded bg-purple-neon/10 px-2 py-0.5 text-sky-300">{s.games} games</span>
              </div>
            </div>
            <a href="#" className="col-span-2 rounded-lg border border-purple-neon px-4 py-2 text-center text-sm font-semibold text-sky-200 hover:bg-purple-neon/20 sm:col-span-1">Register</a>
          </div>
        ))}
      </div>
    </section>
  );
}
