import Countdown from "@/components/Countdown";
import Schedule from "@/components/Schedule";
import Leaderboard from "@/components/Leaderboard";
import ClipVote from "@/components/ClipVote";
import { hallOfFame, players } from "@/lib/data";

const rules = [
  "Be in the Discord and verified with your in-game name before check-in.",
  "Check in 15 minutes before start. Late check-ins forfeit their slot.",
  "No teaming, stream sniping or third-party cheats. Instant ban.",
  "Custom key and lobby codes are posted in #scrim-codes only.",
  "Disputes go to #ref-desk with a clip within 30 minutes of the game.",
  "Be a good sport. Toxicity in VC or chat gets you a timeout.",
];
const steps = [
  ["01", "Join the Discord", "Hit Join Discord and accept the rules in #welcome."],
  ["02", "Verify your account", "Link your in-game name and grab the NA scrims role. No rank needed."],
  ["03", "Register for a scrim", "React in #signups or register from the schedule above."],
  ["04", "Check in & drop", "Check in 15 min early, get the code, and send it."],
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden grid-bg">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-neon/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-magenta-neon/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="chip inline-block border-cyan-neon/50 text-cyan-neon">Chapter 7 Season 4 live · NA</p>
            <h1 className="mt-5 font-display text-5xl font-black uppercase leading-[.95] tracking-tight sm:text-7xl">Drop in.<br /><span className="text-gradient">Level up.</span></h1>
            <p className="mt-5 max-w-lg text-lg text-slate-300">Daily Fortnite scrims for players who want real comp practice: open lobbies, live leaderboards, seasons and bragging rights.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://discord.gg/BkbMe3UK9f" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-gradient-to-r from-cyan-neon via-purple-neon to-magenta-neon px-6 py-3 font-bold text-black shadow-neon transition hover:scale-[1.03]">Join Discord</a>
              <a href="#schedule" className="rounded-xl border border-line px-6 py-3 font-semibold hover:border-cyan-neon">View schedule</a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[["4.2k", "Members"], ["9", "Scrims / week"], ["5", "Seasons"]].map(([v, l]) => (
                <div key={l}><dt className="font-display text-3xl font-black text-white">{v}</dt><dd className="text-xs uppercase tracking-wider text-slate-400">{l}</dd></div>
              ))}
            </dl>
          </div>
          <Countdown />
        </div>
      </section>

      <Schedule />

      <section id="rules" className="section">
        <h2 className="h2">Rules &amp; <span className="text-gradient">How to Join</span></h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ol className="grid gap-3">
            {steps.map(([n, t, d]) => (
              <li key={n} className="card flex gap-4 p-4">
                <span className="font-display text-2xl font-black text-magenta-neon">{n}</span>
                <div><p className="font-semibold">{t}</p><p className="text-sm text-slate-400">{d}</p></div>
              </li>
            ))}
          </ol>
          <div className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-neon">Scrim rules</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-300">
              {rules.map((r) => <li key={r} className="flex gap-3"><span className="text-cyan-neon">▸</span>{r}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <Leaderboard />

      <section id="seasons" className="section">
        <h2 className="h2">Hall of <span className="text-gradient">Fame</span></h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hallOfFame.map((h) => (
            <div key={h.season} className="card relative overflow-hidden p-5">
              <div className="absolute -right-4 -top-4 text-7xl opacity-10">🏆</div>
              <p className="text-xs uppercase tracking-widest text-slate-400">{h.season}</p>
              <p className="mt-1 font-display text-xl font-bold text-gradient">{h.champ}</p>
              <p className="mt-3 text-sm">MVP <span className="font-semibold text-cyan-neon">{h.mvp}</span></p>
              <p className="text-xs text-slate-500">{h.note}</p>
            </div>
          ))}
        </div>
      </section>

      <ClipVote />

      <section id="sponsors" className="section">
        <h2 className="h2">Our <span className="text-gradient">Partners</span></h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {["Title partner", "Peripherals", "Energy", "Hosting"].map((s) => (
            <div key={s} className="card grid aspect-[3/2] place-items-center border-dashed p-4 text-center">
              <div><p className="font-display text-lg font-bold text-slate-300">Your brand here</p><p className="text-xs uppercase tracking-wider text-slate-500">{s} slot</p></div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-400">Interested in reaching 4,000+ competitive players? Message a mod in Discord.</p>
      </section>
    </>
  );
}
