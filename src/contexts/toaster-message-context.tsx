/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useState, type PropsWithChildren } from 'react'

export const ToasterMessageContext = createContext({
    message: '',
    setToasterMessageTimeout: (_: string) => {},
})

export const ToasterMessageProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState('')
    const [timerId, setTimerId] = useState<number | null>(null)

    const setToasterMessageTimeout = (message: string) => {
        if (timerId) clearTimeout(timerId)

        const id = setTimeout(() => {
            setMessage('')
            setTimerId(null)
        }, 750)

        setMessage(message)
        setTimerId(id)
    }

    return (
        <ToasterMessageContext.Provider
            value={{ message, setToasterMessageTimeout }}
        >
            {children}
        </ToasterMessageContext.Provider>
    )
}
