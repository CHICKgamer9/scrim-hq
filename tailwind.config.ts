import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: { extend: {
    colors: { bg: "#07060d", panel: "#100e1c", line: "#231f3a", cyan: { neon: "#22e5ff" }, magenta: { neon: "#ff2bd6" }, purple: { neon: "#8b5cf6" } },
    fontFamily: { display: ["var(--font-display)", "system-ui", "sans-serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    boxShadow: { neon: "0 0 24px rgba(34,229,255,.35)", pink: "0 0 24px rgba(255,43,214,.35)" },
  } },
  plugins: [],
};
export default config;
