"use client";
import { useState } from "react";
import { clips } from "@/lib/data";
export default function ClipVote() {
  const [votes, setVotes] = useState<Record<string, number>>({ c1: 128, c2: 96, c3: 74, c4: 111 });
  const [mine, setMine] = useState<string | null>(null);
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const vote = (id: string) => {
    setVotes((v) => { const n = { ...v }; if (mine) n[mine]--; if (mine !== id) n[id]++; return n; });
    setMine((m) => (m === id ? null : id));
  };
  const leader = Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];
  return (
    <section id="clips" className="section">
      <h2 className="h2">Clip of the <span className="text-gradient">Week</span></h2>
      <p className="mt-2 text-sm text-slate-400">One vote per player. Voting closes Sunday night. Winner gets pinned in Discord.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clips.map((c) => {
          const pct = Math.round((votes[c.id] / total) * 100);
          return (
            <div key={c.id} className={`card overflow-hidden transition ${mine === c.id ? "border-cyan-neon shadow-neon" : ""}`}>
              <div className={`relative grid aspect-video place-items-center bg-gradient-to-br ${c.g}`}>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-black/40 text-xl backdrop-blur">▶</span>
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 text-xs font-semibold uppercase tracking-wider">Placeholder</span>
                <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 text-xs">{c.len}</span>
                {leader === c.id && <span className="absolute left-2 top-2 rounded bg-magenta-neon px-2 py-0.5 text-[10px] font-bold uppercase text-black">Leading</span>}
              </div>
              <div className="p-4">
                <p className="font-semibold leading-tight">{c.title}</p>
                <p className="text-xs text-slate-400">by [player]</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded bg-line"><div className="h-full bg-gradient-to-r from-cyan-neon to-magenta-neon transition-all" style={{ width: `${pct}%` }} /></div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs tabular-nums text-slate-400">{votes[c.id]} votes · {pct}%</span>
                  <button onClick={() => vote(c.id)} className={`chip ${mine === c.id ? "border-cyan-neon bg-cyan-neon text-black" : "border-line hover:border-cyan-neon"}`}>{mine === c.id ? "Voted ✓" : "Vote"}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
