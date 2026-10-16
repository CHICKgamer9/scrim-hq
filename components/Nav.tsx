"use client";
import Link from "next/link";
import { useState } from "react";
const links = [["Schedule", "/#schedule"], ["Rules", "/#rules"], ["Leaderboard", "/#leaderboard"], ["Seasons", "/#seasons"], ["Clips", "/#clips"], ["Partners", "/#sponsors"]];
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-black tracking-tight"><span className="text-gradient">WAVE</span> SCRIMS</Link>
        <div className="hidden gap-6 text-sm text-slate-300 md:flex">
          {links.map(([l, h]) => <Link key={h} href={h} className="hover:text-cyan-neon">{l}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://discord.gg/BkbMe3UK9f" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-gradient-to-r from-cyan-neon to-purple-neon px-4 py-2 text-sm font-bold text-black shadow-neon">Join Discord</a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-lg border border-line p-2 md:hidden">☰</button>
        </div>
      </nav>
      {open && <div className="grid gap-1 border-t border-line px-4 py-3 md:hidden">
        {links.map(([l, h]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="rounded px-2 py-2 hover:bg-panel">{l}</Link>)}
      </div>}
    </header>
  );
}
