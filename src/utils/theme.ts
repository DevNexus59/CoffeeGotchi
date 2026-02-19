export const COLORS = {
  background: "#2A7BA8",
  card: "#6BBF59",

  // Bois du sol
  wood: "#C4A265",
  woodDark: "#A07D4A",

  // Texte
  textPrimary: "#FFFFFF",
  textSecondary: "#E0F0E0",
  textDark: "#2D3B2D",

  // Boutons d'action
  coffee: "#5B8C3E",
  herbalTea: "#E8C84A",

  // États des animaux
  stateNormal: "#6BBF59",
  stateCoffee: "#D4913B",
  stateStone: "#8A8A7A",
  stateDead: "#C0524A",
} as const;

export const FONTS = {
  title: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  label: {
    fontSize: 12,
    textTransform: "capitalize" as const,
    color: COLORS.textPrimary,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const RADIUS = {
  md: 12,
  lg: 24,
  full: 999,  // pour faire un cercle
} as const;