import { createContext, useContext } from 'react'
import {
    DEFAULT_LAYOUT,
    DEFAULT_THEME,
    type Layout,
    type Theme,
} from '@/themes'

interface ParkeContextValue {
    copyPhone: () => void
    retry: () => void
    loading: boolean
    message: string
    phone: string
    error: string
    theme: Theme
    layout: Layout
    title: string
    ownerMessage: string
    // 앱의 카드 수정 화면 미리보기 - 전화·복사는 동작하지 않는다
    preview: boolean
}

export const ParkeContext = createContext({
    copyPhone: () => {},
    retry: () => {},
    loading: true,
    message: '',
    phone: '',
    error: '',
    theme: DEFAULT_THEME,
    layout: DEFAULT_LAYOUT,
    title: '',
    ownerMessage: '',
    preview: false,
} as ParkeContextValue)

export const useParkeContext = () => {
    const ctx = useContext(ParkeContext)
    if (!ctx) throw new Error('ParkeProvider 안에서 사용해주세요')
    return ctx
}

export * from './provider'
