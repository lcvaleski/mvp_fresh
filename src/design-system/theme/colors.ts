export const colors = {
  // Primary colors
  primary: {
    nocturne: '#2A1F14',
    eclipse: '#57494F',
    blueberry: '#7C6C63',
    orchid: '#A96A7D',
    white: '#FFFFFF',
  },
  // Secondary colors
  secondary: {
    fuschia: '#C47878',
    periwinkle: '#A0B2C8',
    coral: '#B3583E',
    lavender: '#C6B0B8',
    buttercream: '#F1DDBD',
  },
  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
  },
  // Semantic colors
  semantic: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
  // Background colors
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#121212',
  },
} as const;

export type ColorKeys = keyof typeof colors;