export type Region = "OCE" | "NA";
export type Mode = "Solos" | "Duos" | "Trios";
export type Tier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Elite" | "Champion" | "Unreal";

/** Weekly recurring scrim slots. Times stored in UTC (weekday 0=Sun). */
export interface ScrimSlot { id: string; name: string; region: Region; mode: Mode; utcDay: number; utcHour: number; utcMinute: number; games: number; minTier: Tier; }

export const scrimSlots: ScrimSlot[] = [
  { id: "oce-solo-mon", name: "Monday Grind", region: "OCE", mode: "Solos", utcDay: 1, utcHour: 8, utcMinute: 0, games: 5, minTier: "Bronze" },
  { id: "oce-duo-tue", name: "Duo Drop", region: "OCE", mode: "Duos", utcDay: 2, utcHour: 9, utcMinute: 0, games: 6, minTier: "Silver" },
  { id: "na-trio-tue", name: "Trio Tuesday", region: "NA", mode: "Trios", utcDay: 3, utcHour: 0, utcMinute: 30, games: 5, minTier: "Gold" },
  { id: "na-solo-wed", name: "Midweek Mayhem", region: "NA", mode: "Solos", utcDay: 4, utcHour: 1, utcMinute: 0, games: 6, minTier: "Bronze" },
  { id: "oce-trio-thu", name: "Thursday Trios", region: "OCE", mode: "Trios", utcDay: 4, utcHour: 8, utcMinute: 30, games: 5, minTier: "Platinum" },
  { id: "na-duo-fri", name: "Friday Night Duos", region: "NA", mode: "Duos", utcDay: 6, utcHour: 0, utcMinute: 0, games: 6, minTier: "Silver" },
  { id: "oce-solo-sat", name: "Saturday Showdown", region: "OCE", mode: "Solos", utcDay: 6, utcHour: 6, utcMinute: 0, games: 8, minTier: "Diamond" },
  { id: "na-trio-sat", name: "Weekend Warzone", region: "NA", mode: "Trios", utcDay: 0, utcHour: 1, utcMinute: 0, games: 6, minTier: "Gold" },
  { id: "oce-duo-sun", name: "Sunday Sweats", region: "OCE", mode: "Duos", utcDay: 0, utcHour: 7, utcMinute: 0, games: 6, minTier: "Elite" },
];

const WEEK = 7 * 24 * 3600 * 1000;
/** Next start Date (UTC-based) for a slot after `from`. */
export function nextOccurrence(s: ScrimSlot, from: Date = new Date()): Date {
  const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), s.utcHour, s.utcMinute));
  d.setUTCDate(d.getUTCDate() + ((s.utcDay - d.getUTCDay() + 7) % 7));
  if (d.getTime() <= from.getTime()) return new Date(d.getTime() + WEEK);
  return d;
}

export const tiers: { name: Tier; min: number; color: string; glow: string }[] = [
  { name: "Bronze", min: 0, color: "from-amber-700 to-amber-900", glow: "#b45309" },
  { name: "Silver", min: 300, color: "from-slate-300 to-slate-500", glow: "#94a3b8" },
  { name: "Gold", min: 600, color: "from-yellow-300 to-amber-500", glow: "#facc15" },
  { name: "Platinum", min: 900, color: "from-teal-200 to-cyan-500", glow: "#5eead4" },
  { name: "Diamond", min: 1200, color: "from-sky-300 to-blue-600", glow: "#38bdf8" },
  { name: "Elite", min: 1500, color: "from-violet-400 to-purple-700", glow: "#8b5cf6" },
  { name: "Champion", min: 1800, color: "from-pink-400 to-rose-600", glow: "#ff2bd6" },
  { name: "Unreal", min: 2100, color: "from-cyan-300 via-purple-500 to-fuchsia-500", glow: "#22e5ff" },
];
export function tierFor(points: number): Tier {
  return [...tiers].reverse().find((t) => points >= t.min)!.name;
}

export interface Player { tag: string; region: Region; points: number; wins: number; kills: number; matches: number; avgPlace: number; kd: number; team?: string; bio: string; achievements: string[]; recent: { scrim: string; place: number; kills: number; pts: number }[]; }

const mk = (tag: string, region: Region, points: number, wins: number, kills: number, matches: number, team?: string): Player => ({
  tag, region, points, wins, kills, matches, team,
  avgPlace: Math.max(2, Math.round((60 - points / 50) * 10) / 10),
  kd: Math.round((kills / Math.max(1, matches - wins)) * 100) / 100,
  bio: `${region} grinder. Box-fighting main, rotates early, never misses a scrim.`,
  achievements: ["first-win", "10-elims", ...(wins > 20 ? ["hot-streak"] : []), ...(points > 1800 ? ["champion"] : []), ...(kills > 500 ? ["reaper"] : []), "ironman"],
  recent: [
    { scrim: "Saturday Showdown", place: 1 + (wins % 5), kills: 4 + (kills % 7), pts: 42 },
    { scrim: "Thursday Trios", place: 3 + (wins % 9), kills: 2 + (kills % 5), pts: 28 },
    { scrim: "Duo Drop", place: 2 + (kills % 6), kills: 6 + (wins % 4), pts: 35 },
    { scrim: "Monday Grind", place: 7 + (wins % 11), kills: 1 + (kills % 4), pts: 14 },
  ],
});

export const players: Player[] = [
  mk("VoltReaper", "OCE", 2284, 41, 812, 160, "Neon Syndicate"),
  mk("zyphr", "NA", 2190, 38, 744, 158, "Static Wolves"),
  mk("KiwiCrank", "OCE", 1965, 33, 690, 151, "Neon Syndicate"),
  mk("Lumen.exe", "NA", 1880, 29, 655, 149),
  mk("BoxedByMango", "OCE", 1712, 26, 598, 144, "Tidebreak"),
  mk("Hexadrop", "NA", 1570, 22, 540, 140, "Static Wolves"),
  mk("SoftAimSally", "OCE", 1430, 19, 501, 138),
  mk("rotate_late", "NA", 1295, 16, 462, 131, "Ghost Pixel"),
  mk("PixelPiranha", "OCE", 1105, 13, 398, 126, "Tidebreak"),
  mk("NoScopeNoodle", "NA", 960, 10, 344, 119),
  mk("Drift9", "OCE", 720, 7, 281, 102, "Ghost Pixel"),
  mk("CobaltCub", "NA", 455, 4, 190, 88),
  mk("tinyedits", "OCE", 210, 1, 96, 54),
];
export const getPlayer = (tag: string) => players.find((p) => p.tag.toLowerCase() === decodeURIComponent(tag).toLowerCase());

export const achievementInfo: Record<string, { label: string; icon: string; desc: string }> = {
  "first-win": { label: "First Crown", icon: "👑", desc: "Won a scrim lobby" },
  "10-elims": { label: "Double Digits", icon: "🎯", desc: "10+ elims in a single game" },
  "hot-streak": { label: "Hot Streak", icon: "🔥", desc: "3 wins in one scrim night" },
  champion: { label: "Champion Club", icon: "🏆", desc: "Reached Champion tier" },
  reaper: { label: "Reaper", icon: "💀", desc: "500+ career scrim elims" },
  ironman: { label: "Ironman", icon: "🛡️", desc: "Played every scrim for 4 weeks" },
};

export interface Match { a: string; b: string; sa: number; sb: number; }
export const bracket: { round: string; matches: Match[] }[] = [
  { round: "Quarterfinals", matches: [
    { a: "Neon Syndicate", b: "Ghost Pixel", sa: 312, sb: 241 },
    { a: "Tidebreak", b: "Lag Switch Lads", sa: 287, sb: 266 },
    { a: "Static Wolves", b: "Bushcampers", sa: 330, sb: 198 },
    { a: "Void Rangers", b: "Third Party Co.", sa: 254, sb: 271 },
  ]},
  { round: "Semifinals", matches: [
    { a: "Neon Syndicate", b: "Tidebreak", sa: 298, sb: 276 },
    { a: "Static Wolves", b: "Third Party Co.", sa: 315, sb: 240 },
  ]},
  { round: "Grand Final", matches: [{ a: "Neon Syndicate", b: "Static Wolves", sa: 0, sb: 0 }] },
];

export const hallOfFame = [
  { season: "Season 4", champ: "Static Wolves", mvp: "zyphr", note: "Undefeated in finals week" },
  { season: "Season 3", champ: "Neon Syndicate", mvp: "VoltReaper", note: "Record 31-elim final" },
  { season: "Season 2", champ: "Tidebreak", mvp: "BoxedByMango", note: "Comeback from 8th" },
  { season: "Season 1", champ: "Ghost Pixel", mvp: "rotate_late", note: "The OG champs" },
];

export const clips = [
  { id: "c1", title: "1v3 box fight in storm surge", by: "VoltReaper", g: "from-cyan-500 via-blue-700 to-purple-900", len: "0:24" },
  { id: "c2", title: "Zero-build double piece control", by: "KiwiCrank", g: "from-fuchsia-500 via-purple-700 to-indigo-900", len: "0:31" },
  { id: "c3", title: "Moving-zone sniper snipe", by: "Lumen.exe", g: "from-emerald-400 via-teal-700 to-slate-900", len: "0:18" },
  { id: "c4", title: "Clutch end-game tarp rotate", by: "SoftAimSally", g: "from-orange-400 via-rose-600 to-purple-900", len: "0:42" },
];
