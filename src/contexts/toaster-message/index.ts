import { createContext, useContext } from 'react'

export const ToasterMessageContext = createContext({
    message: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setToasterMessageTimeout: (_: string) => {},
})

export const useToasterMessageContext = () => useContext(ToasterMessageContext)

export * from './provider'
