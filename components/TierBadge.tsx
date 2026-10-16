import { tiers, type Tier } from "@/lib/data";
const sym: Record<Tier, string> = { Bronze: "I", Silver: "II", Gold: "III", Platinum: "IV", Diamond: "◆", Elite: "★", Champion: "♛", Unreal: "∞" };
export default function TierBadge({ tier, size = "sm" }: { tier: Tier; size?: "sm" | "lg" }) {
  const t = tiers.find((x) => x.name === tier)!;
  const box = size === "lg" ? "h-14 w-14 text-lg" : "h-7 w-7 text-[10px]";
  return (
    <span className="inline-flex items-center gap-2" title={`${tier} tier`}>
      <span className={`grid ${box} place-items-center bg-gradient-to-br ${t.color} font-black text-black [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]`} style={{ filter: `drop-shadow(0 0 6px ${t.glow})` }}>{sym[tier]}</span>
      <span className={`${size === "lg" ? "text-base" : "text-xs"} font-semibold uppercase tracking-wider`} style={{ color: t.glow }}>{tier}</span>
    </span>
  );
}
