// 앱 카드 수정 화면의 실시간 미리보기 (WebView)
// - ?preview=1 로 들어오면 미리보기 모드. 쿼리 값이 DB 값보다 우선한다
// - 이후 값이 바뀔 때마다 앱이 'message' 이벤트로 카드 전체를 보낸다
import { useSyncExternalStore } from 'react'

export const PREVIEW_MESSAGE_TYPE = 'parke:preview'

// card/{id} 와 같은 모양 - 값은 검증 전이라 unknown
export interface RawCard {
    title?: unknown
    phone?: unknown
    theme?: unknown
    layout?: unknown
    custom?: unknown
    message?: unknown
}

export const isPreviewMode = (params: URLSearchParams) =>
    params.get('preview') === '1'

// 쿼리 값을 카드 모양으로 바꾼다 - 없는 값은 undefined 로 두어 DB 값을 덮어쓰지 않게 한다
export const readCardQuery = (params: URLSearchParams): RawCard => {
    const value = (key: string) => params.get(key) ?? undefined
    const accent = value('accent')
    const scale = value('scale')

    return {
        title: value('title'),
        phone: value('phone'),
        theme: value('theme'),
        layout: value('layout'),
        custom: {
            // 개발 중 편의를 위해 # 없이 넘긴 값(accent=ff5500)도 받는다
            accent: accent && !accent.startsWith('#') ? `#${accent}` : accent,
            scale: scale === undefined ? undefined : Number(scale),
            message: value('message'),
        },
    }
}

const definedEntries = (value: unknown) =>
    typeof value === 'object' && value !== null
        ? Object.fromEntries(
              Object.entries(value).filter(([, v]) => v !== undefined),
          )
        : {}

// 뒤에 오는 카드가 앞의 값을 덮어쓴다 (custom 은 필드 단위로 합친다)
export const mergeCards = (...cards: (RawCard | null)[]): RawCard =>
    cards.reduce<RawCard>(
        (merged, card) =>
            card
                ? {
                      ...merged,
                      ...definedEntries(card),
                      custom: {
                          ...definedEntries(merged.custom),
                          ...definedEntries(card.custom),
                      },
                  }
                : merged,
        {},
    )

// --- 앱이 보내는 'message' 이벤트 ---

let latestCard: RawCard | null = null
const listeners = new Set<() => void>()

const handleMessage = (event: Event) => {
    let data: unknown = (event as MessageEvent).data
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data)
        } catch {
            return
        }
    }

    const { type, card } = (data ?? {}) as { type?: unknown; card?: unknown }
    if (type !== PREVIEW_MESSAGE_TYPE) return
    if (typeof card !== 'object' || card === null) return

    latestCard = card as RawCard
    listeners.forEach((listener) => listener())
}

// 앱이 페이지 로드 직후 바로 보내므로 React 가 뜨기 전, 모듈을 불러오는 시점에 등록한다
// 일반 QR 페이지에서는 외부 메시지로 번호가 바뀌지 않도록 미리보기 모드에서만 듣는다
if (isPreviewMode(new URLSearchParams(window.location.search))) {
    window.addEventListener('message', handleMessage)
    // Android WebView 는 document 로 보내는 경우가 있다
    document.addEventListener('message', handleMessage)
}

const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

export const usePreviewMessageCard = () =>
    useSyncExternalStore(subscribe, () => latestCard)
