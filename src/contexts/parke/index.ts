import { createContext, useContext } from 'react'
import { DEFAULT_THEME, type Theme } from '@/themes'

interface ParkeContextValue {
    copyPhone: () => void
    retry: () => void
    loading: boolean
    message: string
    phone: string
    error: string
    theme: Theme
}

export const ParkeContext = createContext({
    copyPhone: () => {},
    retry: () => {},
    loading: true,
    message: '',
    phone: '',
    error: '',
    theme: DEFAULT_THEME,
} as ParkeContextValue)

export const useParkeContext = () => {
    const ctx = useContext(ParkeContext)
    if (!ctx) throw new Error('ParkeProvider 안에서 사용해주세요')
    return ctx
}

export * from './provider'
