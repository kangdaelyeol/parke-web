export const THEMES = ['dark', 'light', 'amber', 'mint'] as const

export type Theme = (typeof THEMES)[number]

export const DEFAULT_THEME: Theme = 'dark'

export const parseTheme = (value: unknown): Theme =>
    THEMES.includes(value as Theme) ? (value as Theme) : DEFAULT_THEME
