import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: { extend: {
    colors: { bg: "#04101a", panel: "#0a1a2a", line: "#16324a", cyan: { neon: "#22e5ff" }, magenta: { neon: "#2563eb" }, purple: { neon: "#0ea5e9" } },
    fontFamily: { display: ["var(--font-display)", "system-ui", "sans-serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    boxShadow: { neon: "0 0 24px rgba(34,229,255,.35)", pink: "0 0 24px rgba(37,99,235,.35)" },
  } },
  plugins: [],
};
export default config;
