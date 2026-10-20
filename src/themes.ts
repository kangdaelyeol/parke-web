export const THEMES = ['dark', 'light', 'amber', 'mint'] as const

export type Theme = (typeof THEMES)[number]

export const DEFAULT_THEME: Theme = 'dark'

export const parseTheme = (value: unknown): Theme =>
    THEMES.includes(value as Theme) ? (value as Theme) : DEFAULT_THEME

// card/{id}/custom - 테마 위에 덮어쓰는 값
export interface Custom {
    accent: string | null
    // 번호와 메시지 글자에만 적용 - 레이블·버튼까지 키우면 데이터 도착 시 화면 전체가 다시 배치된다
    scale: number
    message: string | null
}

export const MIN_SCALE = 0.85
export const MAX_SCALE = 1.3
export const MAX_MESSAGE_LENGTH = 40

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

export const parseCustom = (value: unknown): Custom => {
    const raw = (typeof value === 'object' && value !== null ? value : {}) as {
        [key: string]: unknown
    }

    const accent =
        typeof raw.accent === 'string' && HEX_COLOR.test(raw.accent)
            ? raw.accent
            : null

    const scale =
        typeof raw.scale === 'number' && Number.isFinite(raw.scale)
            ? Math.min(MAX_SCALE, Math.max(MIN_SCALE, raw.scale))
            : 1

    const message =
        typeof raw.message === 'string' && raw.message.trim()
            ? raw.message.trim().slice(0, MAX_MESSAGE_LENGTH)
            : null

    return { accent, scale, message }
}

// accent 위에 올라가는 글자색 - 대비가 더 큰 쪽을 고른다
export const getOnAccent = (accent: string): string => {
    const [r, g, b] = [1, 3, 5].map((i) => {
        const channel = parseInt(accent.slice(i, i + 2), 16) / 255
        return channel <= 0.03928
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4
    })
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    const DARK = '#111111'
    const DARK_LUMINANCE = 0.0056

    const contrastWithWhite = 1.05 / (luminance + 0.05)
    const contrastWithDark = (luminance + 0.05) / (DARK_LUMINANCE + 0.05)

    return contrastWithWhite >= contrastWithDark ? '#ffffff' : DARK
}

// card/{id}/layout - 화면 디자인
export const LAYOUTS = ['a', 'b', 'c', 'd'] as const

export type Layout = (typeof LAYOUTS)[number]

export const DEFAULT_LAYOUT: Layout = 'a'

export const parseLayout = (value: unknown): Layout =>
    LAYOUTS.includes(value as Layout) ? (value as Layout) : DEFAULT_LAYOUT
