import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { players, getPlayer, achievementInfo } from "@/lib/data";

export function generateStaticParams() { return players.map((p) => ({ tag: p.tag })); }
export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
  const p = getPlayer(params.tag);
  return { title: p ? `${p.tag} · Player Profile` : "Player not found", description: p ? `${p.tag}'s Wave Scrims stats: ${p.points} pts, ${p.wins} wins, ${p.kills} elims.` : undefined };
}

export default function PlayerPage({ params }: { params: { tag: string } }) {
  const p = getPlayer(params.tag);
  if (!p) notFound();
  const rank = [...players].sort((a, b) => b.points - a.points).findIndex((x) => x.tag === p.tag) + 1;
  const stats = [["Points", p.points.toLocaleString()], ["Wins", p.wins], ["Elims", p.kills], ["Matches", p.matches], ["K/D", p.kd.toFixed(2)], ["Win %", `${((p.wins / p.matches) * 100).toFixed(1)}%`], ["Avg place", p.avgPlace], ["Rank", `#${rank}`]];
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <Link href="/#leaderboard" className="text-sm text-slate-400 hover:text-cyan-neon">← Leaderboard</Link>
        <div className="card mt-4 flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-neon via-purple-neon to-magenta-neon font-display text-4xl font-black text-black">{p.tag.slice(0, 2).toUpperCase()}</div>
          <div className="flex-1">
            <h1 className="font-display text-4xl font-black">{p.tag}</h1>
            <p className="text-sm text-slate-400">{p.region}{p.team && <> · <span className="text-sky-300">{p.team}</span></>}</p>
            <p className="mt-2 text-sm text-slate-300">{p.bio}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([l, v]) => <div key={String(l)} className="card p-4"><p className="text-xs uppercase tracking-wider text-slate-400">{l}</p><p className="font-display text-2xl font-black text-cyan-neon">{v}</p></div>)}
        </div>
        <h2 className="mt-10 font-display text-2xl font-bold uppercase">Achievements</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {p.achievements.map((a) => { const i = achievementInfo[a]; return (
            <div key={a} className="card flex items-center gap-3 p-4">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-purple-neon bg-purple-neon/15 text-2xl shadow-[0_0_16px_rgba(14,165,233,.4)]">{i.icon}</span>
              <div><p className="font-semibold">{i.label}</p><p className="text-xs text-slate-400">{i.desc}</p></div>
            </div>); })}
        </div>
        <h2 className="mt-10 font-display text-2xl font-bold uppercase">Recent scrims</h2>
        <div className="card mt-4 divide-y divide-line">
          {p.recent.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 text-sm">
              <span>{r.scrim}</span>
              <span className="flex gap-4 tabular-nums text-slate-400"><span className={r.place === 1 ? "font-bold text-magenta-neon" : ""}>#{r.place}</span><span>{r.kills} elims</span><span className="text-cyan-neon">+{r.pts}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
