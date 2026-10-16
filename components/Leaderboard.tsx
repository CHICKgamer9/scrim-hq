"use client";
import Link from "next/link";
import { useState } from "react";
import { players } from "@/lib/data";
type Key = "points" | "wins" | "kills";
export default function Leaderboard() {
  const [sort, setSort] = useState<Key>("points");
  const rows = [...players].sort((a, b) => b[sort] - a[sort]);
  return (
    <section id="leaderboard" className="section">
      <h2 className="h2">Season 5 <span className="text-gradient">Leaderboard</span></h2>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-line text-left text-xs uppercase tracking-wider text-slate-400">
            <tr><th className="p-3">#</th><th className="p-3">Player</th>
              {(["points", "wins", "kills"] as Key[]).map((k) => (
                <th key={k} className="p-3 text-right"><button onClick={() => setSort(k)} className={sort === k ? "text-cyan-neon" : "hover:text-white"}>{k}{sort === k ? " ▾" : ""}</button></th>
              ))}</tr>
          </thead>
          <tbody>
            {rows.map((p, i) => (
              <tr key={p.tag} className="border-b border-line/60 last:border-0 hover:bg-purple-neon/5">
                <td className={`p-3 font-display font-black ${i < 3 ? "text-magenta-neon" : "text-slate-500"}`}>{i + 1}</td>
                <td className="p-3"><Link href={`/players/${encodeURIComponent(p.tag)}`} className="font-semibold hover:text-cyan-neon">{p.tag}</Link><div className="text-xs text-slate-500">{p.region}{p.team && ` · ${p.team}`}</div></td>
                <td className="p-3 text-right font-bold tabular-nums">{p.points.toLocaleString()}</td>
                <td className="p-3 text-right tabular-nums">{p.wins}</td>
                <td className="p-3 text-right tabular-nums">{p.kills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">Points: Win 25 · Top 5 15 · Top 10 8 · 2 per elim. Tap a player to view their profile.</p>
    </section>
  );
}
