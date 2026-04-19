import { createContext, useContext } from 'react'

interface ParkeContextValue {
    copyPhone: () => void
    loading: boolean
    message: string
    phone: string
    error: string
}

export const ParkeContext = createContext({
    copyPhone: () => {},
    loading: true,
    message: '',
    phone: '',
    error: '',
} as ParkeContextValue)

export const useParkeContext = () => {
    const ctx = useContext(ParkeContext)
    if (!ctx) throw new Error('ParkeProvider 안에서 사용해주세요')
    return ctx
}

export * from './provider'
