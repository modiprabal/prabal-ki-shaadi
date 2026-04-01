/**
 * Saffron Silk – Flat Color Token Configuration
 * ──────────────────────────────────────────────
 * Single-mode editorial wedding palette.
 * No dark/light toggling — warm cream base throughout.
 */

export const colors = {
  // Surfaces (layered from lightest to deepest)
  background: "#fff8ef",
  surface: "#fff8ef",
  surfaceBright: "#fff8ef",
  surfaceDim: "#e1d9cb",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#fbf3e4",
  surfaceContainer: "#f5edde",
  surfaceContainerHigh: "#efe7d9",
  surfaceContainerHighest: "#e9e2d3",

  // Primary (Saffron Red)
  primary: "#af101a",
  primaryContainer: "#d32f2f",
  onPrimary: "#ffffff",
  primaryFixed: "#ffdad6",
  primaryFixedDim: "#ffb3ac",
  onPrimaryFixed: "#410003",

  // Secondary (Amber Gold)
  secondary: "#8f4e00",
  secondaryContainer: "#ff8f00",
  onSecondary: "#ffffff",
  secondaryFixed: "#ffdcc2",
  secondaryFixedDim: "#ffb77a",
  onSecondaryFixed: "#2e1500",

  // Tertiary (Marigold)
  tertiary: "#705312",
  tertiaryContainer: "#8b6b2a",
  onTertiary: "#ffffff",
  tertiaryFixed: "#ffdea5",
  tertiaryFixedDim: "#e9c176",

  // Text
  onSurface: "#1e1b13",
  onSurfaceVariant: "#5b403d",
  onBackground: "#1e1b13",

  // Borders & outlines
  outline: "#8f6f6c",
  outlineVariant: "#e4beba",

  // Inverse
  inverseSurface: "#343026",
  inverseOnSurface: "#f8f0e1",
  inversePrimary: "#ffb3ac",

  // Error
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onError: "#ffffff",
} as const;

export type ColorToken = keyof typeof colors;
