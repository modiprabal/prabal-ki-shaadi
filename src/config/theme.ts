/**
 * Theme Token Configuration
 * ─────────────────────────
 * All semantic color tokens for dark & light modes.
 * These map directly to CSS custom properties (--theme-*).
 */

export const themes = {
  dark: {
    // Backgrounds
    bg:          "#0a0a0c",
    bgAlt:       "#08080a",
    bgAlt2:      "#06060a",
    bgAlt3:      "#050507",
    bgCard:      "#111113",
    bgSidebar:   "#0d0d10",

    // Text
    text:        "#f5f0e8",
    textMuted:   "#555",
    textDim:     "#333",
    textBody:    "#666",
    textBody2:   "#909090",

    // Accent (gold)
    accent:          "#b8965a",
    accentBright:    "rgba(184,150,90,0.85)",
    accentMid:       "rgba(184,150,90,0.7)",
    accentMuted:     "rgba(184,150,90,0.55)",
    accentSubtle:    "rgba(184,150,90,0.4)",
    accentFaint:     "rgba(184,150,90,0.3)",
    accentDeadline:  "rgba(184,150,90,0.8)",
    accentNav:       "rgba(245,240,232,0.35)",

    // Borders & dividers
    divider:     "rgba(245,240,232,0.06)",
    dividerGold: "#b8965a",

    // Event numbers
    eventNumber:   "rgba(184,150,90,0.6)",
    eventDate:     "rgba(245,240,232,0.6)",
    eventTime:     "rgba(184,150,90,0.65)",

    // Glow
    glowBg: "rgba(184,150,90,0.03)",

    // Map filter
    mapFilter: "invert(0.92) hue-rotate(180deg) saturate(0.3) brightness(0.6)",

    // Photo edge fades
    fadeColor: "#0a0a0c",

    // Button
    btnText: "#0a0a0c",

    // Selection
    selectionBg: "rgba(184,150,90,0.25)",
    selectionText: "#f5f0e8",

    // Noise overlay
    noiseOpacity: "0.025",
  },

  light: {
    // Backgrounds
    bg:          "#FAF6F0",
    bgAlt:       "#F5EDE3",
    bgAlt2:      "#F0E8DE",
    bgAlt3:      "#EBE3D9",
    bgCard:      "#FFFFFF",
    bgSidebar:   "#F0E8DE",

    // Text
    text:        "#2a2520",
    textMuted:   "#8a8580",
    textDim:     "#bbb5ad",
    textBody:    "#6b6560",
    textBody2:   "#7a7570",

    // Accent (darker gold for contrast on light)
    accent:          "#8a6d3b",
    accentBright:    "rgba(138,109,59,0.9)",
    accentMid:       "rgba(138,109,59,0.75)",
    accentMuted:     "rgba(138,109,59,0.55)",
    accentSubtle:    "rgba(138,109,59,0.35)",
    accentFaint:     "rgba(138,109,59,0.25)",
    accentDeadline:  "rgba(138,109,59,0.85)",
    accentNav:       "rgba(42,37,32,0.4)",

    // Borders & dividers
    divider:     "rgba(42,37,32,0.08)",
    dividerGold: "#8a6d3b",

    // Event numbers
    eventNumber:   "rgba(138,109,59,0.6)",
    eventDate:     "rgba(42,37,32,0.65)",
    eventTime:     "rgba(138,109,59,0.7)",

    // Glow
    glowBg: "rgba(138,109,59,0.04)",

    // Map filter (no invert for light)
    mapFilter: "saturate(0.8) brightness(0.95)",

    // Photo edge fades
    fadeColor: "#FAF6F0",

    // Button
    btnText: "#FAF6F0",

    // Selection
    selectionBg: "rgba(138,109,59,0.2)",
    selectionText: "#2a2520",

    // Noise overlay
    noiseOpacity: "0",
  },
} satisfies Record<string, Record<string, string>>;

export type ThemeMode = keyof typeof themes;
export type ThemeTokens = Record<string, string>;
