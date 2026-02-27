/**
 * Centralized Color System
 *
 * All colors used in the app are defined here.
 * Modify these values to change the app's color scheme.
 */

export const theme = {
  colors: {
    // Primary accent (Coral - playful & inviting)
    accent: '#FF6B6B',
    accentHover: '#E85555',
    accentLight: 'rgba(255, 107, 107, 0.15)',
    accentBg: 'rgba(255, 107, 107, 0.1)',
    accentBorder: 'rgba(255, 107, 107, 0.2)',

    // Secondary accent (Blue - for alternative actions)
    secondary: '#5B67F1',
    secondaryBg: 'rgba(91, 103, 241, 0.1)',
    secondaryBorder: 'rgba(91, 103, 241, 0.3)',

    // Backgrounds (light & airy)
    background: '#FAFBFC',
    surface1: '#FFFFFF',
    surface2: '#F5F7FA',
    surface3: '#FFFFFF',
    surface4: '#F9FAFB',

    // Borders (soft & subtle)
    border: '#E5E7EB',
    borderLight: '#F0F2F5',
    borderMedium: '#444444',
    divider: 'rgba(0, 0, 0, 0.06)',

    // Text (readable on light backgrounds)
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    textDisabled: '#D1D5DB',
    textDark: '#111827',
    textOnAccent: '#FFFFFF',

    // Overlays & Scrims (light theme)
    scrim: 'rgba(0, 0, 0, 0.4)',
    scrimDark: 'rgba(0, 0, 0, 0.6)',
    overlay: 'rgba(255, 255, 255, 0.95)',
    overlayLight: 'rgba(255, 255, 255, 0.05)',
    overlayBorder: 'rgba(255, 255, 255, 0.1)',

    // Tab bar inactive (dark on accent)
    tabBarInactive: 'rgba(15, 15, 16, 0.4)',
  },
};

export default theme;
