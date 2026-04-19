import { useState, type PropsWithChildren } from 'react'
import { ToasterMessageContext } from '.'

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
