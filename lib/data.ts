export type Region = "NA";
export type Mode = "Solos" | "Duos" | "Trios";

/** Weekly recurring scrim slots. Times stored in UTC (weekday 0=Sun). */
export interface ScrimSlot { id: string; name: string; region: Region; mode: Mode; utcDay: number; utcHour: number; utcMinute: number; games: number; }

export const scrimSlots: ScrimSlot[] = [
  { id: "na-solo-mon", name: "Monday Grind", region: "NA", mode: "Solos", utcDay: 2, utcHour: 0, utcMinute: 0, games: 5 },
  { id: "na-duo-tue", name: "Duo Drop", region: "NA", mode: "Duos", utcDay: 3, utcHour: 2, utcMinute: 0, games: 6 },
  { id: "na-trio-tue", name: "Trio Tuesday", region: "NA", mode: "Trios", utcDay: 3, utcHour: 0, utcMinute: 30, games: 5 },
  { id: "na-solo-wed", name: "Midweek Mayhem", region: "NA", mode: "Solos", utcDay: 4, utcHour: 1, utcMinute: 0, games: 6 },
  { id: "na-trio-thu", name: "Thursday Trios", region: "NA", mode: "Trios", utcDay: 5, utcHour: 0, utcMinute: 30, games: 5 },
  { id: "na-duo-fri", name: "Friday Night Duos", region: "NA", mode: "Duos", utcDay: 6, utcHour: 0, utcMinute: 0, games: 6 },
  { id: "na-solo-sat", name: "Saturday Showdown", region: "NA", mode: "Solos", utcDay: 0, utcHour: 3, utcMinute: 0, games: 8 },
  { id: "na-trio-sat", name: "Weekend Warzone", region: "NA", mode: "Trios", utcDay: 0, utcHour: 1, utcMinute: 0, games: 6 },
  { id: "na-duo-sun", name: "Sunday Sweats", region: "NA", mode: "Duos", utcDay: 1, utcHour: 0, utcMinute: 0, games: 6 },
];

const WEEK = 7 * 24 * 3600 * 1000;
/** Next start Date (UTC-based) for a slot after `from`. */
export function nextOccurrence(s: ScrimSlot, from: Date = new Date()): Date {
  const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), s.utcHour, s.utcMinute));
  d.setUTCDate(d.getUTCDate() + ((s.utcDay - d.getUTCDay() + 7) % 7));
  if (d.getTime() <= from.getTime()) return new Date(d.getTime() + WEEK);
  return d;
}


export interface Player { tag: string; region: Region; points: number; wins: number; kills: number; matches: number; avgPlace: number; kd: number; team?: string; bio: string; achievements: string[]; recent: { scrim: string; place: number; kills: number; pts: number }[]; }

const mk = (tag: string, region: Region, points: number, wins: number, kills: number, matches: number, team?: string): Player => ({
  tag, region, points, wins, kills, matches, team,
  avgPlace: Math.max(2, Math.round((60 - points / 50) * 10) / 10),
  kd: Math.round((kills / Math.max(1, matches - wins)) * 100) / 100,
  bio: `${region} grinder. Box-fighting main, rotates early, never misses a scrim.`,
  achievements: ["first-win", "10-elims", ...(wins > 20 ? ["hot-streak"] : []), ...(kills > 500 ? ["reaper"] : []), "ironman"],
  recent: [
    { scrim: "Saturday Showdown", place: 1 + (wins % 5), kills: 4 + (kills % 7), pts: 42 },
    { scrim: "Thursday Trios", place: 3 + (wins % 9), kills: 2 + (kills % 5), pts: 28 },
    { scrim: "Duo Drop", place: 2 + (kills % 6), kills: 6 + (wins % 4), pts: 35 },
    { scrim: "Monday Grind", place: 7 + (wins % 11), kills: 1 + (kills % 4), pts: 14 },
  ],
});

export const players: Player[] = [
  mk("VoltReaper", "NA", 2284, 41, 812, 160, "Neon Syndicate"),
  mk("zyphr", "NA", 2190, 38, 744, 158, "Static Wolves"),
  mk("KyroCrank", "NA", 1965, 33, 690, 151, "Neon Syndicate"),
  mk("Lumen.exe", "NA", 1880, 29, 655, 149),
  mk("BoxedByMango", "NA", 1712, 26, 598, 144, "Tidebreak"),
  mk("Hexadrop", "NA", 1570, 22, 540, 140, "Static Wolves"),
  mk("SoftAimSally", "NA", 1430, 19, 501, 138),
  mk("rotate_late", "NA", 1295, 16, 462, 131, "Ghost Pixel"),
  mk("PixelPiranha", "NA", 1105, 13, 398, 126, "Tidebreak"),
  mk("NoScopeNoodle", "NA", 960, 10, 344, 119),
  mk("Drift9", "NA", 720, 7, 281, 102, "Ghost Pixel"),
  mk("CobaltCub", "NA", 455, 4, 190, 88),
  mk("tinyedits", "NA", 210, 1, 96, 54),
];
export const getPlayer = (tag: string) => players.find((p) => p.tag.toLowerCase() === decodeURIComponent(tag).toLowerCase());

export const achievementInfo: Record<string, { label: string; icon: string; desc: string }> = {
  "first-win": { label: "First Crown", icon: "👑", desc: "Won a scrim lobby" },
  "10-elims": { label: "Double Digits", icon: "🎯", desc: "10+ elims in a single game" },
  "hot-streak": { label: "Hot Streak", icon: "🔥", desc: "3 wins in one scrim night" },
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
  { id: "c1", title: "Placeholder", by: "VoltReaper", g: "from-cyan-500 via-blue-700 to-purple-900", len: "0:24" },
  { id: "c2", title: "Placeholder", by: "KyroCrank", g: "from-fuchsia-500 via-purple-700 to-indigo-900", len: "0:31" },
  { id: "c3", title: "Placeholder", by: "Lumen.exe", g: "from-emerald-400 via-teal-700 to-slate-900", len: "0:18" },
  { id: "c4", title: "Placeholder", by: "SoftAimSally", g: "from-orange-400 via-rose-600 to-purple-900", len: "0:42" },
];
